import { staticRouteFor } from "../../util/static";

export const inlineFontCss = `
@font-face { font-display: block; font-family: "David Libre"; font-weight: 400; src: url('${staticRouteFor(__dir.filesByName['DavidLibre-Regular.woff']!)}'); }
@font-face { font-display: block; font-family: "David Libre"; font-weight: 600; src: url('${staticRouteFor(__dir.filesByName['DavidLibre-Medium.woff']!)}'); }
@font-face { font-display: block; font-family: "David Libre"; font-weight: 700; src: url('${staticRouteFor(__dir.filesByName['DavidLibre-Bold.woff']!)}'); }

@font-face { font-display: block; font-family: "Martel"; font-weight: 200; src: url('${staticRouteFor(__dir.filesByName['Martel-ExtraLight.woff']!)}'); }
@font-face { font-display: block; font-family: "Martel"; font-weight: 300; src: url('${staticRouteFor(__dir.filesByName['Martel-Light.woff']!)}'); }
@font-face { font-display: block; font-family: "Martel"; font-weight: 400; src: url('${staticRouteFor(__dir.filesByName['Martel-Regular.woff']!)}'); }
@font-face { font-display: block; font-family: "Martel"; font-weight: 600; src: url('${staticRouteFor(__dir.filesByName['Martel-SemiBold.woff']!)}'); }
@font-face { font-display: block; font-family: "Martel"; font-weight: 700; src: url('${staticRouteFor(__dir.filesByName['Martel-Bold.woff']!)}'); }
@font-face { font-display: block; font-family: "Martel"; font-weight: 800; src: url('${staticRouteFor(__dir.filesByName['Martel-ExtraBold.woff']!)}'); }
@font-face { font-display: block; font-family: "Martel"; font-weight: 900; src: url('${staticRouteFor(__dir.filesByName['Martel-Black.woff']!)}'); }
`;
