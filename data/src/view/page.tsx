import { Component } from "./types";

export const HeroImage: Component<{ image: string }> = (attrs, children) => <>
  <section id="page-hero" style={`background-image: url(${attrs.image});`}></section>
</>;

export const Container: Component<{}> = (attrs, children) => <>
  <div class="container">
    {children}
  </div>
</>;

export const SplitPage: Component<{ spaced?: boolean, split?: boolean }> = (attrs, children) => {
  const cssClass: string[] = [];
  if (attrs.spaced ?? true) cssClass.push('spaced-main-content');
  if (attrs.split ?? true) cssClass.push('split-page');
  return <>
    <section class={cssClass.join(' ')}>
      {children}
    </section>
  </>;
};

export const Content: Component<{}> = (attrs, children) => <>
  <div class="content">
    {children}
  </div>
</>;
