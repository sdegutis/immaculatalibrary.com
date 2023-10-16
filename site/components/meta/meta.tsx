import { outfiles } from '../../core/main';
import image192 from './android-chrome-192x192.png';
import image512 from './android-chrome-512x512.png';
import apple from './apple-touch-icon.png';
import favicon16 from './favicon-16x16.png';
import favicon32 from './favicon-32x32.png';

const manifest = JSON.stringify({
  name: "Immaculata Library",
  short_name: "Immaculata Library",
  icons: [
    { src: image192.path, sizes: "192x192", type: "image/png" },
    { src: image512.path, sizes: "512x512", type: "image/png" },
  ],
  theme_color: "#ffffff",
  background_color: "#ffffff",
  display: "standalone",
});

function generated(name: string, content: string) {
  const fullpath = `/generated/${name}`;
  outfiles.set(fullpath, content);
  return fullpath;
}

export const Meta: JSX.Component = () => <>
  <link rel="apple-touch-icon" sizes="180x180" href={apple.path} />
  <link rel="icon" type="image/png" sizes="32x32" href={favicon32.path} />
  <link rel="icon" type="image/png" sizes="16x16" href={favicon16.path} />
  <link rel="manifest" href={generated('manifest.json', manifest)} />
</>;
