import { coordinate, quad } from '../types';
import { InteractiveObject } from './InteractiveObject';
import { FloatingText } from './FloatingText';
import { Sprite } from './Sprite';
import { InventoryItem } from './InventoryItem';
import { Floor } from './Floor';
import { isInsideAllowedSpace, renderHitbox } from '../functions/Metrics';
import { ISOMETRIC_RATIO, SHOW_HITBOX, DX, DY } from '../constants';

function getDp(direction: string): quad {
  switch (direction) {
    case 'up':
      return [1, -1];
    case 'down':
      return [-1, 1];
    case 'left':
      return [-1, -1];
    case 'right':
      return [1, 1];
    default:
      return [0, 0];
  }
}

type PlayerParams = {
  name: string;
  spriteSrc: string;
  position: coordinate;
  speed: number;
  size: number;
  animationPeriod: number;
  feetOffset: coordinate;
  mapOrigin: coordinate;
};

export class Player {
  name: FloatingText;
  sprite: Sprite;
  speed: number;
  size: number;
  position: coordinate;
  mapOrigin: coordinate;
  positionOnMap: coordinate;
  dp: quad;
  interactingWithFragment: boolean;
  movementLeft: coordinate;
  feetOffset: coordinate;
  items: InventoryItem[];
  lastKeyPressed: string | undefined;
  allowedDirections = ['right', 'down', 'up', 'left'];
  whoMoves: 'player' | 'scene';

  constructor({
    name,
    spriteSrc,
    position,
    speed,
    size,
    animationPeriod,
    feetOffset,
    mapOrigin,
  }: PlayerParams) {
    this.name = new FloatingText({ text: name, iconSprite: null });
    this.speed = speed;
    this.size = size;
    this.position = position;
    this.dp = [1, 1];
    this.movementLeft = { x: 0, y: 0 };
    this.feetOffset = feetOffset;
    this.mapOrigin = mapOrigin;
    this.sprite = new Sprite({
      sprite: spriteSrc,
      size,
      rows: 4,
      columns: 2,
      maxCount: animationPeriod,
    });
    this.items = [];
    this.interactingWithFragment = false;
  }

  private incrementalMoveTo(delta: coordinate) {
    this.position = {
      x: this.position.x + delta.x * this.dp[0],
      y: this.position.y + delta.y * this.dp[1],
    };
  }

  private incrementalMoveSceneTo(
    delta: coordinate,
    objects: InteractiveObject[],
    map: Floor
  ) {
    const deltaWithDirection = {
      x: delta.x * -this.dp[0],
      y: delta.y * -this.dp[1],
    };
    objects.forEach((o) => o.incrementalMoveTo(deltaWithDirection));
    map.incrementalMoveTo(deltaWithDirection);
  }

  private checkForMoves(
    direction: string,
    map: Floor,
    objects: InteractiveObject[]
  ) {
    const dir = this.allowedDirections.indexOf(direction);
    if (dir < 0 || this.interactingWithFragment) return;
    this.sprite.setQuad([this.sprite.getQuad()[0], dir]);
    if (this.canMove(direction, map, objects)) {
      this.dp = getDp(direction);
      this.movementLeft = { x: DX, y: DY };
    }
  }

  private checkInteractions(
    objects: InteractiveObject[],
    keyPressed: string | undefined
  ) {
    const myDirection = this.allowedDirections[this.sprite.getQuad()[1]];
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].isInside('hitbox', this.position)) {
        this.interactingWithFragment = objects[i].isBeingInteractedWith();
        if (objects[i].isAllowedToInteract(myDirection)) {
          objects[i].interact(keyPressed);
          objects[i].setHighlight(true);
        }
        return;
      }
      objects[i].setHighlight(false);
    }
  }

  private isThereAnyMovementLeft() {
    return this.movementLeft.x > 0;
  }

  private hasMovedBeyondDestination(delta: coordinate) {
    return (
      this.movementLeft.x - delta.x < 0 || this.movementLeft.y - delta.y < 0
    );
  }

  private canMove(direction: string, map: Floor, objects: InteractiveObject[]) {
    const delta = getDp(direction);
    const destination = {
      x: this.position.x + DX * delta[0],
      y: this.position.y + DY * delta[1],
    };
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].isInside('object', destination)) return false;
    }
    if (map.isInsideTileMap(destination)) {
      this.whoMoves = isInsideAllowedSpace(destination) ? 'player' : 'scene';
      return true;
    }
    return false;
  }

  private move(dt: number, objects: InteractiveObject[], map: Floor) {
    let delta = {
      x: dt * this.speed,
      y: dt * this.speed * ISOMETRIC_RATIO,
    };
    if (this.hasMovedBeyondDestination(delta)) {
      delta = this.movementLeft;
    }
    if (this.whoMoves === 'player') {
      this.incrementalMoveTo(delta);
    } else {
      this.incrementalMoveSceneTo(delta, objects, map);
    }
    this.movementLeft.x -= delta.x;
    this.movementLeft.y -= delta.y;
  }

  private reset() {
    this.movementLeft = { x: 0, y: 0 };
    this.sprite.reset();
  }

  getPosition() {
    return this.position;
  }

  getTopLeftCorner() {
    const { x, y, width, height, feetOffset } = this.getAllDimensions();
    return {
      x: x - (width + feetOffset.x) / 2,
      y: y - (height + feetOffset.y),
    };
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

  updatePositionOnMap() {
    const xFixed = this.position.x - (this.mapOrigin.x + DX);
    const yFixed = this.position.y - this.mapOrigin.y;
    const xConverted = Math.round((xFixed * DY - yFixed * DX) / (2 * DX * DY));
    const yConverted = Math.round(
      (xFixed * 2 * DY - xFixed * DY + yFixed * DX) / (2 * DX * DY)
    );
    this.positionOnMap = { x: xConverted, y: yConverted };
  }

  ////////////////////////////////////////////////////////////////////////////////

  update(
    dt: number,
    map: Floor,
    objects: InteractiveObject[],
    keyPressed: string | undefined
  ) {
    if (this.isThereAnyMovementLeft()) {
      this.move(dt, objects, map);
      this.sprite.update(dt);
    } else if (keyPressed) {
      this.checkForMoves(keyPressed, map, objects);
    } else {
      this.reset();
    }
    this.checkInteractions(objects, keyPressed);
    this.lastKeyPressed = keyPressed;
    this.updatePositionOnMap();
  }

  render(canvas: CanvasRenderingContext2D) {
    const topLeftCorner = this.getTopLeftCorner();
    this.sprite.render(canvas, topLeftCorner);
    this.name.render(canvas, {
      x: topLeftCorner.x + this.size / 2,
      y: topLeftCorner.y - 5,
    });

    SHOW_HITBOX &&
      renderHitbox(
        canvas,
        {
          x: this.position.x + this.movementLeft.x * this.dp[0],
          y: this.position.y + this.movementLeft.y * this.dp[1],
        },
        5,
        'firebrick'
      );
  }
}
