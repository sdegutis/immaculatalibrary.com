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

export const SplitColumn: JSX.Component = (attrs, children) => <>
  <link rel="stylesheet" href='/css/components/column.css' />
  <div class="container">
    <section class='split-page'>
      {children}
    </section>
  </div>
</>;

export const Column: JSX.Component = (attrs, children) => <>
  <link rel="stylesheet" href='/css/components/column.css' />
  <div class="container">
    {children}
  </div>
</>;
