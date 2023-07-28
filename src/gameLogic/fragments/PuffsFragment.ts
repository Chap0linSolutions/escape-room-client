import { coordinate } from '../../types';
import { InputHandler } from '../../events/InputHandler';
import { Sprite, Fragment, FragmentParams } from '../../classes';
import { State } from '../../gameLogic/state';
import Sound from '../../classes/Sound';
import soundFile from '../../assets/sounds/woosh1.mp3';
import puffsSprite from '../../assets/fragments/puffsPlantFragment.png';
//import { renderHitbox } from '../../functions/Metrics';

export class PuffsFragment extends Fragment {
  interactions;
  sprite: Sprite;
  plantVaseUp = false;

  constructor({ object }: FragmentParams) {
    super({ object });
    this.sprite = new Sprite({
      sprite: puffsSprite,
      size: 600,
      rows: 2,
      columns: 1,
    });
    this.interactions = {
      plantVase: { coordinate: { x: 519, y: 377 }, radius: 25 },
      bluePuff: { coordinate: { x: 170, y: 390 }, radius: 75 },
      redPuff: { coordinate: { x: 385, y: 390 }, radius: 75 },
      whiteBoard: { coordinate: { x: 250, y: 150 }, radius: 50 },
    };

    this.items = [];
    const inputHandler = new InputHandler();
    inputHandler.subscribe('mouseDown', 'fragmentMouseDown', (pos) =>
      this.interact(pos)
    );
  }

  interact(clickCoords: coordinate): void {
    if (!this.position) return;
    if (!this.interactions || !clickCoords) return;
    const state = new State();
    const plantSound = new Sound({ source: soundFile });

    if (this.isWithin(this.interactions.plantVase, clickCoords)) {
      this.plantVaseUp = !this.plantVaseUp;
      plantSound.play();
      return this.sprite.setQuad([0, this.plantVaseUp ? 1 : 0]);
    } else {
      let title = 'Error';
      let description = 'Something went wrong...';
      let color = '#f0f0f0';

      if (this.isWithin(this.interactions.bluePuff, clickCoords)) {
        title = 'Pufe Azul';
        description = 'Agora não é hora de descansar!';
        color = '#0f0fff';
      } else if (this.isWithin(this.interactions.redPuff, clickCoords)) {
        title = 'Pufe Vermelho';
        description = 'Agora não é hora de descansar!';
        color = '#ff0f0f';
      } else if (this.isWithin(this.interactions.whiteBoard, clickCoords)) {
        title = 'Quadro branco';
        description = 'Um quadro em branco...';
        color = '#808080';
      } else {
        return;
      }

      state.cb.showToast({
        title: title,
        description: description,
        backgroundColor: color,
      });
    }
  }

  // drawHitboxes(canvas: CanvasRenderingContext2D) {
  //     renderHitbox(canvas, this.getAbsoluteCoords(this.interactions.plantVase.coordinate), this.interactions.plantVase.radius);
  //     renderHitbox(canvas, this.getAbsoluteCoords(this.interactions.bluePuff.coordinate), this.interactions.bluePuff.radius);
  //     renderHitbox(canvas, this.getAbsoluteCoords(this.interactions.redPuff.coordinate), this.interactions.redPuff.radius);
  //     renderHitbox(canvas, this.getAbsoluteCoords(this.interactions.whiteBoard.coordinate), this.interactions.whiteBoard.radius);
  // }

  render(canvas: CanvasRenderingContext2D): void {
    const { width, height } = this.sprite.getAllDimensions();
    !this.position && this.setPosition(width, height);
    this.drawBackground(canvas, width, height, 2);
    this.sprite.render(canvas, this.position);
    //this.drawHitboxes(canvas);
  }
}
