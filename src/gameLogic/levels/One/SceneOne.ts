import floorSprite from '../../../assets/floor.png';
import drawerSprite from '../../../assets/drawer.png';
import deskSprite from '../../../assets/desk.png';
import vDeskSprite from '../../../assets/v-desk.png';
import bottleSprite from '../../../assets/bottle.png';
import paperSprite from '../../../assets/paper.png';
import doorSound from '../../../assets/sounds/door.mp3';
import wooshSound from '../../../assets/sounds/woosh1.mp3';
import glassSound from '../../../assets/sounds/glass.mp3';
import paperSound from '../../../assets/sounds/paper.mp3';
import { tileMap } from './TileMap';
import {
  InteractiveObject,
  InventoryItem,
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
} from '../../../constants/index';

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
        size: CANVAS_WIDTH - 2*FLOOR_PADDING,
        position: { 
            canvas: {x: FLOOR_PADDING, y: 120},
            map: mapOrigin,
        },
    }
);

const objects = [
    //ARMÁRIO///////////////////////////////////////////////////////////////////////////   
    new InteractiveObject(
        drawerSprite,
        DRAWER_SIZE,
        { 
            canvas: {x: 100, y: 0.18*(CANVAS_HEIGHT - DRAWER_SIZE)},
            map: {x: mapOrigin.x + 3*DX, y: mapOrigin.y - 2*DY},
            tiles: [{x: 0, y: 0}, {x: DX, y: -DY}],
            hitboxes: [{x: DX, y: DY}, {x: 2*DX, y: 0}],
        },
        false,
        ['left'],
        {
            sound: doorSound,
            texts: ['abrir o armário', 'fechar o armário'],
        }
    ),

    //MESA COM COMPUTADOR///////////////////////////////////////////////////////////////////
    new InteractiveObject(
        deskSprite,
        DESK_SIZE,
        { 
            canvas: {x: 420, y: 0.08*(CANVAS_HEIGHT - DESK_SIZE)},
            map: {x: mapOrigin.x + 9*DX, y: mapOrigin.y - 6*DY},
            tiles: [{x: 0, y: 0}, {x: DX, y: DY}, {x: 2*DX, y: 2*DY}],
            hitboxes: [{x: -DX, y: DY}, {x: 0, y: 2*DY}, {x: DX, y: 3*DY}],
        },
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
            map: {x: mapOrigin.x + 6*DX, y: mapOrigin.y + 5*DY},
            tiles: [
                {x: 0, y: 0}, {x: DX, y: DY}, {x: 2*DX, y: 2*DY}, {x: 3*DX, y: 3*DY},
                {x: 4*DX, y: 2*DY}, {x: 5*DX, y: DY}, {x: 6*DX, y: 0},
            ],
            hitboxes: [
                {x: DX, y: -DY}, {x: 2*DX, y: 0}, {x: 3*DX, y: DY},
                {x: 4*DX, y: 0}, {x: 5*DX, y: -DY},
            ],
        },
        true,
        ['down', 'right'],
    ),
];

const sceneOne = { playerOrigin, floor, objects };
export { sceneOne };