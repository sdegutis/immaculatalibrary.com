import { generated } from '../core/generated.js';

function makeManifest() {
  return JSON.stringify({
    name: "Immaculata Library",
    short_name: "Immaculata Library",
    icons: [
      { src: '/meta/android-chrome-192x192.png', sizes: "192x192", type: "image/png" },
      { src: '/meta/android-chrome-512x512.png', sizes: "512x512", type: "image/png" },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
  });
}

export const Meta: JSX.Component<{ favicons?: JSX.Element }> = (attrs) => <>
  {attrs.favicons ?? <>
    <link rel="apple-touch-icon" sizes="180x180" href='/meta/apple-touch-icon.png' />
    <link rel="icon" type="image/png" sizes="32x32" href='/meta/favicon-32x32.png' />
    <link rel="icon" type="image/png" sizes="16x16" href='/meta/favicon-16x16.png' />
  </>}
  <link rel="manifest" href={generated('manifest.json', makeManifest)} />
</>;
