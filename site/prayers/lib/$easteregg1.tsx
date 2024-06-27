import { LeftArrow, RightArrow } from "../../scripts/$arrows.js";

let buttonEasterEgg = false;

export function changeNavButtons() {
  buttonEasterEgg = !buttonEasterEgg;

  for (const button of document.querySelectorAll<HTMLButtonElement>('.page-changer')) {
    const side = button.classList.contains('side-left') ? 'left' : 'right';
    if (buttonEasterEgg) {
      button.textContent = `Hey, why don't you go to the page on the ${side} by clicking here?`;
    }
    else {
      button.replaceChildren(side === 'left' ? <LeftArrow /> : <RightArrow />);
    }
  }
}
