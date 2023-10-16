import { randomUUID } from "crypto";
import path from "path";

export const Font: JSX.Component<{
  use: FsFile[]
  fallback: string,
}, [JSX.Element]> = (attrs, [childEl]) => {
  const dir = attrs.use;
  const name = path.basename(dir[0]!.path).split('-')[0]!;

  const lines = dir.map(file => {
    const route = file.path;
    const weight = path.basename(file.path).match(/\d+/)![0];
    return `@font-face {
      font-display: block;
      font-family: ${name};
      font-weight: ${weight};
      src: url(${route});
    }`;
  });

  const fontStyle = lines.join('\n');

  let id = childEl.attrs?.["id"];
  if (!id) id = (childEl.attrs ??= {})["id"] = `generated-${randomUUID()}`;

  const style = `
    #${id} { font-family: ${name},  ${attrs.fallback} }
  `;

  return <>
    <style>{fontStyle}</style>
    <style>{style}</style>
    {childEl}
  </>;
};
