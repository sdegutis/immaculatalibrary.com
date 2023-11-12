export const Typography: JSX.Component<any> = (attrs, children) => <>
  <div class="typography" {...attrs}>
    <link rel="stylesheet" href='/css/components/typography.css' />
    {children}
  </div>
</>;
