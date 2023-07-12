import roomSprite from '../../../assets/isometric/room.png';
import sofaSprite from '../../../assets/sofa_raw.png';
import tableSprite from '../../../assets/meeting_table.png';
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
import { coordinate } from '../../../types';
import { TableFragment } from '../../fragments/TableFragment';

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
    canvas: { x: mapOrigin.x - 35, y: mapOrigin.y - 39 * DY },
    map: mapOrigin,
  },
});

let tableTiles = <coordinate[]>[];
const tableStartX = 2;
const tableStartY = 6;
const tableSizeX = 5;
const tableSizeY = 6;

for (let i = tableStartX; i < tableSizeX + tableStartX; i += 1) {
  for (let j = tableStartY; j < tableSizeY + tableStartY; j += 1) {
    tableTiles = tableTiles.concat(easyCoords({ x: i, y: j }));
  }
}

const objects = [
  //this array is where all the scene objects will be added.
  //you should include your own, as well as its respective fragment, here. below is a dummy object in case you need an example.

  new InteractiveObject({
    spriteSrc: sofaSprite,
    size: 225,
    position: {
      canvas: { x: 95, y: 310 },
      map: { x: mapOrigin.x + DX, y: mapOrigin.y },
      tiles: [
        easyCoords({ x: 2, y: 0 }),
        easyCoords({ x: 3, y: 0 }),
        easyCoords({ x: 4, y: 0 }),
      ],
      hitboxes: [
        easyCoords({ x: 2, y: 1 }),
        easyCoords({ x: 3, y: 1 }),
        easyCoords({ x: 4, y: 1 }),
      ],
    },
    allowedDirections: ['left'],
    action: {
      texts: ['interagir'],
    },
    fragment: null,
  }),
  new InteractiveObject({
    spriteSrc: tableSprite,
    size: 450,
    position: {
      canvas: { x: 480, y: 450 },
      map: { x: mapOrigin.x + DX, y: mapOrigin.y },
      tiles: tableTiles,
      hitboxes: [
        easyCoords({ x: 1, y: 8 }),
        easyCoords({ x: 1, y: 9 }),
        easyCoords({ x: 1, y: 10 }),
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
];

const sceneOne = { playerOrigin, floor, objects };
export { sceneOne };
