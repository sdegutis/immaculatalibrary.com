export function makeRouteFor(filename: string) {
  return filename.slice('/site'.length, -'.tsx'.length);
}
