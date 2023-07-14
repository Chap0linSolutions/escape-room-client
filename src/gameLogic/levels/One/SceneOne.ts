import roomSprite from '../../../assets/isometric/room.png';
import sofaSprite from '../../../assets/sofa_raw.png';
import { tileMap } from './TileMap';
import { InteractiveObject, Floor } from '../../../classes';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  FLOOR_PADDING,
  DX,
  DY,
} from '../../../constants';
import { easyCoords } from '../../../functions/Builder';
import { SofaFragment } from '../../fragments/SofaFragment';

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
  //this array is where all the scene objects will be added.
  //you should include your own, as well as its respective fragment, here. below is a dummy object in case you need an example.

  new InteractiveObject({
    spriteSrc: sofaSprite,
    size: 265,
    position: {
      canvas: { x: 175, y: 320 },
      map: { x: mapOneOrigin.x + DX, y: mapOneOrigin.y },
      referenceTile: { x: 3.5, y: 1.5 },
      tiles: [
        easyCoords({ x: 2, y: 2 }),
        easyCoords({ x: 3, y: 2 }),
        easyCoords({ x: 4, y: 2 }),
        easyCoords({ x: 5, y: 2 }),
        easyCoords({ x: 2, y: 1 }),
        easyCoords({ x: 3, y: 1 }),
        easyCoords({ x: 4, y: 1 }),
        easyCoords({ x: 5, y: 1 }),
      ],
      hitboxes: [
        easyCoords({ x: 2, y: 3 }),
        easyCoords({ x: 3, y: 3 }),
        easyCoords({ x: 4, y: 3 }),
      ],
    },
    allowedDirections: ['left'],
    action: {
      texts: ['interagir'],
    },
    fragment: null,
  }),
];

const sceneOne = { playerOrigin, floor, objects };
export { sceneOne, mapOneOrigin };
