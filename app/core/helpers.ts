import { renderElement } from "./jsx";

export function htmlResponse(html: JSX.Element): RouteOutput {
  return {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
    body: renderElement(html),
  };
}

export function redirectResponse(url: string): RouteOutput {
  return { status: 302, headers: { 'Location': url } };
}
