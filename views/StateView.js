class StateView {
  constructor(fun, hunger, tiredness) {
    this.fun = fun;
    this.hunger = hunger;
    this.tiredness = tiredness;
    this.funStateImage = document.querySelector('.fun-state');
    this.hungerStateImage = document.querySelector('.hunger-state');
    this.tirednessStateImage = document.querySelector('.tiredness-state');
  }

  openStateMenu() {}

  drawFunState() {}

  drawHungerState() {}

  drawTirednessState() {}
}

export default new StateView();
