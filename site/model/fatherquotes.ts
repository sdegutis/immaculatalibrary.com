import { DataFile } from '../core/data-files.js';
import allFatherQuoteFiles from "../data/fatherquotes/";

interface FatherQuoteFile {
  gospelQuote: string;
}

export class FatherQuote extends DataFile<FatherQuoteFile> {

  static override modelDir = 'fatherquotes';

  book: string;
  chapter: number;
  verse: number;

  constructor(slug: string, content: string, data: FatherQuoteFile) {
    super(slug, content, data);
    const [book, chapter, verse] = this.slug.split('-');
    this.book = book!;
    this.chapter = +chapter!;
    this.verse = +verse!;
  }

}

export const allFatherQuotes = (allFatherQuoteFiles
  .map(file => FatherQuote.fromFile(file)));
