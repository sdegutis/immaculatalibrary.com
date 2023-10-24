import { Navlinks } from "./navlinks.jsx";

export const SiteHeader: JSX.Component<{ title: string, image: string }> = (attrs, children) => <>
  <link rel="stylesheet" href='/css/components/site-header.css' />

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
