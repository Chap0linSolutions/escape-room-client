//import { ISOMETRIC_ANGLE } from '../constants';
import { SHOW_HITBOX } from '../constants';
import { tileMap, dx, dy } from '../constants/tileMap';
import { getDistance, renderHitbox } from '../functions/Metrics';
import { coordinate } from '../types';
import { Sprite } from './Sprite';

export class Floor {
  sprite: Sprite;
  baseCoordinate: coordinate;

  constructor(spriteSrc: string, size: number, baseCoordinate: coordinate) {
    this.sprite = new Sprite(spriteSrc, size, 1, 1, 0);
    this.baseCoordinate = baseCoordinate;
  }

  setSprite(newSprite: string) {
    this.sprite.setSource(newSprite);
  }

  setBaseCoordinate(newcoordinate: coordinate) {
    this.baseCoordinate = newcoordinate;
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

  renderTileMap(canvas: CanvasRenderingContext2D, showHitbox: boolean){
    canvas.fillStyle = '#aaaaaa';
    canvas.strokeStyle = '#222222';
    canvas.lineWidth = 2;
    tileMap.forEach((tileRow) => {
      tileRow.forEach((tile) => {
        canvas.beginPath();
        canvas.moveTo(this.baseCoordinate.x + tile.x, this.baseCoordinate.y + tile.y);
        canvas.lineTo(this.baseCoordinate.x + dx + tile.x, this.baseCoordinate.y - dy + tile.y);
        canvas.lineTo(this.baseCoordinate.x + 2 * dx + tile.x, this.baseCoordinate.y + tile.y);
        canvas.lineTo(this.baseCoordinate.x + dx + tile.x, this.baseCoordinate.y + dy + tile.y);
        canvas.lineTo(this.baseCoordinate.x + tile.x, this.baseCoordinate.y + tile.y);
        canvas.stroke();
        canvas.fill();
        canvas.closePath();
        
        showHitbox && renderHitbox(canvas, {
          x: this.baseCoordinate.x + tile.x + dx,
          y: this.baseCoordinate.y + tile.y,
        }, 0.5 * dy);
      })
    });
  }

  ////////////////////////////////////////////////////////////////////

  update() {
    //nothing to see here, folks
  }

  render(canvas: CanvasRenderingContext2D) {
    this.renderTileMap(canvas, SHOW_HITBOX);
  }
}
