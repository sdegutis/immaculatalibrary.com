import { staticRouteFor } from "../../util/static";

export const Container: JSX.Component<{ spaced?: boolean, split?: boolean }> = (attrs, children) => {
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
