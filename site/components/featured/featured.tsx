import { booksBySlug } from "../../model/books";

export const featuredBooks = [
  'introduction-to-the-devout-life',
  'imitation-of-christ',
  'st-john-henry-newman-reply-to-eirenicon',
  'catena-aurea',
  'the-sinners-guide',
  'the-spiritual-combat',
  'the-glories-of-mary',
  'catholic-encyclopedia',
].map(id => booksBySlug[id]!)
