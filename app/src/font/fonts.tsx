import { addRouteable } from "../core/router";
import { HashedStaticFile, staticRouteFor } from "../core/static";

const buffer = Buffer.from(`
@font-face { font-family: "David Libre"; font-weight: 400; src: url('${staticRouteFor(__dir.filesByName['DavidLibre-Regular.ttf']!)}'); }
@font-face { font-family: "David Libre"; font-weight: 600; src: url('${staticRouteFor(__dir.filesByName['DavidLibre-Medium.ttf']!)}'); }
@font-face { font-family: "David Libre"; font-weight: 700; src: url('${staticRouteFor(__dir.filesByName['DavidLibre-Bold.ttf']!)}'); }

@font-face { font-family: "Martel"; font-weight: 200; src: url('${staticRouteFor(__dir.filesByName['Martel-ExtraLight.ttf']!)}'); }
@font-face { font-family: "Martel"; font-weight: 300; src: url('${staticRouteFor(__dir.filesByName['Martel-Light.ttf']!)}'); }
@font-face { font-family: "Martel"; font-weight: 400; src: url('${staticRouteFor(__dir.filesByName['Martel-Regular.ttf']!)}'); }
@font-face { font-family: "Martel"; font-weight: 600; src: url('${staticRouteFor(__dir.filesByName['Martel-SemiBold.ttf']!)}'); }
@font-face { font-family: "Martel"; font-weight: 700; src: url('${staticRouteFor(__dir.filesByName['Martel-Bold.ttf']!)}'); }
@font-face { font-family: "Martel"; font-weight: 800; src: url('${staticRouteFor(__dir.filesByName['Martel-ExtraBold.ttf']!)}'); }
@font-face { font-family: "Martel"; font-weight: 900; src: url('${staticRouteFor(__dir.filesByName['Martel-Black.ttf']!)}'); }
`);

const fontsStaticFile = new HashedStaticFile(buffer, 'fonts.css');
addRouteable(fontsStaticFile);

export const fontsCssRoute = fontsStaticFile.route;
