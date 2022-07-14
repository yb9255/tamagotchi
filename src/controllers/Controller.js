import { INIT, GROWTH, TICK_SECONDS, IDLING } from '../constants/gameState.js';

import {
  feedChildCallback,
  feedAdultCallback,
  playChildCallback,
  playAdultCallback,
  sleepChildCallback,
  sleepAdultCallback,
  stateCallback,
} from '../utils/callbacks.js';
import {
  postLogin,
  logout,
  getUserInformation,
  patchUserInformation,
  patchProfile,
} from '../utils/api.js';

import mainStyles from '../css/main.css';
import navbarStyles from '../css/navbar.css';
import profileStyles from '../css/profile.css';

class Controller {
  constructor(states, views, subControllers, observers) {
    this.router = subControllers.router;
    this.audioController = subControllers.audioController;
    this.gameState = states.gameState;
    this.buttonState = states.buttonState;
    this.userState = states.userState;
    this.frameView = views.frameView;
    this.eggView = views.eggView;
    this.childView = views.childView;
    this.adultView = views.adultView;
    this.stateView = views.stateView;
    this.mainModalView = views.mainModalView;
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
      if (this.router.currentRoute === '/') {
        if (this.gameState.state === IDLING) {
          currentTime++;
        }

        if (this.gameState.growth !== this.buttonState.state) {
          this.#handleChangingPetPhases();
        }
      }

      if (this.gameState.tiredness >= 10) {
        this.gameState.resetTirednessState();
        this.gameState.resetFunState();
        this.childView.cancelAnimation();

        if (this.gameState.growth === GROWTH[1]) {
          await this.#handleFallingAsleepChild();
        } else if (this.gameState.growth === GROWTH[2]) {
          await this.#handleFallingAsleepAdult();
        }
      }

      if (this.gameState.growth === GROWTH[1] && this.gameState.exp >= 100) {
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
    const {
      email,
      picture,
      state,
      growth,
      fun,
      hunger,
      birthCount,
      tiredness,
      happiness,
      exp,
      profileName,
      profileDescription,
    } = (await postLogin()).userInformation;

    this.userState.setUserState({ email, picture });
    this.gameState.setGameState({
      state,
      growth,
      fun,
      hunger,
      birthCount,
      tiredness,
      exp,
      happiness,
      profileName,
      profileDescription,
    });

    this.router.navigateTo('/');
  }

  async handleUserLogout() {
    await this.handlePatchingUserInfo();
    this.gameState.reset();
    this.buttonState.reset();
    logout();
  }

  async handleGettingUserInfo() {
    const response = await getUserInformation();

    if (response.message === '로그인 토큰이 존재하지 않습니다.') {
      await this.handleUserLogin();
      return;
    }

    const {
      email,
      picture,
      state,
      growth,
      fun,
      hunger,
      birthCount,
      tiredness,
      happiness,
      exp,
      profileName,
      profileDescription,
    } = response.userInformation;

    this.userState.setUserState({ email, picture });
    this.gameState.setGameState({
      state,
      growth,
      fun,
      hunger,
      birthCount,
      tiredness,
      exp,
      happiness,
      profileName,
      profileDescription,
    });
  }

  handleSettingMainPage() {
    if (this.currentMainView) {
      this.currentMainView.cancelAnimation();
    }

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

    this.frameView.draw();
    this.#handleChangingPetPhases();
  }

  handleSettingNavBar() {
    const logoutLink = document.querySelector(`.${navbarStyles.logout}`);

    logoutLink.addEventListener('click', () => {
      localStorage.removeItem('isLoggedIn');
      this.handleUserLogout();
    });
  }

  async handleSettingProfilePage() {
    const profileCard = document.querySelector(
      `.${profileStyles['profile-card']}`,
    );

    const updateModal = document.querySelector(
      `.${profileStyles['update-modal']}`,
    );

    const backdrop = document.querySelector(`.${profileStyles.backdrop}`);

    const updateModalBtn = document.querySelector(
      `.${profileStyles['edit-my-profile']}`,
    );

    this.profileView.setProfileElements(profileCard);
    this.profileView.setModals(updateModal, backdrop);

    const xBtn = document.querySelector(`.${profileStyles['x-btn']}`);

    updateModalBtn.addEventListener('click', () => {
      this.profileView.openUpdateModal();
    });

    [xBtn, backdrop].forEach((element) =>
      element.addEventListener('click', () => {
        this.profileView.closeUpdateModal();
      }),
    );

    this.profileView.drawProfile(this.userState, this.gameState);

    updateModal
      .querySelector('form')
      .addEventListener('submit', async (event) => {
        event.preventDefault();

        const newName = event.target.querySelector(
          `.${profileStyles['name-input']}`,
        ).value;

        const newDescription = event.target.querySelector(
          `.${profileStyles['description-input']}`,
        ).value;

        if (newName.trim() === '' && newDescription.trim() === '') {
          return;
        }

        await patchProfile({
          profileName: newName,
          profileDescription: newDescription,
        });

        this.gameState.setProfile(newName, newDescription);
        this.profileView.drawProfile(this.userState, this.gameState);
        this.profileView.closeUpdateModal();
      });
  }

  async handlePatchingProfileInfo(newProfile) {
    this.gameState.setProfile(...newProfile);
    await patchProfile(newProfile);
  }

  async handlePatchingUserInfo() {
    await patchUserInformation({
      ...this.userState.getProperties(),
      ...this.gameState.getProperties(),
    });
  }

  handleMoodImage() {
    if (
      this.gameState.fun > 5 &&
      this.gameState.hunger < 5 &&
      this.gameState.tiredness < 5
    ) {
      this.moodView.drawHeart();
    } else if (
      this.gameState.fun < 3 &&
      this.gameState.hunger > 7 &&
      this.gameState.tiredness > 5
    ) {
      this.audioController.playAngryAlertSound();
      this.moodView.drawAngryEmoji();
    } else {
      this.moodView.clearMoodImage();
    }
  }

  async #handleFallingAsleepChild() {
    this.currentMainView.cancelAnimation();
    this.buttonState.removeListeners();

    const leftCallback = () => {
      this.menuView.drawMenu();
      this.gameState.setMenuState();
      this.moodView.clearMoodImage();
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
      if (this.gameState.state === IDLING) return;

      this.menuView.removeMenu();
      this.gameState.setIdlingState();

      this.childView.drawIdlingChild();
      this.handleMoodImage();
    };

    this.audioController.playSleepingSound();
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
      if (this.gameState.state === IDLING) return;

      this.menuView.removeMenu();
      this.gameState.setIdlingState();

      this.adultView.drawIdlingAdult();
      this.handleMoodImage();
    };

    this.audioController.playSleepingSound();
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
    if (this.gameState.growth === INIT) {
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
    } else if (this.gameState.growth === GROWTH[0]) {
      this.#initEggPhase();
    } else if (this.gameState.growth === GROWTH[1]) {
      this.#initChildPhase();
    } else if (this.gameState.growth === GROWTH[2]) {
      this.#initAdultPhase();
    }
  }

  async #initEggPhase() {
    if (this.currentMainView) {
      this.currentMainView.cancelAnimation();
    }

    this.currentMainView = this.eggView;

    const callback = async () => {
      if (this.gameState.birthCount > 0) {
        await this.eggView.drawShakedEgg();

        this.gameState.subtractBirthCount(
          this.eggView.drawBreakingEgg,
          this.audioController.playGrowupSound,
        );

        this.audioController.playShakeEggSound();
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
      if (this.gameState.state === IDLING) return;

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
      if (this.gameState.state === IDLING) return;

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