import { randomUUID } from "crypto";
import path from "path";

export const Font: JSX.Component<{
  use: [string, Buffer][]
  fallback: string,
}> = (attrs, children) => {
  const dir = attrs.use;
  const name = path.basename(dir[0]![0]).split('-')[0]!;

  const lines = dir.map(file => {
    const route = file[0];
    const weight = path.basename(file[0]).match(/\d+/)![0];
    return `@font-face {
      font-display: block;
      font-family: ${name};
      font-weight: ${weight};
      src: url(${route});
    }`;
  });

  const fontStyle = lines.join('\n');

  const childEl = children[0] as JSX.Element;
  let id = childEl.attrs?.["id"];
  if (!id) id = (childEl.attrs ??= {})["id"] = `generated-${randomUUID()}`;

  const style = `
    ${fontStyle}
    #${id} { font-family: ${name},  ${attrs.fallback} }
  `;

  return <>
    <style>{style}</style>
    {children}
  </>;
};
