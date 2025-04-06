import { RatingStar } from "./$rating.js"

export const Rating = ({ n }: { n: number }) => (n > 0) ? <>
  <RatingStar lit={n >= 1} /> { }
  <RatingStar lit={n >= 2} /> { }
  <RatingStar lit={n >= 3} /> { }
  <RatingStar lit={n >= 4} /> { }
  <RatingStar lit={n >= 5} /> { }
</> : <></>
