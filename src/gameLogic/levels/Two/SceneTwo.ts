import floorSprite from '../../../assets/floor2.png';
import drawerSprite from '../../../assets/drawer.png';
import deskSprite from '../../../assets/desk.png';
import vDeskSprite from '../../../assets/v-desk.png';
import doorSound from '../../../assets/sounds/door.mp3';
import wooshSound from '../../../assets/sounds/woosh1.mp3';
import { tileMap } from './TileMap';
import {
  InteractiveObject,
  Floor,
} from '../../../classes';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  DRAWER_SIZE,
  DESK_SIZE,
  FLOOR_PADDING,
  V_DESK_SIZE,
  DX,
  DY,
} from '../../../constants';
import { ArmarioFragment } from '../../fragments/ArmarioFragment';

//ORIGEM DO JOGADOR E DO CHÃO//////////////////////////////////////////////////////////
const mapOrigin = {
    x: FLOOR_PADDING,
    y: 0.5 * CANVAS_HEIGHT + 6,
};

const playerOrigin = {
    x: mapOrigin.x + 9*DX,
    y: mapOrigin.y,
}

//CHÃO/////////////////////////////////////////////////////////////////////////////////
const floor = new Floor(
    {
        tileMap,
        spriteSrc: floorSprite,
        size: 1.4*CANVAS_WIDTH,
        position: { 
            canvas: {x: FLOOR_PADDING, y: -20},
            map: mapOrigin,
        },
    }
);

const objects = [
    //ARMÁRIO///////////////////////////////////////////////////////////////////////////   
    new InteractiveObject({
        spriteSrc: drawerSprite,
        size: DRAWER_SIZE,
        position: { 
            canvas: {x: 95, y: 90},
            map: {x: mapOrigin.x + 3*DX, y: mapOrigin.y - 2*DY},
            tiles: [{x: 0, y: 0}, {x: DX, y: -DY}],
            hitboxes: [{x: DX, y: DY}, {x: 2*DX, y: 0}],
        },
        allowedDirections: ['left'],
        fragment: ArmarioFragment,
        action: {
            sound: doorSound,
            texts: ['abrir o armário', 'fechar o armário'],
        }
    }),

    //MESA COM COMPUTADOR///////////////////////////////////////////////////////////////////
    new InteractiveObject({
        spriteSrc: deskSprite,
        size: DESK_SIZE,
        position: { 
            canvas: {x: 640, y: 280},
            map: {x: mapOrigin.x + 13*DX, y: mapOrigin.y + 2*DY},
            tiles: [{x: 0, y: 0}, {x: DX, y: DY}, {x: 2*DX, y: 2*DY}],
            hitboxes: [{x: -DX, y: DY}, {x: 0, y: 2*DY}, {x: DX, y: 3*DY}],
        },
        allowedDirections: ['up'],
        fragment: null,
        action: {
            sound: wooshSound,
            texts: ['abrir o notebook', 'fechar o notebook'],
        }
    }),

    //MESA EM L///////////////////////////////////////////////////////////////////////////
    new InteractiveObject({
        spriteSrc: vDeskSprite,
        size: V_DESK_SIZE,
        position: { 
            canvas: {x: 680, y: 640},
            map: {x: mapOrigin.x + 13*DX, y: mapOrigin.y + 12*DY},
            tiles: [
                {x: 0, y: 0}, {x: DX, y: DY}, {x: 2*DX, y: 2*DY}, {x: 3*DX, y: 3*DY},
                {x: 4*DX, y: 2*DY}, {x: 5*DX, y: DY}, {x: 6*DX, y: 0},
            ],
            hitboxes: [
                {x: DX, y: -DY}, {x: 2*DX, y: 0}, {x: 3*DX, y: DY},
                {x: 4*DX, y: 0}, {x: 5*DX, y: -DY},
            ],
        },
        allowedDirections: ['down', 'right'],
        fragment: null,
    }),
];

const sceneTwo = { playerOrigin, floor, objects };
export { sceneTwo };