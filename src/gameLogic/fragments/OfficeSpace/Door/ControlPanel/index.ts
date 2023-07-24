import { Sprite } from '../../../../../classes';
import { clickableArea, coordinate } from '../../../../../types';
import { isWithin, renderHitbox } from '../../../../../functions/Metrics';
import { State } from '../../../../state';
import { Genius } from './Genius';
import Sound from '../../../../../classes/Sound';
import openPanel from '../../../../../assets/fragments/fragment5/open_panel.png';
import closedPanel from '../../../../../assets/fragments/fragment5/closed_panel.png';
import disconnectSound from '../../../../../assets/sounds/disconnect.mp3';
import openPanelSound from '../../../../../assets/sounds/openPanel.mp3';
import closePanelSound from '../../../../../assets/sounds/closePanel.mp3';
import lockedSound from '../../../../../assets/sounds/errorPanel.mp3';
import shutDownSound from '../../../../../assets/sounds/shutDown.mp3';

interface controlPanelProps {
  position: coordinate;
  size: number;
}

type panel = {
  sprite: Sprite;
  position: coordinate;
};

type sounds = {
  locked: Sound;
  open: Sound;
  close: Sound;
  disconnect: Sound;
  shutdown: Sound;
};

const offset = {
  openClose: 1.43,
  x: -30,
  y: 0,
};

export class ControlPanel {
  openPanel: panel;
  closedPanel: panel;
  buttonHitbox: clickableArea;
  isOn: boolean;
  isOpen: boolean;
  isConnected: boolean;
  sounds: sounds;
  genius: Genius;

  constructor({ size, position }: controlPanelProps) {
    this.closedPanel = {
      sprite: new Sprite({
        sprite: closedPanel,
        size: size,
        rows: 1,
        columns: 3,
      }),
      position: position,
    };
    this.openPanel = {
      sprite: new Sprite({
        sprite: openPanel,
        size: size * offset.openClose,
        rows: 1,
        columns: 1,
      }),
      position: { x: position.x + offset.x, y: position.y + offset.y },
    };
    this.buttonHitbox = {
      coordinate: { x: position.x + 57, y: position.y + 62 },
      radius: 7,
    };

    this.isOn = true;
    this.isOpen = false;
    this.isConnected = true;

    this.sounds = {
      locked: new Sound({ source: lockedSound }),
      shutdown: new Sound({ source: shutDownSound }),
      disconnect: new Sound({ source: disconnectSound }),
      open: new Sound({ source: openPanelSound }),
      close: new Sound({ source: closePanelSound }),
    };

    this.genius = new Genius({ controlPanel: this });
  }

  setPositionRelativeToReference(fragmentPosition: coordinate) {
    this.openPanel.position = {
      x: fragmentPosition.x + this.openPanel.position.x,
      y: fragmentPosition.y + this.openPanel.position.y,
    };
    this.closedPanel.position = {
      x: fragmentPosition.x + this.closedPanel.position.x,
      y: fragmentPosition.y + this.closedPanel.position.y,
    };
    this.buttonHitbox.coordinate = {
      x: fragmentPosition.x + this.buttonHitbox.coordinate.x,
      y: fragmentPosition.y + this.buttonHitbox.coordinate.y,
    };
    this.genius.setPositionRelativeToReference(this.openPanel.position);
  }

  isDisconnected() {
    return !this.isConnected;
  }

  disconnect() {
    if (!this.isConnected) return;
    this.isConnected = false;
    this.closedPanel.sprite.setQuad([1, 0]);
    this.sounds.disconnect.play();
    const state = new State();
    state.cb.showToast({
      title: 'Opa',
      description: 'Alguma coisa mudou no painel.',
      backgroundColor: 'forestgreen',
    });
  }

  shutDown() {
    this.isOn = false;
    this.genius.resetButtons();
    this.closedPanel.sprite.setQuad([2, 0]);
    this.sounds.shutdown.play();
    const state = new State();
    state.cb.showToast({
      title: 'Opa',
      description: 'Parece que o painel desligou!',
      backgroundColor: 'forestgreen',
    });
  }

  open() {
    this.isOpen = true;
    this.sounds.open.play();
  }

  close() {
    this.isOpen = false;
    this.sounds.close.play();
  }

  isPlayable() {
    return this.isOn && this.isOpen;
  }

  interact(clickCoords: coordinate) {
    if (!this.isOpen && isWithin(this.buttonHitbox, clickCoords)) {
      if (this.isConnected) {
        const state = new State();
        state.cb.showToast({
          title: 'Hmmmm...',
          description: 'parece que o painel está trancado.',
          backgroundColor: 'firebrick',
        });
        return this.sounds.locked.play();
      }
      this.open();
    } else if (this.isOpen && !this.genius.play(clickCoords)) {
      this.close();
    }
  }

  renderHitboxes(canvas: CanvasRenderingContext2D) {
    if (this.isOpen) {
      this.genius.renderHitboxes(canvas);
    } else {
      renderHitbox(
        canvas,
        this.buttonHitbox.coordinate,
        this.buttonHitbox.radius
      );
    }
  }

  update(dt: number) {
    this.genius.update(dt);
  }

  render(canvas: CanvasRenderingContext2D) {
    if (this.isOpen) {
      this.openPanel.sprite.render(canvas, this.openPanel.position);
      this.genius.render(canvas);
    } else {
      this.closedPanel.sprite.render(canvas, this.closedPanel.position);
    }
  }
}
