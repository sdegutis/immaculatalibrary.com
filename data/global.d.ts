declare const __dir: Dir;
declare const __file: File;

declare class Dir {
  root: Dir;
  files: { [name: string]: File };
  subdirs: { [name: string]: Dir };
  entries: { [name: string]: File | Dir };
  path: string;
  name: string;
  parent: Dir | null;
}

declare class File {
  root: Dir;
  path: string;
  name: string;
  parent: Dir | null;
  buffer: Buffer;
}

interface RouteInput {
  method: Uppercase<string>;
  url: import('url').URL;
  headers: { [name: Lowercase<string>]: string | string[] | undefined };
  body: Buffer;
}

interface RouteOutput {
  status?: number;
  headers?: object;
  body?: string | Buffer;
}

type RouteHandler = (input: RouteInput) => RouteOutput;
