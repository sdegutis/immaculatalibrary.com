import { staticRouteFor } from '../../routes';
import script from './formatdate.js';

export const FormatDate: JSX.Component<{}> = (attrs, children) => {
  return <>
    <script type="module" src={staticRouteFor(script)}></script>
    <span class='format-date'>{children}</span>
  </>;
};
