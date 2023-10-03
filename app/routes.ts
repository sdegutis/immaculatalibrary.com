export const out = new Map<string, Buffer | string>();

const componentRoutes = new Map<Buffer, string>();

export function staticRouteFor([filepath, buffer]: [string, Buffer]) {
  let path = componentRoutes.get(buffer);
  if (!path) {
    componentRoutes.set(buffer, path = filepath);
    out.set(path, buffer);
  }
  return path;
}

export function reset() {
  out.clear();
  componentRoutes.clear();
}
