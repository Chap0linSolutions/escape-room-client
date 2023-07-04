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
      {
      name: 'Alex',
      spriteSrc: playerSprite,
      position: playerOrigin,
      speed: PLAYER_SPEED,
      size: PLAYER_SIZE,
      animationPeriod: ANIMATION_PERIOD,
      feetOffset: PLAYER_FEET_OFFSET,
      }
    ),
  ];

  return players;
};


export function buildScene(s: number) {
  const objects = scenes[s].objects;
  const floor = scenes[s].floor;

  return { objects, floor }
}
