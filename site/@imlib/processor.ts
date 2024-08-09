import { File, SiteProcessor } from "@imlib/core";
import { makeSitemap } from "../sitemap.xml.js";

const isDev = !!process.env['DEV'];

export default ((files) => {
  const out = processSite(files);
  out.set('/sitemap.xml', makeSitemap(out.keys()));
  return out;
}) as SiteProcessor;



const postProcessors: Record<string, PostProcessor> = {
  html: hoist,
  json: JSON.stringify,
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

type PostProcessor = (s: any) => string;

function postProcess(f: Outfile): Outfile {
  const ext = f.path.match(/\.(.+)$/)![1];
  if (ext && ext in postProcessors) {
    const fn = postProcessors[ext] ?? (s => s);
    f.content = fn(f.content);
  }
  return f;
}


interface Outfile {
  path: string;
  content: string | Buffer;
}



type ProcFn = (file: File, captureGroups: Record<string, string>) => Outfile | Outfile[];
type Processor = [RegExp, ProcFn];

const processors: Processor[] = [];

const skip: ProcFn = () => [];
const asIs: ProcFn = (f) => f;

if (!isDev) {
  processors.push([/^\/admin\//, skip]);
}

processors.push([/\.md$/, skip]);
processors.push([/_.*\.js$/, skip]);

processors.push([/\/.*(?<slug>\[.+\]).*\.(?<ext>.+)\.js$/, (file, groups) => {
  const array = file.module!.require().default as [string, string][];
  return array.map(([slug, content]) => postProcess({
    path: file.path.slice(0, -3).replace(groups["slug"]!, slug),
    content,
  }));
}]);

processors.push([/\.(?<ext>.+)\.js$/, (file, groups) => postProcess({
  path: file.path.slice(0, -3),
  content: file.module!.require().default,
})]);

processors.push([/./, asIs]);





export const processSite: SiteProcessor = (files) => {
  const outfiles = new Map<string, Buffer | string>();

  for (const file of files) {
    const proc = processors.find(([r]) => file.path.match(r))!;
    const [r, fn] = proc;

    const match = file.path.match(r)!;
    const processed = fn(file, match.groups!);
    const normalized = Array.isArray(processed) ? processed : [processed];

    for (const { path, content } of normalized) {
      outfiles.set(path, content);
    }
  }

  return outfiles;
};
