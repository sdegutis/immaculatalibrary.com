import * as path from "path";
import fontFiles from './';

const fontGroups = Object.groupBy(fontFiles, f => f.path.split('/')[2]!);

for (const key of Object.keys(fontGroups)) {
  if (key.endsWith('.js')) {
    delete fontGroups[key];
  }
}

export const Fonts = Object.fromEntries(Object.entries(fontGroups).map(([name, dir]) => {
  return [name, (attrs: { fallback: string }, children: any) => <>
    <div style={`font-family: ${name}, ${attrs.fallback}`}>
      {dir!.map(file =>
        <link rel="preload" href={file.path} as="font" type="font/woff" crossorigin />
      )}
      <link rel="stylesheet" href={`/fonts/${name}.css`} />
      {children}
    </div>
  </>];
}));

export default Object.entries(fontGroups).map(([name, dir]) => {
  const lines = dir!.map(file => {
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
  return [name, lines.join('\n')];
});
