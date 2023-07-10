import { InputHandler } from '../events/InputHandler';
import { buildScene, spawnPlayer } from '../functions/Builder';
import RenderAll from '../functions/Renderer';
import UpdateAll from '../functions/Updater';
import { CANVAS_WIDTH, CANVAS_HEIGHT, SCENE } from '../constants';
import { GameCallbacks, coordinate } from '../types';
import { TestFragment } from './fragments/testFragment';

// const inputHandler = new InputHandler();
// const state = new State();
// inputHandler.subscribe("keyDown", "jump", handleJump.bind(this))

const mapKeys = (key: string) => {
  switch (key) {
    case 'w':
    case 'ArrowUp':
      return 'up';
    case 'a':
    case 'ArrowLeft':
      return 'left';
    case 's':
    case 'ArrowDown':
      return 'down';
    case 'd':
    case 'ArrowRight':
      return 'right';
    default:
      return key;
  }
};

export type GameProps = {
  gameCallbacks: GameCallbacks;
};

export class Game {
  key: any;
  floor: any;
  objects: any;
  players: any;
  callbacks: GameCallbacks;

  constructor({ gameCallbacks }: GameProps) {
    const inputHandler = new InputHandler();
    inputHandler.subscribe('keyDown', 'GameKeyDown', this.setKey.bind(this));
    inputHandler.subscribe('keyUp', 'GameKeyUp', this.resetKey.bind(this));
    this.key = {};
    this.callbacks = gameCallbacks;
  }

  initialSetup = async () => {
    const { objects, floor, playerOrigin } = await buildScene(SCENE);
    this.players = spawnPlayer(playerOrigin);
    this.objects = objects;
    this.floor = floor;
  };

  resetKey = (e: string) => {
    this.key[mapKeys(e)] = false;
  };

  setKey = (e: string) => {
    this.key[mapKeys(e)] = true;
    this.key.lastKey = mapKeys(e);
    if (this.key === 'Enter') {
      this.callbacks.showPopup(TestFragment);
    }
  };

  GameLoop = (context: CanvasRenderingContext2D, dt: number) => {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //console.log(this.key);
    UpdateAll({
      dt,
      key:
        this.key.lastKey && this.key[this.key.lastKey]
          ? this.key.lastKey
          : undefined,
      floor: this.floor,
      objects: this.objects,
      players: this.players,
    });
    RenderAll({
      context,
      floor: this.floor,
      objects: this.objects,
      players: this.players,
    });
  };
}
