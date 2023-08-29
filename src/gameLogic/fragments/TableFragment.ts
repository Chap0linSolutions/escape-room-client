import { Sprite, Fragment, FragmentParams } from '../../classes';
import { InputHandler } from '../../events/InputHandler';
import tableSprite from '../../assets/fragments/tableFragment.png';
import { renderHitbox } from '../../functions/Metrics';
import { SHOW_HITBOX } from '../../constants';
import { coordinate } from '../../types';
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
      bottle1: { coordinate: { x: 378, y: 100 }, radius: 13 },
      bottle2: { coordinate: { x: 295, y: 180 }, radius: 13 },
      bottle3: { coordinate: { x: 297, y: 195 }, radius: 13 },
      bottle4: { coordinate: { x: 299, y: 210 }, radius: 13 },
    };
    const inputHandler = new InputHandler();
    inputHandler.subscribe('mouseDown', 'tableFragmentMouseDown', (pos) =>
      this.handleClick(pos)
    );
  }

  interact(clickCoords: coordinate): void {
    const clickedBottle1 = this.isWithin(this.interactions.bottle1, clickCoords);
    const clickedBottle2 = this.isWithin(this.interactions.bottle2, clickCoords);
    const clickedBottle3 = this.isWithin(this.interactions.bottle3, clickCoords);
    const clickedBottle4 = this.isWithin(this.interactions.bottle4, clickCoords);
    if (!clickedBottle1 && !clickedBottle2 && !clickedBottle3 && !clickedBottle4) return;

    // TODO: bottle flip animation in another pop up
    const state = new State();
    state.cb.showToast({
      title: "Garrafa d'água",
      description: 'Agora não é hora de matar a sede!',
      backgroundColor: '#558296',
    });
  }

  drawHitboxes(canvas: CanvasRenderingContext2D) {
    renderHitbox(
        canvas,
        this.getAbsoluteCoords(this.interactions.bottle1.coordinate),
        this.interactions.bottle1.radius
    );
    renderHitbox(
        canvas,
        this.getAbsoluteCoords(this.interactions.bottle2.coordinate),
        this.interactions.bottle2.radius
    );
    renderHitbox(
        canvas,
        this.getAbsoluteCoords(this.interactions.bottle3.coordinate),
        this.interactions.bottle3.radius
    );
    renderHitbox(
      canvas,
      this.getAbsoluteCoords(this.interactions.bottle4.coordinate),
      this.interactions.bottle4.radius
  );
}

  update(_dt: number){}
  render(canvas: CanvasRenderingContext2D): void {
    const { width, height } = this.sprite.getAllDimensions();
    !this.position && this.setPosition(width, height);
    this.drawBackground(canvas, width, height, 2);
    this.sprite.render(canvas, this.position);
    SHOW_HITBOX && this.drawHitboxes(canvas);
  }
}
