import playerSprite from '../assets/player.png';
import { coordinate } from '../types';
import { Player } from '../classes';
import {
  PLAYER_SIZE,
  PLAYER_SPEED,
  ANIMATION_PERIOD,
  PLAYER_FEET_OFFSET,
  DX,
  DY,
} from '../constants';

export const spawnPlayer = (origin) => {
  const playerOrigin = origin;

  const players = [
    new Player({
      name: 'Alex',
      spriteSrc: playerSprite,
      position: playerOrigin,
      speed: PLAYER_SPEED,
      size: PLAYER_SIZE,
      animationPeriod: ANIMATION_PERIOD,
      feetOffset: PLAYER_FEET_OFFSET,
    }),
  ];

  return players;
};

export function buildTileMap({
  x,
  y,
}: {
  x: number;
  y: number;
}): coordinate[][] {
  const tileMap = [];
  for (let i = 0; i < x; i += 1) {
    const row: coordinate[] = [];
    for (let j = 0; j < y; j += 1) {
      row.push({ x: (i + j) * DX, y: (i - j) * DY });
    }
    tileMap.push(row);
  }
  return tileMap;
}

export async function buildScene(s: number) {
  // const {sceneOne} = await import("../gameLogic/levels/One");
  const { sceneTwo } = await import('../gameLogic/levels/Two');
  const { sceneThree } = await import('../gameLogic/levels/Three');

  const scenes = [sceneTwo, sceneThree]; //new scenes must be added to this array

  const objects = scenes[s].objects;
  const floor = scenes[s].floor;
  const playerOrigin = scenes[s].playerOrigin;

  return { objects, floor, playerOrigin };
}
