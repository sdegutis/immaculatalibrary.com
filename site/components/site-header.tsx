import { Navlinks } from "./navlinks";

export const SiteHeader: JSX.Component<{ image: string }> = (attrs, children) => <>
  <link rel="stylesheet" href='/css/site-header.css' />

  <header id="page-hero">
    <section style={`background-image: url(${attrs.image});`} />
    <div><Navlinks /></div>
  </header>
</>;
