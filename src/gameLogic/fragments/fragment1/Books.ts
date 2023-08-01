import { Fragment, InventoryItem, Sprite } from '../../../classes';
import { clickableArea, coordinate, quad } from '../../../types';
import { isWithin, renderHitbox } from '../../../functions/Metrics';
import { SHOW_HITBOX } from '../../../constants';
import bookSprite from '../../../assets/fragments/fragment1/books.png';
import redKeySprite from '../../../assets/items/red-key-sprite.png';
import redKeyIcon from '../../../assets/items/red-key.png';
import wooshSound from '../../../assets/sounds/woosh1.mp3';
import { State } from '../../state';

interface booksProps {
  position: coordinate;
  size: number;
  fragment: Fragment;
}

interface book {
  hitbox: clickableArea;
  quad: quad | number;
}

export class Books {
  sprite: Sprite;
  position: coordinate;
  interactive: book[];
  fragment: Fragment;
  items: InventoryItem[];

  constructor({ position, size, fragment }: booksProps) {
    this.sprite = new Sprite({
      sprite: bookSprite,
      size: size,
      rows: 1,
      columns: 4,
    });

    this.position = position;
    this.interactive = [
      {
        //top book
        quad: 1,
        hitbox: { coordinate: { x: 70, y: 60 }, radius: 30 },
      },
      {
        //middle book
        quad: 2,
        hitbox: { coordinate: { x: 80, y: 102 }, radius: 12 },
      },
      {
        //bottom book
        quad: 3,
        hitbox: { coordinate: { x: 103, y: 103 }, radius: 10 },
      },
    ];

    this.fragment = fragment;
    this.items = [
      new InventoryItem({
        spriteSrc: redKeySprite,
        icon: redKeyIcon,
        sound: wooshSound,
        name: 'CHAVE VERMELHA',
        size: 20,
        position: {
          x: 60,
          y: 85,
        },
      }),
    ];
  }

  removeItem(item: InventoryItem) {
    const index = this.items.findIndex((i) => item.name === i.name);
    const removed = this.items.splice(index, 1);
    if (removed.length > 0) return removed;
    return null;
  }

  setPositionRelativeToReference(fragmentPosition: coordinate) {
    this.position = {
      x: this.position.x + fragmentPosition.x,
      y: this.position.y + fragmentPosition.y,
    };

    this.interactive.forEach((book) => {
      book.hitbox.coordinate = {
        x: book.hitbox.coordinate.x + this.position.x,
        y: book.hitbox.coordinate.y + this.position.y,
      };
    });

    const booksPos = this.position;
    this.items.forEach((item) => {
      const itemPos = item.getPosition();
      item.setPosition({
        x: itemPos.x + booksPos.x,
        y: itemPos.y + booksPos.y,
      });
    });
  }

  areBooksOpen() {
    return this.sprite.getQuad()[0];
  }

  interact(clickCoords: coordinate) {
    const bookOpen = this.areBooksOpen();
    if (bookOpen) {
      if (bookOpen === 3) {
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].isInside(clickCoords)) {
            this.items[i].sound.play();
            const state = new State();
            state.addItem(this.items[0]);
            this.removeItem(this.items[0]);
            return;
          }
        }
      }
      return this.sprite.reset();
    }
    for (let i = 0; i < this.interactive.length; i++) {
      const book = this.interactive[i];
      if (isWithin(book.hitbox, clickCoords)) {
        this.sprite.setQuad(book.quad);
        break;
      }
    }
  }

  drawItems(canvas: CanvasRenderingContext2D) {
    this.items &&
      this.areBooksOpen() === 3 &&
      this.items.forEach((item) => item.render(canvas));
  }

  renderHitboxes(canvas: CanvasRenderingContext2D) {
    this.interactive.forEach((book) =>
      renderHitbox(canvas, book.hitbox.coordinate, book.hitbox.radius)
    );
  }

  render(canvas: CanvasRenderingContext2D) {
    this.sprite.render(canvas, this.position);
    this.drawItems(canvas);
    SHOW_HITBOX && this.renderHitboxes(canvas);
  }
}
