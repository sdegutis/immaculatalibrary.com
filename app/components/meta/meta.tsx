import { addRouteable } from "../../core/router";
import { HashedStaticFile, staticRouteFor } from "../../util/static";

const webmanifest = JSON.stringify({
  name: "Immaculata Library",
  short_name: "Immaculata Library",
  icons: [
    {
      src: staticRouteFor(__dir.filesByName["android-chrome-192x192.png"]!),
      sizes: "192x192",
      type: "image/png"
    },
    {
      src: staticRouteFor(__dir.filesByName["android-chrome-512x512.png"]!),
      sizes: "512x512",
      type: "image/png"
    }
  ],
  theme_color: "#ffffff",
  background_color: "#ffffff",
  display: "standalone",
});

const manifestRoute = new HashedStaticFile(Buffer.from(webmanifest), 'site.webmanifest');
addRouteable(manifestRoute);

export const Meta: JSX.Component<{}> = () => <>
  <link rel="apple-touch-icon" sizes="180x180" href={staticRouteFor(__dir.filesByName["apple-touch-icon.png"]!)} />
  <link rel="icon" type="image/png" sizes="32x32" href={staticRouteFor(__dir.filesByName["favicon-32x32.png"]!)} />
  <link rel="icon" type="image/png" sizes="16x16" href={staticRouteFor(__dir.filesByName["favicon-16x16.png"]!)} />
  <link rel="manifest" href={manifestRoute.route} />
</>;
