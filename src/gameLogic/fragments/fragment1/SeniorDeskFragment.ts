import {
  Sprite,
  Fragment,
  FragmentParams,
  InventoryItem,
} from '../../../classes';
import { InputHandler } from '../../../events/InputHandler';
import { State } from '../../state';
import { renderHitbox } from '../../../functions/Metrics';
import { coordinate } from '../../../types';
import { SHOW_HITBOX } from '../../../constants';
import { Books } from './Books';
import { Booklet } from './Booklet';
import deskSprite from '../../../assets/fragments/fragment1/fragment1.png';
import pencilIcon from '../../../assets/items/green-pencil.png';
import pencilSprite from '../../../assets/items/green-pencil-sprite.png';
import thumbDriveSprite from '../../../assets/items/thumb-drive-sprite.png';
import thumbDriveIcon from '../../../assets/items/thumb-drive.png';
import wooshSound from '../../../assets/sounds/woosh1.mp3';
import lockedSound from '../../../assets/sounds/locked.wav';
import unlockedSound from '../../../assets/sounds/unlocked.wav';
import openDrawerSound from '../../../assets/sounds/openPanel.mp3';
import closeDrawerSound from '../../../assets/sounds/closePanel.mp3';
import Sound from '../../../classes/Sound';

export class SeniorDeskFragment extends Fragment {
  interactions;
  sprite: Sprite;
  books: Books;
  booklet: Booklet;
  drawerPulled: boolean;
  drawerUnlocked: boolean;
  sounds: {
    openDrawer: Sound;
    closeDrawer: Sound;
    locked: Sound;
    unlocked: Sound;
  }

  constructor({ object }: FragmentParams) {
    super({ object });
    this.sprite = new Sprite({
      sprite: deskSprite,
      size: 600,
      rows: 2,
      columns: 1,
    });

    this.items = [];
    this.interactions = {};
    const inputHandler = new InputHandler();
    inputHandler.subscribe('mouseDown', 'deskFragmentMouseDown', (pos) =>
      this.handleClick(pos)
    );

    this.books = new Books({
      fragment: this,
      size: 143,
      position: {
        x: 0,
        y: 155,
      },
    });

    this.interactions = {
      drawer: {
        coordinate: { x: 135, y: 318 },
        radius: 20,
      },
    };

    this.booklet = new Booklet();
    this.drawerPulled = false;
    this.drawerUnlocked = false;

    this.items = [
      new InventoryItem({
        spriteSrc: pencilSprite,
        icon: pencilIcon,
        name: 'LÁPIS',
        size: 10,
        sound: wooshSound,
        position: {
          x: 430,
          y: 143,
        },
      }),
      new InventoryItem({
        spriteSrc: thumbDriveSprite,
        icon: thumbDriveIcon,
        name: 'PENDRIVE VERMELHO',
        size: 25,
        sound: wooshSound,
        position: {
          x: 120,
          y: 330,
        },
      }),
    ];

    this.sounds = {
      openDrawer: new Sound({source: openDrawerSound}),
      closeDrawer: new Sound({source: closeDrawerSound}),
      locked: new Sound({source: lockedSound}),
      unlocked: new Sound({source: unlockedSound}),
    }
  }

  unlockDrawer() {
    this.drawerUnlocked = true;
    this.sounds.unlocked.play();
  }

  openDrawer() {
    this.drawerPulled = true;
    this.sprite.setQuad([0, 1]);
    this.sounds.openDrawer.play();
  }

  closeDrawer() {
    this.drawerPulled = false;
    this.sprite.setQuad([0, 0]);
    this.sounds.closeDrawer.play();
  }

  success(msg: string) {
    const state = new State();
    state.cb.showToast({
      backgroundColor: 'forestgreen',
      title: msg,
      description: '',
    });
  }

  error(msg: string) {
    const state = new State();
    state.cb.showToast({
      backgroundColor: 'firebrick',
      title: msg,
      description: '',
    });
  }

  removeItem(item: InventoryItem) {
    const index = this.items.findIndex((i) => item.name === i.name);
    const removed = this.items.splice(index, 1);
    if (removed.length > 0) return removed;
    return null;
  }

  interact(clickCoords: coordinate): void {
    const bookletWasSelected = this.booklet.isSelected();
    this.booklet.interact(clickCoords);
    if (!bookletWasSelected) {
      this.books.interact(clickCoords);
      if (this.items) {
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].name === 'PENDRIVE VERMELHO' && !this.drawerPulled)
            continue;
          if (this.items[i].isInside(clickCoords)) {
            const state = new State();
            this.items[i].sound.play();
            state.addItem(this.items[i]);
            this.removeItem(this.items[i]);
            return;
          }
        }
      }
      if (this.isWithin(this.interactions.drawer, clickCoords)) {
        const state = new State();
        if (this.drawerUnlocked) {
          if (!this.drawerPulled) {
            this.openDrawer();
          } else {
            this.closeDrawer();
          }
        } else {
          const itemInHand: string = state.activeItem;
          if (itemInHand && itemInHand === 'CHAVE VERMELHA') {
            this.unlockDrawer();
            this.success('A gaveta foi destrancada.');
            return;
          }
          this.sounds.locked.play();
          this.error('Gaveta trancada.');
        }
        return;
      }
      this.drawerPulled && this.closeDrawer();
    }
  }

  setAllPositions(width: number, height: number) {
    this.setPosition(width, height);
    this.books.setPositionRelativeToReference(this.position);
    this.booklet.setPositionRelativeToReference(this.position, width, height);
  }

  drawHitboxes(canvas: CanvasRenderingContext2D) {
    renderHitbox(
      canvas,
      this.getAbsoluteCoords(this.interactions.drawer.coordinate),
      this.interactions.drawer.radius
    );
  }

  drawItems(canvas: CanvasRenderingContext2D) {
    this.items.forEach((item) => {
      if (item.name === 'PENDRIVE VERMELHO' && !this.drawerPulled) return;
      item.render(canvas);
    });
  }

  update(dt: number) {}

  render(canvas: CanvasRenderingContext2D): void {
    const { width, height } = this.sprite.getAllDimensions();
    !this.position && this.setAllPositions(width, height);
    this.drawBackground(canvas, width, height, 2);
    this.sprite.render(canvas, this.position);
    this.drawItems(canvas);
    this.books.render(canvas);
    this.booklet.render(canvas);
    SHOW_HITBOX && this.drawHitboxes(canvas);
  }
}
