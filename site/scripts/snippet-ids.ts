export const snippetIds = fetch('/scripts/data/snippet-ids.json').then<string[]>(res => res.json());
