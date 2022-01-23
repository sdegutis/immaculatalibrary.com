import MarkdownIt from 'markdown-it';

export const md = new MarkdownIt({
  html: true,
  typographer: true,
  linkify: true,
  breaks: true,
});

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

export const shareLinks = <>
  <ul class="share-buttons" data-source="simplesharingbuttons.com">
    <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fimmaculatalibrary.com%2F&quote=" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL) + '&quote=' + encodeURIComponent(document.URL)); return false;"><img alt="Share on Facebook" src="/img/share/Facebook.svg" /></a></li>
    <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fimmaculatalibrary.com%2F&text=:%20https%3A%2F%2Fimmaculatalibrary.com%2F" target="_blank" title="Tweet" onclick="window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title) + ':%20'  + encodeURIComponent(document.URL)); return false;"><img alt="Tweet" src="/img/share/Twitter.svg" /></a></li>
    <li><a href="http://www.tumblr.com/share?v=3&u=https%3A%2F%2Fimmaculatalibrary.com%2F&quote=&s=" target="_blank" title="Post to Tumblr" onclick="window.open('http://www.tumblr.com/share?v=3&u=' + encodeURIComponent(document.URL) + '&quote=' +  encodeURIComponent(document.title)); return false;"><img alt="Post to Tumblr" src="/img/share/Tumblr.svg" /></a></li>
    <li><a href="http://pinterest.com/pin/create/button/?url=https%3A%2F%2Fimmaculatalibrary.com%2F&description=" target="_blank" title="Pin it" onclick="window.open('http://pinterest.com/pin/create/button/?url=' + encodeURIComponent(document.URL) + '&description=' +  encodeURIComponent(document.title)); return false;"><img alt="Pin it" src="/img/share/Pinterest.svg" /></a></li>
    <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fimmaculatalibrary.com%2F&title=" target="_blank" title="Submit to Reddit" onclick="window.open('http://www.reddit.com/submit?url=' + encodeURIComponent(document.URL) + '&title=' +  encodeURIComponent(document.title)); return false;"><img alt="Submit to Reddit" src="/img/share/Reddit.svg" /></a></li>
    <li><a href="http://wordpress.com/press-this.php?u=https%3A%2F%2Fimmaculatalibrary.com%2F&quote=&s=" target="_blank" title="Publish on WordPress" onclick="window.open('http://wordpress.com/press-this.php?u=' + encodeURIComponent(document.URL) + '&quote=' +  encodeURIComponent(document.title)); return false;"><img alt="Publish on WordPress" src="/img/share/Wordpress.svg" /></a></li>
    <li><a href="mailto:?subject=&body=:%20https%3A%2F%2Fimmaculatalibrary.com%2F" target="_blank" title="Send email" onclick="window.open('mailto:?subject=' + encodeURIComponent(document.title) + '&body=' +  encodeURIComponent(document.URL)); return false;"><img alt="Send email" src="/img/share/Email.svg" /></a></li>
  </ul>
</>;

export function reading_mins(str: string) {
  return Math.round((str.match(/\w+/g)?.length || 0) / 160);
}

export function extract_page_number(archiveLink: string) {
  const m = archiveLink.match(/\/page\/(n?[0-9]+)/);
  return m ? m[1] : '(unknown page)';
}

export function format_date(date: string) {
  return new Date(date).toLocaleDateString('en-EN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function striptags(s: string) {
  return s.replace(/<[^>]+?>/g, '');
}

export function excerpt(s: string) {
  return s.split(/\r?\n\r?\n/)[0];
}

export function sortBy<T>(fn: (o: T) => string | number) {
  return (l: T, r: T) => {
    const a = fn(l);
    const b = fn(r);
    return a < b ? -1 : a > b ? 1 : 0;
  };
}
