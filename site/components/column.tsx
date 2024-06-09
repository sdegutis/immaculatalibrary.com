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

export const ThreeColumn: JSX.Component = (attrs, children) => <>
  <link rel="stylesheet" href='/css/components/three-column.css' />
  <Column wide>
    <section class='three-split'>
      {children}
    </section>
  </Column>
</>;

export const Column: JSX.Component<{ wide?: boolean }> = (attrs, children) => <>
  <div style={`width:90%; max-width: ${attrs.wide ? '1200px' : '800px'}; margin: 0 auto`}>
    {children}
  </div>
</>;
