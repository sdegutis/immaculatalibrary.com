export default 0;

const dir = await getPico8Dir();


const text = await getFileText(dir, 'sarah/untitled.p8');

parsePico8File(text);

function parsePico8File(text: string) {
  const groups = new Map<string, string[]>();
  let group = '';

  for (const line of text.trim().split('\n')) {
    if (line.startsWith('__')) {
      group = line;
      groups.set(group, []);
    }
    else {
      groups.get(group)?.push(line);
    }
  }

  console.log(groups);
}



// const canvas = <canvas width='1400' height='900' /> as HTMLCanvasElement;
// document.body.append(canvas);


// console.log('hey')

// window.addEventListener('gamepadconnected', (e) => {
//   console.log('conn', e.gamepad.index);
// });

// window.addEventListener('gamepaddisconnected', (e) => {
//   console.log('disc', e.gamepad.index);
// });

// // setInterval(() => {
// //   const c = navigator.getGamepads()[0];
// //   console.log(navigator.getGamepads());

// //   if (!c) return;

// //   c.

// //   // // console.log((c as any).hapticActuators)

// //   // // (c as any).hapticActuators[0].pulse(1.0, 200);

// //   // c.vibrationActuator.playEffect("dual-rumble", {
// //   //   startDelay: 0,
// //   //   duration: 200,
// //   //   weakMagnitude: 1.0,
// //   //   strongMagnitude: 1.0,
// //   // });

// //   console.log(c.axes[0])
// // }, 500)




// Helpers



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

async function getPico8Dir() {
  const db = await getDb();
  let dir = await db.get();
  if (!dir) {
    dir = await getLocalDir();
    db.set(dir);
  }
  await dir.requestPermission();
  return dir;
}

async function getFileText(dir: FileSystemDirectoryHandle, path: string) {
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
