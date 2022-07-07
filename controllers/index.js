import MenuView from '../views/MenuView.js';

import { INIT, GROWTH, TICK_SECONDS, IDLING } from '../constants/gameState.js';

import {
  feedCallback,
  playCallback,
  sleepCallback,
  stateCallback,
} from '../utils/callbacks.js';

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

  handleEventsOverTime() {
    console.log('d');

    let currenTime = 0;
    let nextTimeforEvent = TICK_SECONDS;

    this.frameView.draw();

    const handleEventsOnTick = async () => {
      if (this.gameState.state === IDLING) {
        currenTime++;
      }
      console.log(currenTime);
      if (this.gameState.tiredness >= 10) {
        this.gameState.resetTirednessState();
        this.gameState.resetFunState();
        this.childView.handleAnimationCancel(true);
        await this.childView.delay(500);

        await this._handleFallingAsleep();
      }

      if (this.gameState.growth !== this.buttonState.state) {
        this._handleChangingPetPhases();
      }

      if (currenTime >= nextTimeforEvent) {
        this.gameState.setStatesByTime();
        nextTimeforEvent = currenTime + TICK_SECONDS;
      }

      requestAnimationFrame(handleEventsOnTick);
    };

    handleEventsOnTick();
  }

  async _handleFallingAsleep() {
    this.buttonState.removeListeners();
    this.childView.handleAnimationCancel(false);

    if (this.gameState.growth === GROWTH[1]) {
      const leftCallback = () => {
        this.menuView.drawMenu();
        this.gameState.setMenuState();
      };

      const middleCallback = () => {
        const callbacks = this._createMenuCallbacks(
          this,
          leftCallback,
          middleCallback,
          rightCallback,
        );
        this.menuView.selectMenu(callbacks);
      };

      const rightCallback = async () => {
        if (this.gameState.state === IDLING) return;

        this.menuView.removeMenu();
        this.gameState.setIdlingState();
        this.childView.drawIdlingChild();
      };

      await this.childView.drawSleepingChild();
      this.gameState.setIdlingState();
      this.childView.drawIdlingChild();

      this.buttonState.addListeners({
        leftCallback,
        middleCallback,
        rightCallback,
      });
    }
  }

  _handleChangingPetPhases() {
    if (this.gameState.growth === INIT) {
      this.buttonState.state = this.gameState.growth;
      const callback = this.gameState.startGame;

      this.buttonState.addListeners({
        leftCallback: callback,
        middleCallback: callback,
        rightCallback: callback,
      });
    } else if (this.gameState.growth === GROWTH[0]) {
      this._initEggPhase();
    } else if (this.gameState.growth === GROWTH[1]) {
      this._initChildPhase();
    } else if (this.gameState.growth === GROWTH[2]) {
      this.buttonState.state = this.gameState.growth;
    }
  }

  async _initEggPhase() {
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

  async _initChildPhase() {
    this.menuView = new MenuView(this.childView);
    this.buttonState.removeListeners();

    const leftCallback = () => {
      this.menuView.drawMenu();
      this.gameState.setMenuState();
    };

    const middleCallback = () => {
      const callbacks = this._createMenuCallbacks(
        this,
        leftCallback,
        middleCallback,
        rightCallback,
      );
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

    this.buttonState.addListeners({
      leftCallback,
      middleCallback,
      rightCallback,
    });

    this.childView.drawIdlingChild();
  }

  _createMenuCallbacks(
    controller,
    leftCallback,
    middleCallback,
    rightCallback,
  ) {
    return {
      async triggerFeedCallback() {
        controller.buttonState.removeListeners();
        await feedCallback(controller);

        controller.buttonState.addListeners({
          leftCallback,
          middleCallback,
          rightCallback,
        });
      },
      async triggerPlayCallback() {
        controller.buttonState.removeListeners();
        await playCallback(controller);

        controller.buttonState.addListeners({
          leftCallback,
          middleCallback,
          rightCallback,
        });
      },
      triggerStateCallback() {
        stateCallback(controller);
      },
      async triggerSleepCallback() {
        controller.buttonState.removeListeners();

        await sleepCallback(controller);

        controller.buttonState.addListeners({
          leftCallback,
          middleCallback,
          rightCallback,
        });
      },
    };
  }
}

export default Controller;
