//import { ISOMETRIC_ANGLE } from '../constants';
import { ISOMETRIC_ANGLE, SHOW_HITBOX, SHOW_TILEMAP } from '../constants';
import { tileMap, dx, dy } from '../constants/tileMap';
import { getDistance, renderHitbox } from '../functions/Metrics';
import { coordinate } from '../types';
import { Sprite } from './Sprite';

export class Floor {
  sprite: Sprite;
  spritePosition: coordinate;
  baseCoordinate: coordinate;

  constructor(spriteSrc: string, size: number, spritePosition: coordinate, baseCoordinate: coordinate) {
    this.sprite = new Sprite(spriteSrc, size, 1, 1, 0);
    this.spritePosition = spritePosition;
    this.baseCoordinate = baseCoordinate;
  }

  setSprite(newSprite: string) {
    this.sprite.setSource(newSprite);
  }

  setBaseCoordinate(newcoordinate: coordinate) {
    const diff = {
      x: this.baseCoordinate.x - this.spritePosition.x,
      y: this.baseCoordinate.y - this.spritePosition.y, 
    }
    this.baseCoordinate = newcoordinate;
    this.spritePosition = {
      x: this.spritePosition.x - diff.x,
      y: this.spritePosition.y - diff.y,
    }
  }

  setSize(newSize: number) {
    this.sprite.setSize(newSize);
  }

  isInsideTile(invader: coordinate, i: number, j: number){
    if(i < 0 || i >= tileMap.length) return undefined;
    if(j < 0 || j >= tileMap[i].length) return undefined;
    const tileCenter = {
      x: this.baseCoordinate.x + tileMap[i][j].x + dx,
      y: this.baseCoordinate.y + tileMap[i][j].y,
    }
    return (getDistance(tileCenter, invader) < (0.5 * dy));
  }

  isInsideTileMap(invader: coordinate){
    for(let i = 0; i < tileMap.length; i++){
      for(let j = 0; j < tileMap[i].length; j++){
        if(this.isInsideTile(invader, i, j)){
          return true;
        }
      }
    }   
    return false;
  }

  renderTileMap(canvas: CanvasRenderingContext2D, showHitbox: boolean, showTilemap: boolean){
    canvas.fillStyle = '#aaaaaa55';
    canvas.strokeStyle = '#222222';
    canvas.lineWidth = 2;
    tileMap.forEach((tileRow) => {
      tileRow.forEach((tile) => {
        showTilemap && (() => {
          canvas.beginPath();
          canvas.moveTo(this.baseCoordinate.x + tile.x, this.baseCoordinate.y + tile.y);
          canvas.lineTo(this.baseCoordinate.x + dx + tile.x, this.baseCoordinate.y - dy + tile.y);
          canvas.lineTo(this.baseCoordinate.x + 2 * dx + tile.x, this.baseCoordinate.y + tile.y);
          canvas.lineTo(this.baseCoordinate.x + dx + tile.x, this.baseCoordinate.y + dy + tile.y);
          canvas.lineTo(this.baseCoordinate.x + tile.x, this.baseCoordinate.y + tile.y);
          canvas.stroke();
          canvas.fill();
          canvas.closePath();
        });
        
        showHitbox && renderHitbox(canvas, {
          x: this.baseCoordinate.x + tile.x + dx,
          y: this.baseCoordinate.y + tile.y,
        }, 5);
      })
    });
  }

  ////////////////////////////////////////////////////////////////////

  update() {
    //nothing to see here, folks
  }

  render(canvas: CanvasRenderingContext2D) {
    this.sprite.render(canvas, this.spritePosition);
    this.renderTileMap(canvas, SHOW_HITBOX, SHOW_TILEMAP);
  }
}
