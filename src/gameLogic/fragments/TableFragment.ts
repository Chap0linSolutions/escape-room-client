import { Sprite, Fragment, FragmentParams } from '../../classes';
import { InputHandler } from '../../events/InputHandler';
import tableSprite from '../../assets/fragments/tableFragment.png';

import { coordinate } from '../../types';
import { getDistance } from '../../functions/Metrics';

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
      bottle1: { coordinate: { x: 502, y: 304 }, radius: 13 },
      bottle2: { coordinate: { x: 505, y: 319 }, radius: 13 },
      bottle3: { coordinate: { x: 502, y: 333 }, radius: 13 },
      bottle4: { coordinate: { x: 594, y: 205 }, radius: 13 },
    };
    const inputHandler = new InputHandler();
    inputHandler.subscribe('mouseDown', 'tableFragmentMouseDown', (pos) =>
      this.interact(pos)
    );
  }
  interact(clickCoords: coordinate): void {
    if (!this.isVisible()) return;
    const dist1 = getDistance(
      this.interactions.bottle1.coordinate,
      clickCoords
    );
    const dist2 = getDistance(
      this.interactions.bottle2.coordinate,
      clickCoords
    );
    const dist3 = getDistance(
      this.interactions.bottle3.coordinate,
      clickCoords
    );
    const dist4 = getDistance(
      this.interactions.bottle4.coordinate,
      clickCoords
    );
    if (
      dist1 > this.interactions.bottle1.radius &&
      dist2 > this.interactions.bottle2.radius &&
      dist3 > this.interactions.bottle3.radius &&
      dist4 > this.interactions.bottle4.radius
    )
      return;

    // TODO: bottle flip animation in another pop up
    const state = new State();
    state.cb.showToast({
      title: "Garrafa d'água",
      description: 'Agora não é hora de matar a sede!',
      backgroundColor: '#558296',
    });
  }

  render(canvas: CanvasRenderingContext2D): void {
    const { width, height } = this.sprite.getAllDimensions();
    !this.position && this.setPosition(width, height);
    this.drawBackground(canvas, width, height, 2);
    this.sprite.render(canvas, this.position);
  }
}
