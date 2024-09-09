import { NavPage, Navlinks } from "./navlinks.js";

export const SiteHeader = (attrs: { title: string | JSX.Element, image: string, page: NavPage }) => <>
  <link rel="stylesheet" href='/css/components/site-header.css' />

  <header id="page-hero">
    <section style={`background-image: url(${attrs.image});`} />
    <div>
      <Navlinks page={attrs.page} />
    </div>
    <div style='text-align:center'>
      <section>
        {(typeof attrs.title === 'string')
          ? <h1>{attrs.title}</h1>
          : attrs.title}
      </section>
    </div>
  </header>
</>;
