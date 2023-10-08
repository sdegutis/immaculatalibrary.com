import { staticRouteFor } from '../../routes';
import script from './darkmode.js';

export const darkModeScript = staticRouteFor(script);

export const DarkModeButton: JSX.Component = (attrs, children) => <>
  <script src={darkModeScript} defer></script>
  <a href="#" class="dark-mode-toggle">Dark mode</a>
</>;
