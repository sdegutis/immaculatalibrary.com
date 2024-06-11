import { DataFile } from '../core/data-files.js';
import allFatherQuoteFiles from "../data/fathers/";

interface FatherQuoteFile {
  gospelQuote: string;
}

export class FatherQuote extends DataFile<FatherQuoteFile> {

  static override modelDir = 'fatherquotes';

  constructor(slug: string, content: string, data: FatherQuoteFile) {
    super(slug, content, data);
  }

}

export const allFatherQuotes = (allFatherQuoteFiles
  .map(file => FatherQuote.fromFile(file)));
