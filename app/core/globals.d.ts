declare const persisted: {
  [key: string]: any;
};

declare interface RouteInput {
  method: Uppercase<string>;
  url: URL;
  headers: import('http').IncomingHttpHeaders;
  body: Buffer;
  cookies: Record<string, string>,
}

declare interface RouteOutput {
  status?: number;
  headers?: import('http').OutgoingHttpHeaders;
  body?: Buffer;
}

declare type RouteHandler = () => RouteOutput;
declare type FullRouteHandler = (input: RouteInput) => RouteOutput;
