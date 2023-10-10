import script from './darkmode.js!path';

export const DarkModeButton: JSX.Component = (attrs, children) => <>
  <script src={script} defer></script>
  <a href="#" class="dark-mode-toggle">Dark mode</a>
</>;
