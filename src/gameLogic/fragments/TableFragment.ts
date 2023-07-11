import { Sprite, InventoryItem, Fragment, FragmentParams } from '../../classes';
import { InputHandler } from '../../events/InputHandler';
import tableSprite from '../../assets/fragments/tableFragment.png';

import { coordinate } from '../../types';
import { renderHitbox } from '../../functions/Metrics';

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

        // TODO: bottle flip animation in another pop up OU toast
        

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
