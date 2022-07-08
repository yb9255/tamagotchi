import GameState from '../models/GameState.js';
import ButtonState from '../models/ButtonState.js';
import EggView from '../views/EggView.js';
import ChildView from '../views/ChildView.js';
import StateView from '../views/StateView.js';
import ModalView from '../views/ModalView.js';
import FrameView from '../views/FrameView.js';
import MenuView from '../views/MenuView.js';
import Router from '../routes/Router.js';
import { INIT, GROWTH, TICK_SECONDS, IDLING } from '../constants/gameState.js';

import {
  feedCallback,
  playCallback,
  sleepCallback,
  stateCallback,
} from '../utils/callbacks.js';
import { observeRoot } from '../utils/observer.js';

import mainStyles from '../css/main.css';

class Controller {
  constructor() {
    this.router = new Router();
    this.gameState = new GameState();
    this.buttonState = new ButtonState();
    this.frameView = new FrameView();
    this.eggView = new EggView();
    this.childView = new ChildView();
    this.stateView = new StateView();
    this.modalView = new ModalView();
    this.menuView = new MenuView();
    this.currentMainView = null;

    this.router.init();
  }

  handleEventsOverTime() {
    let currenTime = 0;
    let nextTimeforEvent = TICK_SECONDS;

    if (this.router.currentRoute === '/') {
      this.handleMainPage();
    }

    observeRoot(this);

    const handleEventsOnTick = async () => {
      if (this.router.currentRoute === '/') {
        if (this.gameState.state === IDLING) {
          currenTime++;
        }
      }

      if (this.gameState.tiredness >= 10) {
        this.gameState.resetTirednessState();
        this.gameState.resetFunState();
        this.childView.cancelAnimation();

        await this.#handleFallingAsleep();
      }

      if (this.gameState.growth !== this.buttonState.state) {
        this.#handleChangingPetPhases();
      }

      if (currenTime >= nextTimeforEvent) {
        this.gameState.setStatesByTime();
        nextTimeforEvent = currenTime + TICK_SECONDS;
      }

      requestAnimationFrame(handleEventsOnTick);
    };

    handleEventsOnTick();
  }

  handleMainPage() {
    if (this.currentMainView) {
      this.currentMainView.cancelAnimation();
    }

    const leftBtn = document.querySelector(`.${mainStyles['btn--1']}`);
    const middleBtn = document.querySelector(`.${mainStyles['btn--2']}`);
    const rightBtn = document.querySelector(`.${mainStyles['btn--3']}`);
    console.log(rightBtn);
    const frame = document.querySelector(`#${mainStyles.frame}`);
    const tablet = document.querySelector(`#${mainStyles.tablet}`);
    const modal = document.querySelector(`.${mainStyles.modal}`);

    this.buttonState.setButtonElements(leftBtn, middleBtn, rightBtn);
    this.frameView.setContext(frame);
    this.eggView.setContext(tablet);
    this.childView.setContext(tablet);
    this.stateView.setContext(tablet);
    this.modalView.setModalElement(modal);

    this.frameView.draw();
    this.#handleChangingPetPhases();
  }

  async #handleFallingAsleep() {
    this.buttonState.removeListeners();

    if (this.gameState.growth === GROWTH[1]) {
      const leftCallback = () => {
        this.menuView.drawMenu();
        this.gameState.setMenuState();
      };

      const middleCallback = () => {
        const callbacks = this.#createMenuCallbacks(
          this,
          leftCallback,
          middleCallback,
          rightCallback,
        );
        this.menuView.selectMenu(callbacks, this.gameState);
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

  #handleChangingPetPhases() {
    if (this.gameState.growth === INIT) {
      this.buttonState.state = this.gameState.growth;
      const callback = this.gameState.startGame;

      this.buttonState.addListeners({
        leftCallback: callback,
        middleCallback: callback,
        rightCallback: callback,
      });
    } else if (this.gameState.growth === GROWTH[0]) {
      this.currentMainView = this.eggView;
      this.#initEggPhase();
    } else if (this.gameState.growth === GROWTH[1]) {
      this.currentMainView = this.childView;
      this.#initChildPhase();
    } else if (this.gameState.growth === GROWTH[2]) {
      this.buttonState.state = this.gameState.growth;
    }
  }

  async #initEggPhase() {
    const callback = async () => {
      if (this.gameState.birthCount > 0) {
        await this.eggView.drawShakedEgg();
        this.gameState.subtractBirthCount(this.eggView.drawBreakingEgg);
      }
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

  async #initChildPhase() {
    this.modalView.hiddenModal();
    this.buttonState.state = this.gameState.growth;
    this.buttonState.removeListeners();

    const menu = document.querySelector(`.${mainStyles.menu}`);
    const menuItems = menu.querySelectorAll(`.${mainStyles['menu-item']}`);

    this.menuView.setCurrentMainView(this.currentMainView);
    this.menuView.setMenuElements(menu, menuItems);

    const leftCallback = () => {
      this.menuView.drawMenu();
      this.gameState.setMenuState();
    };

    const middleCallback = () => {
      const callbacks = this.#createMenuCallbacks(
        this,
        leftCallback,
        middleCallback,
        rightCallback,
      );

      this.menuView.selectMenu(callbacks, this.gameState);
    };

    const rightCallback = async () => {
      if (this.gameState.state === IDLING) return;

      this.menuView.removeMenu();
      this.gameState.setIdlingState();
      this.childView.drawIdlingChild();
    };

    this.buttonState.addListeners({
      leftCallback,
      middleCallback,
      rightCallback,
    });

    this.childView.drawIdlingChild();
  }

  #createMenuCallbacks(
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
