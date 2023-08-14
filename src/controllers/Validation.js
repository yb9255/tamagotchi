import {
  postLogin,
  logout,
  getUserInformation,
  patchUserInformation,
  patchProfile,
} from '../utils/api.js';

class ValidationController {
  constructor() {}

  async handleUserLogin(gameState, userState, routerController) {
    const userInformation = (await postLogin()).userInformation;

    userState.setUserState({
      email: userInformation.email,
      picture: userInformation.picture,
    });

    gameState.setGameState({
      state: userInformation.state,
      growth: userInformation.growth,
      fun: userInformation.fun,
      hunger: userInformation.hunger,
      birthCount: userInformation.birthCount,
      tiredness: userInformation.tiredness,
      exp: userInformation.exp,
      happiness: userInformation.happiness,
      profileName: userInformation.profileName,
      profileDescription: userInformation.profileDescription,
    });

    routerController.navigateTo('/');
  }

  async handleUserLogout(gameState, buttonState, onPatchUserInfo) {
    await onPatchUserInfo();
    gameState.reset();
    buttonState.reset();
    logout();
  }
}

export default ValidationController;
