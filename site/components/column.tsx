export const Spaced: JSX.Component = (attrs, children) => <>
  <div style='margin: 3em 0'>{children}</div>
</>;

export const CenteredColumn: JSX.Component = (attrs, children) => <>
  <link rel="stylesheet" href='/css/components/column.css' />
  <div class="container">
    <section class='centered-page'>
      {children}
    </section>
  </div>
</>;

export const Column: JSX.Component<{ split?: boolean }> = (attrs, children) => {
  const cssClass: string[] = [];
  if (attrs.split) cssClass.push('split-page');
  return <>
    <link rel="stylesheet" href='/css/components/column.css' />
    <div class="container">
      <section class={cssClass.join(' ')}>
        {children}
      </section>
    </div>
  </>;
};
