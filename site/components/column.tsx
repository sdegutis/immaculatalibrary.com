export const Spaced: JSX.Component<{ children: any }> = (attrs) => <>
  <div class='spaced' style='margin: 3em 0'>{attrs.children}</div>
</>;

export const CenteredColumn: JSX.Component<{ children: any }> = (attrs) => <>
  <link rel="stylesheet" href='/css/components/centered-column.css' />
  <Column>
    <section class='centered-page'>
      {attrs.children}
    </section>
  </Column>
</>;

export const SplitColumn: JSX.Component<{ wide?: boolean, children: any }> = (attrs) => <>
  <link rel="stylesheet" href='/css/components/split-column.css' />
  <Column wide={attrs.wide ?? false}>
    <section class={`split-page ${attrs.wide ? 'wide' : ''}`}>
      {attrs.children}
    </section>
  </Column>
</>;

export const Column: JSX.Component<{ wide?: boolean, children: any }> = (attrs) => <>
  <div style={`width:90%; max-width: ${attrs.wide ? '1000px' : '800px'}; margin: 0 auto`}>
    {attrs.children}
  </div>
</>;
