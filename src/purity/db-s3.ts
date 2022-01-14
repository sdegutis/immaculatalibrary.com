import { GetObjectCommand, paginateListObjectsV2, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { Readable } from "stream";
import { Database, LiveItemMap } from './db';

const MAX_GROUP_SIZE = 100;
const SAVE_EVERY_SECONDS = 60;

export class S3Database implements Database {

  #items: LiveItemMap = new Map();
  #groups = new Map<string, LiveItemMap>();
  #affectedGroupIds = new Set<string>();

  client;
  constructor(private Bucket: string) {
    this.client = new S3Client({ region: 'us-east-2' });
  }

  saveRegularly() {
    setInterval(() => {
      this.saveIfNeeded();
    }, SAVE_EVERY_SECONDS * 1000);
  }

  async load() {
    console.log('Loading from S3');
    const { client, Bucket } = this;

    for await (const group of paginateListObjectsV2({ client }, { Bucket })) {
      for (const object of group.Contents ?? []) {
        const Key = object.Key!;
        console.log('Loaded', Key);

        const group: LiveItemMap = new Map();
        this.#groups.set(Key, group);

        const { Body } = await this.client.send(new GetObjectCommand({ Bucket, Key }));
        const allData: string = await new Promise((resolve, reject) => {
          const chunks: Buffer[] = [];
          const stream = Body as Readable;
          stream.on('data', chunk => chunks.push(chunk));
          stream.once('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
          stream.once('error', reject);
        });

        for (const [id, data] of JSON.parse(allData)) {
          const rawItem = Object.freeze(data);

          this.#items.set(id, rawItem);
          group.set(id, rawItem);
        }
      }
    }
    console.log('Done loading from S3');

    return this.#items;
  }

  save(ids: Iterable<string>) {
    for (const id of ids) {
      const entry = this.#items.get(id);
      const group = [...this.#groups.entries()].find(([k, v]) => v.has(id));
      if (entry === undefined) {
        // Deleting
        console.log('Deleting', id);
        const [groupId, groupItems] = group!;
        this.#affectedGroupIds.add(groupId);
        groupItems.delete(id);
      }
      else {
        if (group) {
          // Updating
          console.log('Updating', id);
          const [groupId, groupItems] = group;
          this.#affectedGroupIds.add(groupId);
          groupItems.set(id, entry);
        }
        else {
          // Adding
          console.log('Creating', id);
          let group = [...this.#groups.entries()].find(([k, v]) => v.size < MAX_GROUP_SIZE);
          if (!group) {
            let groupId;
            do { groupId = randomUUID(); }
            while (this.#groups.has(groupId));
            group = [groupId, new Map()];
            this.#groups.set(...group);
          }
          const [groupId, groupItems] = group;
          this.#affectedGroupIds.add(groupId);
          groupItems.set(id, entry);
        }
      }
    }
  }

  saveIfNeeded() {
    if (this.#affectedGroupIds.size > 0) {
      console.log('Saving', this.#affectedGroupIds.size);
    }
    for (const Key of this.#affectedGroupIds) {
      const { client, Bucket } = this;
      const group = this.#groups.get(Key)!;
      const Body = JSON.stringify([...group.entries()], null, 2);
      client.send(new PutObjectCommand({ Bucket, Key, Body }));
    }
    this.#affectedGroupIds.clear();
  }

}
