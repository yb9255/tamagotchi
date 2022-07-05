import { INIT, GROWTH, TICK_SECONDS, IDLING } from '../constants/gameState.js';
import MenuView from '../views/MenuView.js';

class Controller {
  constructor(store, { frameView, eggView, childView, stateView, modalView }) {
    this.gameState = store.gameState;
    this.buttonState = store.buttonState;
    this.frameView = frameView;
    this.eggView = eggView;
    this.childView = childView;
    this.stateView = stateView;
    this.modalView = modalView;
    this.menuView = null;
  }

  handleChangingPetPhases() {
    if (this.gameState.growth === INIT) {
      this.buttonState.state = this.gameState.growth;
      const callback = this.gameState.startGame;

      this.buttonState.addListeners({
        leftCallback: callback,
        middleCallback: callback,
        rightCallback: callback,
      });
    } else if (this.gameState.growth === GROWTH[0]) {
      this.initEggPhase();
    } else if (this.gameState.growth === GROWTH[1]) {
      this.initChildPhase();
    } else if (this.gameState.growth === GROWTH[2]) {
      this.buttonState.state = this.gameState.growth;
    }
  }

  handleStatesOverTime() {
    let currenTime = 0;
    let nextTimeforEvent = TICK_SECONDS;

    this.frameView.draw();

    const handleEventsOnTick = () => {
      if (this.gameState.state === IDLING) {
        currenTime++;
      }

      if (this.gameState.growth !== this.buttonState.state) {
        this.handleChangingPetPhases();
      }

      if (currenTime >= nextTimeforEvent) {
        this.gameState.setStatesByTime();
        nextTimeforEvent = currenTime + TICK_SECONDS;
      }

      requestAnimationFrame(handleEventsOnTick);
    };

    handleEventsOnTick();
  }

  async initEggPhase() {
    const callback = async () => {
      this.gameState.subtractBirthCount();
      await this.eggView.drawShakedEgg();
    };

    this.buttonState.removeListeners();
    this.buttonState.state = this.gameState.growth;

    await this.eggView.drawStandingEgg();

    this.buttonState.addListeners({
      leftCallback: callback,
      middleCallback: callback,
      rightCallback: callback,
    });
  }

  async initChildPhase() {
    this.menuView = new MenuView(this.childView);
    this.buttonState.removeListeners();

    const leftCallback = () => {
      this.menuView.drawMenu();
      this.gameState.setMenuState();
    };

    const middleCallback = () => {
      const callbacks = ((controller) => ({
        async feedCallback() {
          controller.buttonState.removeListeners();

          if (controller.gameState.hunger < 2) {
            await controller.childView.drawDenyingChild();

            controller.gameState.setIdlingState();
            controller.childView.drawIdlingChild();

            controller.buttonState.addListeners({
              leftCallback,
              middleCallback,
              rightCallback,
            });

            return;
          }

          await controller.childView.drawEatingChild();

          controller.gameState.reduceHunger();
          controller.gameState.setIdlingState();
          controller.childView.drawIdlingChild();

          controller.buttonState.addListeners({
            leftCallback,
            middleCallback,
            rightCallback,
          });
        },
        async playCallback() {
          controller.buttonState.removeListeners();

          if (controller.gameState.fun > 8) {
            await controller.childView.drawDenyingChild();

            controller.gameState.setIdlingState();
            controller.childView.drawIdlingChild();

            controller.buttonState.addListeners({
              leftCallback,
              middleCallback,
              rightCallback,
            });
            return;
          }

          await controller.childView.drawPlayingChild();

          controller.gameState.makePetFun();
          controller.gameState.setIdlingState();
          controller.childView.drawIdlingChild();

          controller.buttonState.addListeners({
            leftCallback,
            middleCallback,
            rightCallback,
          });
        },
        stateCallback() {
          controller.menuView.removeMenu();

          controller.stateView.drawStateView(
            controller.gameState.fun,
            controller.gameState.hunger,
            controller.gameState.tiredness,
          );
        },
        sleepCallback() {},
      }))(this);

      this.menuView.selectMenu(callbacks);
    };

    const rightCallback = async () => {
      if (this.gameState.state === IDLING) return;

      this.menuView.removeMenu();
      this.gameState.setIdlingState();
      this.childView.drawIdlingChild();
    };

    this.modalView.hiddenModal();
    this.buttonState.state = this.gameState.growth;

    await this.eggView.drawBreakingEgg();
    this.childView.drawIdlingChild();

    this.buttonState.addListeners({
      leftCallback,
      middleCallback,
      rightCallback,
    });
  }
}

export default Controller;
