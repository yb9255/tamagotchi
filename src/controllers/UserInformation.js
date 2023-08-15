import { getUserInformation, patchUserInformation } from '../utils/api.js';

class userInformationController {
  async handlePatchUserInfo(userState, gameState) {
    await patchUserInformation({
      ...userState.getProperties(),
      ...gameState.getProperties(),
    });
  }

  async handleGetUserInfo(userState, gameState, handleUserLogin) {
    const response = await getUserInformation();

    if (response.message === '로그인 토큰이 존재하지 않습니다.') {
      await handleUserLogin();
      return;
    }

    const userInformation = response.userInformation;

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
  }
}

export default userInformationController;
