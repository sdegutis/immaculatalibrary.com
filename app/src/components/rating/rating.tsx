import cssFile from './rating-label.css';
import { staticRouteFor } from '/src/core/static';

const repeat = (n: number) => Array.from(Array(n));
export const Rating: Component<{ n: number }> = ({ n }) => n ? <>
  <span class="rating-label">
    <link rel='stylesheet' href={staticRouteFor(cssFile)} />
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
