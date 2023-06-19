import { coordinate } from "../types";
import { ISOMETRIC_RATIO, TILE_SIZE, FLOOR_PADDING, CANVAS_HEIGHT } from "./index";

const mapOrigin = {
    x: FLOOR_PADDING,
    y: 0.5 * CANVAS_HEIGHT + 6,
};

const dx = TILE_SIZE;
const dy = TILE_SIZE * ISOMETRIC_RATIO;

const tileMap: coordinate[][] = [
    [   //first row
        {x: 0, y: 0},
        {x: dx, y: -dy},
        {x: 2*dx, y: -2*dy},
        {x: 3*dx, y: -3*dy},
        {x: 4*dx, y: -4*dy},
        {x: 5*dx, y: -5*dy},
        {x: 6*dx, y: -6*dy},
        {x: 7*dx, y: -7*dy},
    ],
    [   //second row
        {x: dx, y: dy},
        {x: 2*dx, y: 0},
        {x: 3*dx, y: -dy},
        {x: 4*dx, y: -2*dy},
        {x: 5*dx, y: -3*dy},
        {x: 6*dx, y: -4*dy},
        {x: 7*dx, y: -5*dy},
        {x: 8*dx, y: -6*dy},
    ],
    [   //third row
        {x: 2*dx, y: 2*dy},
        {x: 3*dx, y: dy},
        {x: 4*dx, y: 0},
        {x: 5*dx, y: -1*dy},
        {x: 6*dx, y: -2*dy},
        {x: 7*dx, y: -3*dy},
        {x: 8*dx, y: -4*dy},
        {x: 9*dx, y: -5*dy},
    ],
    [   //fourth row
        {x: 3*dx, y: 3*dy},
        {x: 4*dx, y: 2*dy},
        {x: 5*dx, y: dy},
        {x: 6*dx, y: 0},
        {x: 7*dx, y: -1*dy},
        {x: 8*dx, y: -2*dy},
        {x: 9*dx, y: -3*dy},
        {x: 10*dx, y: -4*dy},
    ],
    [   //fifth row
        {x: 4*dx, y: 4*dy},
        {x: 5*dx, y: 3*dy},
        {x: 6*dx, y: 2*dy},
        {x: 7*dx, y: dy},
        {x: 8*dx, y: 0},
        {x: 9*dx, y: -1*dy},
        {x: 10*dx, y: -2*dy},
        {x: 11*dx, y: -3*dy},
    ],
    [   //sixth row
        {x: 5*dx, y: 5*dy},
        {x: 6*dx, y: 4*dy},
        {x: 7*dx, y: 3*dy},
        {x: 8*dx, y: 2*dy},
        {x: 9*dx, y: dy},
        {x: 10*dx, y: 0},
        {x: 11*dx, y: -1*dy},
        {x: 12*dx, y: -2*dy},
        {x: 13*dx, y: -3*dy},
        {x: 14*dx, y: -4*dy},
    ],
    [   //seventh row
        {x: 6*dx, y: 6*dy},
        {x: 7*dx, y: 5*dy},
        {x: 8*dx, y: 4*dy},
        {x: 9*dx, y: 3*dy},
        {x: 10*dx, y: 2*dy},
        {x: 11*dx, y: dy},
        {x: 12*dx, y: 0},
        {x: 13*dx, y: -1*dy},
        {x: 14*dx, y: -2*dy},
        {x: 15*dx, y: -3*dy},
    ],
    [   //eighth row
        {x: 7*dx, y: 7*dy},
        {x: 8*dx, y: 6*dy},
        {x: 9*dx, y: 5*dy},
        {x: 10*dx, y: 4*dy},
        {x: 11*dx, y: 3*dy},
        {x: 12*dx, y: 2*dy},
        {x: 13*dx, y: dy},
        {x: 14*dx, y: 0},
        {x: 15*dx, y: -1*dy},
        {x: 16*dx, y: -2*dy},
    ],
    [   //ninth row
        {x: 8*dx, y: 8*dy},
        {x: 9*dx, y: 7*dy},
        {x: 10*dx, y: 6*dy},
        {x: 11*dx, y: 5*dy},
        {x: 12*dx, y: 4*dy},
        {x: 13*dx, y: 3*dy},
        {x: 14*dx, y: 2*dy},
        {x: 15*dx, y: 1*dy},
        {x: 16*dx, y: 0},
        {x: 17*dx, y: -1*dy},
    ],
]

export { mapOrigin, tileMap, dx, dy };