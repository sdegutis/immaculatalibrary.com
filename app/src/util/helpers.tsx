import { randomInt } from 'crypto';
import * as luxon from 'luxon';
import MarkdownIt from 'markdown-it';
import { EnrichedInput } from '../pages/admin';

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

const repeat = (n: number) => Array.from(Array(n));
export const rating = (n: number) => n ? <>
  <span class="rating-label">
    {repeat(n).map(i => <>
      <svg viewBox="0 0 16 16">
        <path d="M8 1 L10 6 16 6 11 9.5 12.5 15 8 11.5 3.5 15 5 9.5 1 6 6 6 Z"></path>
      </svg>{' '}
    </>)}
    {repeat(5 - n).map(i => <>
      <svg viewBox="0 0 16 16" style="opacity: 0.25;">
        <path d="M8 1 L10 6 16 6 11 9.5 12.5 15 8 11.5 3.5 15 5 9.5 1 6 6 6 Z"></path>
      </svg>{' '}
    </>)}
  </span>
</> : '';

export function reading_mins(str: string) {
  return Math.round((str.match(/\w+/g)?.length || 0) / 160);
}

export function extract_page_number(archiveLink: string) {
  const m = archiveLink.match(/\/page\/(n?[0-9]+)/);
  return m ? m[1] : '(unknown page)';
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

export function sameSiteReferer(input: EnrichedInput) {
  const referer = input.headers.referer;
  if (!referer) return;

  const url = new URL(referer);
  if (url.hostname !== input.url.hostname) return;

  return url;
}
