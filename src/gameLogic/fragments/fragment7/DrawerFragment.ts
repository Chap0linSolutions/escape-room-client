import { coordinate } from '../../../types';
import { InputHandler } from '../../../events/InputHandler';
import { Sprite, Fragment, FragmentParams } from '../../../classes';
import { State } from '../../../gameLogic/state';
import Sound from '../../../classes/Sound';
import soundFile from '../../../assets/sounds/woosh1.mp3';
import locked from '../../../assets/sounds/locked.wav';
import unlocked from '../../../assets/sounds/unlocked.wav';
import drawerSprite from '../../../assets/fragments/frag7painting.png';

import { renderHitbox } from '../../../functions/Metrics';
import { Vault } from './Vault';

export class DrawerFragment extends Fragment {
  interactions;
  sprite: Sprite;
  plantVaseUp = false;
  anyDrawerOpened = false;
  drawer3unlocked = false;
  drawer3Opened = false;
  vaultZoomIn = false;
  lockedSound: Sound;
  unlockedSound: Sound;
  vault: Vault;

  constructor({ object }: FragmentParams) {
    super({ object });
    this.sprite = new Sprite({
      sprite: drawerSprite,
      size: 600,
      rows: 4,
      columns: 1,
    });
    this.interactions = {
      drawer1h1: { coordinate: { x: 180, y: 285 }, radius: 20 },
      drawer1h2: { coordinate: { x: 405, y: 285 }, radius: 20 },
      drawer2h1: { coordinate: { x: 185, y: 350 }, radius: 20 },
      drawer2h2: { coordinate: { x: 400, y: 350 }, radius: 20 },
      drawer3h1: { coordinate: { x: 195, y: 400 }, radius: 20 },
      drawer3h2: { coordinate: { x: 385, y: 400 }, radius: 20 },
      vault: { coordinate: { x: 285, y: 390 }, radius: 30 },
    };

    this.lockedSound = new Sound({ source: locked });
    this.unlockedSound = new Sound({ source: unlocked });
    this.vault = new Vault({ zoomOut: () => (this.vaultZoomIn = false) });
    const inputHandler = new InputHandler();
    inputHandler.subscribe('mouseDown', 'drawerFragmentMouseDown', (pos) =>
      this.handleClick(pos)
    );
  }

  update(dt: number): void {
    if (this.vaultZoomIn) {
      this.vault.update(dt);
    }
  }

  interact(clickCoords: coordinate): void {
    if (!this.position) return;
    if (!this.interactions || !clickCoords) return;
    const state = new State();
    const plantSound = new Sound({ source: soundFile });

    if (this.vaultZoomIn) {
      this.vault.interact(clickCoords);
      return;
    }

    if (
      this.drawer3Opened &&
      this.isWithin(this.interactions.vault, clickCoords)
    ) {
      this.vaultZoomIn = true;
      return;
    }

    if (this.anyDrawerOpened) {
      this.anyDrawerOpened = false;
      this.drawer3Opened = false;
      return this.sprite.setQuad([0, 0]);
    }

    if (
      (!this.anyDrawerOpened &&
        this.isWithin(this.interactions.drawer1h1, clickCoords)) ||
      this.isWithin(this.interactions.drawer1h2, clickCoords)
    ) {
      this.anyDrawerOpened = true;
      plantSound.play();
      return this.sprite.setQuad([0, 1]);
    }
    if (
      (!this.anyDrawerOpened &&
        this.isWithin(this.interactions.drawer2h1, clickCoords)) ||
      this.isWithin(this.interactions.drawer2h2, clickCoords)
    ) {
      this.anyDrawerOpened = true;
      plantSound.play();
      return this.sprite.setQuad([0, 2]);
    }
    if (
      (!this.anyDrawerOpened &&
        this.isWithin(this.interactions.drawer3h1, clickCoords)) ||
      this.isWithin(this.interactions.drawer3h2, clickCoords)
    ) {
      const state = new State();
      console.log(state.activeItem);
      if (!this.drawer3unlocked && state.activeItem !== 'CABINET_KEY') {
        state.cb.showToast({
          title: 'Gaveta Trancada',
          description: '',
        });
        return this.lockedSound.play();
      }
      if (!this.drawer3unlocked && state.activeItem === 'CABINET_KEY') {
        this.drawer3unlocked = true;
        return this.unlockedSound.play();
      }
      this.anyDrawerOpened = true;
      this.drawer3Opened = true;
      plantSound.play();
      return this.sprite.setQuad([0, 3]);
    }
  }

  drawHitboxes(canvas: CanvasRenderingContext2D) {
    renderHitbox(
      canvas,
      this.getAbsoluteCoords(this.interactions.drawer1h1.coordinate),
      this.interactions.drawer1h1.radius
    );
    renderHitbox(
      canvas,
      this.getAbsoluteCoords(this.interactions.drawer1h2.coordinate),
      this.interactions.drawer1h2.radius
    );
    renderHitbox(
      canvas,
      this.getAbsoluteCoords(this.interactions.drawer2h1.coordinate),
      this.interactions.drawer2h1.radius
    );
    renderHitbox(
      canvas,
      this.getAbsoluteCoords(this.interactions.drawer2h2.coordinate),
      this.interactions.drawer2h2.radius
    );
    renderHitbox(
      canvas,
      this.getAbsoluteCoords(this.interactions.drawer3h1.coordinate),
      this.interactions.drawer3h1.radius
    );
    renderHitbox(
      canvas,
      this.getAbsoluteCoords(this.interactions.drawer3h2.coordinate),
      this.interactions.drawer3h2.radius
    );
    renderHitbox(
      canvas,
      this.getAbsoluteCoords(this.interactions.vault.coordinate),
      this.interactions.vault.radius
    );
  }

  render(canvas: CanvasRenderingContext2D): void {
    const { width, height } = this.sprite.getAllDimensions();
    !this.position && this.setPosition(width, height);
    this.drawBackground(canvas, width, height, 2);
    this.sprite.render(canvas, this.position);
    this.vaultZoomIn &&
      this.vault.render(canvas, this.position, { width, height });
    // this.drawHitboxes(canvas);
  }
}
