import { Sprite, InventoryItem, Fragment, FragmentParams } from '../../classes';
import { InputHandler } from '../../events/InputHandler';
import tableSprite from '../../assets/fragments/tableFragment.png';

import { coordinate } from '../../types';
import { getDistance, renderHitbox } from '../../functions/Metrics';

import { State } from '../state';

export class TableFragment extends Fragment {
    interactions;
    sprite: Sprite;
    constructor({ object }: FragmentParams) {
        super({ object });
        this.sprite = new Sprite({
            sprite: tableSprite,
            size: 600,
            rows: 1,
            columns: 1,
        });

        this.items = [];
        this.interactions = {
            bottle: { coordinate: { x: 502, y: 304 }, radius: 13 },
        };
        const inputHandler = new InputHandler();
        inputHandler.subscribe('mouseDown', 'tableFragmentMouseDown', (pos) =>
            this.interact(pos)
        );
    }
    interact(clickCoords: coordinate): void {
        if (!this.isVisible()) return;
        const dist = getDistance(this.interactions.bottle.coordinate, clickCoords);
        if (dist > this.interactions.bottle.radius) return;

        // TODO: bottle flip animation in another pop up
        const state = new State();
        state.cb.showToast({
            title: "Garrafa d'água",
            description: 'Agora não é hora de matar a sede!',
            backgroundColor: '#558296',
        })

    }
    drawItems(canvas: CanvasRenderingContext2D) {
        return
    }

    drawHitboxes(canvas: CanvasRenderingContext2D) {
        renderHitbox(canvas, { x: 502, y: 304 }, 13, '#800080');
    }

    render(canvas: CanvasRenderingContext2D): void {
        const { width, height } = this.sprite.getAllDimensions();
        !this.position && this.setPosition(width, height);
        this.drawBackground(canvas, width, height, 2);
        this.sprite.render(canvas, this.position);
        this.drawItems(canvas);
        this.drawHitboxes(canvas)
    }
}
