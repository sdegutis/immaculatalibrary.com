import path from "path";
import { generated } from "../core/generated";

export const Font: JSX.Component<{
  use: FsFile[]
  fallback: string,
}, [JSX.Element]> = (attrs, [childEl]) => {
  const dir = attrs.use;
  const name = path.basename(dir[0]!.path).split('-')[0]!;

  const filename = `font-${name}.css`;
  const cssPath = generated(filename, () => {
    const lines = dir.map(file => {
      const route = file.path;
      const weight = path.basename(file.path).match(/\d+/)![0];
      return /*css*/ `@font-face {
        font-display: block;
        font-family: ${name};
        font-weight: ${weight};
        src: url(${route});
        font-display: fallback;
      }`;
    });
    return lines.join('\n');
  });

  let id = childEl.attrs?.["id"];
  if (!id) id = (childEl.attrs ??= {})["id"] = `generated-font-${name}`;

  const style = `#${id} { font-family: ${name},  ${attrs.fallback} }`;

  return <>
    {attrs.use.map(file =>
      <link rel="preload" href={file.path} as="font" type="font/woff" crossorigin />
    )}
    <link rel="stylesheet" href={cssPath} />
    <style>{style}</style>
    {childEl}
  </>;
};
