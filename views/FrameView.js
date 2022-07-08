import View from './View.js';

class FrameView extends View {
  constructor() {
    super();
  }

  draw() {
    this.clear();
    this.#drawTamagotchiEgg();
    this.#drawTamagotchiBackground();
  }

  #drawTamagotchiEgg() {
    const context = this.context;

    context.fillStyle = '#e4358c';
    context.beginPath();
    context.ellipse(450, 450, 350, 435, 0, 0, Math.PI * 2);
    context.fill();
  }

  #drawTamagotchiBackground() {
    const context = this.context;

    context.fillStyle = 'yellow';
    context.beginPath();
    context.moveTo(230, 230);
    context.lineTo(320, 230);
    context.lineTo(370, 215);
    context.lineTo(510, 230);
    context.lineTo(590, 220);
    context.lineTo(690, 240);
    context.lineTo(680, 320);
    context.lineTo(695, 410);
    context.lineTo(680, 480);
    context.lineTo(675, 680);
    context.lineTo(545, 663);
    context.lineTo(445, 680);
    context.lineTo(355, 671);
    context.lineTo(293, 680);
    context.lineTo(221, 660);
    context.lineTo(230, 603);
    context.lineTo(219, 492);
    context.lineTo(230, 355);
    context.lineTo(215, 270);
    context.lineTo(230, 230);
    context.fill();
  }
}

export default FrameView;
