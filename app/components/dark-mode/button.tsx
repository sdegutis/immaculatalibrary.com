import { staticRouteFor } from "../../util/static";
import script from './script.js';

export const DarkModeScript: JSX.Component<{}> = (attrs, children) => <>
  <script src={staticRouteFor(script)} defer></script>
</>;

export const DarkModeButton: JSX.Component<{}> = (attrs, children) => <>
  <DarkModeScript />
  <a href="#" class="dark-mode-toggle">Dark mode</a>
</>;
