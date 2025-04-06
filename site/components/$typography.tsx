export const Typography = ({ children, deindent, ...attrs }: { deindent?: boolean, children: any, [key: string]: any }) => <>
  <div class={`typography${deindent ? ' deindent' : ''}`} {...attrs}>
    <link rel="stylesheet" href='/css/components/typography.css' />
    {children}
  </div>
</>
