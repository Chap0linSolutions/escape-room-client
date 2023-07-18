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
import { TableFragment } from '../../fragments/TableFragment';

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
  new InteractiveObject({
    //porta
    spriteSrc: doorSprite,
    interactible: true,
    size: 240,
    position: {
      referenceTile: { x: 20, y: 1 },
      canvas: { x: 1073, y: -198 },
      map: { x: mapOneOrigin.x + DX, y: mapOneOrigin.y },
      tiles: [easyCoords({ x: 18, y: 6 })],
      hitboxes: [
        easyCoords({ x: 18, y: 2 }),
        easyCoords({ x: 18, y: 3 }),
        easyCoords({ x: 18, y: 4 }),
        easyCoords({ x: 18, y: 5 }),
      ],
    },
    allowedDirections: ['up'],
    action: null,
    fragment: null,
  }),

  new InteractiveObject({
    //bebedouro
    spriteSrc: waterDispenserSprite,
    interactible: false,
    size: 80,
    position: {
      referenceTile: { x: 0.1, y: 0.1 },
      canvas: { x: 0, y: 310 },
      map: { x: mapOneOrigin.x + DX, y: mapOneOrigin.y },
      tiles: [easyCoords({ x: 0, y: 0 })],
      hitboxes: [],
    },
    allowedDirections: [],
    action: null,
    fragment: null,
  }),

  new InteractiveObject({
    //sofá 1
    spriteSrc: sofaOneSprite,
    interactible: true,
    size: 395,
    position: {
      referenceTile: { x: 3, y: 0.5 },
      canvas: { x: 105, y: 240 },
      map: { x: mapOneOrigin.x + DX, y: mapOneOrigin.y },
      tiles: [
        easyCoords({ x: 2, y: 0 }),
        easyCoords({ x: 3, y: 0 }),
        easyCoords({ x: 4, y: 0 }),
        easyCoords({ x: 5, y: 0 }),
        easyCoords({ x: 6, y: 0 }),
        easyCoords({ x: 7, y: 0 }),
        easyCoords({ x: 3, y: 1 }),
        easyCoords({ x: 4, y: 1 }),
        easyCoords({ x: 5, y: 1 }),
        easyCoords({ x: 6, y: 1 }),
        easyCoords({ x: 7, y: 1 }),
      ],
      hitboxes: [
        easyCoords({ x: 3, y: 2 }),
        easyCoords({ x: 4, y: 2 }),
        easyCoords({ x: 5, y: 2 }),
        easyCoords({ x: 6, y: 2 }),
        easyCoords({ x: 7, y: 2 }),
      ],
    },
    allowedDirections: ['left'],
    action: {
      texts: ['interagir'],
    },
    fragment: SofaOneFragment,
  }),

  new InteractiveObject({
    //armário
    spriteSrc: drawerSprite,
    interactible: true,
    size: 215,
    position: {
      referenceTile: { x: 9.5, y: 0 },
      canvas: { x: 420, y: 105 },
      map: { x: mapOneOrigin.x + DX, y: mapOneOrigin.y },
      tiles: [
        easyCoords({ x: 8, y: 0 }),
        easyCoords({ x: 9, y: 0 }),
        easyCoords({ x: 10, y: 0 }),
        easyCoords({ x: 11, y: 0 }),
      ],
      hitboxes: [
        easyCoords({ x: 8, y: 1 }),
        easyCoords({ x: 9, y: 1 }),
        easyCoords({ x: 10, y: 1 }),
        easyCoords({ x: 11, y: 1 }),
      ],
    },
    allowedDirections: ['left'],
    action: {
      texts: ['interagir'],
    },
    fragment: null,
  }),

  new InteractiveObject({
    //sofá 2
    spriteSrc: sofaTwoSprite,
    interactible: true,
    size: 325,
    position: {
      referenceTile: { x: 14, y: 0.5 },
      canvas: { x: 610, y: -70 },
      map: { x: mapOneOrigin.x + DX, y: mapOneOrigin.y },
      tiles: [
        easyCoords({ x: 12, y: 0 }),
        easyCoords({ x: 13, y: 0 }),
        easyCoords({ x: 14, y: 0 }),
        easyCoords({ x: 15, y: 0 }),
        easyCoords({ x: 16, y: 0 }),
        easyCoords({ x: 17, y: 0 }),
        easyCoords({ x: 12, y: 1 }),
        easyCoords({ x: 13, y: 1 }),
        easyCoords({ x: 14, y: 1 }),
        easyCoords({ x: 15, y: 1 }),
        easyCoords({ x: 16, y: 1 }),
      ],
      hitboxes: [
        easyCoords({ x: 12, y: 2 }),
        easyCoords({ x: 13, y: 2 }),
        easyCoords({ x: 14, y: 2 }),
        easyCoords({ x: 15, y: 2 }),
        easyCoords({ x: 16, y: 2 }),
      ],
    },
    allowedDirections: ['left'],
    action: {
      texts: ['interagir'],
    },
    fragment: null,
  }),

  new InteractiveObject({
    //mesa de reunião
    spriteSrc: meetingDeskSprite,
    interactible: true,
    size: 620,
    position: {
      referenceTile: { x: 3, y: 8.5 },
      canvas: { x: 280, y: 380 },
      map: { x: mapOneOrigin.x + DX, y: mapOneOrigin.y },
      tiles: [
        easyCoords({ x: 0, y: 6 }),
        easyCoords({ x: 1, y: 5 }),
        easyCoords({ x: 2, y: 7 }),
        easyCoords({ x: 2, y: 8 }),
        easyCoords({ x: 2, y: 9 }),
        easyCoords({ x: 2, y: 10 }),
        easyCoords({ x: 2, y: 7 }),
        easyCoords({ x: 2, y: 8 }),
        easyCoords({ x: 2, y: 9 }),
        easyCoords({ x: 2, y: 10 }),
        easyCoords({ x: 2, y: 6 }),
        easyCoords({ x: 2, y: 7 }),
        easyCoords({ x: 2, y: 8 }),
        easyCoords({ x: 2, y: 9 }),
        easyCoords({ x: 2, y: 10 }),
        easyCoords({ x: 3, y: 6 }),
        easyCoords({ x: 3, y: 7 }),
        easyCoords({ x: 3, y: 8 }),
        easyCoords({ x: 3, y: 9 }),
        easyCoords({ x: 3, y: 10 }),
        easyCoords({ x: 4, y: 6 }),
        easyCoords({ x: 4, y: 7 }),
        easyCoords({ x: 4, y: 8 }),
        easyCoords({ x: 4, y: 9 }),
        easyCoords({ x: 4, y: 10 }),
        easyCoords({ x: 5, y: 6 }),
        easyCoords({ x: 5, y: 7 }),
        easyCoords({ x: 5, y: 8 }),
        easyCoords({ x: 5, y: 9 }),
        easyCoords({ x: 5, y: 10 }),
        easyCoords({ x: 6, y: 6 }),
        easyCoords({ x: 6, y: 7 }),
        easyCoords({ x: 6, y: 8 }),
        easyCoords({ x: 6, y: 9 }),
        easyCoords({ x: 6, y: 10 }),
      ],
      hitboxes: [
        easyCoords({ x: 1, y: 7 }),
        easyCoords({ x: 1, y: 8 }),
        easyCoords({ x: 1, y: 9 }),
        easyCoords({ x: 7, y: 6 }),
        easyCoords({ x: 7, y: 7 }),
        easyCoords({ x: 7, y: 8 }),
        easyCoords({ x: 7, y: 9 }),
      ],
    },
    allowedDirections: ['up', 'down'],
    action: {
      texts: ['interagir'],
    },
    fragment: TableFragment,
  }),

  new InteractiveObject({
    //mesa do dev pleno
    spriteSrc: midLevelDeskSprite,
    interactible: true,
    size: 365,
    position: {
      referenceTile: { x: 2.5, y: 17 },
      canvas: { x: 840, y: 680 },
      map: { x: mapOneOrigin.x + DX, y: mapOneOrigin.y },
      tiles: [
        easyCoords({ x: 1, y: 16 }),
        easyCoords({ x: 2, y: 16 }),
        easyCoords({ x: 3, y: 16 }),
        easyCoords({ x: 4, y: 16 }),
        easyCoords({ x: 1, y: 17 }),
        easyCoords({ x: 2, y: 17 }),
        easyCoords({ x: 3, y: 17 }),
        easyCoords({ x: 4, y: 17 }),
        easyCoords({ x: 2, y: 18 }),
        easyCoords({ x: 3, y: 18 }),
        easyCoords({ x: 4, y: 18 }),
      ],
      hitboxes: [
        easyCoords({ x: 1, y: 18 }),
        easyCoords({ x: 2, y: 19 }),
        easyCoords({ x: 3, y: 19 }),
      ],
    },
    allowedDirections: ['left'],
    action: {
      texts: ['interagir'],
    },
    fragment: null,
  }),

  new InteractiveObject({
    //mesa do dev sênior
    spriteSrc: seniorDeskSprite,
    interactible: true,
    size: 355,
    position: {
      referenceTile: { x: 7.5, y: 17 },
      canvas: { x: 1095, y: 565 },
      map: { x: mapOneOrigin.x + DX, y: mapOneOrigin.y },
      tiles: [
        easyCoords({ x: 6, y: 16 }),
        easyCoords({ x: 7, y: 16 }),
        easyCoords({ x: 8, y: 16 }),
        easyCoords({ x: 9, y: 16 }),
        easyCoords({ x: 6, y: 17 }),
        easyCoords({ x: 7, y: 17 }),
        easyCoords({ x: 8, y: 17 }),
        easyCoords({ x: 9, y: 17 }),
        easyCoords({ x: 7, y: 18 }),
        easyCoords({ x: 8, y: 18 }),
        easyCoords({ x: 9, y: 18 }),
      ],
      hitboxes: [
        easyCoords({ x: 6, y: 18 }),
        easyCoords({ x: 7, y: 19 }),
        easyCoords({ x: 8, y: 19 }),
      ],
    },
    allowedDirections: ['left'],
    action: {
      texts: ['interagir'],
    },
    fragment: null,
  }),

  new InteractiveObject({
    //mesa do dev júnior
    spriteSrc: juniorDeskSprite,
    interactible: true,
    size: 345,
    position: {
      referenceTile: { x: 12.5, y: 17 },
      canvas: { x: 1350, y: 435 },
      map: { x: mapOneOrigin.x + DX, y: mapOneOrigin.y },
      tiles: [
        easyCoords({ x: 11, y: 16 }),
        easyCoords({ x: 12, y: 16 }),
        easyCoords({ x: 13, y: 16 }),
        easyCoords({ x: 14, y: 16 }),
        easyCoords({ x: 11, y: 17 }),
        easyCoords({ x: 12, y: 17 }),
        easyCoords({ x: 13, y: 17 }),
        easyCoords({ x: 14, y: 17 }),
        easyCoords({ x: 12, y: 18 }),
        easyCoords({ x: 13, y: 18 }),
        easyCoords({ x: 14, y: 18 }),
      ],
      hitboxes: [
        easyCoords({ x: 11, y: 18 }),
        easyCoords({ x: 12, y: 19 }),
        easyCoords({ x: 13, y: 19 }),
      ],
    },
    allowedDirections: ['left'],
    action: {
      texts: ['interagir'],
    },
    fragment: null,
  }),

  new InteractiveObject({
    //mesa do estagiário
    spriteSrc: internDeskSprite,
    interactible: true,
    size: 345,
    position: {
      referenceTile: { x: 12.5, y: 10 },
      canvas: { x: 1020, y: 275 },
      map: { x: mapOneOrigin.x + DX, y: mapOneOrigin.y },
      tiles: [
        easyCoords({ x: 11, y: 9 }),
        easyCoords({ x: 12, y: 9 }),
        easyCoords({ x: 13, y: 9 }),
        easyCoords({ x: 14, y: 9 }),
        easyCoords({ x: 11, y: 10 }),
        easyCoords({ x: 12, y: 10 }),
        easyCoords({ x: 13, y: 10 }),
        easyCoords({ x: 14, y: 10 }),
        easyCoords({ x: 12, y: 11 }),
        easyCoords({ x: 13, y: 11 }),
        easyCoords({ x: 14, y: 11 }),
      ],
      hitboxes: [
        easyCoords({ x: 11, y: 11 }),
        easyCoords({ x: 12, y: 12 }),
        easyCoords({ x: 13, y: 12 }),
      ],
    },
    allowedDirections: ['left'],
    action: {
      texts: ['interagir'],
    },
    fragment: null,
  }),

  new InteractiveObject({
    //pufes
    spriteSrc: beanBagsSprite,
    interactible: true,
    size: 345,
    position: {
      referenceTile: { x: 17, y: 14 },
      canvas: { x: 1620, y: 350 },
      map: { x: mapOneOrigin.x + DX, y: mapOneOrigin.y },
      tiles: [
        easyCoords({ x: 17, y: 15 }),
        easyCoords({ x: 17, y: 16 }),
        easyCoords({ x: 17, y: 17 }),
        easyCoords({ x: 17, y: 18 }),
        easyCoords({ x: 18, y: 14 }),
        easyCoords({ x: 18, y: 15 }),
        easyCoords({ x: 18, y: 16 }),
        easyCoords({ x: 18, y: 17 }),
        easyCoords({ x: 18, y: 18 }),
        easyCoords({ x: 18, y: 19 }),
      ],
      hitboxes: [
        easyCoords({ x: 16, y: 16 }),
        easyCoords({ x: 16, y: 17 }),
        easyCoords({ x: 16, y: 18 }),
      ],
    },
    allowedDirections: ['up'],
    action: {
      texts: ['interagir'],
    },
    fragment: null,
  }),

  new InteractiveObject({
    //estante com livros
    spriteSrc: bookshelfSprite,
    interactible: true,
    size: 345,
    position: {
      referenceTile: { x: 18, y: 8 },
      canvas: { x: 1320, y: 150 },
      map: { x: mapOneOrigin.x + DX, y: mapOneOrigin.y },
      tiles: [
        easyCoords({ x: 18, y: 8 }),
        easyCoords({ x: 18, y: 9 }),
        easyCoords({ x: 18, y: 10 }),
        easyCoords({ x: 18, y: 11 }),
        easyCoords({ x: 18, y: 12 }),
        easyCoords({ x: 18, y: 13 }),
      ],
      hitboxes: [
        easyCoords({ x: 17, y: 8 }),
        easyCoords({ x: 17, y: 9 }),
        easyCoords({ x: 17, y: 10 }),
        easyCoords({ x: 17, y: 11 }),
        easyCoords({ x: 17, y: 12 }),
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
