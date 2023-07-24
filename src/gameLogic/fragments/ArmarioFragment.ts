import { clickableArea, coordinate, interactiveCoords } from '../../types';
import { InputHandler } from '../../events/InputHandler';
import { Sprite, InventoryItem, Fragment, FragmentParams } from '../../classes';
import { State } from '../../gameLogic/state';
import { isWithin } from '../../functions/Metrics';
import drawerSprite from '../../assets/fragments/drawerFragment.png';
import bottleSprite from '../../assets/bottle.png';
import paperSprite from '../../assets/paper.png';
import glassSound from '../../assets/sounds/glass.mp3';
import paperSound from '../../assets/sounds/paper.mp3';

export class ArmarioFragment extends Fragment {
  interactions: interactiveCoords;
  sprite: Sprite;
  isOpen = false;
  constructor({ object }: FragmentParams) {
    super({ object });
    this.sprite = new Sprite({
      sprite: drawerSprite,
      size: 600,
      rows: 1,
      columns: 2,
    });
    this.interactions = {
      open: [{ coordinate: { x: 300, y: 300 }, radius: 50 }],
      close: [
        { coordinate: { x: 160, y: 300 }, radius: 50 },
        { coordinate: { x: 440, y: 300 }, radius: 50 },
      ],
    };

    this.items = [
      new InventoryItem({
        spriteSrc: bottleSprite,
        size: 28,
        name: 'garrafa',
        sound: glassSound,
        position: { x: 300, y: 200 },
      }),
      new InventoryItem({
        spriteSrc: paperSprite,
        size: 90,
        name: 'papel',
        sound: paperSound,
        position: { x: 260, y: 330 },
      }),
    ];
    const inputHandler = new InputHandler();
    inputHandler.subscribe('mouseDown', 'fragmentMouseDown', (pos) =>
      this.interact(pos)
    );
  }
  interact(clickCoords: coordinate): void {
    if (!this.position) return;
    if (!this.interactions || !clickCoords) return;

    const state = new State();
    const interaction = this.isOpen
      ? this.interactions.close
      : this.interactions.open;
    for (let i = 0; i < interaction.length; i++) {
      //verifica se o jogador está tentando abrir/fechar o fragmento (ex.: portas de um armário)
      const absolute: clickableArea = {
        coordinate: this.getAbsoluteCoords(interaction[i].coordinate),
        radius: interaction[i].radius,
      };
      if (isWithin(absolute, clickCoords)) {
        this.sprite.setQuad(this.sprite.nextSprite());
        this.isOpen = !this.isOpen;
        this.object.toggleState();
        return;
      }
    }
    if (this.isOpen) {
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        if (item.isInside(clickCoords)) {
          item.sound.play();
          state.addItem(item);
          this.removeItem(item);
          return;
        }
      }
    }
  }

  drawItems(canvas: CanvasRenderingContext2D) {
    this.isOpen && this.items.forEach((item) => item.render(canvas));
  }

  update(dt: number) {}
  setAllPositions(width: number, height: number): void {}

  render(canvas: CanvasRenderingContext2D): void {
    const { width, height } = this.sprite.getAllDimensions();
    !this.position && this.setPosition(width, height);
    this.drawBackground(canvas, width, height, 2);
    this.sprite.render(canvas, this.position);
    this.drawItems(canvas);
  }
}
