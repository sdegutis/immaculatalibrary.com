import { allSnippets } from "../model/snippets";

export default allSnippets.map(snippet => {
  return [`${snippet.shortLink}.html`, <>
    {'<!DOCTYPE html>'}
    <meta http-equiv="refresh" content={`0; url='${snippet.route}'`} />
  </>];
});