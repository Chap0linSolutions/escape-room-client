import { InteractiveObject } from '../classes/InteractiveObject';
import { Player } from '../classes/Player';
import { Floor } from '../classes/Floor';
import { coordinate } from '../types';

interface UpdaterProps {
  dt: number;
  key: string | undefined;
  players: Player[];
  objects: InteractiveObject[];
  floor: Floor;
}

export default function UpdateAll({
  dt,
  key,
  players,
  objects,
  floor,
}: UpdaterProps) {
  floor && floor.update();

  objects.forEach((o) => {
    o.update();
  });

  players.forEach((p) => {
    p.update(dt, floor, objects, key);
  });
}
