declare const persisted: {
  sessions: Map<string, import('../auth/login').Session>;
  server: import('../http').Server;
};

declare interface RouteInput {
  method: Uppercase<string>;
  url: URL;
  headers: import('http').IncomingHttpHeaders;
  body: Buffer;
}

declare interface RouteOutput {
  status?: number;
  headers?: import('http').OutgoingHttpHeaders;
  body?: Buffer;
}

declare type RouteHandler = (input: RouteInput) => RouteOutput;
