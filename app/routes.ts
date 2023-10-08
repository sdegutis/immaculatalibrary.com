export const out = new Map<string, Buffer | string>();

export const resources = new Map<string, Buffer>();

export function staticRouteFor([filepath, buffer]: [string, Buffer]) {
  resources.set(filepath, buffer);
  return filepath;
}

export function makeRouteFor(filename: string) {
  return filename.slice('/site'.length, -'.tsx'.length);
}
