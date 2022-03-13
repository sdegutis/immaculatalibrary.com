import { homePage } from "../../routes/home/home";
import { staticRouteFor } from "../../util/static";

export const SiteHeader: JSX.Component<{}> = (attrs, children) => <>
  <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['site-header.css']!)} />
  <header id="site-header">
    <nav class="container">
      <a href={homePage.route}>Immaculata Library</a>
    </nav>
  </header>
</>;
