import { Sprite, InventoryItem, Fragment, FragmentParams } from '../../classes';
// import { renderHitbox } from '../../functions/Metrics';
import { InputHandler } from "../../events/InputHandler";
import { State } from '../../gameLogic/state';
import sofaSprite from "../../assets/sofa_frag.png"
import paperSound from '../../assets/sounds/paper.mp3';
import paperSprite from '../../assets/paper.png';


import { coordinate } from "../../types";

export class SofaFragment extends Fragment {
  interactions;
  sprite: Sprite;
  leftPillowUp = false;
  rightPillowUp = false;
  constructor({object}: FragmentParams) {
    super({object});
    this.sprite = new Sprite({sprite: sofaSprite, size: 600, rows: 3, columns: 1});

    this.items = [
      new InventoryItem({
        spriteSrc: paperSprite,
        size: 90,
        name: 'papel',
        sound: paperSound,
        position: {x: 400, y: 370}
      }),
    ];
    this.interactions = {
      left: {coordinate: {x: 150, y: 365}, radius: 40},
      right: {coordinate: {x: 440, y: 365}, radius: 40}
    };
    const inputHandler = new InputHandler();
    inputHandler.subscribe("mouseDown", "sofaFragmentMouseDown", (pos) => this.interact(pos))
  }
  interact(clickCoords: coordinate): void {
    if (!this.isVisible()) return;
    const noPillowUp = !this.rightPillowUp && !this.leftPillowUp;
    if(noPillowUp &&  this.isWithin(this.interactions.left, clickCoords)){
      this.leftPillowUp = true;
      return this.sprite.setQuad([0, 1])
    }
    if(noPillowUp && this.isWithin(this.interactions.right, clickCoords)){
      this.rightPillowUp = true;
      return this.sprite.setQuad([0, 2])
    }
    if(this.rightPillowUp && this.items.length > 0) {
      const state = new State()
      if(this.items[0].isInside(clickCoords)){
        this.items[0].sound.play();
        state.addItem(this.items[0]);
        this.removeItem(this.items[0]);
        return;
      }
    }
    if (!noPillowUp) {
      this.leftPillowUp = false;
      this.rightPillowUp = false;
      this.sprite.setQuad([0, 0]);
    }
    
  }
  drawItems(canvas: CanvasRenderingContext2D) {
    this.rightPillowUp && this.items.forEach(item => item.render(canvas));
  }

  // drawHitboxes(canvas: CanvasRenderingContext2D){
  //   renderHitbox(canvas, this.getAbsoluteCoords(this.interactions.noPillowUp.left.coordinate), this.interactions.noPillowUp.left.radius);
  //   renderHitbox(canvas, this.getAbsoluteCoords(this.interactions.noPillowUp.right.coordinate), this.interactions.noPillowUp.right.radius, '#800080');
  // }

  render(canvas: CanvasRenderingContext2D): void {
    const { width, height } = this.sprite.getAllDimensions();
    !this.position && this.setPosition(width, height);
    this.drawBackground(canvas, width, height, 2);
    this.sprite.render(canvas, this.position);
    this.drawItems(canvas);
    // this.drawHitboxes(canvas)
  }
}