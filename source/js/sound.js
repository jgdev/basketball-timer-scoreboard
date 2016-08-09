/**
 * Sounds Effects and Music Play
 * @author Joan Peralta <joanperalta13@gmail.com>
 * @version 1.0
 *
 * @licence GNU GENERAL PUBLIC LICENSE 3.0
 * https://opensource.org/licenses/GPL-3.0
 */

'use strict';


/**
 * Require module dependencies.
 */

const fs = require('fs'),
      path = require('path');

/**
 * Define sounds
 */

const SOUND_WELCOM_TO_NBA = 49,
      SOUND_NO_GOOD = 50,
      SOUND_REBOUND = 51,
      SOUND_TWO_POINTS = 52,
      SOUND_FOR_TWO = 53,
      SOUND_BOOM_SHAKALAKA = 54,
      SOUND_YES = 55,
      SOUND_8 = 56,
      SOUND_9 = 57,
      SOUND_SECOND_LEFT = 1,
      SOUND_BUZZER = 2,
      SOUND_BUZZER_2 = 3;

const SOUNDS_MAP = [
  SOUND_WELCOM_TO_NBA,
  SOUND_NO_GOOD,
  SOUND_REBOUND,
  SOUND_TWO_POINTS,
  SOUND_FOR_TWO,
  SOUND_BOOM_SHAKALAKA,
  SOUND_YES,
  SOUND_SECOND_LEFT,
  SOUND_BUZZER,
  SOUND_BUZZER_2
];

const SoundEffects = [
  new Audio("../sounds/welcom_to_nba.wav"),
  new Audio("../sounds/no_good.wav"),
  new Audio("../sounds/rebound.wav"),
  new Audio("../sounds/two_points.wav"),
  new Audio("../sounds/for_two.wav"),
  new Audio("../sounds/boom_shakalaka.wav"),
  new Audio("../sounds/yes.wav"),
  new Audio("../sounds/second.mp3"),
  new Audio("../sounds/buzzer.mp3"),
  new Audio("../sounds/buzzer.mp3")
];

const Music = fs.readdirSync(path.join(__dirname, '../../sounds/music'));
      // SPECIAL_SOUND = 'Lets Get Ready To Rumble - Jock Jams.pm3';

var endCallback = [];

exports.on = (event, sound, callback) => {
  switch (event) {
    case 'end':
      SOUNDS_MAP.forEach((obj, key) => {
        if (obj === sound) {
          SoundEffects[key].onend = callback;  
        }
      });
      break;
  }
};

exports.SoundEffects = SoundEffects;

exports.EFFECTS = {
  SOUND_SECOND_LEFT,
  SOUND_BUZZER,
  SOUND_WELCOM_TO_NBA,
  SOUND_NO_GOOD,
  SOUND_REBOUND,
  SOUND_TWO_POINTS,
  SOUND_FOR_TWO,
  SOUND_BOOM_SHAKALAKA,
  SOUND_YES,
  SOUND_8,
  SOUND_9,
  SOUND_BUZZER_2
};

// console.log(SoundEffects[0][0]);

exports.playSoundEffect = sound => {
  switch (sound) {
    case SOUND_WELCOM_TO_NBA:
      console.log(SoundEffects[0][0]);
      SoundEffects[0].play();
      break;
    case SOUND_NO_GOOD:
      SoundEffects[1].play();
      break;
    case SOUND_REBOUND:
      SoundEffects[2].play();
      break;
    case SOUND_TWO_POINTS:
      SoundEffects[3].play();
      break;
    case SOUND_FOR_TWO:
      SoundEffects[4].play();
      break;
    case SOUND_BOOM_SHAKALAKA:
      SoundEffects[5].play();
      break;
    case SOUND_YES:
      SoundEffects[6].play();
      break;
    case SOUND_SECOND_LEFT:
      SoundEffects[7].play();
      break;
    case SOUND_BUZZER:
      SoundEffects[8].play();
      break;
    case SOUND_BUZZER_2:
      SoundEffects[9].play();
      break;
  };
};

exports.playSecondTimeLeft = () => {

};
