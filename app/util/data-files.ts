import Yaml from 'js-yaml';

export function loadContentFile<T>(file: FsFile) {
  const slug = file.name.slice(0, -3);
  const date = slug.match(/^(\d{4}-\d{2}-\d{2})-/)?.[1];

  const fileContents = file.text.replace(/\r\n/g, '\n');
  const fileContentsMatch = fileContents.match(/^---\n(.+?)\n---\n\n(.+?)$/s)!;
  const frontmatter = fileContentsMatch[1]!;
  const content = fileContentsMatch[2]!;

  const meta = Yaml.load(frontmatter!) as T;

  return { date, slug, content, ...meta };
}
