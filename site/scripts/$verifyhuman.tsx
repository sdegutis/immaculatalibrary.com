export default 0;

class VerifyHuman {

  #quitting = false;
  #screen = <div style='position:fixed;top:0;left:0;bottom:0;right:0;z-index:99;transition:background-color 1s ease' /> as HTMLDivElement;
  #wholeArea = <p id='verifyhuman' /> as HTMLParagraphElement;
  #wordArea = <span /> as HTMLSpanElement;
  #cursorArea = <span /> as HTMLSpanElement;

  async run(phrases: string[]) {
    const restore = this.#attach();
    await this.#type(phrases);
    restore();
  }

  #attach() {
    this.#screen.onclick = (e) => this.#quitting = true;
    this.#wholeArea.append(this.#wordArea, this.#cursorArea);

    document.body.children[0]!.append(this.#screen, this.#wholeArea);
    setTimeout(() => this.#screen.style.backgroundColor = '#000c', 100);

    const documentOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = documentOverflow;

      this.#screen.style.backgroundColor = 'unset';
      setTimeout(() => this.#screen.remove(), 1100);

      this.#wholeArea.classList.add('disappearing');
      setTimeout(() => this.#wholeArea.remove(), 450);
    };
  }

  async #type(phrases: string[]) {
    for (const phrase of phrases) {
      for (let i = 0; i <= phrase.length; i++) {
        if (phrase[i] === '\r') {
          await this.#wait(0.33);
          if (this.#quitting) return;
        }
        else {
          this.#wordArea.textContent = phrase.slice(0, i + 1);
          await this.#sleep(0.05);
          if (this.#quitting) return;
        }
      }

      for (let i = phrase.length - 1; i >= 0; i--) {
        this.#wordArea.textContent = phrase.slice(0, i);
        await this.#sleep(0.01);
        if (this.#quitting) return;
      }
    }
  }

  async #wait(sec: number) {
    this.#cursorArea.classList.add('pulsing');
    await this.#sleep(sec);
    this.#cursorArea.classList.remove('pulsing');
  }

  async #sleep(sec: number) {
    const startedAt = this.#getCurrentTime();
    const endTime = startedAt + (sec * 1000);

    return new Promise<void>(resolve => {
      const checkIfDone = () => {
        const currentTime = this.#getCurrentTime();
        if (this.#quitting || currentTime >= endTime) {
          resolve();
        }
        else {
          setTimeout(checkIfDone, 10)
        };
      };
      checkIfDone();
    });
  }

  #getCurrentTime() {
    return +document.timeline.currentTime!;
  }

}

async function checkIfHuman() {
  const v = new VerifyHuman();
  await v.run([
    `Hello.\r\r\r\nAre you human?\r\r\r\r`,
    `It's nothing personal you know\r\r\r, we just have to check...\r\r\r\r\r`,
    `No offense or anything...\r\r\r not like you seem like a robot.\r.\r.\r.\r.\r.\r.\r.\r.\r.\r.\r.\r.\r.\r.\r.\r.\r.\r.\r`,
    `Yeah that got awkward real quick.\r\r\r I mean it wouldn't have if you were a robot, but the fact that you're a human kind of changes everything, doesn't it?\r\r\r\r`,
  ]);
}

if (Math.random() < 0.1) {
  checkIfHuman();
}
