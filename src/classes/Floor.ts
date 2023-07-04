//import { ISOMETRIC_ANGLE } from '../constants';
import { ISOMETRIC_ANGLE, SHOW_HITBOX, SHOW_TILEMAP, DX, DY } from '../constants';
import { getDistance, renderHitbox } from '../functions/Metrics';
import { coordinate, positionType } from '../types';
import { Sprite } from './Sprite';

type FloorParams = {
  tileMap: coordinate[][];
  spriteSrc: string;
  size: number;
  position: positionType;
}

export class Floor {
  sprite: Sprite;
  position: positionType;
  tileMap: coordinate[][];

  constructor({tileMap, spriteSrc, size, position}: FloorParams) {
    this.sprite = new Sprite({ sprite: spriteSrc, size, rows: 1, columns: 1, maxCount: 0 });
    this.position = position;
    this.tileMap = tileMap;
  }

  setSprite(newSprite: string) {
    this.sprite.setSource(newSprite);
  }

  incrementalMoveTo(delta: coordinate){
    this.position.canvas.x += delta.x;
    this.position.canvas.y += delta.y;
    this.position.map.x += delta.x;
    this.position.map.y += delta.y;
  }

  setPosition(ofWhat: 'sprite' | 'map', newcoordinate: coordinate) {
    const diff = {
      x: this.position.map.x - this.position.canvas.x,
      y: this.position.map.y - this.position.canvas.y, 
    }
    if(ofWhat === 'map'){
      this.position.map = newcoordinate;
      this.position.canvas = {
        x: this.position.canvas.x - diff.x,
        y: this.position.canvas.y - diff.y,
      }
    } else {
      this.position.canvas = newcoordinate;
      this.position.map = {
        x: this.position.map.x + diff.x,
        y: this.position.map.y + diff.y,
      }
    }
  }

  setSize(newSize: number) {
    this.sprite.setSize(newSize);
  }

  isInsideTile(invader: coordinate, i: number, j: number){
    if(i < 0 || i >= this.tileMap.length) return undefined;
    if(j < 0 || j >= this.tileMap[i].length) return undefined;
    const tileCenter = {
      x: this.position.map.x + this.tileMap[i][j].x + DX,
      y: this.position.map.y + this.tileMap[i][j].y,
    }
    return (getDistance(tileCenter, invader) < (0.5 * DY));
  }

  isInsideTileMap(invader: coordinate){
    for(let i = 0; i < this.tileMap.length; i++){
      for(let j = 0; j < this.tileMap[i].length; j++){
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
    this.tileMap.forEach((tileRow) => {
      tileRow.forEach((tile) => {
        if(showTilemap){
          canvas.beginPath();
          canvas.moveTo(this.position.map.x + tile.x, this.position.map.y + tile.y);
          canvas.lineTo(this.position.map.x + DX + tile.x, this.position.map.y - DY + tile.y);
          canvas.lineTo(this.position.map.x + 2 * DX + tile.x, this.position.map.y + tile.y);
          canvas.lineTo(this.position.map.x + DX + tile.x, this.position.map.y + DY + tile.y);
          canvas.lineTo(this.position.map.x + tile.x, this.position.map.y + tile.y);
          canvas.stroke();
          canvas.fill();
          canvas.closePath();
        }
        
        showHitbox && renderHitbox(canvas, {
          x: this.position.map.x + tile.x + DX,
          y: this.position.map.y + tile.y,
        }, 5);
      })
    });
  }

  ////////////////////////////////////////////////////////////////////

  update() {
    //nothing to see here, folks
  }

  render(canvas: CanvasRenderingContext2D) {
    this.sprite.render(canvas, this.position.canvas);
    this.renderTileMap(canvas, SHOW_HITBOX, SHOW_TILEMAP);
  }
}
