type Filter = { type: 'all' } | { type: 'latest' } | { type: 'tag', tag: string };

export const SnippetsGroups: JSX.Component<{ filter: Filter }> = (attrs, children) => <>
  <script type='module' src='/scripts/snippets.js' />
  <script type='module'>{`
    import { showSnippets } from '/scripts/snippets.js';
    showSnippets(${attrs.filter.type === 'all' ? 's => true' :
      attrs.filter.type === 'latest' ? '(s, i) => i < 10' :
        `s => s.tags.includes(${JSON.stringify(attrs.filter.tag)})`});
  `}</script>
  <p id='dynamic-snippets-loading'><em>Loading...</em></p>
  <ul id='dynamic-snippets' style='padding-left: 20px' hidden />
</>;
