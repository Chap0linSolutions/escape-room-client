import { Sprite, Fragment, FragmentParams, InventoryItem } from '../../classes';
import { InputHandler } from '../../events/InputHandler';
import { State } from '../state';
import deskSprite from '../../assets/fragments/internDeskFragment.png';
import { coordinate } from '../../types';
import { renderHitbox } from '../../functions/Metrics';
import { SHOW_HITBOX } from '../../constants';
import Sound from '../../classes/Sound';

// Sfx by Nicole Marie T, CC-BY 4.0 <https://creativecommons.org/licenses/by/4.0>, via OpenGameArt.org
import soundFile from '../../assets/sounds/light_switch.wav';

export class InternDeskFragment extends Fragment {
  interactions;
  sprite: Sprite;
  lampOn = false;
  calendarZoom = false;

  constructor({ object }: FragmentParams) {
    super({ object });
    this.sprite = new Sprite({
      sprite: deskSprite,
      size: 600,
      rows: 2,
      columns: 2,
    });

    this.items = [];
    this.interactions = {
      calendar: { coordinate: { x: 70, y: 180 }, radius: 30 },
      deskLamp: { coordinate: { x: 463, y: 147 }, radius: 20 },
      bookPile: { coordinate: { x: 510, y: 350 }, radius: 50 },
    };
    const inputHandler = new InputHandler();
    inputHandler.subscribe('mouseDown', 'deskFragmentMouseDown', (pos) =>
      this.handleClick(pos)
    );
  }

  interact(clickCoords: coordinate): void {
    if (!this.interactions || !clickCoords) return;
    const state = new State();
    const switchSound = new Sound({ source: soundFile });

    if (!this.calendarZoom) {
      if (this.isWithin(this.interactions.calendar, clickCoords)) {
        this.calendarZoom = true;
      } else if (this.isWithin(this.interactions.deskLamp, clickCoords)) {
        this.lampOn = !this.lampOn;
        switchSound.play();
      } else if (this.isWithin(this.interactions.bookPile, clickCoords)) {
        state.cb.showToast({
          title: 'Livros',
          description: 'Uma pilha de livros da biblioteca da faculdade',
          backgroundColor: '#8c4b8c',
        });
      }
    } else {
      this.calendarZoom = false;
    }

    return this.sprite.setQuad([
      this.calendarZoom ? 1 : 0,
      this.lampOn ? 1 : 0,
    ]);
  }

  drawHitboxes(canvas: CanvasRenderingContext2D) {
    renderHitbox(
      canvas,
      this.getAbsoluteCoords(this.interactions.calendar.coordinate),
      this.interactions.calendar.radius
    );
    renderHitbox(
      canvas,
      this.getAbsoluteCoords(this.interactions.deskLamp.coordinate),
      this.interactions.deskLamp.radius
    );
    renderHitbox(
      canvas,
      this.getAbsoluteCoords(this.interactions.bookPile.coordinate),
      this.interactions.bookPile.radius
    );
  }

  update(_dt: number) {}
  render(canvas: CanvasRenderingContext2D): void {
    const { width, height } = this.sprite.getAllDimensions();
    !this.position && this.setPosition(width, height);
    this.drawBackground(canvas, width, height, 2);
    this.sprite.render(canvas, this.position);
    SHOW_HITBOX && this.drawHitboxes(canvas);
  }
}
