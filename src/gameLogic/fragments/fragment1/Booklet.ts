import cleanBooklet from '../../../assets/items/booklet.png';
import smudgedBooklet from '../../../assets/items/booklet-smudged.png';
import { InventoryItem, Sprite } from '../../../classes';
import { clickableArea, coordinate, size } from '../../../types';
import { isInsideBox, isWithin, renderHitbox } from '../../../functions/Metrics';
import { SHOW_HITBOX } from '../../../constants';
import { State } from '../../state';

type backgroundSize = {
    position: coordinate;
    size: size;
}

type deskCoords = {
    position: coordinate;
    hitbox: clickableArea;
}

type selectedCoords = {
    position: coordinate;
    size: size;
    hitbox: clickableArea;
}

const hitboxOffset = 44;
const selectedBookletSize = 300;

export class Booklet {
    clean: boolean;
    selected: boolean;
    sprite: Sprite;
    cleanSprite: Sprite;
    smudgedSprite: Sprite;
    background: backgroundSize;
    onDesk: deskCoords;
    onSelected: selectedCoords;


    constructor(){
        this.cleanSprite = new Sprite({
            sprite: cleanBooklet,
            size: selectedBookletSize,
            rows: 1,
            columns: 1,
            
        });
        this.smudgedSprite = new Sprite({
            sprite: smudgedBooklet,
            size: selectedBookletSize,
            rows: 1,
            columns: 1,
        });

        this.background = {
            position: {
                x: 0,
                y: 0,
            },
            size: {
                w: 0,
                h: 0,
            }
        }

        this.onDesk = {
            position: {
                x: 448,
                y: 197,
            }, 
            hitbox: {
                coordinate: {x: 465, y: 212},
                radius: 20,
            }
        }

        this.onSelected = {
            position: {
                x: 0,
                y: 0,
            }, 
            hitbox: {
                coordinate: {x: 250, y: 360},
                radius: 60,
            },
            size: {
                w: 0,
                h: 0,
            }
        }

        this.clean = true;
    }

    setPositionRelativeToReference(fragmentPosition: coordinate, width: number, height: number){
        const sprite = this.cleanSprite.getAllDimensions();
  
        this.background = {
            position: {
                x: fragmentPosition.x,
                y: fragmentPosition.y,
            },
            size: {
                w: width,
                h: height,
            }
        }

        this.onSelected = {
            position: {
                x: fragmentPosition.x + this.onSelected.position.x - (sprite.width - width)/2,
                y: fragmentPosition.y + this.onSelected.position.y - (sprite.height - height)/2,
            },
            hitbox: {
                coordinate: {
                    x: fragmentPosition.x + this.onSelected.hitbox.coordinate.x,
                    y: fragmentPosition.y + this.onSelected.hitbox.coordinate.y,
                },
                radius: this.onSelected.hitbox.radius,
            }, 
            size: {
                w: sprite.width,
                h: sprite.height,
            }
        }

        this.onDesk = {
            position: {
                x: fragmentPosition.x + this.onDesk.position.x,
                y: fragmentPosition.y + this.onDesk.position.y,
            },
            hitbox: {
                coordinate: {
                    x: fragmentPosition.x + this.onDesk.hitbox.coordinate.x,
                    y: fragmentPosition.y + this.onDesk.hitbox.coordinate.y,
                },
                radius: this.onDesk.hitbox.radius,
            }
        }
    }   

    isClean(){
        return this.clean;
    }

    isSelected(){
        return this.selected;
    }

    setClean(state: boolean){
        this.clean = state;
    }

    setSelected(state: boolean){
        this.selected = state;
    }

    setSize(newSize: number){
        this.cleanSprite.setSize(newSize);
        this.smudgedSprite.setSize(newSize);
    }

    interact(clickCoords: coordinate){
        if(!this.isSelected()){
            if(isWithin(this.onDesk.hitbox, clickCoords)){
                return this.setSelected(true);
            }
        }
        const positionWithOffest = {
            x: this.onSelected.position.x + hitboxOffset,
            y: this.onSelected.position.y,
        }
        if(isInsideBox(
            clickCoords,
            positionWithOffest,
            this.onSelected.size.w,
            this.onSelected.size.h
        )){
            if(isWithin(this.onSelected.hitbox, clickCoords)){
                if(this.isClean()){
                    const state = new State();
                    const itemInHand : InventoryItem = state.activeItem;
                    (itemInHand.name === 'LÁPIS') && this.setClean(false);
                }
            }
            return;
        }
        this.setSelected(false);
    }

    drawHitboxes(canvas: CanvasRenderingContext2D) {
        if(this.isSelected()){
            const fill = canvas.fillStyle;
            canvas.fillStyle = 'lime';
            canvas.fillRect(
                this.onSelected.position.x + hitboxOffset,
                this.onSelected.position.y,
                this.onSelected.size.w,
                this.onSelected.size.h,
            );
            canvas.fillStyle = fill;
            renderHitbox(
                canvas,
                this.onSelected.hitbox.coordinate,
                this.onSelected.hitbox.radius,
                'yellow'
            )
        } else {
            renderHitbox(
                canvas,
                this.onDesk.hitbox.coordinate,
                this.onDesk.hitbox.radius,
            );
        }
    }

    drawBackground(canvas: CanvasRenderingContext2D) {
        const fill = canvas.fillStyle;
        canvas.fillStyle = '#929091';
        canvas.fillRect(
            this.onDesk.position.x,
            this.onDesk.position.y,
            35,
            35,
        );
        canvas.fillStyle = '#000000AA';
        canvas.fillRect(
            this.background.position.x,
            this.background.position.y,
            this.background.size.w,
            this.background.size.h
        );
        canvas.fillStyle = fill;
    }

    render(canvas: CanvasRenderingContext2D){
        if(this.isSelected()){
            this.drawBackground(canvas);
            this.isClean()
              ? this.cleanSprite.render(canvas, this.onSelected.position)
              : this.smudgedSprite.render(canvas, this.onSelected.position);
            SHOW_HITBOX && this.drawHitboxes(canvas);
            return;
        }
        SHOW_HITBOX && this.drawHitboxes(canvas);
     }
}