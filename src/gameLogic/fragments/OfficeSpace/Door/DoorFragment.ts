import { Sprite, Fragment, FragmentParams } from '../../../../classes';
import { InputHandler } from '../../../../events/InputHandler';
import { clickableArea, coordinate } from '../../../../types';
import { ControlPanel } from './ControlPanel';
import { isWithin, renderHitbox } from '../../../../functions/Metrics';
import doorSprite from '../../../../assets/fragments/fragment5/fragment5.png';
import plantSound from '../../../../assets/sounds/woosh1.mp3';
import Sound from '../../../../classes/Sound';

interface plantVase {
  hitbox: clickableArea;
  isUp: boolean;
  sound: Sound;
}

export class DoorFragment extends Fragment {
  interactions: undefined;
  sprite: Sprite;
  controlPanel: ControlPanel;
  plant: plantVase;
  dummyDisconnect: clickableArea; //TODO dummy hitbox for disconnecting the system, delete when coupling with the state;

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

    this.plant = {
      hitbox: {
        coordinate: { x: 530, y: 450 },
        radius: 40,
      },
      isUp: false,
      sound: new Sound({ source: plantSound }),
    };

    this.items = [];
    const inputHandler = new InputHandler();
    inputHandler.subscribe('mouseDown', 'sofaFragmentMouseDown', (pos) =>
      this.interact(pos)
    );

    this.dummyDisconnect = {
      //TODO dummy hitbox, delete when coupling with the state;
      coordinate: { x: 410, y: 235 },
      radius: 50,
    };
  }

  setAllPositions(width: number, height: number) {
    this.setPosition(width, height);
    this.controlPanel.setPositionRelativeToReference(this.position);
    this.plant.hitbox.coordinate = {
      x: this.position.x + this.plant.hitbox.coordinate.x,
      y: this.position.y + this.plant.hitbox.coordinate.y,
    };
  }

  liftPlant() {
    if (this.plant.isUp) return;
    this.plant.isUp = true;
    this.plant.sound.play();
  }

  releasePlant() {
    if (!this.plant.isUp) return;
    this.plant.isUp = false;
    this.plant.sound.play();
  }

  interact(clickCoords: coordinate): void {
    //TODO dummy snippet. Delete when coupling with the state;
    if (isWithin(this.dummyDisconnect, clickCoords)) {
      this.controlPanel.disconnect();
    }

    this.controlPanel.interact(clickCoords);
    if (!this.plant.isUp && isWithin(this.plant.hitbox, clickCoords)) {
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

  render(canvas: CanvasRenderingContext2D): void {
    const { width, height } = this.sprite.getAllDimensions();
    !this.position && this.setAllPositions(width, height);
    this.drawBackground(canvas, width, height, 2);
    this.sprite.render(canvas, this.position);
    this.controlPanel.render(canvas);

    renderHitbox(canvas, this.dummyDisconnect.coordinate, this.dummyDisconnect.radius);
  }
}
