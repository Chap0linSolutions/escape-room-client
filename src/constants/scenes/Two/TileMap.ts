import { coordinate } from "../../../types";
import { DX, DY } from "../../index";

const tileMap: coordinate[][] = [
    [   //first row
        {x: 0, y: 0},
        {x: DX, y: -DY},
        {x: 2*DX, y: -2*DY},
        {x: 3*DX, y: -3*DY},
        {x: 4*DX, y: -4*DY},
    ],
    [   //second row
        {x: DX, y: DY},
        {x: 2*DX, y: 0},
        {x: 3*DX, y: -DY},
        {x: 4*DX, y: -2*DY},
        {x: 5*DX, y: -3*DY},
        {x: 6*DX, y: -4*DY},
    ],
    [   //third row
        {x: 2*DX, y: 2*DY},
        {x: 3*DX, y: DY},
        {x: 4*DX, y: 0},
        {x: 5*DX, y: -1*DY},
        {x: 6*DX, y: -2*DY},
        {x: 7*DX, y: -3*DY},
    ],
    [   //fourth row
        {x: 3*DX, y: 3*DY},
        {x: 4*DX, y: 2*DY},
        {x: 5*DX, y: DY},
        {x: 6*DX, y: 0},
        {x: 7*DX, y: -1*DY},
        {x: 8*DX, y: -2*DY},
    ],
    [   //fifth row
        {x: 4*DX, y: 4*DY},
        {x: 5*DX, y: 3*DY},
        {x: 6*DX, y: 2*DY},
        {x: 7*DX, y: DY},
        {x: 8*DX, y: 0},
        {x: 9*DX, y: -1*DY},
    ],
    [   //sixth row
        {x: 5*DX, y: 5*DY},
        {x: 6*DX, y: 4*DY},
        {x: 7*DX, y: 3*DY},
        {x: 8*DX, y: 2*DY},
        {x: 9*DX, y: DY},
        {x: 10*DX, y: 0},
    ],
    [   //seventh row
        {x: 6*DX, y: 6*DY},
        {x: 7*DX, y: 5*DY},
        {x: 8*DX, y: 4*DY},
        {x: 9*DX, y: 3*DY},
        {x: 10*DX, y: 2*DY},
        {x: 11*DX, y: DY},
    ],
    [   //eighth row
        {x: 7*DX, y: 7*DY},
        {x: 8*DX, y: 6*DY},
        {x: 9*DX, y: 5*DY},
        {x: 10*DX, y: 4*DY},
        {x: 11*DX, y: 3*DY},
        {x: 12*DX, y: 2*DY},
    ],
    [   //ninth row
        {x: 8*DX, y: 8*DY},
        {x: 9*DX, y: 7*DY},
        {x: 10*DX, y: 6*DY},
        {x: 11*DX, y: 5*DY},
        {x: 12*DX, y: 4*DY},
        {x: 13*DX, y: 3*DY},
    ],
    [   //10th row
        {x: 9*DX, y: 9*DY},
        {x: 10*DX, y: 8*DY},
        {x: 11*DX, y: 7*DY},
        {x: 12*DX, y: 6*DY},
        {x: 13*DX, y: 5*DY},
        {x: 14*DX, y: 4*DY},
    ],
    [   //11th row
        {x: 10*DX, y: 10*DY},
        {x: 11*DX, y: 9*DY},
        {x: 12*DX, y: 8*DY},
        {x: 13*DX, y: 7*DY},
        {x: 14*DX, y: 6*DY},
        {x: 15*DX, y: 5*DY},
    ],
    [   //12th row
        {x: 11*DX, y: 11*DY},
        {x: 12*DX, y: 10*DY},
        {x: 13*DX, y: 9*DY},
        {x: 14*DX, y: 8*DY},
        {x: 15*DX, y: 7*DY},
        {x: 16*DX, y: 6*DY},
        {x: 17*DX, y: 5*DY},
        {x: 18*DX, y: 4*DY},
        {x: 19*DX, y: 3*DY},
        {x: 20*DX, y: 2*DY},
    ],
    [   //13th row
        {x: 12*DX, y: 12*DY},
        {x: 13*DX, y: 11*DY},
        {x: 14*DX, y: 10*DY},
        {x: 15*DX, y: 9*DY},
        {x: 16*DX, y: 8*DY},
        {x: 17*DX, y: 7*DY},
        {x: 18*DX, y: 6*DY},
        {x: 19*DX, y: 5*DY},
        {x: 20*DX, y: 4*DY},
        {x: 21*DX, y: 3*DY},
    ],
    [   //14th row
        {x: 13*DX, y: 13*DY},
        {x: 14*DX, y: 12*DY},
        {x: 15*DX, y: 11*DY},
        {x: 16*DX, y: 10*DY},
        {x: 17*DX, y: 9*DY},
        {x: 18*DX, y: 8*DY},
        {x: 19*DX, y: 7*DY},
        {x: 20*DX, y: 6*DY},
        {x: 21*DX, y: 5*DY},
        {x: 22*DX, y: 4*DY},
    ],
    [   //15th row
        {x: 14*DX, y: 14*DY},
        {x: 15*DX, y: 13*DY},
        {x: 16*DX, y: 12*DY},
        {x: 17*DX, y: 11*DY},
        {x: 18*DX, y: 10*DY},
        {x: 19*DX, y: 9*DY},
        {x: 20*DX, y: 8*DY},
        {x: 21*DX, y: 7*DY},
        {x: 22*DX, y: 6*DY},
        {x: 23*DX, y: 5*DY},
    ],
    [   //16th row
        {x: 15*DX, y: 15*DY},
        {x: 16*DX, y: 14*DY},
        {x: 17*DX, y: 13*DY},
        {x: 18*DX, y: 12*DY},
        {x: 19*DX, y: 11*DY},
        {x: 20*DX, y: 10*DY},
        {x: 21*DX, y: 9*DY},
        {x: 22*DX, y: 8*DY},
        {x: 23*DX, y: 7*DY},
        {x: 24*DX, y: 6*DY},
    ],
]

export { tileMap };