export const Html: JSX.Component<{
  imagePath?: string,
  title?: string,
  description?: string | undefined,
}> = (attrs, children) => <>
  {'<!DOCTYPE html>'}
  <html lang="en">

    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <title>{attrs.title && `${attrs.title} - `}Immaculata Library</title>
      <meta property="og:title" content={'Immaculata Library' + (attrs.title ? `: ${attrs.title}` : '')} />
      <meta property="og:locale" content="en_US" />
      {attrs.imagePath && <meta property="og:image" content={`https://www.immaculatalibrary.com${attrs.imagePath}`} />}
      <meta name="description" content={attrs.description ?? "Free Digital Catholic Books"} />

      <link rel="stylesheet" href='/css/base.css' />
      <link rel="stylesheet" href='/css/fonts.css' />

      <link rel="apple-touch-icon" sizes="180x180" href="/meta/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/meta/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/meta/favicon-16x16.png" />
      <link rel="manifest" href='/meta/site.webmanifest' />
    </head>

    {children}
  </html>
</>;
