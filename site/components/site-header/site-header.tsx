import { Navlinks } from "../navlinks";
import css from './site-header.css';

export const SiteHeader: JSX.Component<{ title: string, image: string }> = (attrs, children) => <>
  <link rel="stylesheet" href={css.path} />

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
