import { InventoryItem } from '../../classes';
import { GameCallbacks } from '../../types';

export class State {
  private static instance: State;
  cb: GameCallbacks & { setInventory?: (inventory: any) => void };
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
  inventory = Array(10).fill({});
  activeItem = null;

  constructor() {
    if (!!State.instance) {
      return State.instance;
    }
    State.instance = this;
    console.log('State created');
  }

  setGameCallbacks(gameCallbacks: GameCallbacks) {
    this.cb = { ...this.cb, ...gameCallbacks };
  }

  setInventoryCallback(setInventory: any) {
    this.cb = { ...this.cb, setInventory };
  }

  addItem(item: InventoryItem) {
    const position = this.inventory.findIndex((v) => v.name === undefined);
    this.inventory[position] = item;
    this.cb.setInventory(this.inventory);
    console.log(
      'itens com o jogador:',
      this.inventory.map((item) => item.name)
    );
  }

  removeItem(item: InventoryItem) {
    if (!this.inventory || this.inventory.length === 0) return;
    const position = this.inventory.findIndex((v) => v.name === item.name);
    this.inventory[position] = {};
    this.cb.setInventory(this.inventory);
    console.log(
      'itens com o jogador:',
      this.inventory.map((item) => item.name)
    );
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
