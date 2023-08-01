import { Sprite, InventoryItem } from '../../../classes';
import { coordinate } from '../../../types';
import { renderHitbox, isWithin } from '../../../functions/Metrics';

import vaultSprite from '../../../assets/fragments/fragment7/cofre.png';
import buttonClick from '../../../assets/sounds/btn_click.wav';
import error from '../../../assets/sounds/errorPanel.mp3';
import right from '../../../assets/sounds/right1.mp3';
import soundFile from '../../../assets/sounds/woosh1.mp3';

import RoomKeySprite from '../../../assets/items/room-key-sprite.png';
import RoomKeyIcon from '../../../assets/items/room-key.png';

import Sound from '../../../classes/Sound';
import { State } from '../../state';

type VaultProps = {
  zoomOut: () => void;
};

export class Vault {
  zoomOut;
  items;
  sprite: Sprite;
  interactions;
  displayString = '';
  passwordAnimationState = false;
  wrongAnimationSteps = [];
  vaultOpened = false;
  dt = 0;
  constructor({ zoomOut }: VaultProps) {
    this.zoomOut = zoomOut;
    this.sprite = new Sprite({
      sprite: vaultSprite,
      size: 600,
      rows: 2,
      columns: 1,
    });

    this.items = [
      new InventoryItem({
        spriteSrc: RoomKeySprite,
        name: 'ROOM_KEY',
        size: 100,
        icon: RoomKeyIcon,
        position: { x: 460, y: 430 },
        sound: soundFile,
      }),
    ];

    this.interactions = {
      one: { coordinate: { x: 588, y: 318 }, radius: 10 },
      two: { coordinate: { x: 619, y: 318 }, radius: 10 },
      three: { coordinate: { x: 650, y: 318 }, radius: 10 },
      four: { coordinate: { x: 588, y: 343 }, radius: 10 },
      five: { coordinate: { x: 619, y: 343 }, radius: 10 },
      six: { coordinate: { x: 650, y: 343 }, radius: 10 },
      seven: { coordinate: { x: 588, y: 368 }, radius: 10 },
      eight: { coordinate: { x: 619, y: 368 }, radius: 10 },
      nine: { coordinate: { x: 650, y: 368 }, radius: 10 },
      asterisc: { coordinate: { x: 588, y: 393 }, radius: 10 },
      zero: { coordinate: { x: 619, y: 393 }, radius: 10 },
      hashtag: { coordinate: { x: 650, y: 393 }, radius: 10 },
    };
  }

  update(dt: number): void {
    if (!this.passwordAnimationState) return;
    if (this.dt < 300) {
      this.dt += dt;
    } else if (this.wrongAnimationSteps.length > 0) {
      this.dt = 0;
      this.wrongAnimationSteps.splice(0, 1);
    } else if (this.wrongAnimationSteps.length === 0) {
      this.displayString = '';
      this.passwordAnimationState = false;
    }
  }

  addDigit(digit: string): void {
    const btnClickSound = new Sound({ source: buttonClick });
    this.displayString += digit;
    btnClickSound.play();
    if (this.displayString.length === 4) {
      if (this.displayString !== '1472') {
        const errorSound = new Sound({ source: error });
        errorSound.play();
        this.passwordAnimationState = true;
        this.wrongAnimationSteps = [true, false, true, false, true, false];
        return;
      }
      const success = new Sound({ source: right });
      success.play();
      this.sprite.setQuad([0, 1]);
      this.vaultOpened = true;
    }
  }

  async interact(clickCoords: coordinate) {
    if (this.passwordAnimationState) {
      return;
    }

    if (this.vaultOpened) {
      if (this.items.length === 0) {
        return this.zoomOut();
      }

      const state = new State();
      if (this.items[0].isInside(clickCoords)) {
        this.items[0].sound.play();
        await state.addItem(this.items[0]);
        this.items = [];
        return;
      }
      return;
    }

    if (clickCoords.y > 490 || clickCoords.y < 210) {
      return this.zoomOut();
    }
    if (isWithin(this.interactions.one, clickCoords)) {
      return this.addDigit('1');
    }
    if (isWithin(this.interactions.two, clickCoords)) {
      return this.addDigit('2');
    }
    if (isWithin(this.interactions.three, clickCoords)) {
      return this.addDigit('3');
    }
    if (isWithin(this.interactions.four, clickCoords)) {
      return this.addDigit('4');
    }
    if (isWithin(this.interactions.five, clickCoords)) {
      return this.addDigit('5');
    }
    if (isWithin(this.interactions.six, clickCoords)) {
      return this.addDigit('6');
    }
    if (isWithin(this.interactions.seven, clickCoords)) {
      return this.addDigit('7');
    }
    if (isWithin(this.interactions.eight, clickCoords)) {
      return this.addDigit('8');
    }
    if (isWithin(this.interactions.nine, clickCoords)) {
      return this.addDigit('9');
    }
    if (isWithin(this.interactions.zero, clickCoords)) {
      return this.addDigit('0');
    }
    if (isWithin(this.interactions.asterisc, clickCoords)) {
      return this.addDigit('*');
    }
    if (isWithin(this.interactions.hashtag, clickCoords)) {
      return this.addDigit('#');
    }
  }
  drawHitboxes(canvas: CanvasRenderingContext2D) {
    renderHitbox(
      canvas,
      this.interactions.one.coordinate,
      this.interactions.one.radius
    );
    renderHitbox(
      canvas,
      this.interactions.two.coordinate,
      this.interactions.two.radius
    );
    renderHitbox(
      canvas,
      this.interactions.three.coordinate,
      this.interactions.three.radius
    );
    renderHitbox(
      canvas,
      this.interactions.four.coordinate,
      this.interactions.one.radius
    );
    renderHitbox(
      canvas,
      this.interactions.five.coordinate,
      this.interactions.two.radius
    );
    renderHitbox(
      canvas,
      this.interactions.six.coordinate,
      this.interactions.three.radius
    );
    renderHitbox(
      canvas,
      this.interactions.seven.coordinate,
      this.interactions.one.radius
    );
    renderHitbox(
      canvas,
      this.interactions.eight.coordinate,
      this.interactions.two.radius
    );
    renderHitbox(
      canvas,
      this.interactions.nine.coordinate,
      this.interactions.three.radius
    );
    renderHitbox(
      canvas,
      this.interactions.asterisc.coordinate,
      this.interactions.one.radius
    );
    renderHitbox(
      canvas,
      this.interactions.zero.coordinate,
      this.interactions.two.radius
    );
    renderHitbox(
      canvas,
      this.interactions.hashtag.coordinate,
      this.interactions.three.radius
    );
  }

  drawDisplayText(canvas: CanvasRenderingContext2D) {
    canvas.strokeStyle = 'red';
    this.displayString.length > 0 &&
      canvas.strokeText(this.displayString[0], 455, 339);
    this.displayString.length > 1 &&
      canvas.strokeText(this.displayString[1], 470, 339);
    this.displayString.length > 2 &&
      canvas.strokeText(this.displayString[2], 485, 339);
    this.displayString.length > 3 &&
      canvas.strokeText(this.displayString[3], 500, 339);
  }

  render(
    canvas: CanvasRenderingContext2D,
    position: coordinate,
    size: { width: number; height: number }
  ) {
    const { width, height } = size;
    const fill = canvas.fillStyle;
    canvas.fillStyle = '#000000AA';
    canvas.fillRect(
      position.x - 2,
      position.y - 2,
      width + 2 * 2,
      height + 2 * 2
    );
    canvas.fillStyle = fill;
    this.sprite.render(canvas, position);
    if (this.wrongAnimationSteps.length > 0 && !this.wrongAnimationSteps[0]) {
      return;
    }
    !this.vaultOpened && this.drawDisplayText(canvas);
    this.vaultOpened && this.items.forEach((item) => item.render(canvas));
    // this.drawHitboxes(canvas);
  }
}
