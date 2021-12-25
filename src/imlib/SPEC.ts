import { URLSearchParams } from "url";

type EngineInput = {
  [id: string]: ItemData;
}[];

type ItemData = {

  $name?: string;

  $type?: string;
  $figure?: ItemData;
  $shadow?: ItemData;

  $route?: ItemFunction<(this: Item) => string>;
  $get?: RouteFunction;
  $post?: RouteFunction;
  $delete?: RouteFunction;
  $put?: RouteFunction;
  $patch?: RouteFunction;
  $head?: RouteFunction;
  $options?: RouteFunction;

  $tick?: ItemFunction<(this: Item) => void>;
  $ms?: number;

  $boot?: ItemFunction<(this: Item) => void>;

  [key: string]: any;

};

type ItemFunction<T> = {
  $eval: string;
};

type Item = {
  $id: string;
  $data: ItemData;
  $items: Item[];
  $type: Item | null;
  [key: string]: any;
};

type Site = {
  items: { [id: string]: Item };
  root: Item[];
  named(...path: string[]): Item | null;

  create(data: ItemData): string;
  update(id: string, data: ItemData): void;
  delete(id: string): void;

  rebuild(): Site;
};

type RouteFunction = ItemFunction<
  (this: Item, input: RouteInput) =>
    Promise<RouteOutput>
>;

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
};

type ItemFunctionGlobals = {
  $site: Site;
  [name: string]: any;
};
