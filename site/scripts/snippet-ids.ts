export const snippetIds = fetch('/dynamic/snippet-ids.json').then(res => res.json()) as Promise<string[]>;
