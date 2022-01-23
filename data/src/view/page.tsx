import { Component } from "./types";

export const HeroImage: Component<{ image: string }> = (attrs, children) => <>
  <section id="page-hero" style={`background-image: url(${attrs.image});`}></section>
</>;

export const Container: Component<{ sectionId?: string, spaced?: boolean, split?: boolean }> = (attrs, children) => {
  const cssClass: string[] = [];
  if (attrs.spaced ?? true) cssClass.push('spaced-main-content');
  if (attrs.split ?? true) cssClass.push('split-page');
  return <>
    <div class="container">
      <section class={cssClass.join(' ')} id={attrs.sectionId ?? ''}>
        {children}
      </section>
    </div>
  </>;
};

export const Content: Component<{}> = (attrs, children) => <>
  <div class="content">
    {children}
  </div>
</>;
