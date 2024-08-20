export const isDev = !!process.env['DEV'];

export function Admin(attrs: { tag?: string }, children: any) {
  if (!isDev) return null;
  const Tag = attrs.tag ?? 'div';
  return <Tag class='admin'>{children}</Tag>;
}
