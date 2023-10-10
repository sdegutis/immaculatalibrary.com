import script from './darkmode.js';

export const DarkModeButton: JSX.Component = (attrs, children) => <>
  <script src={script.path} defer></script>
  <a href="#" class="dark-mode-toggle">Dark mode</a>
</>;
