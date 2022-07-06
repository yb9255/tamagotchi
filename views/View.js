class View {
  constructor(context) {
    this.context = context;
    this.animIsCanceled = false;
    this.image = new Image();
  }

  hide(element) {
    element.classList.add('hidden');
  }

  show(element) {
    element.classList.remove('hidden');
  }

  animate(draw, ms) {
    return new Promise((resolve) => {
      const animation = async () => {
        this.clear();

        if (this.animIsCanceled) {
          resolve();
          return;
        }

        const isComplete = draw(resolve);

        if (!isComplete) {
          await this.delay(ms);
          animation();
        }
      };

      animation();
    });
  }

  handleAnimationCancel(isCanceled) {
    this.animIsCanceled = isCanceled;
  }

  loadImage(image, src) {
    image.src = src;

    return new Promise((resolve) => {
      image.onload = resolve;
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
}

export default View;
