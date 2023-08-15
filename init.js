import Controller from './src/controllers/Controller.js';
import GameState from './src/models/GameState.js';
import ButtonState from './src/models/ButtonState.js';
import UserState from './src/models/UserState.js';
import EggView from './src/views/canvasViews/EggView.js';
import ChildView from './src/views/canvasViews/ChildView.js';
import AdultView from './src/views/canvasViews/AdultView.js';
import StateView from './src/views/canvasViews/StateView.js';
import MainModalView from './src/views/MainModalView.js';
import ProfileView from './src/views/ProfileView.js';
import FrameView from './src/views/canvasViews/FrameView.js';
import MenuView from './src/views/MenuView.js';
import MoodView from './src/views/canvasViews/MoodView.js';
import NavbarView from './src/views/NavbarView.js';
import Router from './src/controllers/Router.js';
import AudioController from './src/controllers/Audio.js';
import RouteChangeObserver from './src/observers/RouteChangeObserver.js';

import { postUserInfoWithClose } from './src/utils/api.js';
import { GROWTH } from './src/constants/gameState.js';
import HelpModalView from './src/views/HelpModalView.js';
import ValidationController from './src/controllers/Validation.js';
import UserInformationController from './src/controllers/UserInformation.js';

async function init() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const states = {
    gameState: new GameState(),
    buttonState: new ButtonState(),
    userState: new UserState(),
  };

  const views = {
    eggView: new EggView(),
    childView: new ChildView(),
    adultView: new AdultView(),
    stateView: new StateView(),
    mainModalView: new MainModalView(),
    helpModalView: new HelpModalView(),
    profileView: new ProfileView(),
    frameView: new FrameView(),
    menuView: new MenuView(),
    moodView: new MoodView(),
    navbarView: new NavbarView(),
  };

  const subControllers = {
    router: new Router(),
    audioController: new AudioController(),
    validationController: new ValidationController(),
    userInformationController: new UserInformationController(),
  };

  const observers = {
    mutationObserver: new RouteChangeObserver(),
  };

  const controller = new Controller(states, views, subControllers, observers);

  window.addEventListener('beforeunload', (event) => {
    event.preventDefault();

    if (location.pathname !== '/login') {
      const userInformation = {
        ...controller.userState.getProperties(),
        ...controller.gameState.getProperties(),
      };

      postUserInfoWithClose(userInformation);
    }
  });

  if (controller.router.currentRoute === '/') {
    await controller.handleGetUserInfo();

    if (controller.currentAnimationFrame) {
      cancelAnimationFrame(controller.currentAnimationFrame);
    }

    if (isLoggedIn) {
      controller.handleSettingNavBar();
      controller.handleSettingMainPage();
      controller.gameState.setIdlingState();
      controller.handleEventsOverTime();
    }

    return;
  }

  if (controller.router.currentRoute === '/profile') {
    await controller.handleGetUserInfo();

    if (
      controller.gameState.growth !== GROWTH[1] &&
      controller.gameState.growth !== GROWTH[2]
    ) {
      controller.router.navigateTo('/');
      return;
    }

    if (isLoggedIn) {
      controller.handleSettingNavBar();
      controller.handleSetProfilePage();
      controller.handleEventsOverTime();
    }

    return;
  }

  if (controller.router.currentRoute === '/login') {
    document
      .querySelector('button')
      .addEventListener('click', controller.handleUserLogin.bind(controller));
  }
}

document.addEventListener('DOMContentLoaded', init);
