import { coordinate } from '../types';
import { Sprite } from './Sprite';
import Sound from './Sound';
import { isInsideBox } from '../functions/Metrics';


type ConstructorType = {
  spriteSrc: string,
  size: number,
  name: string,
  sound: string,
  position?: coordinate,
}
export class DraggableObject {
  name: string;
  size: number;
  sprite: Sprite;
  sound: Sound;
  position: coordinate | null;

  constructor({spriteSrc, size, name, sound, position}: ConstructorType) {
    this.size = size;
    this.sound = new Sound(sound);
    this.sprite = new Sprite(spriteSrc, size, 1, 1, 0);
    this.name = name;
    this.position = (position)? position : null;
  }

  setPosition(newPos: coordinate){
    this.position = newPos;
  }

  getPosition(){
    return this.position;
  }

  playSound() {
    this.sound.play();
  }

  getSize() {
    return this.size;
  }

  getAllDimensions(){
    const {width, height} = this.sprite.getAllDimensions();
    return {
      position: this.position,
      width, 
      height,
    }
  }

  setSize(newSize: number) {
    this.size = newSize;
    this.sprite.setSize(newSize);
  }

  isInside(target: coordinate){
    const { position, width, height } = this.getAllDimensions();
    return isInsideBox(target, position, width, height);
  }

  render(canvas: CanvasRenderingContext2D) {
    this.sprite.render(canvas, {
      x: this.position.x,
      y: this.position.y,
    });
  }
}
