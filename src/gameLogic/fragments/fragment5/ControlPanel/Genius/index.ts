import { isWithin, renderHitbox } from '../../../../../functions/Metrics';
import { clickableArea, coordinate, quad } from '../../../../../types';
import { Sprite } from '../../../../../classes';
import { GeniusLogic } from './GeniusLogic';
import { ControlPanel } from '../index';
import rightGuessSound from '../../../../../assets/sounds/right1.mp3';
import wrongGuessSound from '../../../../../assets/sounds/errorPanel.mp3';
import geniusSprite from '../../../../../assets/fragments/fragment5/genius.png';
import geniusSound1 from '../../../../../assets/sounds/genius1.mp3';
import geniusSound2 from '../../../../../assets/sounds/genius2.mp3';
import geniusSound3 from '../../../../../assets/sounds/genius3.mp3';
import geniusSound4 from '../../../../../assets/sounds/genius4.mp3';
import Sound from '../../../../../classes/Sound';

const hitboxRadius = 9;
const pointsToVictory = 3;

type geniusButton = {
  name: string;
  sound: Sound;
  hitbox: clickableArea;
  quad: quad;
};

interface GeniusProps {
  controlPanel: ControlPanel;
}

export class Genius {
  buttons: geniusButton[];
  lastButtonName: string;
  sprite: Sprite;
  position: coordinate;
  logic: GeniusLogic;
  correctSound: Sound;
  wrongSound: Sound;
  points: number;
  controlPanel: ControlPanel;

  constructor({ controlPanel }: GeniusProps) {
    this.buttons = [
      {
        name: 'green',
        sound: new Sound({ source: geniusSound1 }),
        hitbox: {
          coordinate: { x: 65, y: 15 }, //top tile
          radius: hitboxRadius,
        },
        quad: [1, 0],
      },
      {
        name: 'blue',
        sound: new Sound({ source: geniusSound3 }),
        hitbox: {
          coordinate: { x: 52, y: 27 }, //left tile
          radius: hitboxRadius,
        },
        quad: [2, 0],
      },
      {
        name: 'red',
        sound: new Sound({ source: geniusSound2 }),
        hitbox: {
          coordinate: { x: 65, y: 39 }, //bottom tile
          radius: hitboxRadius,
        },
        quad: [3, 0],
      },
      {
        name: 'yellow',
        sound: new Sound({ source: geniusSound4 }),
        hitbox: {
          coordinate: { x: 78, y: 27 }, //right tile
          radius: hitboxRadius,
        },
        quad: [4, 0],
      },
    ];
    this.position = { x: 42, y: 5 };
    this.sprite = new Sprite({
      sprite: geniusSprite,
      size: 45,
      rows: 1,
      columns: 5,
    });
    this.logic = new GeniusLogic({ genius: this });
    this.logic.startNewLevel(1);

    this.correctSound = new Sound({ source: rightGuessSound });
    this.wrongSound = new Sound({ source: wrongGuessSound });
    this.controlPanel = controlPanel;
    this.points = 0;
  }

  private buttonPressed(clickCoords: coordinate) {
    for (let i = 0; i < this.buttons.length; i++) {
      if (isWithin(this.buttons[i].hitbox, clickCoords)) {
        const buttonName = this.buttons[i].name;
        return buttonName;
      }
    }
    return undefined;
  }

  rightResult() {
    this.scorePoints(1);
    if (this.points >= pointsToVictory) {
      this.controlPanel.shutDown();
    } else {
      this.correctSound.play();
    }
  }

  wrongResult() {
    this.wrongSound.play();
  }

  scorePoints(points: number) {
    this.points += points;
  }

  lightUpButton(whichOne: string, sound?: boolean) {
    const button = this.buttons.filter((b) => b.name === whichOne).at(0);
    if (!button) return;
    sound && button.sound.play();
    this.sprite.setQuad(button.quad[0]);
  }

  resetButtons() {
    this.sprite.reset();
  }

  setPositionRelativeToReference(reference: coordinate) {
    this.position = {
      x: reference.x + this.position.x,
      y: reference.y + this.position.y,
    };
    this.buttons.forEach((button) => {
      button.hitbox.coordinate = {
        x: reference.x + button.hitbox.coordinate.x,
        y: reference.y + button.hitbox.coordinate.y,
      };
    });
  }

  play(clickCoords: coordinate) {
    if (this.controlPanel.isPlayable() && this.logic.isListening()) {
      const button = this.buttonPressed(clickCoords);
      if (button) {
        this.logic.registerClick(button);
        return true;
      }
    }
    return false;
  }

  compareGuessWithAnswer() {
    console.log();
    if (!this.logic.isListening() && this.logic.hasActiveGuess()) {
      if (!this.logic.compare()) {
        this.logic.clearGuess();
        this.logic.resetLevel();
        return this.wrongSound.play();
      }
      this.logic.clearGuess();
      this.logic.startNewLevel();
      this.scorePoints(1);
      return this.correctSound.play();
    }
  }

  renderHitboxes(canvas: CanvasRenderingContext2D) {
    this.buttons.forEach((button) =>
      renderHitbox(
        canvas,
        button.hitbox.coordinate,
        button.hitbox.radius,
        'magenta'
      )
    );
  }

  ////////////////////////////////////////////////////////////////////////////

  update(dt: number) {
    if (this.controlPanel.isPlayable()) {
      this.logic.update(dt);
    }
  }

  render(canvas: CanvasRenderingContext2D) {
    this.sprite.render(canvas, this.position);
  }
}
