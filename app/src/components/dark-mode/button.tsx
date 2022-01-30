import script from './script.js';
import { staticRouteFor } from "/src/core/static";

export const DarkModeButton: Component<{}> = (attrs, children) => <>
  <a href="#" class="dark-mode-toggle" data-lightmode="Light mode" data-darkmode="Dark mode"></a>
</>;

export const darkModeScript = staticRouteFor(script);
