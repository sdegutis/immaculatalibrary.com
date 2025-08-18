import MarkdownIt from 'markdown-it'
import { mdOptions } from '../components/$markdown.js'

export const markdown = new MarkdownIt(mdOptions)
export const markdownNoBreak = new MarkdownIt({ ...mdOptions, breaks: false })

export function sortBy<T>(fn: (o: T) => string | number) {
  return (l: T, r: T) => {
    const a = fn(l)
    const b = fn(r)
    return a < b ? -1 : a > b ? 1 : 0
  }
}
