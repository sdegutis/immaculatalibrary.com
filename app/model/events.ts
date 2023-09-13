import { TypedEmitter } from "tiny-typed-emitter";
import { Snippet } from "./snippets/snippet";

export const snippetEvents = new TypedEmitter<{
  loaded: () => void;
  // created: (snippet: Snippet) => void;
  // updated: (snippet: Snippet) => void;
}>();
