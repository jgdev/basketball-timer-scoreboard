/**
 * Main Application Management
 * @author Joan Peralta <joanperalta13@gmail.com>
 * @version 1.0
 *
 * @licence GNU GENERAL PUBLIC LICENSE 3.0
 * https://opensource.org/licenses/GPL-3.0
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

      GAME_TIME = 900;

const Game = new (require('./js/game.js'))();

window.onload = () => {
  Game.reset();

  window.addEventListener('keyup', (e) => {
    console.log(e.keyCode, e);

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
        if (!Game.paused) Game.changePossession();
        break;

      // Pause possession time
        // Game.pausePossessionTime();
        // break;

      // Play music

      default:
        e.preventDefault();
        e.stopPropagation();
        break;
    }
  });
}
