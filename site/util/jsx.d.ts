declare namespace JSX {

  type EventHandler<T extends Event> = (e: T) => any;
  type ElementAttrs = {

    [attr: string]: any;

    id?: string;
    class?: string;
    style?: string;
    title?: string;
    innerHTML?: string;
    hidden?: boolean;

    onclick?: string | EventHandler<MouseEvent>,
    onmousedown?: string | EventHandler<MouseEvent>,
    onmouseenter?: string | EventHandler<MouseEvent>,
    onmouseleave?: string | EventHandler<MouseEvent>,
    onmousemove?: string | EventHandler<MouseEvent>,
    onmouseover?: string | EventHandler<MouseEvent>,
    onmouseup?: string | EventHandler<MouseEvent>,

    oninput?: string | EventHandler<Event>,
    onchange?: string | EventHandler<Event>,

    onkeydown?: string | EventHandler<KeyboardEvent>,
    onkeyup?: string | EventHandler<KeyboardEvent>,

    onload?: string | EventHandler<Event>,

  };

  type HtmlAttrs = { lang?: string, children?: any };
  type AnchorAttrs = ElementAttrs & { href?: string; rel?: 'noopener'; target?: string };
  type MetaAttrs = { 'http-equiv'?: string; content?: string; name?: string; charset?: string; property?: string; };
  type LinkAttrs = { href?: string } & (
    { rel?: 'stylesheet' } |
    { rel?: 'icon'; type?: string; sizes?: string } |
    { rel?: 'apple-touch-icon'; sizes?: string } |
    { rel?: 'preload'; as?: 'font'; type?: 'font/woff'; crossorigin?: boolean } |
    { rel?: 'manifest' });
  type ScriptAttrs = ElementAttrs & { type?: 'module'; src?: string };
  type ImgAttrs = ElementAttrs & { src?: string; loading?: 'lazy', alt?: '' };
  type FormAttrs = ElementAttrs & { method?: string; action?: string };
  type ButtonAttrs = ElementAttrs & { type?: string };
  type InputAttrs = ElementAttrs & { type?: string; name?: string; value?: string; checked?: boolean; autofocus?: boolean; placeholder?: string; autocomplete?: string };
  type TextAreaAttrs = ElementAttrs & { name?: string; rows?: string };
  type SelectAttrs = ElementAttrs & { name?: string };
  type OptionAttrs = ElementAttrs & { value?: string; selected?: boolean };
  type OptgroupAttrs = ElementAttrs & { label?: string };
  type IFrameAttrs = ElementAttrs & { src?: string; allowfullscreen?: boolean | 'allowfullscreen' | ''; width?: string; height?: string; frameborder?: string; loading?: 'lazy'; allow?: string };
  type SvgAttrs = ElementAttrs & { viewBox?: string; height?: string };
  type PathAttrs = ElementAttrs & { d?: string };

  type IntrinsicElements = {

    [tag: string]: Record<string, any>;

    html: HtmlAttrs, head: ElementAttrs, body: ElementAttrs, title: {},
    meta: MetaAttrs, link: LinkAttrs, script: ScriptAttrs, iframe: IFrameAttrs, style: {},
    a: AnchorAttrs, b: ElementAttrs, i: ElementAttrs, span: ElementAttrs, em: ElementAttrs, small: ElementAttrs,
    img: ImgAttrs, hr: ElementAttrs, br: ElementAttrs,
    div: ElementAttrs, p: ElementAttrs, blockquote: ElementAttrs, li: ElementAttrs, ul: ElementAttrs, ol: ElementAttrs,
    header: ElementAttrs, footer: ElementAttrs, main: ElementAttrs, section: ElementAttrs, aside: ElementAttrs, nav: ElementAttrs, details: ElementAttrs, summary: ElementAttrs,
    form: FormAttrs, button: ButtonAttrs, input: InputAttrs, textarea: TextAreaAttrs, select: SelectAttrs, option: OptionAttrs, label: ElementAttrs, optgroup: OptgroupAttrs,
    h1: ElementAttrs, h2: ElementAttrs, h3: ElementAttrs, h4: ElementAttrs, h5: ElementAttrs, h6: ElementAttrs,
    svg: SvgAttrs, path: PathAttrs,

  };

  type ElementType =
    keyof IntrinsicElements |
    ((attrs: any) => Element | Node | string | null);

  interface ElementChildrenAttribute {
    children: any;
  }

}
