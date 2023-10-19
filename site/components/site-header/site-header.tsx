import { Navlinks } from "../navlinks";
import css from './site-header.css';

export const SiteHeader: JSX.Component<{ image: string }> = (attrs, children) => <>
  <link rel="stylesheet" href={css.path} />

  <header id="page-hero">
    <section style={`background-image: url(${attrs.image});`} />
    <div><Navlinks /></div>
  </header>
</>;
