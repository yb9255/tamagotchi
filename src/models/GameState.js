import {
  STATE,
  GROWTH,
  MAX_HUNGER,
  MIN_FUN,
  REDUCED_FUN_POINT_PER_TICK,
  INCREASED_HUNGER_POINT_PER_TICK,
  MIN_FUN_FOR_HAPPINESS,
  MAX_ALLOWED_HUNGER_FOR_HAPPINESS,
  MAX_ALLOWED_TIREDNESS_FOR_HAPPINESS,
  EXP_INCREMENT,
  HAPPINESS_INCREMENT,
  MAX_ALLOWED_FUN_FOR_ANGRY,
  MIN_HUNGER_FOR_ANGRY,
  MIN_TIREDNESS_FOR_ANGRY,
  MIN_HAPPINESS,
  EXP_DECREMENT,
  HAPPINESS_DECREMENT,
  MIN_EXP,
  TIREDNESS_INCREMENT,
  INITIAL_BIRTH_COUNT,
  MIN_HUNGER,
  INITIAL_FUN,
  INITIAL_HUNGER,
  INITIAL_TIREDNESS,
  INITIAL_EXP,
  INITIAL_HAPPINESS,
  FUN_INCREMENT,
  MAX_FUN,
  MIN_TIREDNESS,
  TIREDNESS_AFTER_FALLING_ASLEEP,
  HUNGER_DECREMENT,
} from '../constants/gameState.js';

class GameState {
  constructor() {
    this.state = STATE[0];
    this.growth = STATE[0];
    this.fun = null;
    this.hunger = null;
    this.birthCount = null;
    this.tiredness = null;
    this.exp = null;
    this.happiness = null;
    this.profileName = null;
    this.profileDescription = null;

    this.setGameState = this.setGameState.bind(this);
    this.setProfile = this.setProfile.bind(this);
    this.setStatesByTime = this.setStatesByTime.bind(this);
    this.startGame = this.startGame.bind(this);
    this.subtractBirthCount = this.subtractBirthCount.bind(this);
    this.growUp = this.growUp.bind(this);
    this.setMenuState = this.setMenuState.bind(this);
    this.setIdlingState = this.setIdlingState.bind(this);
    this.reduceHunger = this.reduceHunger.bind(this);
    this.makePetFun = this.makePetFun.bind(this);
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
    const isHappy =
      this.fun > MIN_FUN_FOR_HAPPINESS &&
      this.hunger < MAX_ALLOWED_HUNGER_FOR_HAPPINESS &&
      this.tiredness < MAX_ALLOWED_TIREDNESS_FOR_HAPPINESS;

    const isAngry =
      this.fun <= MAX_ALLOWED_FUN_FOR_ANGRY &&
      this.hunger >= MIN_HUNGER_FOR_ANGRY &&
      this.tiredness >= MIN_TIREDNESS_FOR_ANGRY;

    if (
      (this.growth === GROWTH[1] || this.growth === GROWTH[2]) &&
      this.state === STATE[2]
    ) {
      if (this.fun > MIN_FUN) {
        this.fun -= REDUCED_FUN_POINT_PER_TICK;
      }

      if (this.hunger < MAX_HUNGER) {
        this.hunger += INCREASED_HUNGER_POINT_PER_TICK;
      }

      if (isHappy) {
        this.exp += EXP_INCREMENT;
        this.happiness += HAPPINESS_INCREMENT;
      }

      if (isAngry) {
        this.#makeStatesWorse();
      }

      this.tiredness += TIREDNESS_INCREMENT;
    }
  }

  startGame() {
    this.state = GROWTH[0];
    this.growth = GROWTH[0];
    this.birthCount = INITIAL_BIRTH_COUNT;
  }

  subtractBirthCount() {
    this.birthCount--;
  }

  eggToChild() {
    this.growth = GROWTH[1];
    this.fun = INITIAL_FUN;
    this.hunger = INITIAL_HUNGER;
    this.tiredness = INITIAL_TIREDNESS;
    this.exp = INITIAL_EXP;
    this.happiness = INITIAL_HAPPINESS;
    this.state = STATE[2];
  }

  async growUp(blink) {
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
    this.hunger -= HUNGER_DECREMENT;

    if (this.hunger < MIN_HUNGER) {
      this.hunger = MIN_HUNGER;
    }
  }

  makePetFun() {
    this.fun += FUN_INCREMENT;
    this.tiredness += TIREDNESS_INCREMENT;

    if (this.fun > MAX_FUN) {
      this.fun = MAX_FUN;
    }
  }

  #resetFunState() {
    this.fun = MIN_FUN;
  }

  #setTirednessAfterFallingAsleep() {
    this.tiredness = TIREDNESS_AFTER_FALLING_ASLEEP;
  }

  setFallingAsleepState() {
    this.#setTirednessAfterFallingAsleep();
    this.#resetFunState();
  }

  resetTirednessState() {
    this.tiredness = MIN_TIREDNESS;
  }

  reset() {
    this.state = STATE[0];
    this.growth = STATE[0];
    this.fun = null;
    this.hunger = null;
    this.birthCount = null;
    this.tiredness = null;
    this.exp = null;
    this.happiness = null;
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

  #makeStatesWorse() {
    if (this.happiness > MIN_HAPPINESS) {
      this.happiness -= HAPPINESS_DECREMENT;
    } else {
      this.happiness = MIN_HAPPINESS;
    }

    if (this.exp > MIN_EXP) {
      this.exp -= EXP_DECREMENT;
    } else {
      this.exp = MIN_EXP;
    }
  }
}

export default GameState;
