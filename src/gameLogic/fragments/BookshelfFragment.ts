import { Sprite, Fragment, FragmentParams, InventoryItem } from '../../classes';
import { InputHandler } from '../../events/InputHandler';
import { State } from '../state';
import { coordinate } from '../../types';
import { renderHitbox } from '../../functions/Metrics';
import { SHOW_HITBOX } from '../../constants';

import Sound from '../../classes/Sound';
import soundFile from '../../assets/sounds/woosh1.mp3';
import bookshelfSprite from '../../assets/fragments/fragment6.png';
import OldCalendarSprite from '../../assets/items/old-calendar-sprite.png';
import OldCalendarIcon from '../../assets/items/old-calendar.png';
import AsciiBookSprite from '../../assets/items/ascii-book-sprite.png';
import AsciiBookIcon from '../../assets/items/ascii-book.png';
import WooshSound from '../../assets/sounds/woosh1.mp3';


export class BookshelfFragment extends Fragment {
  interactions;
  sprite: Sprite;
  plantVaseUp = false;

  constructor({ object }: FragmentParams) {
    super({ object });
    this.sprite = new Sprite({
      sprite: bookshelfSprite,
      size: 600,
      rows: 2,
      columns: 1,
    });

    this.items = [
      new InventoryItem({
        spriteSrc: OldCalendarSprite,
        name: 'OLD_CALENDAR',
        size: 50,
        icon: OldCalendarIcon,
        position: { x: 380, y: 347 },
        sound: WooshSound, //PaperSound,
      }),
      new InventoryItem({
        spriteSrc: AsciiBookSprite,
        name: 'ASCII_BOOK',
        size: 65,
        icon: AsciiBookIcon,
        position: { x: 174, y: 393 },
        sound: WooshSound,
      }),
    ];
    this.interactions = {
      plantVase: { coordinate: { x: 515, y: 420 }, radius: 25 },
    };
    const inputHandler = new InputHandler();
    inputHandler.subscribe('mouseDown', 'fragment6MouseDown', (pos) =>
      this.handleClick(pos)
    );
  }

  interact(clickCoords: coordinate): void {
    if (!this.interactions || !clickCoords) return;
    const state = new State();
    const plantSound = new Sound({ source: soundFile });

    if (!this.plantVaseUp) {
      if (this.isWithin(this.interactions.plantVase, clickCoords)) {
        this.plantVaseUp = true;
        plantSound.play();
        return this.sprite.setQuad([0, 1]);

      } else {

        const calendarIndex = this.items.findIndex(item => item.name == 'OLD_CALENDAR');
        const asciiIndex = this.items.findIndex(item => item.name == 'ASCII_BOOK');

        if (calendarIndex >= 0 && this.items[calendarIndex].isInside(clickCoords)) {
          this.items[calendarIndex].sound.play();
          state.addItem(this.items[calendarIndex]);
          this.removeItem(this.items[calendarIndex]);
          return;

        } else if ( asciiIndex >= 0 && this.items[asciiIndex].isInside(clickCoords)) {
          this.items[asciiIndex].sound.play();
          state.addItem(this.items[asciiIndex]);
          this.removeItem(this.items[asciiIndex]);
          return;
        }
      }
    } else {
      this.plantVaseUp = false;
      plantSound.play();
      this.sprite.setQuad([0, 0]);
    }
  }


  update(_dt: number): void { }

  drawItems(canvas: CanvasRenderingContext2D) {
    this.items.forEach((item) => item.render(canvas));
  }

  drawHitboxes(canvas: CanvasRenderingContext2D) {
    renderHitbox(
      canvas,
      this.getAbsoluteCoords(this.interactions.plantVase.coordinate),
      this.interactions.plantVase.radius
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
