declare const __dir: Dir;
declare const __file: File;

declare class Dir {
  files: { [name: string]: File };
  subdirs: { [name: string]: Dir };
  entries: { [name: string]: File | Dir };
  path: string;
  name: string;
  parent: Dir | null;
}

declare class File {
  path: string;
  name: string;
  parent: Dir | null;
  buffer: Buffer;
}
