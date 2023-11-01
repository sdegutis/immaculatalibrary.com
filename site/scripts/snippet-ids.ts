export const snippetIds = fetch('/scripts/data/snippet-ids.json').then(res => res.json()) as Promise<string[]>;
