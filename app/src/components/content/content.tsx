import { staticRouteFor } from "../../util/static";

export const Content: Component<{}> = (attrs, children) => <>
  <link rel="stylesheet" href={staticRouteFor(__dir.filesByName["content.css"]!)} />
  <div class="content">
    {children}
  </div>
</>;
