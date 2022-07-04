class ImageView {
  constructor() {
    this.context = document.querySelector('#tablet').getContext('2d');
    this.isCanceled = false;
    this.timer = null;
    this.image = new Image();
  }

  animate(draw, ms) {
    return new Promise((resolve) => {
      const animation = async () => {
        this.clear();
        if (this.isCanceled) return;

        const isComplete = draw(resolve);

        if (!isComplete) {
          await this.delay(ms);
          animation();
        }
      };

      animation();
    });
  }

  cancelAnimation(isCanceled) {
    this.isCanceled = isCanceled;
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

export default ImageView;
