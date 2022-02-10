import { staticRouteFor } from "../../util/static";

export const Content: JSX.Component<{}> = (attrs, children) => <>
  <div class="content">
    <link rel="stylesheet" href={staticRouteFor(__dir.filesByName["content.css"]!)} />
    {children}
  </div>
</>;
