export class State {
  private static instance: State;
  paused = false;
  key = undefined;
  currentPlayer = '';

  constructor() {
    if (!!State.instance) {
      return State.instance;
    }
    State.instance = this;
    console.log('State created');
  }

  pauseGame() {
    this.paused = true;
  }

  resumeGame() {
    this.paused = false;
  }

  setCurrentPlayer(playerType: string) {
    this.currentPlayer = playerType;
  }
}
