import { isWithin, renderHitbox } from "../../../../functions/Metrics";
import { clickableArea, coordinate, quad } from "../../../../types";
import { Sprite } from "../../../../classes";
import geniusSprite from "../../../../assets/fragments/fragment5/genius.png";
import geniusSound1 from "../../../../assets/sounds/genius1.mp3";
import geniusSound2 from "../../../../assets/sounds/genius2.mp3";
import geniusSound3 from "../../../../assets/sounds/genius3.mp3";
import geniusSound4 from "../../../../assets/sounds/genius4.mp3";
import Sound from "../../../../classes/Sound";

type geniusButton = {
    name: string,
    sound: Sound,
    hitbox: clickableArea;
    quad: quad;
}

type counter = {
    current: number;
    max: number;
}


const hitboxRadius = 9;

export class Genius {
    buttons: geniusButton[];
    sprite: Sprite;
    position: coordinate;
    areButtonsOff: boolean;
    counter: counter;

    constructor(){
        this.buttons = [
            {
                name: 'green',
                sound: new Sound({source: geniusSound1}),
                hitbox: {
                    coordinate: {x: 65, y: 15},      //top tile
                    radius: hitboxRadius,
                },
                quad: [1, 0],
            },{
                name: 'blue', 
                sound: new Sound({source: geniusSound3}),
                hitbox: {
                    coordinate: {x: 52, y: 27},     //left tile
                    radius: hitboxRadius,
                },
                quad: [2, 0],
            },{
                name: 'red',
                sound: new Sound({source: geniusSound2}),
                hitbox: {
                    coordinate: {x: 65, y: 39},     //bottom tile
                    radius: hitboxRadius,
                },
                quad: [3, 0],
            },{
                name: 'yellow',
                sound: new Sound({source: geniusSound4}),
                hitbox: {
                    coordinate: {x: 78, y: 27},     //right tile
                    radius: hitboxRadius,
                },
                quad: [4, 0],
            }
        ]
        this.areButtonsOff = true;
        this.position = {x: 42, y: 5};
        this.sprite = new Sprite({sprite: geniusSprite, size: 45, rows: 1, columns: 5});
        this.counter = {current: 0, max: 120};
    }



    buttonPressed(clickCoords: coordinate){
        for(let i = 0; i < this.buttons.length; i++){
            if(isWithin(this.buttons[i].hitbox, clickCoords)){
                const buttonName = this.buttons[i].name;
                this.lightUpButton(buttonName);
                return buttonName;
            }
        } return undefined;
    }

    lightUpButton(whichOne: string){
        const button = this.buttons.filter(b => b.name === whichOne).at(0);
        if(!button) return;
        button.sound.play();
        this.sprite.setQuad(button.quad[0]);    //for some reason we can't just put button.quad here, bug happens
        this.areButtonsOff = false;
    }

    reset(){
        this.sprite.reset();
        this.counter.current = 0;
        this.areButtonsOff = true;
    }

    setMaxCount(newMax: number){
        this.counter.max = newMax;
    }

    setPositionRelativeToReference(reference: coordinate){
        this.position = {
            x: reference.x + this.position.x,
            y: reference.y + this.position.y, 
        }
        this.buttons.forEach(button => {
            button.hitbox.coordinate = {
                x: reference.x + button.hitbox.coordinate.x, 
                y: reference.y + button.hitbox.coordinate.y,
            }
        })
    }

    renderHitboxes(canvas: CanvasRenderingContext2D){
        this.buttons.forEach(button => renderHitbox(canvas, button.hitbox.coordinate, button.hitbox.radius, 'magenta'));
    }

    ////////////////////////////////////////////////////////////////////////////

    update(dt: number){
        if(this.areButtonsOff) return;
        if(this.counter.current < this.counter.max){
            this.counter.current += dt;
        } else {
            this.reset();
        }
    };

    render(canvas: CanvasRenderingContext2D){
        this.sprite.render(canvas, this.position);
    }
}
