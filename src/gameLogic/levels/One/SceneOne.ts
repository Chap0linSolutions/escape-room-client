import roomSprite from '../../../assets/isometric/room.png';
import waterDispenserSprite from '../../../assets/isometric/waterDispenser.png';
import sofaOneSprite from '../../../assets/isometric/sofaOne.png';
import sofaTwoSprite from '../../../assets/isometric/sofaTwo.png';
import drawerSprite from '../../../assets/isometric/drawer.png';
import doorSprite from '../../../assets/isometric/door.png';
import meetingDeskSprite from '../../../assets/isometric/meetingDesk.png';
import midLevelDeskSprite from '../../../assets/isometric/midLevelDesk.png';
import seniorDeskSprite from '../../../assets/isometric/seniorDesk.png';
import juniorDeskSprite from '../../../assets/isometric/juniorDesk.png';
import internDeskSprite from '../../../assets/isometric/internDesk.png';
import beanBagsSprite from '../../../assets/isometric/beanBags.png'; 
import bookshelfSprite from '../../../assets/isometric/bookshelf.png';

import { tileMap } from './TileMap';
import { InteractiveObject, Floor } from '../../../classes';
import { SofaOneFragment } from '../../fragments/SofaOneFragment';
import { easyCoords } from '../../../functions/Builder';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  FLOOR_PADDING,
  DX,
  DY,
} from '../../../constants';

//ORIGEM DO JOGADOR E DO CHÃO//////////////////////////////////////////////////////////
const mapOneOrigin = {
  x: FLOOR_PADDING,
  y: 0.75 * CANVAS_HEIGHT,
};

const playerOrigin = {
  x: mapOneOrigin.x + 9 * DX,
  y: mapOneOrigin.y - 4 * DY,
};

//CHÃO/////////////////////////////////////////////////////////////////////////////////
const floor = new Floor({
  tileMap,
  spriteSrc: roomSprite,
  size: 2.05 * CANVAS_WIDTH,
  position: {
    canvas: { x: mapOneOrigin.x - 35, y: mapOneOrigin.y - 39 * DY },
    map: mapOneOrigin,
  },
});

const objects = [

  new InteractiveObject({                 //porta
    spriteSrc: doorSprite,
    interactible: true,
    size: 240,
    position: {
      canvas: { x: 1073, y: -198 },
      map: { x: mapOneOrigin.x + 21 * DX, y: mapOneOrigin.y - 16 * DY},
      tiles: [],
      hitboxes: [
        easyCoords({ x: 0, y: 0 }),
        easyCoords({ x: 0, y: 1 }),
        easyCoords({ x: 0, y: 2 }),
        easyCoords({ x: 0, y: 3 }),
      ],
    },
    allowedDirections: ['up'],
    action: null,
    fragment: null,
  }),

  new InteractiveObject({                 //bebedouro
    spriteSrc: waterDispenserSprite,
    interactible: false,
    size: 80,
    position: {
      canvas: { x: 0, y: 310 },
      map: { x: mapOneOrigin.x + DX, y: mapOneOrigin.y},
      tiles: [
        easyCoords({ x: 0, y: 0 }),
      ],
      hitboxes: [],
    },
    allowedDirections: [],
    action: null,
    fragment: null,
  }),

  new InteractiveObject({                 //sofá 1
    spriteSrc: sofaOneSprite,
    interactible: true,
    size: 395,
    position: {
      canvas: { x: 105, y: 240 },
      map: { x: mapOneOrigin.x + 3 * DX, y: mapOneOrigin.y - 2 * DY },
      tiles: [
        easyCoords({ x: 0, y: 0}),
        easyCoords({ x: 1, y: 0}),
        easyCoords({ x: 2, y: 0}),
        easyCoords({ x: 3, y: 0}),
        easyCoords({ x: 4, y: 0}),
        easyCoords({ x: 5, y: 0}),
        easyCoords({ x: 1, y: 1}),
        easyCoords({ x: 2, y: 1}),
        easyCoords({ x: 3, y: 1}),
        easyCoords({ x: 4, y: 1}),
        easyCoords({ x: 5, y: 1}),
      ],
      hitboxes: [
        easyCoords({ x: 1, y: 2 }),
        easyCoords({ x: 2, y: 2 }),
        easyCoords({ x: 3, y: 2 }),
        easyCoords({ x: 4, y: 2 }),
        easyCoords({ x: 5, y: 2 }),
      ],
    },
    allowedDirections: ['left'],
    action: {
      texts: ['interagir'],
    },
    fragment: SofaOneFragment,
  }),

  new InteractiveObject({        //armário
    spriteSrc: drawerSprite,
    interactible: true,
    size: 215,
    position: {
      canvas: {x: 420, y: 105},
      map: {x: mapOneOrigin.x + 9*DX, y: mapOneOrigin.y - 8*DY},
      tiles: [
        easyCoords({ x: 0, y: 0}),
        easyCoords({ x: 1, y: 0}),
        easyCoords({ x: 2, y: 0}),
        easyCoords({ x: 3, y: 0}),
      ],
      hitboxes: [
        easyCoords({ x: 0, y: 1}),
        easyCoords({ x: 1, y: 1}),
        easyCoords({ x: 2, y: 1}),
        easyCoords({ x: 3, y: 1}),
      ],
    },
    allowedDirections: ['left'],
    action: {
      texts: ['interagir'],
    },
    fragment: null,
  }),

  new InteractiveObject({                 //sofá 2
    spriteSrc: sofaTwoSprite,
    interactible: true,
    size: 325,
    position: {
      canvas: { x: 610, y: -70 },
      map: { x: mapOneOrigin.x + 13 * DX, y: mapOneOrigin.y - 12 * DY },
      tiles: [
        easyCoords({ x: 0, y: 0}),
        easyCoords({ x: 1, y: 0}),
        easyCoords({ x: 2, y: 0}),
        easyCoords({ x: 3, y: 0}),
        easyCoords({ x: 4, y: 0}),
        easyCoords({ x: 5, y: 0}),
        easyCoords({ x: 0, y: 1}),
        easyCoords({ x: 1, y: 1}),
        easyCoords({ x: 2, y: 1}),
        easyCoords({ x: 3, y: 1}),
        easyCoords({ x: 4, y: 1}),
      ],
      hitboxes: [
        easyCoords({ x: 0, y: 2 }),
        easyCoords({ x: 1, y: 2 }),
        easyCoords({ x: 2, y: 2 }),
        easyCoords({ x: 3, y: 2 }),
        easyCoords({ x: 4, y: 2 }),
      ],
    },
    allowedDirections: ['left'],
    action: {
      texts: ['interagir'],
    },
    fragment: null,
  }),

  new InteractiveObject({                 //mesa de reunião
    spriteSrc: meetingDeskSprite,
    interactible: true,
    size: 620,
    position: {
      canvas: { x: 280, y: 380 },
      map: { x: mapOneOrigin.x + 9 * DX, y: mapOneOrigin.y + 4 * DY },
      tiles: [
        easyCoords({ x: -1, y: -1 }),
        easyCoords({ x: -2, y: 0 }),
        easyCoords({ x: 0, y: 0}),
        easyCoords({ x: 1, y: 0}),
        easyCoords({ x: 2, y: 0}),
        easyCoords({ x: 3, y: 0}),
        easyCoords({ x: 4, y: 0}),  
        easyCoords({ x: 0, y: 1}),
        easyCoords({ x: 1, y: 1}),
        easyCoords({ x: 2, y: 1}),
        easyCoords({ x: 3, y: 1}),
        easyCoords({ x: 4, y: 1}),
        easyCoords({ x: 0, y: 2}),
        easyCoords({ x: 1, y: 2}),
        easyCoords({ x: 2, y: 2}),
        easyCoords({ x: 3, y: 2}),
        easyCoords({ x: 4, y: 2}),
        easyCoords({ x: 0, y: 3}),
        easyCoords({ x: 1, y: 3}),
        easyCoords({ x: 2, y: 3}),
        easyCoords({ x: 3, y: 3}),
        easyCoords({ x: 4, y: 3}),
        easyCoords({ x: 0, y: 4}),
        easyCoords({ x: 1, y: 4}),
        easyCoords({ x: 2, y: 4}),
        easyCoords({ x: 3, y: 4}),
        easyCoords({ x: 4, y: 4}),
      ],
      hitboxes: [
        easyCoords({ x: -1, y: 0 }),
        easyCoords({ x: -1, y: 1 }),
        easyCoords({ x: -1, y: 2 }),
        easyCoords({ x: -1, y: 3 }),
        easyCoords({ x: -1, y: 4 }),
      ],
    },
    allowedDirections: ['up'],
    action: {
      texts: ['interagir'],
    },
    fragment: null,
  }),

  new InteractiveObject({                 //mesa do dev pleno
    spriteSrc: midLevelDeskSprite,
    interactible: true,
    size: 365,
    position: {
      canvas: { x: 840, y: 680 },
      map: { x: mapOneOrigin.x + 18 * DX, y: mapOneOrigin.y + 15 * DY },
      tiles: [
        easyCoords({ x: 0, y: 0}),
        easyCoords({ x: 1, y: 0}),
        easyCoords({ x: 2, y: 0}),
        easyCoords({ x: 3, y: 0}),
        easyCoords({ x: 0, y: 1}),
        easyCoords({ x: 1, y: 1}),
        easyCoords({ x: 2, y: 1}),
        easyCoords({ x: 3, y: 1}),
        easyCoords({ x: 0, y: 2}),
        easyCoords({ x: 1, y: 2}),
        easyCoords({ x: 2, y: 2}),
        easyCoords({ x: 3, y: 2}),
      ],
      hitboxes: [
        easyCoords({ x: 0, y: 3}),
        easyCoords({ x: 1, y: 3}),
        easyCoords({ x: 2, y: 3}),
      ],
    },
    allowedDirections: ['left'],
    action: {
      texts: ['interagir'],
    },
    fragment: null,
  }),

  new InteractiveObject({                 //mesa do dev sênior
    spriteSrc: seniorDeskSprite,
    interactible: true,
    size: 355,
    position: {
      canvas: { x: 1095, y: 565 },
      map: { x: mapOneOrigin.x + 23 * DX, y: mapOneOrigin.y + 10 * DY },
      tiles: [
        easyCoords({ x: 0, y: 0}),
        easyCoords({ x: 1, y: 0}),
        easyCoords({ x: 2, y: 0}),
        easyCoords({ x: 3, y: 0}),
        easyCoords({ x: 1, y: 1}),
        easyCoords({ x: 2, y: 1}),
        easyCoords({ x: 3, y: 1}),
        easyCoords({ x: 1, y: 2}),
        easyCoords({ x: 2, y: 2}),
        easyCoords({ x: 3, y: 2}),
      ],
      hitboxes: [
        easyCoords({ x: 0, y: 1}),
        easyCoords({ x: 0, y: 2}),
        easyCoords({ x: 1, y: 3}),
        easyCoords({ x: 2, y: 3}),
      ],
    },
    allowedDirections: ['left'],
    action: {
      texts: ['interagir'],
    },
    fragment: null,
  }),

  new InteractiveObject({                 //mesa do dev júnior
    spriteSrc: juniorDeskSprite,
    interactible: true,
    size: 345,
    position: {
      canvas: { x: 1350, y: 435 },
      map: { x: mapOneOrigin.x + 28 * DX, y: mapOneOrigin.y + 5 * DY },
      tiles: [
        easyCoords({ x: 0, y: 0}),
        easyCoords({ x: 1, y: 0}),
        easyCoords({ x: 2, y: 0}),
        easyCoords({ x: 3, y: 0}),
        easyCoords({ x: 1, y: 1}),
        easyCoords({ x: 2, y: 1}),
        easyCoords({ x: 3, y: 1}),
        easyCoords({ x: 1, y: 2}),
        easyCoords({ x: 2, y: 2}),
        easyCoords({ x: 3, y: 2}),
      ],
      hitboxes: [
        easyCoords({ x: 0, y: 1}),
        easyCoords({ x: 0, y: 2}),
        easyCoords({ x: 1, y: 3}),
        easyCoords({ x: 2, y: 3}),
      ],
    },
    allowedDirections: ['left'],
    action: {
      texts: ['interagir'],
    },
    fragment: null,
  }),

  new InteractiveObject({                 //mesa do estagiário
    spriteSrc: internDeskSprite,
    interactible: true,
    size: 345,
    position: {
      canvas: { x: 1020, y: 275 },
      map: { x: mapOneOrigin.x + 21 * DX, y: mapOneOrigin.y - 2 * DY },
      tiles: [
        easyCoords({ x: 0, y: 0}),
        easyCoords({ x: 1, y: 0}),
        easyCoords({ x: 2, y: 0}),
        easyCoords({ x: 3, y: 0}),
        easyCoords({ x: 1, y: 1}),
        easyCoords({ x: 2, y: 1}),
        easyCoords({ x: 3, y: 1}),
        easyCoords({ x: 1, y: 2}),
        easyCoords({ x: 2, y: 2}),
        easyCoords({ x: 3, y: 2}),
      ],
      hitboxes: [
        easyCoords({ x: 0, y: 1}),
        easyCoords({ x: 0, y: 2}),
        easyCoords({ x: 1, y: 3}),
        easyCoords({ x: 2, y: 3}),
      ],
    },
    allowedDirections: ['left'],
    action: {
      texts: ['interagir'],
    },
    fragment: null,
  }),

  new InteractiveObject({                 //pufes
    spriteSrc: beanBagsSprite,
    interactible: true,
    size: 345,
    position: {
      canvas: { x: 1620, y:350 },
      map: { x: mapOneOrigin.x + 33 * DX, y: mapOneOrigin.y - 2 * DY },
      tiles: [
        easyCoords({ x: 0, y: 0}),
        easyCoords({ x: 1, y: 0}),
        easyCoords({ x: 0, y: 1}),
        easyCoords({ x: 1, y: 1}),
        easyCoords({ x: 0, y: 2}),
        easyCoords({ x: 1, y: 2}),
        easyCoords({ x: 0, y: 3}),
        easyCoords({ x: 1, y: 3}),
        easyCoords({ x: 1, y: 4}),
      ],
      hitboxes: [
        easyCoords({ x: -1, y: 1}),
        easyCoords({ x: -1, y: 2}),
        easyCoords({ x: -1, y: 3}),
      ],
    },
    allowedDirections: ['up'],
    action: {
      texts: ['interagir'],
    },
    fragment: null,
  }),

  new InteractiveObject({                 //estante com livros
    spriteSrc: bookshelfSprite,
    interactible: true,
    size: 345,
    position: {
      canvas: { x: 1320, y: 150 },
      map: { x: mapOneOrigin.x + 27 * DX, y: mapOneOrigin.y - 10 * DY },
      tiles: [
        easyCoords({ x: 0, y: 0}),
        easyCoords({ x: 0, y: 1}),
        easyCoords({ x: 0, y: 2}),
        easyCoords({ x: 0, y: 3}),
        easyCoords({ x: 0, y: 4}),
        easyCoords({ x: 0, y: 5}),
      ],
      hitboxes: [
        easyCoords({ x: -1, y: 0}),
        easyCoords({ x: -1, y: 1}),
        easyCoords({ x: -1, y: 2}),
        easyCoords({ x: -1, y: 3}),
        easyCoords({ x: -1, y: 4}),
      ],
    },
    allowedDirections: ['up'],
    action: {
      texts: ['interagir'],
    },
    fragment: null,
  }),
];

const sceneOne = { playerOrigin, floor, objects };
export { sceneOne, mapOneOrigin };
