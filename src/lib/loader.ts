import { Dir } from "./runtime";

export interface Loader {
  load(): Promise<Dir>;
}
