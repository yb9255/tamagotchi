import View from './View.js';

class TamagotchiView extends View {
  constructor() {
    super();
  }

  drawTamagotchi(url) {
    const ctx = this.ctx;
    const image = new Image();

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    image.src = url;
    image.onload = () =>
      ctx.drawImage(image, 0, 0, 300, 300, 300, 300, 300, 300);
  }
}

export default new TamagotchiView();
