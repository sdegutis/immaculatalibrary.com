declare const persisted: {
  sessions?: Map<string, Session>;
  server?: { handler: import('http').RequestListener };
};

interface Session {
  isAdmin: boolean;
}

declare interface RouteInput {
  session: Session | null;
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
