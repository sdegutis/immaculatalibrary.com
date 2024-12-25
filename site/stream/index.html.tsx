import { jsxToString } from "@imlib/core";
import { EmptyPage } from "../components/page.js";

export default jsxToString(
  <EmptyPage>
    <script src='stream.js' type='module' />
    <link rel="stylesheet" href="stream.css" />
    <canvas width='1186' height='2108' />
  </EmptyPage>
);
