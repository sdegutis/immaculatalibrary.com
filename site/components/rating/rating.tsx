export const Rating: JSX.Component<{ n: number }> = ({ n }) => (n > 0) ? <>
  <RatingStar lit={n >= 1} /> { }
  <RatingStar lit={n >= 2} /> { }
  <RatingStar lit={n >= 3} /> { }
  <RatingStar lit={n >= 4} /> { }
  <RatingStar lit={n >= 5} /> { }
</> : <></>;

export const RatingStar: JSX.Component<{ lit?: boolean }> = ({ lit }) => <>
  <link rel='stylesheet' href='/components/rating/rating.css' />
  <svg class={`rating-star ${lit ? 'lit' : ''}`} viewBox="0 0 16 16">
    <path d="M8 1 L10 6 16 6 11 9.5 12.5 15 8 11.5 3.5 15 5 9.5 1 6 6 6 Z"></path>
  </svg>
</>;
