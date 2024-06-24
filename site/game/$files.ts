interface Database<T> {
  get(): Promise<T>;
  set(t: T): void;
}

async function getDb() {
  return new Promise<Database<FileSystemDirectoryHandle>>(resolve => {
    const req = indexedDB.open('game', 1);
    const key = 'key';
    req.onupgradeneeded = () => {
      const db = req.result;
      db.createObjectStore('thing2');
    };
    req.onsuccess = () => {
      const db = req.result;

      const store = () => {
        const thing1 = db.transaction('thing2', 'readwrite');
        const store = thing1.objectStore('thing2');
        return store;
      };

      resolve({
        async get() {
          return new Promise(resolve => {
            const val = store().get(key);
            val.onsuccess = async () => resolve(val.result);
          });
        },
        set(t) {
          store().put(t, key);
        },
      });
    };
  });
}

async function getLocalDir() {
  return new Promise<FileSystemDirectoryHandle>(resolve => {
    const button = document.createElement('button');
    button.textContent = 'Load file';
    button.onclick = async e => {
      e.preventDefault();
      const dir = await window.showDirectoryPicker();
      button.remove();
      resolve(dir);
    };
    document.body.append(button);
  });
}

let cachedDir: FileSystemDirectoryHandle;
export async function getPico8Dir() {
  if (cachedDir) return cachedDir;

  const db = await getDb();
  let dir = await db.get();
  if (!dir) {
    dir = await getLocalDir();
    db.set(dir);
  }
  await dir.requestPermission();
  return cachedDir = dir;
}

export async function getFileText(dir: FileSystemDirectoryHandle, path: string) {
  const parts = path.split('/');

  let node = dir;
  while (parts.length > 1) {
    const subdir = parts.shift()!;
    node = await dir.getDirectoryHandle(subdir);
  }

  const fileHandle = await node.getFileHandle(parts[0]!);
  const text = await fileHandle.getFile().then(f => f.text());
  return text;
}
