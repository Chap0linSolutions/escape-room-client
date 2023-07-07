import { InventoryItem } from '../../classes';
export class State {
  private static instance: State;
  paused = false;
  key = undefined;
  currentPlayer = '';

  /** Global State for Multiplayer
   * State: {
   *  players: [
   *    {
   *      id: "",
   *      inventory: [],
   *    }
   *  ],
   *  currentPlayerId: ""
   * }
   */
  inventory = [];

  constructor() {
    if (!!State.instance) {
      return State.instance;
    }
    State.instance = this;
    console.log('State created');
  }

  addItem(item: InventoryItem) {
    this.inventory.unshift(item);
    console.log(
      'itens com o jogador:',
      this.inventory.map((item) => item.name)
    );
  }

  removeItem() {
    if (!this.inventory || this.inventory.length === 0) return;
    this.inventory.splice(0, 1);
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
