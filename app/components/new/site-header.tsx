export const SiteHeader: JSX.Component<{ image: string }> = (attrs, children) => <>
  <link rel="stylesheet" href='/css/hero-image.css' />
  <link rel="stylesheet" href='/css/site-header.css' />

  <section id="page-hero" style={`background-image: url(${attrs.image});`}>
    <header id="site-header">
      <nav class="container">
        <a href='/'>Immaculata Library</a>
      </nav>
    </header>
  </section>
</>;
