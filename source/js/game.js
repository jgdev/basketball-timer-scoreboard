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
      $ = require('jquery');

/**
 * Audio files
 */

const AUDIO_SECONDS = new Audio("../sounds/second.mp3"),
      AUDIO_BUZZER = new Audio("../sounds/buzzer.mp3");

var isPausedSound,
    isPaused,
    timeInterval,
    gameTime,
    teams,
    teamPossession;

AUDIO_BUZZER.onended = e => {
  isPausedSound = false;
};

/**
 * Define Class Team
 */

const POSESSION_SECONDS = 24,
      BONUS_FOULS = 7;

class TeamCounter {
  constructor (container, game) {
    this.container = container;
    this.game = game;
    this.points = 0;
    this.fouls = 0;
    this.possessionSeconds = POSESSION_SECONDS;
    this.possessionInterval = undefined;

    this.updatePointsCount();
    this.updateFoulsCount();
  }

  upPoint () {
    this.points++;
    this.updatePointsCount();
  }

  downPoint() {
    if (this.points > 0)
      this.points--;

    this.updatePointsCount();
  }

  upFoul () {
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

  updatePossessionTime () {
    this.container.querySelector('span.possessionTime').innerHTML = utils.pad(this.possessionTime); 
  }

  updateFoulsCount () {
    if(this.fouls >= 7)
      $(this.container.querySelector('span.bonus')).addClass('visible');
    else
      $(this.container.querySelector('span.bonus')).removeClass('visible');

    this.container.querySelector('span.fouls').innerHTML = this.fouls; 
  }

  dissablePossisionSeconds () {
    $(this.container.querySelector('span.possessionTime')).removeClass('visible');
    this.possessionTime = POSESSION_SECONDS;
    this.possessionInterval = undefined;
    this.updatePossessionTime();
  }

  enablePossessionSeconds () {
    let elementPossessionTime = $(this.container.querySelector('span.possessionTime'));
    elementPossessionTime.addClass('visible');
    this.possessionTime = POSESSION_SECONDS;
  }
}

/**
 * Define Class Game
 */

// Common document element's

let TimeSelectorElement = document.querySelector('#time > span');
let TeamsElement = document.querySelectorAll('#team-stadistics > div');

console.log(TeamsElement)
// Private members.

let Game = (function () {
  class Game {
    constructor () {
      this.setDefaults();
    }

    setDefaults () {
      isPausedSound = false;
      isPaused = false;
      timeInterval = null;
      gameTime = 0;
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

      if (!isPaused && gameTime < 7) {
        this.playSecondSound();
      }

      if (isPaused) return;

      // Possession counter
      let actualTeamPossession = teams[teamPossession];

      actualTeamPossession.possessionTime--;

      actualTeamPossession.updatePossessionTime();

      if (actualTeamPossession.possessionTime <= 0) {
        this.pause(true);
        this.changePossession();
      }

      gameTime = gameTime - 1;
      this.updateTimeTable();
    }

    start (defaultTime, possession) {
      if (gameTime !== 0) return;

      let time = undefined || defaultTime;

      gameTime = time;
      teamPossession = possession ? 1 : 0;

      teams[teamPossession].enablePossessionSeconds();

      isPaused = true;

      this.setGameInterval(time);
      this.playBuzzerSound();
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
    }

    updateTimeTable () {
      let timeLeft = this.timeLeft;
      TimeSelectorElement.innerHTML = `${ utils.pad(timeLeft.minutes) }:${ utils.pad(timeLeft.seconds) }`;
    }

    reset () {
      gameTime = 0;

      clearInterval(timeInterval);

      for(let count in teams) {
        teams[count].dissablePossisionSeconds();
      }

      this.setDefaults();
      this.updateTimeTable();
    }

    playBuzzerSound () {
      AUDIO_BUZZER.play();
    }

    playSecondSound () {
      AUDIO_SECONDS.play();
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
      isPaused = true;

      for(let count in teams) {
        teams[count].dissablePossisionSeconds();
      }

      teamPossession = teamPossession === 0 ? 1 : 0;

      teams[teamPossession].enablePossessionSeconds();
    }

    get timeLeft () {
      let minutes = Math.floor(gameTime / 60),
          seconds = gameTime - minutes * 60;

      return {
        minutes, seconds
      };
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