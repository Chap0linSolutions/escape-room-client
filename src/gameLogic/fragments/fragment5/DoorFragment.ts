import { Sprite, Fragment, FragmentParams } from '../../../classes';
import { InputHandler } from '../../../events/InputHandler';
import { coordinate } from '../../../types';
import { ControlPanel } from './ControlPanel/ControlPanel';
import { renderHitbox } from '../../../functions/Metrics';
import doorSprite from '../../../assets/fragments/fragment5/fragment5.png';
import plantSound from '../../../assets/sounds/woosh1.mp3';
import Sound from '../../../classes/Sound';
import { SHOW_HITBOX } from '../../../constants';
export class DoorFragment extends Fragment {
  interactions;
  sprite: Sprite;
  controlPanel: ControlPanel;
  plantVaseUp = false;

  constructor({ object }: FragmentParams) {
    super({ object });
    this.sprite = new Sprite({
      sprite: doorSprite,
      size: 600,
      rows: 2,
      columns: 1,
    });

    this.controlPanel = new ControlPanel({
      size: 70,
      position: { x: 409, y: 186 },
    });

    this.interactions = {
      plantVase: {
        hitbox: { coordinate: { x: 530, y: 450 }, radius: 40 },
        sound: new Sound({ source: plantSound }),
      },
    }

    this.items = [];
    const inputHandler = new InputHandler();
    inputHandler.subscribe('mouseDown', 'sofaFragmentMouseDown', (pos) =>
      this.interact(pos)
    );
  }

  setAllPositions(width: number, height: number) {
    this.setPosition(width, height);
    this.controlPanel.setPositionRelativeToReference(this.position);
  }

  liftPlant() {
    if (this.plantVaseUp) return;
    this.plantVaseUp = true;
    this.interactions.plantVase.sound.play();
  }

  releasePlant() {
    if (!this.plantVaseUp) return;
    this.plantVaseUp = false;
    this.interactions.plantVase.sound.play();
  }

  interact(clickCoords: coordinate): void {
    if (!this.isVisible()) return;
    this.controlPanel.interact(clickCoords);
    if (!this.plantVaseUp && this.isWithin(this.interactions.plantVase.hitbox, clickCoords)) {
      this.sprite.setQuad([0, 1]);
      this.liftPlant();
    } else {
      this.sprite.setQuad([0, 0]);
      this.releasePlant();
    }
  }

  update(dt: number) {
    this.controlPanel.update(dt);
  }

  drawHitboxes(canvas: CanvasRenderingContext2D) {
    renderHitbox(
      canvas,
      this.getAbsoluteCoords(this.interactions.plantVase.hitbox.coordinate),
      this.interactions.plantVase.hitbox.radius,
    );
  }

  render(canvas: CanvasRenderingContext2D): void {
    const { width, height } = this.sprite.getAllDimensions();
    !this.position && this.setAllPositions(width, height);
    this.drawBackground(canvas, width, height, 2);
    this.sprite.render(canvas, this.position);
    this.controlPanel.render(canvas);

    SHOW_HITBOX && this.drawHitboxes(canvas);
  }
}
