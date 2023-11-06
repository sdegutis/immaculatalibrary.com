import { LoadingLine } from "../shared/loading.js";

export const PaginatorLoading = () => <p style='display:flex; gap:3em; align-items:center'>
  <LoadingLine width='2em' height='2.4em' />
  <LoadingLine width='3em' height='1em' />
  <LoadingLine width='2em' height='2.4em' />
</p>;
