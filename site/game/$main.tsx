export default 0;

async function getLocalFile() {
  return new Promise(resolve => {
    const button = <input type='file'>Load file</input> as HTMLInputElement;
    button.oninput = async e => {
      const text = await button.files![0]!.text();
      button.remove();
      resolve(text);
    };
    document.body.append(button);
  });
}

const localFile = await getLocalFile();

console.log(localFile);

const canvas = <canvas width='1400' height='900' /> as HTMLCanvasElement;
document.body.append(canvas);


console.log('hey')

window.addEventListener('gamepadconnected', (e) => {
  console.log('conn', e.gamepad.index);
});

window.addEventListener('gamepaddisconnected', (e) => {
  console.log('disc', e.gamepad.index);
});

// setInterval(() => {
//   const c = navigator.getGamepads()[0];
//   console.log(navigator.getGamepads());

//   if (!c) return;

//   c.

//   // // console.log((c as any).hapticActuators)

//   // // (c as any).hapticActuators[0].pulse(1.0, 200);

//   // c.vibrationActuator.playEffect("dual-rumble", {
//   //   startDelay: 0,
//   //   duration: 200,
//   //   weakMagnitude: 1.0,
//   //   strongMagnitude: 1.0,
//   // });

//   console.log(c.axes[0])
// }, 500)
