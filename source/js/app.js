/**
 * Main Application Management
 * @author Joan Peralta <joanperalta13@gmail.com>
 * @version 1.0
 *
 * @licence GNU GENERAL PUBLIC LICENSE 3.0
 * https://opensource.org/licenses/GPL-3.0
 */

/**
 * Key Controls
 */

const KEY_PAUSE_GAME = 80,
      KEY_RESTART_GAME = 82,
      KEY_START_GAME = 83,
      KEY_PLAY_MUSIC = 0,
      KEY_POINTS_UP = 38,
      KEY_POINTS_DOWN = 40,
      KEY_FOUL_UP = 39,
      KEY_FOUL_DOWN = 37,
      KEY_CHANGE_POSSESSION = 71,
      KEY_PAUSE_POSSESSION = 72,
      KEY_PLAY_BUZZER = 66,
      KEY_MESSAGE_DIEGO = 77,
      GAME_TIME = 780;

/**
 * Define game events
 */

const Game = new (require('./js/game.js'))(),
      Sound = require('./js/sound.js');

window.Sound = Sound;

window.onload = () => {
  Game.reset();

  window.addEventListener('keyup', (e) => {
    console.log(e.keyCode, e);

    if (document.querySelectorAll('.dialog-widget').length) return;

    // NBA GAME CONTROLS

    switch (e.keyCode) {
      
      // Pause game

      case KEY_PAUSE_GAME:
        if (Game.paused) Game.resume();
        else Game.pause(e.shiftKey);
        break;

      // Reset game

      case KEY_RESTART_GAME:
        Game.reset();
        break;

      // Start game

      case KEY_START_GAME:
        Game.start(GAME_TIME, e.shiftKey);
        break;

      // Say Diego
    
      case KEY_MESSAGE_DIEGO:
        Game.askMessageDiego();
        break;

      // Up points

      case KEY_POINTS_UP:
        Game.upgradePoints(e.shiftKey);
        break;

      // Down points

      case KEY_POINTS_DOWN:
        Game.downgradePoints(e.shiftKey);
        break;

      // Up fouls

      case KEY_FOUL_UP:
        Game.upgradeFouls(e.shiftKey);
        break;

      // Down fouls

      case KEY_FOUL_DOWN:
        Game.downgradeFouls(e.shiftKey);
        break;

      // Change possession

      case KEY_CHANGE_POSSESSION:
        Game.changePossession(e.shiftKey);
        break;

      // Pause possession

      case KEY_PAUSE_POSSESSION:
        Game.pausePossession();
        break;

      // Sounds effects

      case KEY_PLAY_BUZZER:
        Sound.playSoundEffect(Sound.EFFECTS.SOUND_BUZZER_2);
        break;

      case Sound.EFFECTS.SOUND_WELCOM_TO_NBA:
        if (e.altKey) Sound.playSoundEffect(e.keyCode);
        break;

      case Sound.EFFECTS.SOUND_NO_GOOD:
        if (e.altKey) Sound.playSoundEffect(e.keyCode);
        break;

      case Sound.EFFECTS.SOUND_REBOUND:
        if (e.altKey) Sound.playSoundEffect(e.keyCode);
        break;

      case Sound.EFFECTS.SOUND_TWO_POINTS:
        if (e.altKey) Sound.playSoundEffect(e.keyCode);
        break;

      case Sound.EFFECTS.SOUND_FOR_TWO:
        if (e.altKey) Sound.playSoundEffect(e.keyCode);
        break;

      case Sound.EFFECTS.SOUND_BOOM_SHAKALAKA:
        if (e.altKey) Sound.playSoundEffect(e.keyCode);
        break;        

      case Sound.EFFECTS.SOUND_BOOM_SHAKALAKA:
        if (e.altKey) Sound.playSoundEffect(e.keyCode);
        break;

      case Sound.EFFECTS.SOUND_YES:
        if (e.altKey) Sound.playSoundEffect(e.keyCode);
        break;             

      default:
        e.preventDefault();
        e.stopPropagation();
        break;
    }
  });
}
