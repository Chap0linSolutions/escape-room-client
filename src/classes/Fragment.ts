import { clickableArea, coordinate, interactiveCoords } from '../types';
import { getDistance } from '../functions/Metrics';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants';
import { InteractiveObject } from './InteractiveObject';
import { FloatingText } from './FloatingText';
import eKey from '../assets/icons/e-key.png';
import cursorKey from '../assets/icons/cursor.png';
import { InventoryItem } from './InventoryItem';

export type FragmentParams = {
    object?: InteractiveObject;
}

export abstract class Fragment {
    abstract interactions: any;
    position: coordinate | null;
    visible: boolean;
    object: InteractiveObject;
    leaveText: FloatingText;
    interactText: FloatingText;
    items: InventoryItem[];

    constructor({object}: FragmentParams) {
        this.visible = false;
        this.object = (object)? object : null;
        this.leaveText = new FloatingText({text: 'sair', iconSprite: eKey});
        this.interactText = new FloatingText({text: 'interagir', iconSprite: cursorKey});
        this.items = [];
    }

    abstract interact(clickCoords: coordinate): void;
    abstract render(canvas: CanvasRenderingContext2D): void;

    setItems(newItems: InventoryItem[]){
        this.items = newItems;
    }

    getItems(){
        return this.items;
    }

    removeItem(item: InventoryItem){
        const index = this.items.findIndex(i => item.name === i.name);
        const removed = this.items.splice(index, 1);
        if(removed.length > 0) return removed;
        return null;
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

    drawBackground(canvas: CanvasRenderingContext2D, width: number, height: number, margin: number){
        const fill = canvas.fillStyle;
        canvas.fillStyle = '#000000AA';
        canvas.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        canvas.fillStyle = '#AAAAAA';
        canvas.fillRect(this.position.x - margin, this.position.y - margin, width + 2*margin, height + 2*margin);
        canvas.fillStyle = fill;
        this.leaveText.render(canvas, {x: this.position.x, y: this.position.y - margin - 40}, true);
        this.interactText.render(canvas, {x: this.position.x, y: this.position.y - margin - 10}, true);
    }

    getAbsoluteCoords(coords: coordinate){
        return {
            x: this.position.x + coords.x,
            y: this.position.y + coords.y,
        }
    }

    isWithin(what: clickableArea, target: coordinate){
        const w = this.getAbsoluteCoords(what.coordinate);
        return (getDistance(w, target) < what.radius);
    }

    setPosition(width: number, height: number){       //deve rodar apenas no 1o ciclo de render do fragmento (precisamos do width e height do fragmento para calcular a posição)        
        this.position = {
            x: (CANVAS_WIDTH - width) / 2,
            y: (CANVAS_HEIGHT - height) / 2,
        }

        this.items.forEach(item => {                          //no primeiro render os items ainda estarão em posição relativa ao canvas como um todo, e não ao fragmento.
            const relativePos = item.getPosition();           //aqui corrigimos isso
            item.setPosition({
                x: this.position.x + relativePos.x,
                y: this.position.y + relativePos.y,
            })
        })
    }

}