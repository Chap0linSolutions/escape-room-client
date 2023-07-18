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

let tableTiles //<coordinate[]>[];
const tableStartX = 2;
const tableStartY = 6;
const tableSizeX = 5;
const tableSizeY = 6;

for (let i = tableStartX; i < tableSizeX + tableStartX; i += 1) {
  for (let j = tableStartY; j < tableSizeY + tableStartY; j += 1) {
    //tableTiles = tableTiles.concat(easyCoords({ x: i, y: j }));
  }
}

const objects = [
  //this array is where all the scene objects will be added.
  //you should include your own, as well as its respective fragment, here. below is a dummy object in case you need an example.

  new InteractiveObject({                 //porta
    spriteSrc: doorSprite,
    interactible: true,
    size: 240,
    position: {
      referenceTile: { x: 20, y: 1 },
      canvas: { x: 1073, y: -198 },
      map: { x: mapOneOrigin.x + DX, y: mapOneOrigin.y },
      tiles: [
        easyCoords({x: 18, y: 6}),
      ],
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

  new InteractiveObject({                 //bebedouro
    spriteSrc: waterDispenserSprite,
    interactible: false,
    size: 80,
    position: {
      referenceTile: { x: 0.1, y: 0.1 },
      canvas: { x: 0, y: 310 },
      map: { x: mapOneOrigin.x + DX, y: mapOneOrigin.y },
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
      canvas: { x: 95, y: 310 },
      map: { x: mapOrigin.x + DX, y: mapOrigin.y },
      tiles: [
        easyCoords({ x: 2, y: 0}),
        easyCoords({ x: 3, y: 0}),
        easyCoords({ x: 4, y: 0}),
        easyCoords({ x: 5, y: 0}),
        easyCoords({ x: 6, y: 0}),
        easyCoords({ x: 7, y: 0}),
        easyCoords({ x: 3, y: 1}),
        easyCoords({ x: 4, y: 1}),
        easyCoords({ x: 5, y: 1}),
        easyCoords({ x: 6, y: 1}),
        easyCoords({ x: 7, y: 1}),
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
    fragment: null,
  }),
  
  // new InteractiveObject({
  //   spriteSrc: tableSprite,
  //   size: 450,
  //   position: {
  //     canvas: { x: 480, y: 450 },
  //     map: { x: mapOrigin.x + DX, y: mapOrigin.y },
  //     tiles: tableTiles,
  //     hitboxes: [
  //       //easyCoords({ x: 1, y: 8 }),
  //       //easyCoords({ x: 1, y: 9 }),
  //       //easyCoords({ x: 1, y: 10 }),
  //       //easyCoords({ x: 7, y: 7 }),
  //       //easyCoords({ x: 7, y: 8 }),
  //       //easyCoords({ x: 7, y: 9 }),
  //     ],
  //   },
  //   allowedDirections: ['up', 'down'],
  //   action: {
  //     texts: ['interagir'],
  //   },
  //   fragment: null//TableFragment,
  // }),
];

const sceneOne = { playerOrigin, floor, objects };
export { sceneOne };
