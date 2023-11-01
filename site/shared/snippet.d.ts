export type SnippetSmallerJson = {
  slug: string;
  route: string;
  renderedTitle: string;
  mins: number;
  book: { data: { title: string, author: string } },
  data: { tags: string[] },
  content: string;
};
