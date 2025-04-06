import { LiveTree } from "immaculata"

export const tree = new LiveTree('site', import.meta.url)
export const handlers = new Map<string, (body: string) => string>()

export function getFiles(dir: string): { path: string, content: string | Buffer }[] {
  return tree.files.values().filter(f => f.path.startsWith(dir)).toArray()
}
