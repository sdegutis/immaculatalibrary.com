export interface Database {
  load(): Promise<LiveItemMap>;
  put(id: string, data: SerializableObject | null): void;
}

export type LiveItemMap = ReadonlyMap<string, {
  readonly [key: string]: SerializableObject;
}>;

export type SerializableObject = {
  [key: string]: Serializable;
};

type Serializable = (
  string |
  number |
  boolean |
  null |
  Serializable[] |
  SerializableObject
);
