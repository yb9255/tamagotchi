class View {
  constructor() {
    this.canvas = null;
    this.context = null;
    this.image = new Image();
    this.timer = null;

    this.setContext = this.setContext.bind(this);
    this.animate = this.animate.bind(this);
    this.cancelAnimation = this.cancelAnimation.bind(this);
    this.clear = this.clear.bind(this);
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
}

export default View;
