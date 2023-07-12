import roomSprite from '../../../assets/isometric/room.png';
import waterDispenserSprite from '../../../assets/isometric/waterDispenser.png';
import sofaOneSprite from '../../../assets/isometric/sofaOne.png';
import { tileMap } from './TileMap';
import { InteractiveObject, Floor } from '../../../classes';
import { SofaOneFragment } from '../../fragments/SofaOneFragment';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  FLOOR_PADDING,
  DX,
  DY,
} from '../../../constants';

//ORIGEM DO JOGADOR E DO CHÃO//////////////////////////////////////////////////////////
const mapOrigin = {
  x: FLOOR_PADDING,
  y: 0.75 * CANVAS_HEIGHT,
};

const playerOrigin = {
  x: mapOrigin.x + 9 * DX,
  y: mapOrigin.y - 4 * DY,
};

//CHÃO/////////////////////////////////////////////////////////////////////////////////
const floor = new Floor({
  tileMap,
  spriteSrc: roomSprite,
  size: 2.05 * CANVAS_WIDTH,
  position: {
    canvas: { x: mapOrigin.x - 35, y: mapOrigin.y - 39*DY},
    map: mapOrigin,
  },
});

const objects = [

  new InteractiveObject({
    spriteSrc: waterDispenserSprite,
    interactible: false,
    size: 80,
    position: {
      canvas: { x: 0, y: 310 },
      map: { x: mapOrigin.x + DX, y: mapOrigin.y},
      tiles: [
        { x: 0, y: 0 },
      ],
      hitboxes: [],
    },
    allowedDirections: [],
    action: null,
    fragment: null,
  }),

  new InteractiveObject({
    spriteSrc: sofaOneSprite,
    interactible: true,
    size: 395,
    position: {
      canvas: { x: 105, y: 240 },
      map: { x: mapOrigin.x + 3 * DX, y: mapOrigin.y - 2 * DY },
      tiles: [
        { x: 0, y: 0 },
        { x: DX, y: -DY },
        { x: 2 * DX, y: -2 * DY },
        { x: 3 * DX, y: -3 * DY },
        { x: 4 * DX, y: -4 * DY },
        { x: 5 * DX, y: -5 * DY },
        { x: 2 * DX, y: 0 },
        { x: 3 * DX, y: -1 * DY },
        { x: 4 * DX, y: -2 * DY },
        { x: 5 * DX, y: -3 * DY },
        { x: 6 * DX, y: -4 * DY },
      ],
      hitboxes: [
        { x: 3 * DX, y: DY },
        { x: 4 * DX, y: 0 },
        { x: 5 * DX, y: -1 * DY },
        { x: 6 * DX, y: -2 * DY },
        { x: 7 * DX, y: -3 * DY },
      ],
    },
    allowedDirections: ['left'],
    action: {
      texts: ['interagir'],
    },
    fragment: SofaOneFragment,
  }),
];


const sceneOne = { playerOrigin, floor, objects };
export { sceneOne };
