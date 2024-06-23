export default 0;

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
