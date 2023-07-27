import { Sprite } from "../../../classes";
import { clickableArea, coordinate, quad } from "../../../types";
import bookSprite from '../../../assets/fragments/fragment1/books.png';
import { isWithin, renderHitbox } from "../../../functions/Metrics";
import { SHOW_HITBOX } from "../../../constants";

interface booksProps {
    position: coordinate;
    size: number;
}

interface book {
    hitbox: clickableArea,
    quad: quad | number;
}

export class Books {
    sprite: Sprite;
    position: coordinate;
    interactive: book[];    

    constructor({position, size}: booksProps){
        this.sprite = new Sprite({
            sprite: bookSprite,
            size: size,
            rows: 1,
            columns: 4,
        });

        this.position = position;
        this.interactive = [
            {
                //top book
                quad: 1,
                hitbox: {coordinate: {x: 70, y: 60}, radius: 30},   
            },
            {
                //middle book
                quad: 2,
                hitbox: {coordinate: {x: 80, y: 102}, radius: 12},  
            },
            {
                //bottom book
                quad: 3,
                hitbox: {coordinate: {x: 103, y: 103}, radius: 10},   
            }
        ]
    }

    setPositionRelativeToReference(fragmentPosition: coordinate){
        this.position = {
            x: this.position.x + fragmentPosition.x,
            y: this.position.y + fragmentPosition.y,
        }

        this.interactive.forEach(book => {
            book.hitbox.coordinate = {
                x: book.hitbox.coordinate.x + this.position.x,
                y: book.hitbox.coordinate.y + this.position.y,
            }
        })
    }

    areBooksOpen(){
        return this.sprite.getQuad()[0];
    }

    interact(clickCoords: coordinate){
        if(this.areBooksOpen()) return this.sprite.reset();
        for(let i = 0; i < this.interactive.length; i++) {
            const book = this.interactive[i];
            if(isWithin(book.hitbox, clickCoords)){
                this.sprite.setQuad(book.quad);
                break;
            }
        }
    }

    renderHitboxes(canvas: CanvasRenderingContext2D) {
        this.interactive.forEach(book => renderHitbox(canvas, book.hitbox.coordinate, book.hitbox.radius));
    }

    render(canvas: CanvasRenderingContext2D){
        this.sprite.render(canvas, this.position);
        SHOW_HITBOX && this.renderHitboxes(canvas);
    }
}