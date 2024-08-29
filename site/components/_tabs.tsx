import { jsxToString } from "../util/jsx-strings.js";

export function makeTabs(tabs: { href: string, title: string }[]) {
  return (attrs: { index: number }) => (
    <h1 class='tab-links'>
      {tabs.map((link, i) => jsxToString(
        <a href={link.href} class={i === attrs.index ? 'active' : ''}>{link.title}</a>
      ))}
    </h1>
  );
}
