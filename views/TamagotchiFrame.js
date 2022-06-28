import View from './View.js';

class TamagotchiFrameView extends View {
  constructor() {
    super();
  }

  drawTamagotchiEgg() {
    const ctx = this.ctx;

    ctx.fillStyle = '#e4358c';
    ctx.beginPath();
    ctx.ellipse(450, 450, 350, 435, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  drawTamagotchiBackground() {
    const ctx = this.ctx;

    ctx.fillStyle = 'yellow';

    ctx.beginPath();
    ctx.moveTo(230, 230);
    ctx.lineTo(320, 230);
    ctx.lineTo(370, 215);
    ctx.lineTo(510, 230);
    ctx.lineTo(590, 220);
    ctx.lineTo(690, 240);
    ctx.lineTo(680, 320);
    ctx.lineTo(695, 410);
    ctx.lineTo(680, 480);
    ctx.lineTo(675, 680);
    ctx.lineTo(545, 663);
    ctx.lineTo(445, 680);
    ctx.lineTo(355, 671);
    ctx.lineTo(293, 680);
    ctx.lineTo(221, 660);
    ctx.lineTo(230, 603);
    ctx.lineTo(219, 492);
    ctx.lineTo(230, 355);
    ctx.lineTo(215, 270);
    ctx.lineTo(230, 230);
    ctx.fill();
  }

  drawTamagotchiTablet() {
    const ctx = this.ctx;

    ctx.fillStyle = '#eff';
    ctx.beginPath();
    ctx.moveTo(255, 245);
    ctx.lineTo(645, 245);
    ctx.arcTo(655, 245, 655, 255, 10);
    ctx.lineTo(655, 645);
    ctx.arcTo(655, 655, 645, 655, 10);
    ctx.lineTo(255, 655);
    ctx.arcTo(245, 655, 245, 645, 10);
    ctx.lineTo(245, 255);
    ctx.arcTo(245, 245, 255, 245, 10);
    ctx.fill();
  }
}

export default new TamagotchiFrameView();
