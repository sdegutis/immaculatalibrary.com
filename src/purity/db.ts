export interface Database {
  load(): Promise<LiveItemMap>;
  save(ids: Iterable<string>): void;
}

export type LiveItemMap = Map<string, Readonly<SerializableObject>>;

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
