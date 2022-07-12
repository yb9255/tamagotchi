import GameState from '../models/GameState.js';
import ButtonState from '../models/ButtonState.js';
import UserState from '../models/UserState.js';
import EggView from '../views/EggView.js';
import ChildView from '../views/ChildView.js';
import StateView from '../views/StateView.js';
import MainModalView from '../views/MainModalView.js';
import ProfileView from '../views/ProfileView.js';
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
  constructor() {
    this.router = new Router();
    this.gameState = new GameState();
    this.buttonState = new ButtonState();
    this.userState = new UserState();
    this.frameView = new FrameView();
    this.eggView = new EggView();
    this.childView = new ChildView();
    this.stateView = new StateView();
    this.mainModalView = new MainModalView();
    this.profileView = new ProfileView();
    this.menuView = new MenuView();
    this.currentMainView = null;

    this.router.init();
  }

  handleEventsOverTime() {
    let currenTime = 0;
    let nextTimeforEvent = TICK_SECONDS;

    const handleEventsOnTick = async () => {
      if (this.router.currentRoute === '/') {
        if (this.gameState.state === IDLING) {
          currenTime++;
        }

        if (this.gameState.growth !== this.buttonState.state) {
          this.#handleChangingPetPhases();
        }
      }

      if (this.gameState.tiredness >= 10) {
        this.gameState.resetTirednessState();
        this.gameState.resetFunState();
        this.childView.cancelAnimation();

        await this.#handleFallingAsleep();
      }

      if (currenTime >= nextTimeforEvent) {
        this.gameState.setStatesByTime();
        nextTimeforEvent = currenTime + TICK_SECONDS;
      }

      requestAnimationFrame(handleEventsOnTick);
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
    // await this.handlePatchingUserInfo();
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

    const leftBtn = document.querySelector(`.${mainStyles['btn--1']}`);
    const middleBtn = document.querySelector(`.${mainStyles['btn--2']}`);
    const rightBtn = document.querySelector(`.${mainStyles['btn--3']}`);
    const frame = document.querySelector(`#${mainStyles.frame}`);
    const tablet = document.querySelector(`#${mainStyles.tablet}`);
    const modal = document.querySelector(`.${mainStyles.modal}`);

    this.buttonState.setButtonElements(leftBtn, middleBtn, rightBtn);
    this.frameView.setContext(frame);
    this.eggView.setContext(tablet);
    this.childView.setContext(tablet);
    this.stateView.setContext(tablet);
    this.mainModalView.setModalElement(modal);

    this.frameView.draw();
    this.#handleChangingPetPhases();
  }

  handleSettingNavBar() {
    const logoutLink = document.querySelector(`.${navbarStyles.logout}`);
    logoutLink.addEventListener('click', this.handleUserLogout.bind(this));
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
      this.#initEggPhase();
    } else if (this.gameState.growth === GROWTH[1]) {
      this.#initChildPhase();
    } else if (this.gameState.growth === GROWTH[2]) {
      this.buttonState.state = this.gameState.growth;
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
    if (this.currentMainView) {
      this.currentMainView.cancelAnimation();
    }

    this.currentMainView = this.childView;

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
