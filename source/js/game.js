/**
 * Game Management
 * @author Joan Peralta <joanperalta13@gmail.com>
 * @version 1.0
 *
 * @licence GNU GENERAL PUBLIC LICENSE 3.0
 * https://opensource.org/licenses/GPL-3.0
 */

'use strict';

/**
 * Require module dependencies
 */

const utils = require('./utils'),
      Sound = require('./sound'),
      $ = require('jquery'),
      Dialogs = require('dialogs'),
      child_process = require('child_process');

/**
 * Audio files
 */


var isPausedSound,
    isPaused,
    isPausedPossession,
    timeInterval,
    gameTime,
    possessionTime,
    teams,
    teamPossession;

Sound.on('end', Sound.EFFECTS.SOUND_BUZZER, () => {
  isPausedSound = false;
});

/**
 * Define Class Team
 */

const POSESSION_SECONDS = 24,
      BONUS_FOULS = 7;

class TeamCounter {
  constructor(container, game) {
    this.container = container;
    this.game = game;
    this.points = 0;
    this.fouls = 0;
    this.updatePointsCount();
    this.updateFoulsCount();
  }

  upPoint() {
    this.points++;
    this.updatePointsCount();
  }

  downPoint() {
    if (this.points > 0)
      this.points--;

    this.updatePointsCount();
  }

  upFoul() {
    this.fouls++;
    this.updateFoulsCount();
  }

  downFoul() {
    if (this.fouls > 0)
      this.fouls--;

    this.updateFoulsCount();
  }

  updatePointsCount () {
    this.container.querySelector('span.points').innerHTML = utils.pad(this.points);
  }

  updateFoulsCount() {
    if (this.fouls >= 7)
      $(this.container.querySelector('span.bonus')).addClass('visible');
    else
      $(this.container.querySelector('span.bonus')).removeClass('visible');

    this.container.querySelector('span.fouls').innerHTML = this.fouls;
  }
}

/**
 * Define Class Game
 */

// Common document element's

let TimeSelectorElement = document.querySelector('#time > span');
let TeamsElement = document.querySelectorAll('#team-stadistics > div');

// Private members.

let Game = (function () {
  class Game {
    constructor () {
      this.setDefaults();
    }

    setDefaults () {
      isPausedSound = false;
      isPaused = false;
      isPausedPossession = false;
      timeInterval = null;
      gameTime = 0;
      possessionTime = POSESSION_SECONDS;
      teams = [
        new TeamCounter(TeamsElement[0], this), 
        new TeamCounter(TeamsElement[1], this)
      ];
    }

    setGameInterval () {
      timeInterval = setInterval(() => {
        this.gameLoop();
      }, 1000);

      this.updateTimeTable();
    }

    gameLoop () {
      if (!isPaused && gameTime === 1) {
        // Game end
        this.playBuzzerSound();
        isPaused = true;
        clearInterval(timeInterval);
        TimeSelectorElement.innerHTML = `00:00`;
        return;
      }

      if (isPaused) return;

      if ((gameTime < 7) || (!isPausedPossession && possessionTime <= 6)) {
        this.playSecondSound();
      }

      gameTime = gameTime - 1;
      this.updateTimeTable();

      // Possession counter

      if (!isPausedPossession && !isPaused) {
        possessionTime = possessionTime - 1;

        if (possessionTime <= 0) {
          isPaused = true;
            isPausedPossession = true;
          this.playBuzzerSound();
          possessionTime = POSESSION_SECONDS;
        }

        this.updatePossessionTime();
      }
    }

    askMessageDiego () {
      Dialogs().prompt('ESCRIBA EL MENSAJE', '', (message) => {
        if (message) {
          child_process.exec(`/usr/bin/say -v Diego "${ message.toString() }"`);
        }
      });
    }

    start (defaultTime) {
      if (gameTime !== 0) return;

      // let time = undefined || defaultTime;

      let _default = this.convertTime(defaultTime);

      Dialogs().prompt('INSERTE EL TIEMPO DE JUEGO', `${ utils.pad(_default.minutes) }:${ utils.pad(_default.seconds) }`, (time) => {
        if (time) {
          time = this.convertTimeFromHourFormat(parseInt(time.split(':')[0]), parseInt(time.split(':')[1]));
          gameTime = time;
          isPaused = true;
            isPausedPossession = true;

          this.setGameInterval(time);
          this.playBuzzerSound();
        }
      });
    }

    pause (sound) {
      if (isPaused) return;
      if (sound && !isPausedSound) {
        this.playBuzzerSound();
      }
      isPaused = true;
    }

    resume () {
      if (!isPaused) return;
      isPaused = false;
        isPausedPossession = false;
    }

    updateTimeTable () {
      let timeLeft = this.timeLeft;
      TimeSelectorElement.innerHTML = `${ utils.pad(timeLeft.minutes) }:${ utils.pad(timeLeft.seconds) }`;
    }

    updatePossessionTime () {
      document.querySelector('span.possessionTime').innerHTML = utils.pad(possessionTime);
    }

    reset () {
      clearInterval(timeInterval);

      this.setDefaults();
      this.updateTimeTable();
        this.updatePossessionTime();
    }

    playBuzzerSound () {
      Sound.playSoundEffect(Sound.EFFECTS.SOUND_BUZZER);
    }

    playSecondSound () {
      Sound.playSoundEffect(Sound.EFFECTS.SOUND_SECOND_LEFT);
    }

    upgradePoints (secondTeam) {
      teams[!secondTeam ? 0 : 1].upPoint();
    }

    downgradePoints (secondTeam) {
      teams[!secondTeam ? 0 : 1].downPoint();
    }

    upgradeFouls (secondTeam) {
      teams[!secondTeam ? 0 : 1].upFoul();
    }

    downgradeFouls (secondTeam) {
      teams[!secondTeam ? 0 : 1].downFoul();
    }

    changePossession () {
      possessionTime = POSESSION_SECONDS;
      isPausedPossession = true;
      this.updatePossessionTime();
    }

    pausePossession () {
        isPausedPossession = !isPausedPossession;
    }

    convertTime (t) {
      let minutes = Math.floor(t / 60),
          seconds = t - minutes * 60;

      return {
        minutes, seconds
      };
    }

    convertTimeFromHourFormat (minutes, seconds) {
      return (minutes * 60) + seconds;
    }

    get timeLeft () {
      return this.convertTime(this.gameTime);
    }

    get gameTime () {
      return gameTime;
    }

    get paused () {
      return isPaused;
    }
  };

  return Game;
})();


/**
 * Export Game Module
 */

module.exports = Game;
