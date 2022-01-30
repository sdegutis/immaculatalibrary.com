import { staticRouteFor } from "/src/core/static";

export const Container: Component<{ spaced?: boolean, split?: boolean }> = (attrs, children) => {
  const cssClass: string[] = [];
  if (attrs.spaced) cssClass.push('spaced-main-content');
  if (attrs.split) cssClass.push('split-page');
  return <>
    <link rel="stylesheet" href={staticRouteFor(__dir.filesByName["container.css"]!)} />
    <div class="container">
      <section class={cssClass.join(' ')}>
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
