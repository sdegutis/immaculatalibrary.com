import { staticRouteFor } from "/src/core/static";

export const HeroImage: Component<{ image: string }> = (attrs, children) => <>
  <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['hero-image.css']!)} />
  <section id="page-hero" style={`background-image: url(${attrs.image});`}></section>
</>;
