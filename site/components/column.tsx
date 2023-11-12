export const Spaced: JSX.Component = (attrs, children) => <>
  <div style='margin: 3em 0'>{children}</div>
</>;

export const CenteredColumn: JSX.Component = (attrs, children) => <>
  <link rel="stylesheet" href='/css/components/centered-column.css' />
  <Column>
    <section class='centered-page'>
      {children}
    </section>
  </Column>
</>;

export const SplitColumn: JSX.Component = (attrs, children) => <>
  <link rel="stylesheet" href='/css/components/split-column.css' />
  <Column>
    <section class='split-page'>
      {children}
    </section>
  </Column>
</>;

export const Column: JSX.Component = (attrs, children) => <>
  <div style='width:90%; max-width: 800px; margin: 0 auto'>
    {children}
  </div>
</>;
