class Animatable {
  constructor() {
    this.context = document.querySelector('#tablet').getContext('2d');
    this.image = new Image();
    this.pending = [];
  }

  animate(draw, ms, nextAnimation = null) {
    return new Promise((resolve) => {
      const animation = async () => {
        this.clear();
        const isComplete = draw(resolve);

        if (!isComplete) {
          await this.delay(ms);
          animation();
        }

        if (isComplete && nextAnimation) {
          await this.delay(ms);
          nextAnimation();
        }
      };

      animation();
    });
  }

  async handleEvent(idle) {
    const event = this.pending.shift();
    if (typeof event !== 'function') return;

    await event();
    idle();
  }

  clear() {
    const context = this.context;
    context.clearRect(0, 0, 400, 400);
  }

  delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}

export default Animatable;
