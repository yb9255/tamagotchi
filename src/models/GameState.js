import { STATE, GROWTH } from '../constants/gameState.js';

class GameState {
  constructor() {
    this.state = STATE[0];
    this.growth = STATE[0];
    this.fun = -1;
    this.hunger = -1;
    this.birthCount = -1;
    this.tiredness = -1;
    this.exp = -1;
    this.happiness = -1;
    this.profileName = null;
    this.profileDescription = null;

    this.setGameState = this.setGameState.bind(this);
    this.setProfile = this.setProfile.bind(this);
    this.setStatesByTime = this.setStatesByTime.bind(this);
    this.startGame = this.startGame.bind(this);
    this.subtractBirthCount = this.subtractBirthCount.bind(this);
    this.growup = this.growup.bind(this);
    this.setMenuState = this.setMenuState.bind(this);
    this.setIdlingState = this.setIdlingState.bind(this);
    this.reduceHunger = this.reduceHunger.bind(this);
    this.makePetFun = this.makePetFun.bind(this);
    this.resetFunState = this.resetFunState.bind(this);
    this.resetTirednessState = this.resetTirednessState.bind(this);
    this.reset = this.reset.bind(this);
    this.getProperties = this.getProperties.bind(this);
  }

  setGameState({
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
  }) {
    this.state = state;
    this.growth = growth;
    this.fun = fun;
    this.hunger = hunger;
    this.happiness = happiness;
    this.birthCount = birthCount;
    this.tiredness = tiredness;
    this.exp = exp;
    this.happiness = happiness;
    this.profileName = profileName;
    this.profileDescription = profileDescription;
  }

  setProfile(profileName, profileDescription) {
    this.profileName = profileName;
    this.profileDescription = profileDescription;
  }

  setStatesByTime() {
    if (
      (this.growth === GROWTH[1] || this.growth === GROWTH[2]) &&
      this.state === STATE[2]
    ) {
      if (this.fun) {
        this.fun -= 1;
      }

      if (this.hunger < 10) {
        this.hunger += 1;
      }

      if (this.fun >= 5 && this.hunger <= 5 && this.tiredness <= 5) {
        this.exp += 5;
        this.happiness += 10;
      }

      if (this.fun <= 3 && this.hunger >= 7 && this.tiredness >= 5) {
        if (!this.happiness) {
          this.happiness = 0;
          return;
        }

        this.happiness -= 5;
      }

      this.tiredness += 1;
    }
  }

  startGame() {
    this.state = GROWTH[0];
    this.growth = GROWTH[0];
    this.birthCount = 5;
  }

  async subtractBirthCount(breakEgg, growupSound) {
    if (this.birthCount <= 0) {
      growupSound();
      await breakEgg();

      this.growth = GROWTH[1];
      this.fun = 5;
      this.hunger = 5;
      this.tiredness = 5;
      this.exp = 0;
      this.happiness = 0;
      this.state = STATE[2];
      return;
    }

    if (this.birthCount) {
      this.birthCount--;
    }
  }

  async growup(blink) {
    await blink();
    this.growth = GROWTH[2];
    return;
  }

  setMenuState() {
    this.state = STATE[1];
  }

  setIdlingState() {
    this.state = STATE[2];
  }

  reduceHunger() {
    this.hunger -= 3;

    if (this.hunger < 0) {
      this.hunger = 0;
    }
  }

  makePetFun() {
    this.fun += 3;
    this.tiredness += 1;

    if (this.fun > 10) {
      this.fun = 10;
    }
  }

  resetFunState() {
    this.fun = 0;
  }

  resetTirednessState() {
    this.tiredness = 0;
  }

  setTirednessToSix() {
    this.tiredness = 6;
  }

  reset() {
    this.state = STATE[0];
    this.growth = STATE[0];
    this.fun = -1;
    this.hunger = -1;
    this.birthCount = -1;
    this.tiredness = -1;
    this.exp = -1;
    this.happiness = -1;
    this.profileName = null;
    this.profileDescription = null;
  }

  getProperties() {
    return {
      state: this.state,
      growth: this.growth,
      fun: this.fun,
      hunger: this.hunger,
      birthCount: this.birthCount,
      tiredness: this.tiredness,
      exp: this.exp,
      happiness: this.happiness,
      profileName: this.profileName,
      profileDescription: this.profileDescription,
    };
  }
}

export default GameState;
