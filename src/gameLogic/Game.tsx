import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  DRAWER_SIZE,
  OBJECTS_HITBOX,
  DESK_SIZE,
  V_DESK_SIZE,
  FLOOR_PADDING,
  FLOOR_TOP_Y,
  PLAYER_SIZE,
  PLAYER_SPEED,
  ANIMATION_PERIOD,
  PLAYER_HITBOX,
} from '../constants';
import RenderAll from '../functions/Renderer';
import UpdateAll from '../functions/Updater';
import {
  InteractiveObject,
  Slot,
  DraggableObject,
  Floor,
  Player,
} from '../classes';
import { InputHandler } from '../events/InputHandler';
import { GameCallbacks } from '../types';

import floorSprite from '../assets/floor.png';
import drawerSprite from '../assets/drawer.png';
import deskSprite from '../assets/desk.png';
import vDeskSprite from '../assets/v-desk.png';
import bottleSprite from '../assets/bottle.png';
import paperSprite from '../assets/paper.png';
import doorSound from '../assets/sounds/door.mp3';
import wooshSound from '../assets/sounds/woosh1.mp3';
import glassSound from '../assets/sounds/glass.mp3';
import paperSound from '../assets/sounds/paper.mp3';
import playerSprite from '../assets/player.png';

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
    this.callbacks = gameCallbacks;
  }

  initialSetup = () => {
    this.spawnPlayer();
    this.BuildScene();
  };

  resetKey = () => {
    this.key = undefined;
  };

  setKey = (e: string) => {
    this.key = mapKeys(e);
    if (this.key === 'Enter') {
      this.callbacks.showPopup(TestFragment);
    }
  };

  spawnPlayer = () => {
    this.players = [
      new Player(
        'Alex Topiroze',
        playerSprite,
        {
          x: (CANVAS_WIDTH - PLAYER_SIZE) / 2,
          y: 30,
        },
        PLAYER_SPEED,
        PLAYER_SIZE,
        ANIMATION_PERIOD,
        [
          {
            offset: {
              x: ((1 - PLAYER_HITBOX) * PLAYER_SIZE) / 2,
              y: 40,
            },
            size: PLAYER_SIZE * PLAYER_HITBOX,
          },
          {
            offset: {
              x: ((1 - PLAYER_HITBOX) * PLAYER_SIZE) / 2,
              y: 60,
            },
            size: PLAYER_SIZE * PLAYER_HITBOX,
          },
          {
            offset: {
              x: ((1 - PLAYER_HITBOX) * PLAYER_SIZE) / 2,
              y: 80,
            },
            size: PLAYER_SIZE * PLAYER_HITBOX,
          },
        ]
      ),
    ];
  };

  BuildScene = () => {
    this.objects = [
      //ARMÁRIO///////////////////////////////////////////////////////////////////////////
      new InteractiveObject(
        drawerSprite,
        DRAWER_SIZE,
        {
          x: 120,
          y: (CANVAS_HEIGHT - DRAWER_SIZE) / 5,
        },
        [
          {
            offset: {
              x: 90,
              y: 155,
            },
            size: DRAWER_SIZE * OBJECTS_HITBOX,
          },
          {
            offset: {
              x: 135,
              y: 135,
            },
            size: DRAWER_SIZE * OBJECTS_HITBOX,
          },
        ],
        [
          new Slot(
            { x: DRAWER_SIZE / 2, y: DRAWER_SIZE / 2 - 10 },
            new DraggableObject(bottleSprite, 18, 'garrafa', glassSound)
          ),
        ],
        false,
        {
          sound: doorSound,
          texts: ['abrir o armário', 'fechar o armário'],
        }
      ),

      //MESA COM COMPUTADOR///////////////////////////////////////////////////////////////////////////
      new InteractiveObject(
        deskSprite,
        DESK_SIZE,
        {
          x: CANVAS_WIDTH - (DESK_SIZE + 170),
          y: (CANVAS_HEIGHT - DESK_SIZE) / 6,
        },
        [
          {
            offset: {
              x: 10,
              y: 85,
            },
            size: DESK_SIZE * OBJECTS_HITBOX,
          },
          {
            offset: {
              x: 37,
              y: 105,
            },
            size: DESK_SIZE * OBJECTS_HITBOX,
          },
          {
            offset: {
              x: 65,
              y: 125,
            },
            size: DESK_SIZE * OBJECTS_HITBOX,
          },
        ],
        [
          new Slot(
            { x: DESK_SIZE * 0.55, y: DESK_SIZE * 0.4 },
            new DraggableObject(paperSprite, 70, 'papel', paperSound)
          ),
        ],
        false,
        {
          sound: wooshSound,
          texts: ['abrir o notebook', 'fechar o notebook'],
        }
      ),

      //MESA EM L///////////////////////////////////////////////////////////////////////////
      new InteractiveObject(
        vDeskSprite,
        V_DESK_SIZE,
        {
          x: (CANVAS_WIDTH - V_DESK_SIZE) / 2,
          y: CANVAS_HEIGHT - 275,
        },
        [
          {
            offset: {
              x: 60,
              y: 10,
            },
            size: V_DESK_SIZE * OBJECTS_HITBOX,
          },
          {
            offset: {
              x: 200,
              y: 10,
            },
            size: V_DESK_SIZE * OBJECTS_HITBOX,
          },
        ],
        [
          new Slot({ x: V_DESK_SIZE * 0.18, y: V_DESK_SIZE * 0.04 }, undefined),
          new Slot({ x: V_DESK_SIZE * 0.5, y: V_DESK_SIZE * 0.2 }, undefined),
          new Slot({ x: V_DESK_SIZE * 0.8, y: V_DESK_SIZE * 0.04 }, undefined),
        ],
        true
      ),
    ];

    this.floor = new Floor(
      floorSprite,
      { x: FLOOR_PADDING, y: FLOOR_TOP_Y },
      CANVAS_WIDTH - 2 * FLOOR_PADDING
    );
  };

  GameLoop = (context: CanvasRenderingContext2D, dt: number) => {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    console.log(this.key);
    UpdateAll({
      dt,
      key: this.key,
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
