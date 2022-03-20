import { staticRouteFor } from "../../util/static";
import script from './script.js';

export const DarkModeButton: JSX.Component<{}> = (attrs, children) => <>
  <script src={staticRouteFor(script)} defer></script>
  <a href="#" class="dark-mode-toggle">Dark mode</a>
</>;
