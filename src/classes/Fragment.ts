import { clickableArea, coordinate, interactiveCoords } from '../types';
import { getDistance, renderHitbox } from '../functions/Metrics';
import { InputHandler } from "../events/InputHandler";
import { CANVAS_HEIGHT, CANVAS_WIDTH, SHOW_HITBOX } from '../constants';
import { InteractiveObject } from './InteractiveObject';
import { FloatingText } from './FloatingText';
import { Sprite } from './Sprite';
import { Slot } from './Slot';
import eKey from '../assets/icons/e-key.png';
import cursorKey from '../assets/icons/cursor.png';
import { InventoryItem } from './InventoryItem';
import { State } from '../gameLogic/state';

type FragmentParams = {
    sprite: string;
    size: number;
    items: InventoryItem[];
    interactionCoordinates?: interactiveCoords;
    object?: InteractiveObject;
}

export class Fragment {
    sprite: Sprite;
    position: coordinate | null;
    interactions: interactiveCoords | null;
    visible: boolean;
    object: InteractiveObject;
    leaveText: FloatingText;
    interactText: FloatingText;
    items: InventoryItem[];
    isOpen: boolean;

    constructor({sprite, size, interactionCoordinates, object, items}: FragmentParams) {
        this.sprite = new Sprite({sprite, size, rows: 1, columns: 2});
        this.interactions = (interactionCoordinates)? interactionCoordinates : null;
        this.visible = false;
        this.object = (object)? object : null;
        this.leaveText = new FloatingText({text: 'sair', iconSprite: eKey});
        this.interactText = new FloatingText({text: 'interagir', iconSprite: cursorKey});
        this.items = items;
        const inputHandler = new InputHandler();
        inputHandler.subscribe("mouseDown", "fragmentMouseDown", (pos) => this.interact(pos))
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

    private setPosition(width: number, height: number){       //deve rodar apenas no 1o ciclo de render do fragmento (precisamos do width e height do fragmento para calcular a posição)        
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

    interact(clickCoords: coordinate){
        const state = new State()
        if(!this.interactions || !clickCoords) return { hasInteracted: false, item: null };
        const interaction = (this.isOpen)? this.interactions.close : this.interactions.open;
        for(let i = 0; i < interaction.length; i++){                    //verifica se o jogador está tentando abrir/fechar o fragmento (ex.: portas de um armário)
            if(this.isWithin(interaction[i], clickCoords)){
                this.sprite.setQuad(this.sprite.nextSprite());
                this.isOpen = !this.isOpen;
                this.object.toggleState()
                return { hasInteracted: true, slot: null };
            }
        }
        if(this.isOpen){
            for(let i = 0; i < this.items.length; i++){
                const item = this.items[i];
                if(item.isInside(clickCoords)){
                    this.removeItem(item);
                    state.addItem(item);
                    item.sound.play();
                    return { hasInteracted: true, item };
                }
            }
        }
        return { hasInteracted: false, item: null };
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
        if(!this.position) this.setPosition(width, height);
        this.visible && this.drawBackground(canvas, width, height, 2);
        this.visible && this.sprite.render(canvas, this.position);
    }

    private drawItems(canvas: CanvasRenderingContext2D){
        this.visible && this.items.forEach(item => item.render(canvas));
    }

    private drawHitboxes(canvas: CanvasRenderingContext2D){
        if (this.sprite.getQuad()[0] === 0){
            this.interactions.open.forEach(o => renderHitbox(canvas, this.getAbsoluteCoords(o.coordinate), o.radius))
        } else {
            this.interactions.close.forEach(o => renderHitbox(canvas, this.getAbsoluteCoords(o.coordinate), o.radius, '#800080'));
        }
    }

    ///////////////////////////////////////////////////////////////////////////

    render(canvas: CanvasRenderingContext2D, showItems: boolean){
        this.drawFragment(canvas);
        showItems && this.drawItems(canvas);
        SHOW_HITBOX && this.drawHitboxes(canvas);
    }
}