import roomSprite from '../../../assets/isometric/room.png';
import { tileMap } from './TileMap';
import { InteractiveObject, Floor } from '../../../classes';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  FLOOR_PADDING,
  DX,
  DY,
} from '../../../constants';
import { SofaFragment } from '../../fragments/SofaFragment';

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
  size: 1.4 * CANVAS_WIDTH,
  position: {
    canvas: { x: mapOrigin.x, y: mapOrigin.y - 26*DY},
    map: mapOrigin,
  },
});

const objects = [
  //this array is where all the scene objects will be added.
  //you should include your own, as well as its respective fragment, here. below is a dummy object in case you need an example.

  // new InteractiveObject({
  //   spriteSrc: sofaSprite,
  //   size: 225,
  //   position: {
  //     canvas: { x: 95, y: 310 },
  //     map: { x: mapOrigin.x + 3 * DX, y: mapOrigin.y - 2 * DY },
  //     tiles: [
  //       { x: 0, y: 0 },
  //       { x: DX, y: -DY },
  //       { x: 2 * DX, y: -2 * DY },
  //     ],
  //     hitboxes: [
  //       { x: DX, y: DY },
  //       { x: 2 * DX, y: 0 },
  //       { x: 3 * DX, y: -DY },
  //     ],
  //   },
  //   allowedDirections: ['left'],
  //   action: {
  //     texts: ['interagir'],
  //   },
  //   fragment: SofaFragment,
  // }),
];


const sceneOne = { playerOrigin, floor, objects };
export { sceneOne };
