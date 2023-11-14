import MarkdownIt from "https://cdn.jsdelivr.net/npm/markdown-it@13.0.2/+esm";
import { Typography } from "../components/typography.js";
import { mdOptions } from "../shared/markdown.js";
import { SnippetJson } from "./data/snippets.json.js";
import { Reactive } from "./reactive.js";
import { createSearch, highlight, highlightText } from "./searchlist.js";
import { randomElement, sleep } from "./util.js";

const md = new MarkdownIt(mdOptions);

const snippetsFetch = fetch('/scripts/data/snippets.json').then<SnippetJson[]>(res => res.json());
await sleep(.1);
const snippets = await snippetsFetch;

const tags = [...new Set(snippets.flatMap(s => s.tags))].sort();

const currentTag = new Reactive(new URL(window.location.href).searchParams.get('tag') ?? '_any');
const lengthFilter = new Reactive('');
const searchTerm = new Reactive('');

const { results, matchingItems } = createSearch({
  data: snippets,
  searchTerm,
  filters: [
    {
      source: currentTag,
      matches: (snippet: SnippetJson) => {
        if (currentTag.val === '_any') return true;
        if (currentTag.val === '_some') return snippet.tags.length > 0;
        if (currentTag.val === '_none') return snippet.tags.length === 0;
        return snippet.tags.includes(currentTag.val);
      },
    },
    {
      source: lengthFilter,
      matches: (snippet: SnippetJson) => {
        switch (lengthFilter.val) {
          case 'short': return snippet.mins < 3;
          case 'medium': return snippet.mins >= 3 && snippet.mins <= 5;
          case 'long': return snippet.mins >= 6 && snippet.mins <= 8;
          case 'very-long': return snippet.mins >= 9;
          case '': default: return true;
        }
      },
    },
    {
      source: searchTerm,
      matches: (snippet: SnippetJson) => (
        snippet.title.toLowerCase().includes(searchTerm.val) ||
        snippet.markdown.toLowerCase().includes(searchTerm.val) ||
        snippet.bookAuthor.toLowerCase().includes(searchTerm.val) ||
        snippet.bookTitle.toLowerCase().includes(searchTerm.val)
      ),
    },
  ],
  viewForItem: (snippet, search) => {
    const matchedBody = findWithinMarkdown(snippet.markdown, search);
    return (
      <li>
        <p>
          <a href={snippet.route}>{highlight(snippet.title, search)}</a>
          <br />
          {snippet.mins} min &bull; {highlight(snippet.bookTitle, search)}
        </p>
        {matchedBody && <>
          <Typography style='font-size:smaller'>
            <blockquote innerHTML={matchedBody} />
          </Typography>
        </>}
      </li>
    );
  },
});

function findWithinMarkdown(markdown: string, search?: string) {
  if (!search) return null;

  const content = markdown.replace(/[^\w\d :;,.!?]/g, '');
  const match = content.match(new RegExp(search, 'i'));
  if (!match) return null;

  const start = Math.max(0, content.lastIndexOf(' ', match.index! - 20));
  const end = Math.min(content.length, content.indexOf(' ', match.index! + match[0].length + 20));

  const sliced = content.slice(start, end);
  const highlighted = highlightText(sliced, search);
  return md.render(highlighted);
}

document.getElementById('search-results')!.replaceChildren(results);

matchingItems.onChange(() => {
  document.getElementById('search-count')!.textContent = matchingItems.val.length.toFixed();
});

const randomSnippetLink = <a href='#' onclick={function (this: HTMLAnchorElement, e: Event) {
  if (matchingItems.val.length === 0) {
    e.preventDefault();
    return;
  }

  this.href = randomElement(matchingItems.val).route;
}}>Random Snippet</a> as HTMLAnchorElement;

matchingItems.onChange(() => {
  randomSnippetLink.toggleAttribute('disabled', matchingItems.val.length === 0);
});

document.getElementById('filters-container')!.replaceChildren(<>
  <p><input style='width: 100%' placeholder='Search' autofocus type="text" oninput={function (this: HTMLInputElement) {
    searchTerm.set(this.value.trim().toLowerCase());
  }} /></p>
  <div id='snippets-filters'>

    <span class='label'>tag</span>
    <select onchange={function (this: HTMLSelectElement) { currentTag.set(this.value) }}>
      <optgroup label='Whether it has tags'>
        <option value='_any' selected={currentTag.val === '_any'}>Any</option>
        <option value='_some' selected={currentTag.val === '_some'}>Some</option>
        <option value='_none' selected={currentTag.val === '_none'}>None</option>
      </optgroup>
      <optgroup label='Tags'>
        {tags.map(tag =>
          <option value={tag} selected={currentTag.val === tag}>{tag}</option>
        )}
      </optgroup>
    </select>

    <span class='label'>minutes</span>
    <span>
      <label><input type='radio' name='has-snippets' onclick={() => lengthFilter.set('')} checked />Any</label>
      <label><input type='radio' name='has-snippets' onclick={() => lengthFilter.set('short')} />1-2</label>
      <label><input type='radio' name='has-snippets' onclick={() => lengthFilter.set('medium')} />3-5</label>
      <label><input type='radio' name='has-snippets' onclick={() => lengthFilter.set('long')} />6-8</label>
      <label><input type='radio' name='has-snippets' onclick={() => lengthFilter.set('very-long')} />9+</label>
    </span>

  </div>
  <hr />
  <p>
    Not sure what to read?<br />
    Try a {randomSnippetLink} from these.
  </p>
</>);
