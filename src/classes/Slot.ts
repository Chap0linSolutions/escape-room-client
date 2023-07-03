import { getDistance } from '../functions/Metrics';
import { coordinate } from '../types';
import { DraggableObject } from './DraggableObject';

export class Slot {
  position: coordinate;
  object: DraggableObject | undefined;

  constructor(position: coordinate, object: DraggableObject | undefined) {
    this.position = position;
    this.object = object;
  }

  incrementalMoveto(delta: coordinate){
    this.position.x += delta.x;
    this.position.y += delta.y;
  }

  getDistanceTo(location: coordinate) {
    return getDistance(this.position, location);
  }

  getPosition() {
    return this.position;
  }

  setPosition(newPos: coordinate) {
    this.position = newPos;
  }

  render(canvas: CanvasRenderingContext2D) {
    this.object && this.object.render(canvas);
  }
}
