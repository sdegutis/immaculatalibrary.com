import { randomInt } from 'crypto';
import * as luxon from 'luxon';
import MarkdownIt from 'markdown-it';

export const md = new MarkdownIt({
  html: true,
  typographer: true,
  linkify: true,
  breaks: true,
});

export function randomElement<T>(array: T[]): T {
  return array[randomInt(array.length)]!;
}

export function groupByDate<T extends { date: string }>(array: T[]) {
  const groups: Record<string, T[]> = Object.create(null);
  for (const o of array) {
    const d = format_date(o.date);
    if (!groups[d]) groups[d] = [];
    groups[d]!.push(o);
  }
  return groups;
}

export function reading_mins(str: string) {
  return Math.round((str.match(/\w+/g)?.length || 0) / 160);
}

export function format_date(date: string) {
  return luxon.DateTime.fromISO(date).toLocaleString({
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function striptags(s: string) {
  return s.replace(/<[^>]+?>/g, '');
}

export function excerpt(s: string) {
  return s.split(/\r?\n\r?\n/)[0]!;
}

export function sortBy<T>(fn: (o: T) => string | number) {
  return (l: T, r: T) => {
    const a = fn(l);
    const b = fn(r);
    return a < b ? -1 : a > b ? 1 : 0;
  };
}

export function sameSiteReferer(input: RouteInput) {
  const referer = input.headers.referer;
  if (!referer) return;

  const url = new URL(referer);
  if (url.hostname !== input.url.hostname) return;

  return url;
}
