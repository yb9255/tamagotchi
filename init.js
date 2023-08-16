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
import UserProfileController from './src/controllers/UserProfile.js';

import HelpModalView from './src/views/HelpModalView.js';
import ValidationController from './src/controllers/Validation.js';
import UserInformationController from './src/controllers/UserInformation.js';
import MainPageController from './src/controllers/MainPage.js';

async function init() {
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
    userProfileController: new UserProfileController(),
    mainPageController: new MainPageController(),
  };

  const observers = {
    mutationObserver: new RouteChangeObserver(),
  };

  const controller = new Controller(states, views, subControllers, observers);

  controller.initController();

  window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    controller.handleUpdateUserInfoBeforeUnload();
  });
}

document.addEventListener('DOMContentLoaded', init);
