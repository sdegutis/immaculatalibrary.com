export const out = new Map<string, Buffer | string>();

export function makeRouteFor(filename: string) {
  return filename.slice('/site'.length, -'.tsx'.length);
}
