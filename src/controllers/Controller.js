import {
  STATE,
  GROWTH,
  TICK_SECONDS,
  MAX_TIREDNESS,
  MAX_EXP,
  MIN_BIRTH_COUNT,
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
    this.mainPageController = subControllers.mainPageController;
    this.userInformationController = subControllers.userInformationController;
    this.userProfileController = subControllers.userProfileController;
    this.navBarController = subControllers.navBarController;
    this.moodController = subControllers.moodController;
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

  async initController() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (this.router.currentRoute === '/') {
      await this.handleGetUserInfo();

      if (this.currentAnimationFrame) {
        cancelAnimationFrame(this.currentAnimationFrame);
      }

      if (isLoggedIn) {
        this.handleSetNavBar();
        this.handleSetMainPage();
        this.gameState.setIdlingState();
        this.handleEventsOverTime();
      }

      return;
    }

    if (this.router.currentRoute === '/profile') {
      await this.handleGetUserInfo();

      if (
        this.gameState.growth !== GROWTH[1] &&
        this.gameState.growth !== GROWTH[2]
      ) {
        this.router.navigateTo('/');
        return;
      }

      if (isLoggedIn) {
        this.handleSetNavBar();
        this.handleSetProfilePage();
        this.handleEventsOverTime();
      }

      return;
    }

    if (this.router.currentRoute === '/login') {
      document
        .querySelector('button')
        .addEventListener('click', this.handleUserLogin.bind(this));
    }
  }

  handleUpdateUserInfoBeforeUnload() {
    this.userInformationController.handlePatchUseInfoBeforeUnload(
      this.userState,
      this.gameState,
    );
  }

  handleEventsOverTime() {
    let currentTime = 0;
    let nextTimeForEvent = TICK_SECONDS;

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
          this.handleChangePetPhases();
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
        await this.gameState.growUp(async () => {
          this.childView.cancelAnimation();
          this.audioController.playGrowUpSound();
          await this.childView.drawGrowingUp();
        });
      }

      if (currentTime >= nextTimeForEvent) {
        this.gameState.setStatesByTime();
        this.handleMoodImage();
        nextTimeForEvent = currentTime + TICK_SECONDS;
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
    await this.userInformationController.handleGetUserInfo(
      this.userState,
      this.gameState,
      this.handleUserLogin,
    );
  }

  handleSetMainPage() {
    this.mainPageController.handleSetMainPage({
      currentMainView: this.currentMainView,
      buttonState: this.buttonState,
      frameView: this.frameView,
      eggView: this.eggView,
      childView: this.childView,
      adultView: this.adultView,
      moodView: this.moodView,
      stateView: this.stateView,
      mainModalView: this.mainModalView,
      navbarView: this.navbarView,
      helpModalView: this.helpModalView,
      onChangingPetPhases: this.handleChangePetPhases.bind(this),
    });
  }

  handleSetNavBar() {
    this.navBarController.addLogoutListener(
      this.navbarView,
      this.handleUserLogout.bind(this),
    );
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
    this.moodController.handleMoodImage(
      this.gameState,
      this.moodView,
      this.audioController,
    );
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

  handleChangePetPhases() {
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
        await this.eggView.drawShakenEgg();
        this.audioController.playShakeEggSound();
        this.gameState.subtractBirthCount();
      }

      if (this.gameState.birthCount <= MIN_BIRTH_COUNT) {
        this.audioController.playGrowUpSound();
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
