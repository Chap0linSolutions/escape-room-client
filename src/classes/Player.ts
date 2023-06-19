import { coordinate, quad } from '../types';
import { InteractiveObject } from './InteractiveObject';
import { FloatingText } from './FloatingText';
import { Sprite } from './Sprite';
import { DraggableObject } from './DraggableObject';
import { Floor } from './Floor';
import { dx, dy } from '../constants/tileMap';
import { renderHitbox } from '../functions/Metrics';
import { ACTION_KEYS, ISOMETRIC_RATIO, SHOW_HITBOX } from '../constants';

function getDp(direction: string): quad {
  switch (direction) {
    case 'up': return [1, -1];
    case 'down': return [-1, 1];
    case 'left': return [-1, -1];
    case 'right': return [1, 1];
    default: return [0, 0];
  }
}
export class Player {
  name: FloatingText;
  sprite: Sprite;
  speed: number;
  size: number;
  position: coordinate;
  dp: quad;
  movementLeft: coordinate;
  feetOffset: coordinate;
  items: DraggableObject[];
  lastKeyPressed: string | undefined;
  allowedDirections = ['right', 'down', 'up', 'left'];

  constructor(
    name: string,
    spriteSrc: string,
    position: coordinate,
    speed: number,
    size: number,
    animationPeriod: number,
    feetOffset: coordinate,
  ) {
    this.name = new FloatingText(name, null);
    this.speed = speed;
    this.size = size;
    this.position = position;
    this.dp = [1, 1];
    this.movementLeft = {x: 0, y: 0};    
    this.feetOffset = feetOffset;
    this.sprite = new Sprite(spriteSrc, size, 4, 2, animationPeriod);
    this.items = [];
  }

  private incrementalMoveTo(delta: coordinate){
    this.position = {
      x: this.position.x + delta.x * this.dp[0],
      y: this.position.y + delta.y * this.dp[1],
    }
  }

  private startNewMove(direction: string, map: Floor){
    const dir = this.allowedDirections.indexOf(direction);
    if (dir < 0) return;
    this.sprite.setQuad([0, dir]);
    if(this.canMove(direction, map)){
      this.dp = getDp(direction);
      this.movementLeft = {x: dx, y: dy};
    }
  }

  private isThereAnyMovementLeft(){
    return (this.movementLeft.x > 0);
  }

  private hasMovedBeyondDestination(delta: coordinate){
    return (
      (this.movementLeft.x - delta.x < 0) ||
      (this.movementLeft.y - delta.y < 0)
    )
  }

  private canMove(direction: string, map: Floor){
    const delta = getDp(direction);
    const destination = {
      x: this.position.x + dx*delta[0],
      y: this.position.y + dy*delta[1],
    }
    return map.isInsideTileMap(destination);
  }

  private move(dt: number){
    const delta = {
      x: dt * this.speed,
      y: dt * this.speed * ISOMETRIC_RATIO,
    }
    if(this.hasMovedBeyondDestination(delta)){
      this.incrementalMoveTo(this.movementLeft);
      this.movementLeft = {x: 0, y: 0};
      return;
    }
    this.incrementalMoveTo(delta);
    this.movementLeft.x -= delta.x;
    this.movementLeft.y -= delta.y;
  }

  private reset() {
    this.movementLeft = { x: 0, y: 0 };
    this.sprite.reset();
  }

  getPosition(){
    return this.position;
  }

  getTopLeftCorner(){
    const {x, y, width, height, feetOffset} = this.getAllDimensions();
    return {
      x: (x - (width + feetOffset.x)/2),
      y: (y - (height + feetOffset.y)),
    }
  }

  getSize() {
    return this.size;
  }

  setSize(newSize: number) {
    this.size = newSize;
    this.sprite.setSize(newSize);
  }

  setSpeed(amount: number) {
    this.speed = amount;
  }

  setPosition(pos: coordinate) {
    this.position = pos;
  }

  getAllDimensions() {
    const h = this.sprite.source.height;
    const w = this.sprite.source.width;
    const ratio = h / this.sprite.rows / (w / this.sprite.columns);

    return {
      x: this.position.x,
      y: this.position.y,
      width: this.size,
      height: this.size * ratio,
      feetOffset: this.feetOffset,
    };
  }

  getNearestItem() {
    if (!this.items || this.items.length === 0) return null;
    return this.items[0];
  }

  takeItem() {
    if (!this.items || this.items.length === 0) return;
    this.items.splice(0, 1);
  }

  putItem(item: DraggableObject) {
    this.items.unshift(item);
  }

  handleItems(objects: InteractiveObject[], key: string) {
    if (key !== ACTION_KEYS[1].key || this.lastKeyPressed) return;

    const index = objects.findIndex((o) => o.isHighlighted);
    if (index < 0) return;

    const nearestObject = objects[index];
    if (!nearestObject.isOpen && !nearestObject.slotsAlwaysVisible) return;
    const item = nearestObject.getNearestItem();
    if (item) {
      nearestObject.takeItem();
      this.putItem(item);
      return item.playSound();
    }
    const myItem = this.getNearestItem();
    console.log(myItem);
    if (!myItem) return;
    this.takeItem();
    nearestObject.putItem(myItem);
    myItem.playSound();
  }

  ////////////////////////////////////////////////////////////////////////////////

  update(dt: number, map: Floor, keyPressed: string | undefined) {
    if(this.isThereAnyMovementLeft()) {
      this.move(dt);
      this.sprite.update(dt);
    } else if (keyPressed) {
      this.startNewMove(keyPressed, map);
    } else {
      this.reset();
    }
    this.lastKeyPressed = keyPressed;
  }

  render(canvas: CanvasRenderingContext2D) {
    const topLeftCorner = this.getTopLeftCorner();
    this.sprite.render(canvas, topLeftCorner);
    this.name.render(canvas, {
      x: topLeftCorner.x + this.size / 2,
      y: topLeftCorner.y - 5,
    });

    SHOW_HITBOX && renderHitbox(canvas, {
      x: this.position.x + this.movementLeft.x * this.dp[0],
      y: this.position.y + this.movementLeft.y * this.dp[1],
    }, 5, 'red');
  }
}
