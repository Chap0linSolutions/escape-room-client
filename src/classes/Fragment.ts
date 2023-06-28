import { clickableArea, coordinate, interactiveCoords } from '../types';
import { Sprite } from './Sprite';
import { getDistance, renderHitbox } from '../functions/Metrics';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants';
import { InteractiveObject } from './InteractiveObject';
import { FloatingText } from './FloatingText';
import eKey from '../assets/icons/e-key.png';
import cursorKey from '../assets/icons/cursor.png';

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
    position: coordinate | null;
    interactions: interactiveCoords | null;
    visible: boolean;
    object: InteractiveObject;
    leaveText: FloatingText;
    interactText: FloatingText;

    constructor({sprite, size, slots, interactionCoordinates, object}: fragmentConstructor) {
        this.sprite = new Sprite(sprite, size, 1, 2);
        this.slots = (slots)? slots : null;
        this.interactions = (interactionCoordinates)? interactionCoordinates : null;
        this.visible = false;
        this.object = (object)? object : null;
        this.leaveText = new FloatingText('sair', eKey);
        this.interactText = new FloatingText('interagir', cursorKey);
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

    private drawBackground(canvas: CanvasRenderingContext2D, width: number, height: number, margin: number){
        const fill = canvas.fillStyle;
        canvas.fillStyle = '#000000AA';
        canvas.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        canvas.fillStyle = '#AAAAAA';
        canvas.fillRect(this.position.x - margin, this.position.y - margin, width + 2*margin, height + 2*margin);
        canvas.fillStyle = fill;
        this.leaveText.render(canvas, {x: this.position.x, y: this.position.y - margin - 40}, true);
        this.interactText.render(canvas, {x: this.position.x, y: this.position.y - margin - 10}, true);
    }

    private drawFragment(canvas: CanvasRenderingContext2D){
        const { width, height } = this.sprite.getAllDimensions();
        !this.position && this.setPosition({
            x: (CANVAS_WIDTH - width) / 2,
            y: (CANVAS_HEIGHT - height) / 2,
        });
        this.visible && this.drawBackground(canvas, width, height, 2);
        this.visible && this.sprite.render(canvas, this.position);
    }

    private drawHitboxes(canvas: CanvasRenderingContext2D){
        (this.sprite.getQuad()[0] === 0)
        ? this.interactions.open.forEach(o => renderHitbox(canvas, this.getAbsoluteCoords(o.coordinate), o.radius))
        : this.interactions.close.forEach(o => renderHitbox(canvas, this.getAbsoluteCoords(o.coordinate), o.radius), '#800080');
    }

    ///////////////////////////////////////////////////////////////////////////

    render(canvas: CanvasRenderingContext2D){
        this.drawFragment(canvas);
        //this.drawHitboxes(canvas);
    }
}