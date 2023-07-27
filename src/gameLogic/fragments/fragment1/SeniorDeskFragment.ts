import { Sprite, Fragment, FragmentParams } from '../../../classes';
import { InputHandler } from '../../../events/InputHandler';
import { State } from '../../state';
import { renderHitbox } from '../../../functions/Metrics';
import { coordinate } from '../../../types';
import { SHOW_HITBOX } from '../../../constants';
import { Books } from './Books';
import deskSprite from '../../../assets/fragments/fragment1/fragment1.png';


export class SeniorDeskFragment extends Fragment {
    interactions;
    sprite: Sprite;
    books: Books;
    drawerPulled: boolean;

    constructor({ object }: FragmentParams) {
        super({ object });
        this.sprite = new Sprite({
            sprite: deskSprite,
            size: 600,
            rows: 2,
            columns: 1,
        });

        this.items = [];
        this.interactions = {

        };
        const inputHandler = new InputHandler();
        inputHandler.subscribe('mouseDown', 'deskFragmentMouseDown', (pos) =>
            this.interact(pos)
        );

        this.books = new Books({
            size: 143,
            position: {
                x: 0,
                y: 155,
            }
        });

        this.interactions = {
            drawer: {
                coordinate: {x: 135, y: 318}, radius: 20
            }
        }

        this.drawerPulled = false;
    }

    interact(clickCoords: coordinate): void {
        if (!this.isVisible()) return;
        this.books.interact(clickCoords);
        if(!this.drawerPulled && this.isWithin(this.interactions.drawer, clickCoords)){
            this.drawerPulled = true;
            this.sprite.setQuad([0, 1]);
        } else {
            this.drawerPulled = false;
            this.sprite.setQuad([0, 0]);
        }
    }

    setAllPositions(width: number, height: number){
        this.setPosition(width, height);
        this.books.setPositionRelativeToReference(this.position);
    }

    drawHitboxes(canvas: CanvasRenderingContext2D) {
        renderHitbox(
            canvas,
            this.getAbsoluteCoords(this.interactions.drawer.coordinate),
            this.interactions.drawer.radius,
          );
    }

    render(canvas: CanvasRenderingContext2D): void {
        const { width, height } = this.sprite.getAllDimensions();
        !this.position && this.setAllPositions(width, height);
        this.drawBackground(canvas, width, height, 2);
        this.sprite.render(canvas, this.position);
        this.books.render(canvas);
        SHOW_HITBOX && this.drawHitboxes(canvas);
    }
}
