import {
  STATE,
  GROWTH,
  TICK_SECONDS,
  MAX_TIREDNESS,
  MAX_EXP,
  MIN_BIRTH_COUNT,
  MIN_FUN_FOR_HAPPINESS,
  MAX_ALLOWED_HUNGER_FOR_HAPPINESS,
  MAX_ALLOWED_TIRDNESS_FOR_HAPPINESS,
  MAX_ALLOWED_FUN_FOR_ANGRY,
  MIN_HUNGER_FOR_ANGRY,
  MIN_TIREDNESS_FOR_ANGRY,
} from '../constants/gameState.js';

import {
  feedChildCallback,
  feedAdultCallback,
  playChildCallback,
  playAdultCallback,
  sleepChildCallback,
  sleepAdultCallback,
  stateCallback,
} from '../utils/callbacks.js';

import mainStyles from '../css/main.css';

class Controller {
  constructor(states, views, subControllers, observers) {
    this.router = subControllers.router;
    this.audioController = subControllers.audioController;
    this.validationController = subControllers.validationController;
    this.userInformationController = subControllers.userInformationController;
    this.userProfileController = subControllers.userProfileController;
    this.gameState = states.gameState;
    this.buttonState = states.buttonState;
    this.userState = states.userState;
    this.frameView = views.frameView;
    this.eggView = views.eggView;
    this.childView = views.childView;
    this.adultView = views.adultView;
    this.stateView = views.stateView;
    this.mainModalView = views.mainModalView;
    this.helpModalView = views.helpModalView;
    this.profileView = views.profileView;
    this.menuView = views.menuView;
    this.moodView = views.moodView;
    this.navbarView = views.navbarView;
    this.routeChangeObserver = observers.mutationObserver;
    this.currentMainView = null;
    this.currentAnimationFrame = null;

    this.router.init();
    this.routeChangeObserver.setController(this);
    this.routeChangeObserver.observeRoot();
  }

  handleEventsOverTime() {
    let currentTime = 0;
    let nextTimeforEvent = TICK_SECONDS;

    this.handleMoodImage();

    const handleEventsOnTick = async () => {
      const hasMaxExp =
        this.gameState.growth === GROWTH[1] && this.gameState.exp >= MAX_EXP;

      if (this.router.currentRoute === '/') {
        const helpModalIsOpen = !document
          .querySelector(`.${mainStyles['help-modal']}`)
          .classList.contains(`${mainStyles.hidden}`);

        if (this.gameState.state === STATE[2] && !helpModalIsOpen) {
          currentTime++;
        }

        if (this.gameState.growth !== this.buttonState.state) {
          this.#handleChangingPetPhases();
        }
      }

      if (this.gameState.tiredness >= MAX_TIREDNESS) {
        this.gameState.setFallingAsleepState();
        this.childView.cancelAnimation();

        if (this.gameState.growth === GROWTH[1]) {
          await this.#handleFallingAsleepChild();
        } else if (this.gameState.growth === GROWTH[2]) {
          await this.#handleFallingAsleepAdult();
        }
      }

      if (hasMaxExp) {
        await this.gameState.growup(async () => {
          this.childView.cancelAnimation();
          this.audioController.playGrowupSound();
          await this.childView.drawGrowingUp();
        });
      }

      if (currentTime >= nextTimeforEvent) {
        this.gameState.setStatesByTime();
        this.handleMoodImage();
        nextTimeforEvent = currentTime + TICK_SECONDS;
      }

      this.currentAnimationFrame = requestAnimationFrame(handleEventsOnTick);
    };

    handleEventsOnTick();
  }

  async handleUserLogin() {
    this.validationController.handleUserLogin(
      this.gameState,
      this.userState,
      this.router,
    );
  }

  async handleUserLogout() {
    this.validationController.handleUserLogout(
      this.gameState,
      this.buttonState,
      () =>
        this.userInformationController.handlePatchUserInfo(
          this.userState,
          this.gameState,
        ),
    );
  }

  async handleGetUserInfo() {
    this.userInformationController.handleGetUserInfo(
      this.userState,
      this.gameState,
      this.handleUserLogin,
    );
  }

  handleSettingMainPage() {
    if (this.currentMainView) {
      this.currentMainView.cancelAnimation();
    }

    this.#handleSettingMainPageElementsInClasses();

    this.frameView.draw();
    this.#handleChangingPetPhases();
  }

  #handleSettingMainPageElementsInClasses() {
    const tamagotchiContainer = document.querySelector(
      `.${mainStyles['tamagotchi-container']}`,
    );

    const leftBtn = document.querySelector(`.${mainStyles['btn--1']}`);
    const middleBtn = document.querySelector(`.${mainStyles['btn--2']}`);
    const rightBtn = document.querySelector(`.${mainStyles['btn--3']}`);
    const frame = document.querySelector(`#${mainStyles.frame}`);
    const tablet = document.querySelector(`#${mainStyles.tablet}`);
    const modal = document.querySelector(`.${mainStyles.modal}`);
    const navbar = document.querySelector('nav');
    const helpModal = document.querySelector(`.${mainStyles['help-modal']}`);
    const backdrop = document.querySelector(`.${mainStyles.backdrop}`);
    const xBtn = document.querySelector(`.${mainStyles['x-btn']}`);

    const helpModalBtn = document.querySelector(
      `.${mainStyles['help-modal-btn']}`,
    );

    this.buttonState.setButtonElements(leftBtn, middleBtn, rightBtn);
    this.frameView.setContext(frame);
    this.eggView.setContext(tablet);
    this.childView.setContext(tablet);
    this.adultView.setContext(tablet);
    this.moodView.setContext(tablet);
    this.moodView.setContainer(tamagotchiContainer);
    this.stateView.setContext(tablet);
    this.mainModalView.setModalElement(modal);
    this.navbarView.setNavbar(navbar);

    this.helpModalView.setHelpModalElements(
      helpModal,
      backdrop,
      helpModalBtn,
      xBtn,
    );

    this.helpModalView.addListeners(() => this.helpModalView.toggleHelpModal());
  }

  handleSettingNavBar() {
    this.navbarView.addLogoutListener(() => {
      localStorage.removeItem('isLoggedIn');
      this.handleUserLogout();
    });
  }

  handleSetProfilePage() {
    this.userProfileController.handleSetProfilePage(
      this.profileView,
      this.userState,
      this.gameState,
    );
  }

  handlePatchProfileInfo(newProfile) {
    this.userProfileController.handlePatchProfileInfo(
      newProfile,
      this.gameState,
    );
  }

  handleMoodImage() {
    const isHappy =
      this.gameState.fun > MIN_FUN_FOR_HAPPINESS &&
      this.gameState.hunger < MAX_ALLOWED_HUNGER_FOR_HAPPINESS &&
      this.gameState.tiredness < MAX_ALLOWED_TIRDNESS_FOR_HAPPINESS;

    const isAngry =
      this.gameState.fun <= MAX_ALLOWED_FUN_FOR_ANGRY &&
      this.gameState.hunger >= MIN_HUNGER_FOR_ANGRY &&
      this.gameState.tiredness >= MIN_TIREDNESS_FOR_ANGRY;

    if (isHappy) {
      this.moodView.drawHeart();
      return;
    }

    if (isAngry) {
      this.audioController.playAngryAlertSound();
      this.moodView.drawAngryEmoji();
      return;
    }

    this.moodView.clearMoodImage();
    return;
  }

  async #handleFallingAsleepChild() {
    this.currentMainView.cancelAnimation();
    this.buttonState.removeListeners();

    const leftCallback = () => {
      this.menuView.drawMenu();
      this.gameState.setMenuState();
      this.moodView.clearMoodImage();
      this.audioController.playSelectMenuSound();
    };

    const middleCallback = () => {
      const callbacks = this.#createChildMenuCallbacks(
        this,
        leftCallback,
        middleCallback,
        rightCallback,
      );
      this.menuView.selectMenu(callbacks, this.gameState);
    };

    const rightCallback = async () => {
      if (this.gameState.state === STATE[2]) return;

      this.menuView.removeMenu();
      this.gameState.setIdlingState();

      this.childView.drawIdlingChild();
      this.handleMoodImage();
      this.audioController.playCancelMenuSound();
    };

    this.audioController.playSleepSound();
    await this.childView.drawSleepingChild();
    this.gameState.setIdlingState();
    this.childView.drawIdlingChild();

    this.buttonState.addListeners({
      leftCallback,
      middleCallback,
      rightCallback,
    });
  }

  async #handleFallingAsleepAdult() {
    this.currentMainView.cancelAnimation();
    this.buttonState.removeListeners();

    const leftCallback = () => {
      this.menuView.drawMenu();
      this.gameState.setMenuState();
      this.moodView.clearMoodImage();
      this.audioController.playSelectMenuSound();
    };

    const middleCallback = () => {
      const callbacks = this.#createAdultMenuCallbacks(
        this,
        leftCallback,
        middleCallback,
        rightCallback,
      );
      this.menuView.selectMenu(callbacks, this.gameState);
    };

    const rightCallback = async () => {
      if (this.gameState.state === STATE[2]) return;

      this.menuView.removeMenu();
      this.gameState.setIdlingState();

      this.adultView.drawIdlingAdult();
      this.handleMoodImage();
      this.audioController.playCancelMenuSound();
    };

    this.audioController.playSleepSound();
    await this.adultView.drawSleepingAdult();
    this.gameState.setIdlingState();
    this.adultView.drawIdlingAdult();

    this.buttonState.addListeners({
      leftCallback,
      middleCallback,
      rightCallback,
    });
  }

  #handleChangingPetPhases() {
    if (this.gameState.growth === STATE[0]) {
      this.buttonState.state = this.gameState.growth;
      const callback = () => {
        this.gameState.startGame();
        this.audioController.playStartGameSound();
      };

      this.buttonState.addListeners({
        leftCallback: callback,
        middleCallback: callback,
        rightCallback: callback,
      });

      return;
    }

    if (this.gameState.growth === GROWTH[0]) {
      this.#initEggPhase();
      return;
    }

    if (this.gameState.growth === GROWTH[1]) {
      this.#initChildPhase();
      return;
    }

    if (this.gameState.growth === GROWTH[2]) {
      this.#initAdultPhase();
      return;
    }
  }

  async #initEggPhase() {
    if (this.currentMainView) {
      this.currentMainView.cancelAnimation();
    }

    this.currentMainView = this.eggView;
    this.mainModalView.changeModalText('파란색 버튼을 계속 클릭해주세요!');

    const callback = async () => {
      if (this.gameState.birthCount > MIN_BIRTH_COUNT) {
        await this.eggView.drawShakedEgg();
        this.audioController.playShakeEggSound();
        this.gameState.subtractBirthCount();
      }

      if (this.gameState.birthCount <= MIN_BIRTH_COUNT) {
        this.audioController.playGrowupSound();
        this.buttonState.removeListeners();
        await this.eggView.drawBreakingEgg();
        this.gameState.eggToChild();
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
    if (this.currentMainView) {
      this.currentMainView.cancelAnimation();
    }

    this.currentMainView = this.childView;

    this.navbarView.showProfileLink();

    if (this.router.currentRoute === '/') {
      this.mainModalView.hiddenModal();
      this.helpModalView.showHelpModalBtn();
    }

    this.buttonState.state = this.gameState.growth;
    this.buttonState.removeListeners();

    const menu = document.querySelector(`.${mainStyles.menu}`);
    const menuItems = menu.querySelectorAll(`.${mainStyles['menu-item']}`);

    this.menuView.setCurrentMainView(this.currentMainView);
    this.menuView.setMenuElements(menu, menuItems);

    const leftCallback = () => {
      this.menuView.drawMenu();
      this.gameState.setMenuState();
      this.moodView.clearMoodImage();
      this.audioController.playSelectMenuSound();
    };

    const middleCallback = () => {
      const callbacks = this.#createChildMenuCallbacks(
        this,
        leftCallback,
        middleCallback,
        rightCallback,
      );

      this.menuView.selectMenu(callbacks, this.gameState);
    };

    const rightCallback = async () => {
      if (this.gameState.state === STATE[2]) return;

      this.menuView.removeMenu();
      this.gameState.setIdlingState();
      this.childView.drawIdlingChild();
      this.handleMoodImage();
      this.audioController.playCancelMenuSound();
    };

    this.buttonState.addListeners({
      leftCallback,
      middleCallback,
      rightCallback,
    });

    this.childView.drawIdlingChild();
  }

  async #initAdultPhase() {
    this.buttonState.state = this.gameState.growth;

    if (this.currentMainView) {
      this.currentMainView.cancelAnimation();
    }

    this.currentMainView = this.adultView;
    this.navbarView.showProfileLink();

    if (this.router.currentRoute === '/') {
      this.mainModalView.hiddenModal();
      this.helpModalView.showHelpModalBtn();
    }

    this.buttonState.state = this.gameState.growth;
    this.buttonState.removeListeners();

    const menu = document.querySelector(`.${mainStyles.menu}`);
    const menuItems = menu.querySelectorAll(`.${mainStyles['menu-item']}`);

    this.menuView.setCurrentMainView(this.currentMainView);
    this.menuView.setMenuElements(menu, menuItems);

    const leftCallback = () => {
      this.menuView.drawMenu();
      this.gameState.setMenuState();
      this.moodView.clearMoodImage();
      this.audioController.playSelectMenuSound();
    };

    const middleCallback = () => {
      const callbacks = this.#createAdultMenuCallbacks(
        this,
        leftCallback,
        middleCallback,
        rightCallback,
      );

      this.menuView.selectMenu(callbacks, this.gameState);
    };

    const rightCallback = async () => {
      if (this.gameState.state === STATE[2]) return;

      this.menuView.removeMenu();
      this.gameState.setIdlingState();
      this.adultView.drawIdlingAdult();
      this.handleMoodImage();
      this.audioController.playCancelMenuSound();
    };

    this.buttonState.addListeners({
      leftCallback,
      middleCallback,
      rightCallback,
    });

    this.adultView.drawIdlingAdult();
  }

  #createChildMenuCallbacks(
    controller,
    leftCallback,
    middleCallback,
    rightCallback,
  ) {
    return {
      async triggerFeedCallback() {
        controller.buttonState.removeListeners();
        await feedChildCallback(controller);

        controller.buttonState.addListeners({
          leftCallback,
          middleCallback,
          rightCallback,
        });
      },
      async triggerPlayCallback() {
        controller.buttonState.removeListeners();
        await playChildCallback(controller);

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

        await sleepChildCallback(controller);

        controller.buttonState.addListeners({
          leftCallback,
          middleCallback,
          rightCallback,
        });
      },
    };
  }

  #createAdultMenuCallbacks(
    controller,
    leftCallback,
    middleCallback,
    rightCallback,
  ) {
    return {
      async triggerFeedCallback() {
        controller.buttonState.removeListeners();
        await feedAdultCallback(controller);

        controller.buttonState.addListeners({
          leftCallback,
          middleCallback,
          rightCallback,
        });
      },
      async triggerPlayCallback() {
        controller.buttonState.removeListeners();
        await playAdultCallback(controller);

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

        await sleepAdultCallback(controller);

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
