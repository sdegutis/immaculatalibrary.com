declare const __dir: Dir;

declare class Dir {

  public files: { [name: string]: DirFile };
  public subdirs: { [name: string]: Dir };
  public entries: { [name: string]: DirFile | Dir };
  public path: string;
  public name: string;
  public parent: Dir | null;

}

declare class DirFile {

  public path: string;
  public name: string;
  public parent: Dir | null;
  public buffer: Buffer;

}
