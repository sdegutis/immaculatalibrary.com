export const Spaced: JSX.Component = (attrs, children) => <>
  <div style='margin: 3em 0'>{children}</div>
</>;

export const Column: JSX.Component<{ centered?: boolean, split?: boolean }> = (attrs, children) => {
  const cssClass: string[] = [];
  if (attrs.centered) cssClass.push('centered-page');
  if (attrs.split) cssClass.push('split-page');
  return <>
    <link rel="stylesheet" href='/components/column/column.css' />
    <div class="container">
      <section class={cssClass.join(' ')}>
        {children}
      </section>
    </div>
  </>;
};
