export type SnippetJson = {
  route: string;
  renderedTitle: string;
  date: string;
  mins: number;
  bookAuthor: string;
  bookRoute: string;
  bookTitle: string;
  archiveLink: string;
  archivePage: string;
  previewMarkdown: string | null;
  renderedBody: string;
};

export type SnippetSmallerJson = {
  slug: string;
  route: string;
  renderedTitle: string;
  mins: number;
  bookTitle: string;
  tags: string[];
};
