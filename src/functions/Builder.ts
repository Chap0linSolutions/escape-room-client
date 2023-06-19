import playerSprite from '../assets/player.png';
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
import { dx, dy } from '../constants/tileMap';
import {
  InteractiveObject,
  DraggableObject,
  Floor,
  Slot,
  Player 
} from '../classes';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  DRAWER_SIZE,
  DESK_SIZE,
  FLOOR_PADDING,
  V_DESK_SIZE,
  PLAYER_SIZE,
  PLAYER_SPEED,
  ANIMATION_PERIOD,
} from '../constants';


export const spawnPlayer = () => {
  const initialPosition = {
    x: FLOOR_PADDING + dx,
    y: 0.5 * (CANVAS_HEIGHT),
  }
  const feetOffset = {
    x: 0,
    y: -20
  };

  const players = [
    new Player(
      'Alex Topiroze',
      playerSprite,
      initialPosition,
      PLAYER_SPEED,
      PLAYER_SIZE,
      ANIMATION_PERIOD,
      feetOffset,
    ),
  ];

  return players;
};


export function buildScene() {

  const floor = new Floor(
    floorSprite,
    CANVAS_WIDTH,
    { x: FLOOR_PADDING, y: 0.5 * CANVAS_HEIGHT},
  );

  const objects  = [
    //ARMÁRIO///////////////////////////////////////////////////////////////////////////
    new InteractiveObject(
      drawerSprite,
      DRAWER_SIZE,
      {
        x: 120,
        y: (CANVAS_HEIGHT - DRAWER_SIZE) / 5,

      },
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
        allowedDirections: ['left'],
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
        new Slot(
          { x: DESK_SIZE * 0.55, y: DESK_SIZE * 0.4 },
          new DraggableObject(paperSprite, 70, 'papel', paperSound)
        ),
      ],
      false,
      {
        sound: wooshSound,
        texts: ['abrir o notebook', 'fechar o notebook'],
        allowedDirections: ['up'],
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
        new Slot({ x: V_DESK_SIZE * 0.18, y: V_DESK_SIZE * 0.04 }, undefined),
        new Slot({ x: V_DESK_SIZE * 0.5, y: V_DESK_SIZE * 0.2 }, undefined),
        new Slot({ x: V_DESK_SIZE * 0.8, y: V_DESK_SIZE * 0.04 }, undefined),
      ],
      true
    ),
  ];

  return { objects, floor}//TODO voltar para {objects, floor};
}
