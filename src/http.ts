import { IncomingHttpHeaders } from "http";
import { URL } from "url";

export interface RouteInput {
  method: Uppercase<string>;
  url: URL;
  headers: IncomingHttpHeaders;
  body: Buffer;
}

export interface RouteOutput {
  status?: number;
  headers?: object;
  body?: string | Buffer;
}

export type RouteHandler = (input: RouteInput) => RouteOutput;
