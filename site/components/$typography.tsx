export const Typography = (attrs: { deindent?: boolean, children: any, [key: string]: any }) => <>
  <div class={`typography${attrs.deindent ? ' deindent' : ''}`} {...attrs}>
    <link rel="stylesheet" href='/css/components/typography.css' />
    {attrs.children}
  </div>
</>;
