import {
  MIN_FUN_FOR_HAPPINESS,
  MAX_ALLOWED_HUNGER_FOR_HAPPINESS,
  MAX_ALLOWED_TIREDNESS_FOR_HAPPINESS,
  MAX_ALLOWED_FUN_FOR_ANGRY,
  MIN_HUNGER_FOR_ANGRY,
  MIN_TIREDNESS_FOR_ANGRY,
} from '../constants/gameState.js';

class MoodController {
  handleMoodImage(gameState, moodView, audioController) {
    const isHappy =
      gameState.fun > MIN_FUN_FOR_HAPPINESS &&
      gameState.hunger < MAX_ALLOWED_HUNGER_FOR_HAPPINESS &&
      gameState.tiredness < MAX_ALLOWED_TIREDNESS_FOR_HAPPINESS;

    const isAngry =
      gameState.fun <= MAX_ALLOWED_FUN_FOR_ANGRY &&
      gameState.hunger >= MIN_HUNGER_FOR_ANGRY &&
      gameState.tiredness >= MIN_TIREDNESS_FOR_ANGRY;

    if (isHappy) {
      moodView.drawHeart();
      return;
    }

    if (isAngry) {
      audioController.playAngryAlertSound();
      moodView.drawAngryEmoji();
      return;
    }

    moodView.clearMoodImage();
    return;
  }
}

export default MoodController;
