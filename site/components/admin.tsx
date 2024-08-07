import { isDev } from "../util/_helpers.js";

export function Admin(attrs: { tag?: string }, children: any) {
  if (!isDev) return null;
  const Tag = attrs.tag ?? 'div';
  return <Tag class='admin'>{children}</Tag>;
}
