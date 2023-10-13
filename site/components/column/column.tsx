import columnCss from './column.css';

export const Spaced: JSX.Component = (attrs, children) => <>
  <div style='margin: 3em 0'>{children}</div>
</>;

export const Column: JSX.Component<{ centered?: boolean, spaced?: boolean, split?: boolean }> = (attrs, children) => {
  const cssClass: string[] = [];
  if (attrs.centered) cssClass.push('centered-page');
  if (attrs.split) cssClass.push('split-page');
  const ultimately = <>
    <link rel="stylesheet" href={columnCss.path} />
    <div class="container">
      <section class={cssClass.join(' ')}>
        {children}
      </section>
    </div>
  </>;
  return (attrs.spaced
    ? <Spaced>{ultimately}</Spaced>
    : ultimately
  );
};
