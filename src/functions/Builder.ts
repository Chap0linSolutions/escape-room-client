import playerSprite from '../assets/player.png';
import { Player } from '../classes';
import {
  PLAYER_SIZE,
  PLAYER_SPEED,
  ANIMATION_PERIOD,
  PLAYER_FEET_OFFSET,
} from '../constants';


export const spawnPlayer = (origin) => {
  const playerOrigin = origin;

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


export async function buildScene(s: number) {
  const {sceneOne} = await import("../gameLogic/levels/One");
  const {sceneTwo} = await import("../gameLogic/levels/Two");

  const scenes = [sceneOne, sceneTwo];  //new scenes must be added to this array

  const objects = scenes[s].objects;
  const floor = scenes[s].floor;
  const playerOrigin = scenes[s].playerOrigin;

  return { objects, floor, playerOrigin }
}
