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
import { dx, dy, mapOrigin } from '../constants/tileMap';
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
  
  const origin = {
    x: mapOrigin.x + dx,
    y: mapOrigin.y,
  }
  
  const feetOffset = {
    x: 0,
    y: -20
  };

  const players = [
    new Player(
      'Alex',
      playerSprite,
      origin,
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
    CANVAS_WIDTH - 2*FLOOR_PADDING,
    {x: FLOOR_PADDING, y: 120},
    mapOrigin,
  );

  const objects  = [
    //ARMÁRIO///////////////////////////////////////////////////////////////////////////   
    new InteractiveObject(
      drawerSprite,
      DRAWER_SIZE,
      { 
        canvas: {x: 100, y: 0.18*(CANVAS_HEIGHT - DRAWER_SIZE)},
        map: {x: mapOrigin.x + 3*dx, y: mapOrigin.y - 2*dy},
        tiles: [{x: 0, y: 0}, {x: dx, y: -dy}],
        hitboxes: [{x: dx, y: dy}, {x: 2*dx, y: 0}],
      },
      [
        new Slot(
          { x: DRAWER_SIZE / 2 - 10, y: (DRAWER_SIZE / 2 - 10) },
          new DraggableObject(bottleSprite, 18, 'garrafa', glassSound)
        ),
      ],
      false,
      ['left'],
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
        canvas: {x: 420, y: 0.08*(CANVAS_HEIGHT - DESK_SIZE)},
        map: {x: mapOrigin.x + 9*dx, y: mapOrigin.y - 6*dy},
        tiles: [{x: 0, y: 0}, {x: dx, y: dy}, {x: 2*dx, y: 2*dy}],
        hitboxes: [{x: -dx, y: dy}, {x: 0, y: 2*dy}, {x: dx, y: 3*dy}],
      },
      [
        new Slot(
          { x: DESK_SIZE * 0.55, y: DESK_SIZE * 0.4 },
          new DraggableObject(paperSprite, 70, 'papel', paperSound)
        ),
      ],
      false,
      ['up'],
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
        canvas: {x: ((CANVAS_WIDTH - V_DESK_SIZE) / 2) - 22, y: (CANVAS_HEIGHT - 290)},
        map: {x: mapOrigin.x + 6*dx, y: mapOrigin.y + 5*dy},
        tiles: [
          {x: 0, y: 0}, {x: dx, y: dy}, {x: 2*dx, y: 2*dy}, {x: 3*dx, y: 3*dy},
          {x: 4*dx, y: 2*dy}, {x: 5*dx, y: dy}, {x: 6*dx, y: 0},
        ],
        hitboxes: [
          {x: dx, y: -dy}, {x: 2*dx, y: 0}, {x: 3*dx, y: dy},
          {x: 4*dx, y: 0}, {x: 5*dx, y: -dy},
        ],
      },
      [
        new Slot({ x: V_DESK_SIZE * 0.18, y: V_DESK_SIZE * 0.04 }, undefined),
        new Slot({ x: V_DESK_SIZE * 0.5, y: V_DESK_SIZE * 0.2 }, undefined),
        new Slot({ x: V_DESK_SIZE * 0.8, y: V_DESK_SIZE * 0.04 }, undefined),
      ],
      true,
      ['down', 'right'],
    ),
  ];

  return { objects, floor}
}
