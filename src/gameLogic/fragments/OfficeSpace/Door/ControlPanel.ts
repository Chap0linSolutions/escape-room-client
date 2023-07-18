import { Sprite } from "../../../../classes";
import { clickableArea, coordinate } from "../../../../types";
import { isWithin, renderHitbox } from "../../../../functions/Metrics";
import openPanel from '../../../../assets/fragments/fragment5/open_panel.png';
import closedPanel from '../../../../assets/fragments/fragment5/closed_panel.png';

interface controlPanelProps {
    position: coordinate;
    size: number;
}

interface panel {
    sprite: Sprite;
    position: coordinate;
}

interface genius {
    name: string,
    hitbox: clickableArea;
}

const offset = {
    openClose: 1.43,
    x: -30,
    y: 0,
}

const geniusHitboxRadius = 7;

export class ControlPanel {
    openPanel: panel;
    closedPanel: panel;
    buttonHitbox: clickableArea;
    genius: genius[];
    isOpen: boolean;

    constructor({size, position}: controlPanelProps) {
        this.closedPanel = {
            sprite: new Sprite({sprite: closedPanel, size: size, rows: 1, columns: 3}),
            position: position,
        }
        this.openPanel = {
            sprite: new Sprite({sprite: openPanel, size: size * offset.openClose, rows: 1, columns: 1}),
            position: {x: position.x + offset.x, y: position.y + offset.y}
        }
        this.buttonHitbox = {
            coordinate: {x: position.x + 57, y: position.y + 62},
            radius: 7,
        };
        this.genius = [
            {
                name: 'green',
                hitbox: {
                    coordinate: {x: 63, y: 16},      //top tile
                    radius: geniusHitboxRadius,
                }
            },{
                name: 'blue', 
                hitbox: {
                    coordinate: {x: 52, y: 27},     //left tile
                    radius: geniusHitboxRadius,
                }
            },{
                name: 'red',
                hitbox: {
                    coordinate: {x: 63, y: 38},     //bottom tile
                    radius: geniusHitboxRadius,
                }
            },{
                name: 'yellow',
                hitbox: {
                    coordinate: {x: 74, y: 27},     //right tile
                    radius: geniusHitboxRadius,
                }
            }
        ]
        this.isOpen = false;
    }

    setPositionRelativeToFragment(fragmentPosition: coordinate){
        this.openPanel.position = {
            x: fragmentPosition.x + this.openPanel.position.x,
            y: fragmentPosition.y + this.openPanel.position.y,
        }
        this.closedPanel.position = {
            x: fragmentPosition.x + this.closedPanel.position.x,
            y: fragmentPosition.y + this.closedPanel.position.y,
        }
        this.buttonHitbox.coordinate = {
            x: fragmentPosition.x + this.buttonHitbox.coordinate.x,
            y: fragmentPosition.y + this.buttonHitbox.coordinate.y,
        }
        this.genius.forEach(g => {
            g.hitbox.coordinate = {
                x: this.openPanel.position.x + g.hitbox.coordinate.x, 
                y: this.openPanel.position.y + g.hitbox.coordinate.y,
            }
        })
    }

    geniusPressed(clickCoords: coordinate){
        for(let i = 0; i < this.genius.length; i++){
            if(isWithin(this.genius[i].hitbox, clickCoords)){
                console.log(this.genius[i].name);
                return i;
            }
        } return -1;
    }
    

    interact(clickCoords: coordinate){
        if (!this.isOpen && isWithin(this.buttonHitbox, clickCoords)){
            this.isOpen = true;
        } else if(this.isOpen && (this.geniusPressed(clickCoords) === -1)){
            this.isOpen = false;
        }
    }

    renderHitboxes(canvas: CanvasRenderingContext2D){
        if(this.isOpen){
            this.genius.forEach(g => renderHitbox(canvas, g.hitbox.coordinate, g.hitbox.radius, 'magenta'));
        } else {
            renderHitbox(canvas, this.buttonHitbox.coordinate, this.buttonHitbox.radius);
        }
    }

    render(canvas: CanvasRenderingContext2D){
        this.isOpen
        ? this.openPanel.sprite.render(canvas, this.openPanel.position)
        : this.closedPanel.sprite.render(canvas, this.closedPanel.position);

        //this.renderHitboxes(canvas);
    }
}