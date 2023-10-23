import { Navlinks } from "../navlinks.js";

export const SiteHeader: JSX.Component<{ title: string, image: string }> = (attrs, children) => <>
  <link rel="stylesheet" href='/components/site-header/site-header.css' />

  <header id="page-hero">
    <section style={`background-image: url(${attrs.image});`} />
    <div>
      <Navlinks />
    </div>
    <div style='text-align:center'>
      <section>
        <h1>{attrs.title}</h1>
      </section>
    </div>
  </header>
</>;
