export type Component<T extends Record<string, any>> = (attrs: T, children: any) => string;
