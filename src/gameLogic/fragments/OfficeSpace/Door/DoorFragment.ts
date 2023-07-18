import { Sprite, InventoryItem, Fragment, FragmentParams } from '../../../../classes';
import { InputHandler } from '../../../../events/InputHandler';
import { State } from '../../../state';
import { coordinate } from '../../../../types';
import doorSprite from '../../../../assets/fragments/fragment5/fragment5.png';
import { ControlPanel } from './ControlPanel';

export class DoorFragment extends Fragment {
  interactions: undefined;
  sprite: Sprite;
  controlPanel: ControlPanel;

  constructor({ object }: FragmentParams) {
    super({ object });
    this.sprite = new Sprite({
      sprite: doorSprite,
      size: 600,
      rows: 1,
      columns: 1,
    });

    this.controlPanel = new ControlPanel({
      size: 70, 
      position: {x: 409, y: 186}
    });

    this.items = [];
    const inputHandler = new InputHandler();
    inputHandler.subscribe('mouseDown', 'sofaFragmentMouseDown', (pos) =>
      this.interact(pos)
    );
  }

  setAllPositions(width: number, height: number){
    this.setPosition(width, height);
    this.controlPanel.setPositionRelativeToFragment(this.position);
  }

  interact(clickCoords: coordinate): void {
    this.controlPanel.interact(clickCoords);
  }

  render(canvas: CanvasRenderingContext2D): void {
    const { width, height } = this.sprite.getAllDimensions();
    !this.position && this.setAllPositions(width, height);
    this.drawBackground(canvas, width, height, 2);
    this.sprite.render(canvas, this.position);
    this.controlPanel.render(canvas);
  }
}
