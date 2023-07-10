import { renderElement } from "./jsx";

export function htmlResponse(html: JSX.Element): RouteOutput {
  return {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
    body: renderElement(html),
  };
}

export function redirectResponse(url: string, status = 302): RouteOutput {
  return { status, headers: { 'Location': url } };
}
