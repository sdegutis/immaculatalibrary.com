import { SiteProcessor } from "@imlib/core";
import { makeSitemap } from "../sitemap.xml.js";

const isDev = !!process.env['DEV'];

export default ((files) => {
  const out = processSite(files);
  out.set('/sitemap.xml', makeSitemap(out.keys()));
  return out;
}) as SiteProcessor;

const extFns = {
  html: hoist,
  json: JSON.stringify,
};

const ARRAY_FILE_REGEX = /\[.+\]/;

export const processSite: SiteProcessor = (files) => {
  const outfiles = new Map<string, Buffer | string>();

  for (const { path, content, module } of files) {
    if (!isDev && path.startsWith('/admin/')) continue;

    let match;
    if (match = path.match(/\.(.+)\.js$/)) {
      const ext = match[1] as keyof typeof extFns;
      const process = extFns[ext] ?? ((s: string) => s);

      const filepath = path.slice(0, -3);

      const exported = module?.require().default;

      if (path.match(ARRAY_FILE_REGEX)) {
        for (const [slug, jsx] of exported) {
          const filename = filepath.replace(ARRAY_FILE_REGEX, slug);
          outfiles.set(filename, process(jsx));
        }
      }
      else {
        outfiles.set(filepath, process(exported));
      }
    }
    else {
      if (path.endsWith('.md')) {
        // skip
      }
      else if (path.endsWith('.js') && path.includes('_')) {
        // skip
      }
      else {
        outfiles.set(path, content);
      }
    }
  }

  return outfiles;
};

function hoist(jsx: string) {
  const hoisted = new Set<string>();
  return (jsx
    .replace(/<script .+?><\/script>|<link .+?>/g, (s, s2) => {
      hoisted.add(s);
      return '';
    })
    .replace(/<\/head>/, [...hoisted, '</head>'].join('')));
}
