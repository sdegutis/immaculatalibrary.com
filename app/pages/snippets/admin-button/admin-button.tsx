import { staticRouteFor } from "../../../util/static";

export const AdminButton: Component<any> = (attrs, children) => <>
  <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['admin-button.css']!)} />
  <a class='admin-button' {...attrs}>{children}</a>
</>;
