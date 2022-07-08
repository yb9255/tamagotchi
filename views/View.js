class View {
  constructor() {
    this.canvas = null;
    this.context = null;
    this.image = new Image();
    this.timer = null;
  }

  animate(draw, ms) {
    return new Promise((resolve) => {
      const animation = async () => {
        this.clear();

        const isComplete = draw(resolve);

        if (!isComplete) {
          this.timer = setTimeout(animation, ms);
        }
      };

      animation();
    });
  }

  setContext(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
  }

  cancelAnimation() {
    clearTimeout(this.timer);
  }

  loadImage(image, src) {
    image.src = src;

    return new Promise((resolve) => {
      image.onload = resolve;
    });
  }

  clear() {
    const context = this.context;
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}

export default View;
