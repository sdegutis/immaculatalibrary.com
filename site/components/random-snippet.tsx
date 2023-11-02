export const RandomBookSnippet: JSX.Component = (attrs, children) => {
  const id = 'random-book-snippet-button';
  return <>
    <a href='#' id={id}>{children}</a>
    <script type='module' src='/scripts/randomsnippet.js' />
    <script type='module'>{`
      import {goToRandomSnippet} from '/scripts/randomsnippet.js';
      document.getElementById("${id}").onclick = goToRandomSnippet;
    `}</script>
  </>;
};
