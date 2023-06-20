import playerSprite from '../assets/player.png';
import { Player } from '../classes';
import { sceneOne } from '../constants/scenes/One';
import { sceneTwo } from '../constants/scenes/Two';
import {
  PLAYER_SIZE,
  PLAYER_SPEED,
  ANIMATION_PERIOD,
  PLAYER_FEET_OFFSET,
} from '../constants';


const scenes = [sceneOne, sceneTwo];  //new scenes must be added to this array

export const spawnPlayer = (s: number) => {
  const playerOrigin = scenes[s].playerOrigin;

  const players = [
    new Player(
      'Alex',
      playerSprite,
      playerOrigin,
      PLAYER_SPEED,
      PLAYER_SIZE,
      ANIMATION_PERIOD,
      PLAYER_FEET_OFFSET,
    ),
  ];

  return players;
};


export function buildScene(s: number) {
  const objects = scenes[s].objects;
  const floor = scenes[s].floor;

  return { objects, floor }
}
