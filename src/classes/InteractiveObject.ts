import { actionType, coordinate, positionType } from '../types';
import { Sprite } from './Sprite';
import { ACTION_KEYS } from '../constants';
import { FloatingText } from './FloatingText';
import { Player } from './Player';
import { Slot } from './Slot';
import { DraggableObject } from './DraggableObject';
import Sound from './Sound';

type Action = { //ação que o objeto pode responder
  sound: Sound; //qual som é feito quando a ação dispara
  description: FloatingText; //objeto de texto a ser exibido
  options: string[]; //opções de texto a serem exibidas no objeto
  allowedDirections: string[];
}

export class InteractiveObject {
  //clase para representar os objetos que o usuário pode interagir
  size: number; //tamanho (largura, pra ser mais exato. O comprimento é calculado automaticamente a partir dela)
  position: positionType;
  sprite: Sprite;
  isHighlighted: boolean;
  canBeOpened: boolean;
  isOpen: boolean;
  lastKeyPressed: string | undefined;
  action: Action | undefined;
  slots?: Slot[];
  slotsAlwaysVisible: boolean;

  constructor(
    spriteSrc: string,
    size: number,
    coordinates: coordinate,
    slots: Slot[],
    slotsAlwaysVisible: boolean,
    action?: actionType
  ) {
    this.canBeOpened = action ? true : false;
    this.sprite = new Sprite(spriteSrc, size, 2, action ? 2 : 1, 0);
    this.size = size;
    this.position = {canvas: coordinates, map: undefined, hitboxes: undefined};
    this.isHighlighted = false;
    this.isOpen = false;
    this.action = action
      ? {
          options: action.texts,
          sound: new Sound(action.sound),
          description: new FloatingText(action.texts[0], ACTION_KEYS[0].icon),
          allowedDirections: action.allowedDirections
        }
      : undefined;

    this.slotsAlwaysVisible = slotsAlwaysVisible;

    slots.forEach((slot) => {
      const relativePos = {x: 0, y: 0};//slot.getPosition();
      slot.setPosition({
        x: coordinates.x + relativePos.x,
        y: coordinates.y + relativePos.y,
      }); //passando de coordenadas relativas para absolutas
    });
    this.slots = slots;
  }

  getSize() {
    return this.size;
  }

  setSize(newSize: number) {
    this.size = newSize;
    this.sprite.setSize(newSize);
  }

  setCanvasPosition(pos: coordinate) {
    this.position.canvas = pos;
  }

  setHighlight(high: boolean) {
    this.isHighlighted = high;
  }

  setHitboxes(newHitboxes: coordinate[]) {
    this.position.hitboxes = newHitboxes;
  }

  getAllDimensions() {
    const h = this.sprite.source.height;
    const w = this.sprite.source.width;
    const ratio = h / this.sprite.rows / (w / this.sprite.columns);

    return {
      x: this.position.canvas.x,
      y: this.position.canvas.y,
      width: this.size,
      height: this.size * ratio,
      hitboxes: this.position.hitboxes,
    };
  }

  private toggleState(key: string | undefined) {
    if (key !== ACTION_KEYS[0].key || !this.action) return;

    this.action.sound.play();
    this.isOpen = !this.isOpen;
  }

  getNearestItem() {
    if (!this.slots || this.slots.length === 0) return undefined;
    return this.slots[0].object;
  }

  takeItem() {
    if (!this.slots || this.slots.length === 0) return;
    this.slots[0].object = undefined;
  }

  putItem(item: DraggableObject) {
    if (!this.slots || this.slots.length === 0) return;
    this.slots[0].object = item;
  }

  orderSlotsAccordingToDistance(player: Player) {
    if (!this.slots) return;
    const { x, y, width, height } = player.getAllDimensions();
    const p = { x: x + width / 2, y: y + height };
    this.slots.sort((a, b) => a.getDistanceTo(p) - b.getDistanceTo(p));
  }

  private renderTexts(canvas: CanvasRenderingContext2D) {
    if (!this.isHighlighted || !this.action) return;

    const pos = {
      x: this.position.canvas.x + this.size / 2,
      y: this.position.canvas.y,
    };

    const action = this.isOpen
      ? this.action.options[1]
      : this.action.options[0];
    this.action.description.setText(action);

    this.action.description.render(canvas, {
      x: pos.x,
      y: pos.y,
    });
  }

  private renderSlots(canvas: CanvasRenderingContext2D) {
    if (this.slots && (this.slotsAlwaysVisible || this.isOpen)) {
      this.slots.forEach((slot, i) => {
        i === 0 &&
          slot.setText(slot.object ? `pegar ${slot.object.name}` : 'vazio');
        slot.render(canvas, this.isHighlighted && i === 0);
      });
    }
  }

  ////////////////////////////////////////////////////////////////////////////////

  update(keyPressed: string | undefined) {
    if (!this.lastKeyPressed && this.isHighlighted) {
      this.toggleState(keyPressed);
    }
    this.sprite.setQuad([this.isOpen ? 1 : 0, this.isHighlighted ? 1 : 0]);
    this.lastKeyPressed = keyPressed;
  }

  render(canvas: CanvasRenderingContext2D) {
    this.sprite.render(canvas, this.position.canvas);
    this.renderTexts(canvas);
    this.renderSlots(canvas);
  }
}
