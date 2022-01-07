import { URLSearchParams } from "url";

type EngineInput = {
  [id: string]: ItemData;
};

type ItemData = {

  $boot?: ItemFunction<(this: CompiledItem, input: {
    site: Site,
    items: CompiledItem[],
    sandbox: any,
  }) => {
    routes: Record<RouteString, (input: RouteInput) => RouteOutput>;
    timers?: { ms: number, fn: () => void }[];
    notFoundPage?: (input: RouteInput) => RouteOutput;
    onRouteError?: (input: RouteInput, error: any) => RouteOutput;
  }>;

  [key: string]: ItemFunction<any> | any;

};

type ItemFunction<T extends (this: CompiledItem, ...args: any) => any> = {
  $eval: string & T;
};

type CompiledItem = {
  $id: string;
  $data: ItemData;

  [key: string]: any;
};

type Site = {
  create(data: ItemData): string;
  update(id: string, data: ItemData): void;
  delete(id: string): void;
  rebuild(): Site;
};

type RouteInput = {
  query(): URLSearchParams;
  text(): string;
  json(): any;
  form(): URLSearchParams;
  headers(): any;
  session: object;
};

type RouteOutput = string | {
  status?: number;
  headers?: object;
  redirect?: string;
  text?: string;
  json?: object;
} | Promise<RouteOutput>;

type HttpVerb = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' | 'HEAD' | 'OPTIONS';
type RouteString = `${HttpVerb} /${string}`;
