import { Genius } from '../index';

enum states {
  STARTING = 1500, //period that runs right after the sequence starts over, before the first button lights
  SHOWING = 400, //period where a button is effectively on
  RESTING = 250, //period between button lightings in a level sequence
  LISTENING = 2000, //period left for the user to guess the correct sequence
  CLICK = 500,
  COMPARING = 0,
}

interface geniusLogicProps {
  genius: Genius;
}

export class GeniusLogic {
  buttons: string[];
  index: number;
  playerGuess: string[];
  currentLevel: string[];
  dt: number;
  state: states;
  genius: Genius;

  constructor({ genius }: geniusLogicProps) {
    this.buttons = genius.buttons.map((b) => b.name);
    this.dt = 0;
    this.state = states.RESTING;
    this.currentLevel = [];
    this.playerGuess = [];
    this.genius = genius;
  }

  private nextState() {
    switch (this.state) {
      case states.STARTING:
        return states.SHOWING;
      case states.SHOWING:
        return this.index < this.currentLevel.length - 1
          ? states.RESTING
          : states.LISTENING;
      case states.RESTING:
        return states.SHOWING;
      case states.LISTENING:
        return states.COMPARING;
      case states.CLICK:
        return states.LISTENING;
    }
  }

  private nextStep() {
    if (this.state === states.CLICK) {
      this.dt = 500;
      this.genius.resetButtons();
    } else {
      this.dt = 0;
    }
    this.state = this.nextState();
    switch (this.state) {
      case states.SHOWING:
        return this.genius.lightUpButton(this.currentLevel[this.index], true);
      case states.RESTING:
        this.genius.resetButtons();
        return (this.index += 1);
      case states.LISTENING:
        this.genius.resetButtons();
        return (this.index = 0);
      case states.COMPARING:
        return this.handleComparison();
    }
  }

  private handleComparison() {
    if (this.hasActiveGuess()) {
      if (!this.compare()) {
        this.resetLevel();
        this.genius.wrongResult();
      } else {
        this.startNewLevel();
        this.genius.rightResult();
      }
    }
    this.state = states.STARTING;
  }

  private sortLevel(newLevelLength: number) {
    if (!this.buttons || !this.buttons.length) return [];
    const newLevel: string[] = [];
    const options = this.buttons.length;
    for (let i = 0; i < newLevelLength; i++) {
      newLevel.push(this.buttons[Math.floor(options * Math.random())]);
    }
    console.log(newLevel);
    return newLevel;
  }

  resetLevel() {
    this.dt = 0;
    this.index = 0;
    this.state = states.STARTING;
    this.genius.resetButtons();
    this.clearGuess();
  }

  compare() {
    if (
      !this.currentLevel.length ||
      this.playerGuess.length !== this.currentLevel.length
    )
      return false;
    for (let i = 0; i < this.currentLevel.length; i++) {
      if (this.playerGuess[i] !== this.currentLevel[i]) {
        return false;
      }
    }
    return true;
  }

  isListening() {
    return this.state === states.LISTENING || this.state === states.CLICK;
  }

  registerClick(buttonName: string) {
    //each time the player clicks a button,
    this.playerGuess.push(buttonName); //the button name is registered
    this.genius.lightUpButton(buttonName, true);
    this.state = states.CLICK;
    this.dt = 0; //and the counter resets for a new guess
  }

  hasActiveGuess() {
    return this.playerGuess.length > 0;
  }

  clearGuess() {
    this.playerGuess = [];
  }

  startNewLevel(newLength?: number) {
    this.resetLevel();
    const nextLevelLength = newLength
      ? newLength
      : this.currentLevel.length + 1;
    this.currentLevel = this.sortLevel(nextLevelLength);
  }

  getState() {
    return this.state;
  }

  update(dt: number) {
    if (this.dt < this.state) return (this.dt += dt);
    this.nextStep();
  }
}
