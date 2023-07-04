import { getDistance } from '../functions/Metrics';
import { coordinate } from '../types';
import { InventoryItem } from './InventoryItem';

type SlotParams = {
  position: coordinate;
  object: InventoryItem | undefined;
}
export class Slot {
  position: coordinate;
  object: InventoryItem | undefined;

  constructor({position, object}: SlotParams) {
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
