import { Sprite, Fragment, FragmentParams, InventoryItem } from '../../classes';
import { InputHandler } from '../../events/InputHandler';
import { State } from '../state';
import Sound from '../../classes/Sound';
import zipperSoundFile from '../../assets/sounds/zipper.wav';
import sofaSprite from '../../assets/fragments/sofaTwoFragment.png';
import PaperIcon from '../../assets/items/paper.png';
import PaperSprite from '../../assets/items/paper-sprite.png';
import PaperSound from '../../assets/sounds/paper.mp3';
import { coordinate } from '../../types';
import { renderHitbox } from '../../functions/Metrics';
import { SHOW_HITBOX } from '../../constants';

export class SofaTwoFragment extends Fragment {
  interactions;
  sprite: Sprite;
  zipperOpen = false;
  plantVaseUp = false;
  leftPillowUp = false;
  rightPillowUp = false;

  constructor({ object }: FragmentParams) {
    super({ object });
    this.sprite = new Sprite({
      sprite: sofaSprite,
      size: 600,
      rows: 5,
      columns: 1,
    });

    this.items = [
      new InventoryItem({
        spriteSrc: PaperSprite,
        name: 'FOLDED_PAPER',
        size: 40,
        icon: PaperIcon,
        position: { x: 150, y: 270 },
        sound: PaperSound,
      }),
    ];

    this.interactions = {
      plantVase: { coordinate: { x: 520, y: 300 }, radius: 25 },
      pillowLeft: { coordinate: { x: 115, y: 250 }, radius: 40 },
      pillowRight: { coordinate: { x: 405, y: 250 }, radius: 40 },
      pillowZipper: { coordinate: { x: 145, y: 278 }, radius: 2 },
    };

    const inputHandler = new InputHandler();
    inputHandler.subscribe('mouseDown', 'sofaFragmentMouseDown', (pos) =>
      this.interact(pos)
    );
  }

  interact(clickCoords: coordinate): void {
    if (!this.isVisible()) return;

    const zipperSound = new Sound({ source: zipperSoundFile });
    const nothingInteracted =
      !this.zipperOpen &&
      !this.plantVaseUp &&
      !this.rightPillowUp &&
      !this.leftPillowUp;

    if (
      nothingInteracted &&
      this.isWithin(this.interactions.pillowZipper, clickCoords)
    ) {
      this.zipperOpen = true;
      zipperSound.play();
      return this.sprite.setQuad([0, 4]);
    }

    if (
      nothingInteracted &&
      this.isWithin(this.interactions.plantVase, clickCoords)
    ) {
      this.plantVaseUp = true;
      return this.sprite.setQuad([0, 1]);
    }
    if (
      nothingInteracted &&
      this.isWithin(this.interactions.pillowLeft, clickCoords)
    ) {
      this.leftPillowUp = true;
      return this.sprite.setQuad([0, 2]);
    }
    if (
      nothingInteracted &&
      this.isWithin(this.interactions.pillowRight, clickCoords)
    ) {
      this.rightPillowUp = true;
      return this.sprite.setQuad([0, 3]);
    }

    if (
      nothingInteracted &&
      this.isWithin(this.interactions.pillowRight, clickCoords)
    ) {
      this.rightPillowUp = true;
      return this.sprite.setQuad([0, 3]);
    }

    if (this.zipperOpen && this.items.length > 0) {
      const state = new State();
      if (this.items[0].isInside(clickCoords)) {
        this.items[0].sound.play();
        state.addItem(this.items[0]);
        this.removeItem(this.items[0]);
        return;
      }
    }

    if (!nothingInteracted) {
      if (this.zipperOpen) zipperSound.play();
      this.zipperOpen = false;
      this.plantVaseUp = false;
      this.leftPillowUp = false;
      this.rightPillowUp = false;
      this.sprite.setQuad([0, 0]);
    }
  }

  drawItems(canvas: CanvasRenderingContext2D) {
    this.zipperOpen && this.items.forEach((item) => item.render(canvas));
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
    renderHitbox(
      canvas,
      this.getAbsoluteCoords(this.interactions.pillowZipper.coordinate),
      this.interactions.pillowZipper.radius,
      '#ff00ff'
    );
  }

  render(canvas: CanvasRenderingContext2D): void {
    const { width, height } = this.sprite.getAllDimensions();
    !this.position && this.setPosition(width, height);
    this.drawBackground(canvas, width, height, 2);
    this.sprite.render(canvas, this.position);
    this.drawItems(canvas);
    SHOW_HITBOX && this.drawHitboxes(canvas);
  }
}
