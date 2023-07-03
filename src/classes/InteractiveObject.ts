import { actionType, coordinate, positionType } from '../types';
import { Sprite } from './Sprite';
import { ACTION_KEYS, SHOW_HITBOX } from '../constants';
import { FloatingText } from './FloatingText';
import { Player } from './Player';
import { Slot } from './Slot';
import { DraggableObject } from './DraggableObject';
import { getDistance, renderHitbox } from '../functions/Metrics';
import Sound from './Sound';

type Action = { //ação que o objeto pode responder
  sound: Sound; //qual som é feito quando a ação dispara
  description: FloatingText; //objeto de texto a ser exibido
  options: string[]; //opções de texto a serem exibidas no objeto
}

type constructorType = {
  spriteSrc: string;
  size: number;
  position: positionType;
  slots: Slot[];
  slotsAlwaysVisible: boolean;
  allowedDirections: string[];
  action?: actionType;
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
  allowedDirections: string[];
  action: Action | undefined;
  slots?: Slot[];
  slotsAlwaysVisible: boolean;

  constructor({
    spriteSrc,
    size,
    position,
    slots,
    slotsAlwaysVisible,
    allowedDirections,
    action,
  }: constructorType) {
    this.canBeOpened = action ? true : false;
    this.sprite = new Sprite(spriteSrc, size, 2, action ? 2 : 1, 0);
    this.size = size;
    this.position = position;
    this.isHighlighted = false;
    this.isOpen = false;
    this.action = action
      ? {
          options: action.texts,
          sound: new Sound(action.sound),
          description: new FloatingText({text: action.texts[0], iconSprite: ACTION_KEYS[0].icon}),
        }
      : undefined;
    this.allowedDirections = allowedDirections;
    this.slotsAlwaysVisible = slotsAlwaysVisible;

    slots && slots.forEach((slot) => {
      const relativePos = slot.getPosition();
      slot.setPosition({
        x: position.canvas.x + relativePos.x,
        y: position.canvas.y + relativePos.y,
      }); //passando de coordenadas relativas para absolutas
    });
    this.slots = slots;
  }

  isAllowedToInteract(invaderDirection: string){
    return this.allowedDirections.includes(invaderDirection);
  }

  isInside(where: 'object' | 'hitbox', invader: coordinate){
    const w = (where === 'object')
    ? this.position.tiles
    : this.position.hitboxes;
    
    for(let i = 0; i < w.length; i++){
      const absolutePosition = {
        x: this.position.map.x + w[i].x,
        y: this.position.map.y + w[i].y,
      }
      if(getDistance(invader, absolutePosition) < 5) return true;
    }
    return false;
  }

  getSize() {
    return this.size;
  }

  setSize(newSize: number) {
    this.size = newSize;
    this.sprite.setSize(newSize);
  }

  incrementalMoveTo(delta: coordinate){
    this.position.canvas.x += delta.x;
    this.position.canvas.y += delta.y;
    this.position.map.x += delta.x;
    this.position.map.y += delta.y;
    this.slots.forEach(slot => slot.incrementalMoveto(delta));
  }

  setPosition(ofWhat: 'canvas' | 'map', pos: coordinate) {
    const diff = {
      x: this.position.canvas.x - this.position.map.x,
      y: this.position.canvas.y - this.position.map.y,
    }
    if(ofWhat === 'canvas'){
      this.position.canvas = pos;
      this.position.map = {
        x: pos.x - diff.x,
        y: pos.y - diff.y,
      }
    } else {
      this.position.map = pos;
      this.position.canvas = {
        x: pos.x + diff.x,
        y: pos.y + diff.y,
      }
    }
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
      position: this.position,
      width: this.size,
      height: this.size * ratio,
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

  orderSlotsAccordingToDistance(referencePoint: coordinate) {
    if (!this.slots) return;
    this.slots.sort((a, b) => a.getDistanceTo(referencePoint) - b.getDistanceTo(referencePoint));
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

  private renderHitboxes(canvas: CanvasRenderingContext2D){
    this.position.tiles.forEach((tile => {
      const absolutePosition = {
        x: this.position.map.x + tile.x,
        y: this.position.map.y + tile.y,
      }
      renderHitbox(canvas, absolutePosition, 10, 'firebrick');
    }));

    this.position.hitboxes.forEach((hitbox => {
      const absolutePosition = {
        x: this.position.map.x + hitbox.x,
        y: this.position.map.y + hitbox.y,
      }
      renderHitbox(canvas, absolutePosition, 10, 'gold');
    }));
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

    SHOW_HITBOX && this.renderHitboxes(canvas);
  }
}
