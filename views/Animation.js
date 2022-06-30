class Animation {
  constructor() {}

  clear() {
    const context = this.context;
    context.clearRect(0, 0, 400, 400);
  }

  animate(draw, ms) {
    return new Promise((resolve) => {
      const animation = () => {
        this.clear();
        const isComplete = draw(resolve);

        if (!isComplete) {
          setTimeout(() => animation, ms);
        }
      };

      animation();
    });
  }
}

export default Animation;
