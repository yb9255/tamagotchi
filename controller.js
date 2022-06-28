import tamagotchiFrame from "./views/TamagotchiFrame.js";
import tamagotchi from "./views/Tamagotchi.js";

function draw() {
  if (document.querySelector("#canvas").getContext) {
    tamagotchiFrame.drawTamagotchiEgg();
    tamagotchiFrame.drawTamagotchiBackground();
    tamagotchiFrame.drawTamagotchiTablet();
    tamagotchi.drawTamagotchi("./image/lv1-stand.png");
  }
}

function init() {
  draw();
}

init();
