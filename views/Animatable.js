class Animatable {
  constructor() {
    this.context = document.querySelector('#tablet').getContext('2d');
    this.image = new Image();
    this.pending = [];
  }

  animate(draw, ms) {
    return new Promise((resolve) => {
      const animation = async () => {
        this.clear();
        const isComplete = draw(resolve);

        if (!isComplete) {
          await this.delay(ms);
          animation();
        }
      };

      animation();
    });
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

  async handleEvent(idle) {
    const event = this.pending.shift();
    if (typeof event !== 'function') return;

    await event();
    idle();
  }
}

export default Animatable;
