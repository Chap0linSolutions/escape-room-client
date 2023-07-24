import { Sprite, Fragment, FragmentParams } from '../../classes';
import { InputHandler } from '../../events/InputHandler';
import sofaSprite from '../../assets/fragments/sofaOneFragment.png';
import { coordinate } from '../../types';
import { isWithin, renderHitbox } from '../../functions/Metrics';
import { SHOW_HITBOX } from '../../constants';

export class SofaOneFragment extends Fragment {
  interactions;
  sprite: Sprite;
  plantVaseUp = false;
  leftPillowUp = false;
  rightPillowUp = false;

  constructor({ object }: FragmentParams) {
    super({ object });
    this.sprite = new Sprite({
      sprite: sofaSprite,
      size: 600,
      rows: 4,
      columns: 1,
    });

    this.items = [];
    this.interactions = {
      plantVase: { coordinate: { x: 50, y: 300 }, radius: 20 },
      pillowLeft: { coordinate: { x: 170, y: 250 }, radius: 40 },
      pillowRight: { coordinate: { x: 460, y: 250 }, radius: 40 },
    };
    const inputHandler = new InputHandler();
    inputHandler.subscribe('mouseDown', 'sofaFragmentMouseDown', (pos) =>
      this.interact(pos)
    );
  }

  interact(clickCoords: coordinate): void {
    if (!this.isVisible()) return;
    const nothingUp =
      !this.plantVaseUp && !this.rightPillowUp && !this.leftPillowUp;
    if (nothingUp && isWithin(this.interactions.plantVase, clickCoords)) {
      this.plantVaseUp = true;
      return this.sprite.setQuad([0, 1]);
    }
    if (nothingUp && isWithin(this.interactions.pillowLeft, clickCoords)) {
      this.leftPillowUp = true;
      return this.sprite.setQuad([0, 2]);
    }
    if (nothingUp && isWithin(this.interactions.pillowRight, clickCoords)) {
      this.rightPillowUp = true;
      return this.sprite.setQuad([0, 3]);
    }
    // if (this.rightPillowUp && this.items.length > 0) {
    //   const state = new State();
    //   if (this.items[0].isInside(clickCoords)) {
    //     this.items[0].sound.play();
    //     state.addItem(this.items[0]);
    //     this.removeItem(this.items[0]);
    //     return;
    //   }
    // }
    if (!nothingUp) {
      this.plantVaseUp = false;
      this.leftPillowUp = false;
      this.rightPillowUp = false;
      this.sprite.setQuad([0, 0]);
    }
  }

  drawItems(canvas: CanvasRenderingContext2D) {
    this.rightPillowUp && this.items.forEach((item) => item.render(canvas));
  }

  drawHitboxes(canvas: CanvasRenderingContext2D) {
    renderHitbox(
      canvas,
      this.getAbsoluteCoords(this.interactions.plantVase.coordinate),
      this.interactions.plantVase.radius
    );
    renderHitbox(
      canvas,
      this.getAbsoluteCoords(this.interactions.pillowLeft.coordinate),
      this.interactions.pillowLeft.radius
    );
    renderHitbox(
      canvas,
      this.getAbsoluteCoords(this.interactions.pillowRight.coordinate),
      this.interactions.pillowRight.radius
    );
  }

  update(dt: number) {}

  setAllPositions(width: number, height: number): void {
    this.setPosition(width, height);
    this.interactions.plantVase.coordinate = {
      x: this.interactions.plantVase.coordinate.x + this.position.x,
      y: this.interactions.plantVase.coordinate.y + this.position.y,
    };
    this.interactions.pillowLeft.coordinate = {
      x: this.interactions.pillowLeft.coordinate.x + this.position.x,
      y: this.interactions.pillowLeft.coordinate.y + this.position.y,
    };
    this.interactions.pillowRight.coordinate = {
      x: this.interactions.pillowRight.coordinate.x + this.position.x,
      y: this.interactions.pillowRight.coordinate.y + this.position.y,
    };
  }

  render(canvas: CanvasRenderingContext2D): void {
    const { width, height } = this.sprite.getAllDimensions();
    !this.position && this.setAllPositions(width, height);
    this.drawBackground(canvas, width, height, 2);
    this.sprite.render(canvas, this.position);
    this.drawItems(canvas);
    SHOW_HITBOX && this.drawHitboxes(canvas);
  }
}
