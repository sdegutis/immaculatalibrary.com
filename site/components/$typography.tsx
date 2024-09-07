export function Typography(attrs: { deindent?: boolean, children: any, [key: string]: any }) {
  return <>
    <div class={`typography${attrs.deindent ? ' deindent' : ''}`} {...attrs}>
      <link rel="stylesheet" href='/css/components/typography.css' />
      {attrs.children}
    </div>
  </>;
}
