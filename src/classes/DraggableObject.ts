import { coordinate } from '../types';
import { Sprite } from './Sprite';
import Sound from './Sound';


type classConstructor = {
  spriteSrc: string;
  size: number;
  name: string;
  sound: string;
}
export class DraggableObject {
  name: string;
  size: number;
  sprite: Sprite;
  sound: Sound;

  constructor({spriteSrc, size, name, sound}: classConstructor) {
    this.size = size;
    this.sound = new Sound(sound);
    this.sprite = new Sprite(spriteSrc, size, 1, 1, 0);
    this.name = name;
  }

  playSound() {
    this.sound.play();
  }

  getSize() {
    return this.size;
  }

  setSize(newSize: number) {
    this.size = newSize;
    this.sprite.setSize(newSize);
  }

  render(canvas: CanvasRenderingContext2D, coordinate: coordinate) {
    this.sprite.render(canvas, {
      x: coordinate.x - this.size / 2,
      y: coordinate.y,
    });
  }
}
