export const Spaced = (attrs: { children: any }) => <>
  <div class='spaced' style='margin: 3em 0'>{attrs.children}</div>
</>

export const CenteredColumn = (attrs: { children: any }) => <>
  <link rel="stylesheet" href='/css/components/centered-column.css' />
  <Column>
    <section class='centered-page'>
      {attrs.children}
    </section>
  </Column>
</>

export const SplitColumn = (attrs: { wide?: boolean, children: any }) => <>
  <link rel="stylesheet" href='/css/components/split-column.css' />
  <Column wide={attrs.wide ?? false}>
    <section class={`split-page ${attrs.wide ? 'wide' : ''}`}>
      {attrs.children}
    </section>
  </Column>
</>

export const Column = (attrs: { wide?: boolean, children: any }) => <>
  <div style={`width:90%; max-width: ${attrs.wide ? '1000px' : '800px'}; margin: 0 auto`}>
    {attrs.children}
  </div>
</>
