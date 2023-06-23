import { clickableArea, coordinate, interactiveCoords } from '../types';
import { Sprite } from './Sprite';
import { getDistance, renderHitbox } from '../functions/Metrics';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants';
import { InteractiveObject } from './InteractiveObject';

type fragmentConstructor = {
    sprite: string,
    size: number,
    slots?: clickableArea[];
    interactionCoordinates?: interactiveCoords;
    object?: InteractiveObject;
}

export class Fragment {
    sprite: Sprite;
    slots: clickableArea[] | null;
    position: coordinate;
    interactions: interactiveCoords | null;
    visible: boolean;
    object: InteractiveObject;

    constructor({sprite, size, slots, interactionCoordinates, object}: fragmentConstructor) {
        this.sprite = new Sprite(sprite, size, 1, 2);
        this.slots = (slots)? slots : null;
        this.position = {x: (CANVAS_WIDTH - size) / 2, y: 0.2 * CANVAS_HEIGHT};
        this.interactions = (interactionCoordinates)? interactionCoordinates : null;
        this.visible = false;
        this.object = (object)? object : null;
    }

    private getAbsoluteCoords(coords: coordinate){
        return {
            x: this.position.x + coords.x,
            y: this.position.y + coords.y,
        }
    }

    private isWithin(what: clickableArea, target: coordinate){
        const w = this.getAbsoluteCoords(what.coordinate);
        return (getDistance(w, target) < what.radius);
    }

    getObject(){
        return this.object;
    }

    setObject(obj: InteractiveObject | null){
        this.object = obj;
    }

    getPosition(){
        return this.position;
    }

    setPosition(newPos: coordinate){
        this.position = newPos;
    }

    setVisibility(vis: boolean){
        this.visible = vis;
    }

    toggleVisibility(){
        this.visible = !this.visible;
        console.log(this.visible);
    }

    isVisible(){
        return this.visible;
    }

    getSlots(){
        return this.slots;
    }

    setSlots(newClickable: clickableArea[]){
        this.slots = newClickable;
    }

    checkSlots(target: coordinate){
        if(!this.slots) return -1;
        for(let i = 0; i < this.slots.length; i++){
            if(this.isWithin(this.slots[i], target)){
                return i;
            }
        } return -1;
    }

    interact(state: boolean, clickCoords: coordinate){
        if(!this.interactions || !clickCoords) return false;
        const inter = (state)? this.interactions.close : this.interactions.open;
        for(let i = 0; i < inter.length; i++){
            if(this.isWithin(inter[i], clickCoords)){
                this.sprite.setQuad(this.sprite.nextSprite());
                return true;
            }
        } return false;
    }

    ///////////////////////////////////////////////////////////////////////////

    render(canvas: CanvasRenderingContext2D){
        this.visible && this.sprite.render(canvas, this.position);
        (this.sprite.getQuad()[0] === 0)
        ? this.interactions.open.forEach(o => renderHitbox(canvas, this.getAbsoluteCoords(o.coordinate), o.radius))
        : this.interactions.close.forEach(o => renderHitbox(canvas, this.getAbsoluteCoords(o.coordinate), o.radius), '#800080');
    }
}