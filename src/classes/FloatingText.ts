import { coordinate } from '../types';
import { Sprite } from './Sprite';

type constructorType = {
  text: string;
  iconSprite: string | null;
  color?: string;
  background?: string;
  padding?: coordinate;
  style?: string;
}
export class FloatingText {
  //classe para representar os textos flutuantes (nomes de personagens, ações em objetos, etc)
  text: string; //as variáveis aqui são bem diretas (acho eu) em relação ao que armazenam.
  color: string;
  background: string;
  padding: coordinate;
  style: string;
  icon: Sprite | null;

  constructor({
    text,
    iconSprite,
    color,
    background,
    padding,
    style
  }: constructorType) {
    this.text = text;
    this.color = color ? color : '#cccccc';
    this.background = background ? background : '#222222CC';
    this.padding = padding ? padding : { x: 5, y: 5 };
    this.style = style ? style : '16px Segoe UI';
    this.icon = iconSprite ? 
      new Sprite({sprite: iconSprite, size: 20, rows: 1, columns: 1, maxCount: 0}) 
      : null;
  }

  getText() {
    return this.text;
  }

  setText(newText: string) {
    this.text = newText;
  }

  setColor(newColor: string) {
    this.color = newColor;
  }

  setBackground(newColor: string) {
    this.background = newColor;
  }

  setPadding(newPadding: coordinate) {
    this.padding = newPadding;
  }

  setStyle(newStyle: string) {
    this.style = newStyle;
  }

  private drawBackground(
    canvas: CanvasRenderingContext2D,
    x: number,
    y: number,
    textWidth: number,
    textHeight: number,
    iconOffset: number,
    borderRadius: number
  ) {
    const w = textWidth + 3 * this.padding.x + iconOffset;
    const h = textHeight + 2 * this.padding.y;

    canvas.fillStyle = this.background;
    canvas.beginPath();
    canvas.moveTo(x + borderRadius, y);
    canvas.lineTo(x + w - borderRadius, y);
    canvas.quadraticCurveTo(x + w, y, x + w, y + borderRadius);
    canvas.lineTo(x + w, y + h - borderRadius);
    canvas.quadraticCurveTo(x + w, y + h, x + w - borderRadius, y + h);
    canvas.lineTo(x + borderRadius, y + h);
    canvas.quadraticCurveTo(x, y + h, x, y + h - borderRadius);
    canvas.lineTo(x, y + borderRadius);
    canvas.quadraticCurveTo(x, y, x + borderRadius, y);
    canvas.closePath();
    canvas.fill();
  }

  private drawIcon(canvas: CanvasRenderingContext2D, x: number, y: number) {
    this.icon &&
      this.icon.render(canvas, {
        x: x + this.padding.x,
        y: y + this.padding.y,
      });
  }

  private drawText(canvas: CanvasRenderingContext2D, coordinate: coordinate, alignLeft?: boolean) {
    canvas.textAlign = (alignLeft)? 'left' : 'center';
    canvas.font = this.style;
    canvas.fillStyle = this.color;
    canvas.fillText(this.text, coordinate.x, coordinate.y);
  }

  private getIconSize(textHeight: number){
    if(!this.icon) return 0;
    if(this.icon && this.icon.getSize() === 0) {
      this.icon.setSize(textHeight);
    }
    return this.icon.getSize();
  }

  render(canvas: CanvasRenderingContext2D, coordinate: coordinate, alignLeft?: boolean) {
    //desenha o fundo, o ícone (caso esteja definido) e o texto em si

    const textProps = canvas.measureText(this.text);
    const textWidth = textProps.width;
    const textHeight = textProps.fontBoundingBoxAscent;
    const iconOffset = this.getIconSize(textHeight);

    const offset = {
      x: iconOffset + 2*this.padding.x,
      y: this.padding.y + textHeight / 1.25,
    }

    const x = coordinate.x - ((alignLeft)? 0 : offset.x + textWidth / 2);
    const y = coordinate.y - offset.y;
    
    const textCoordinate = {
      x: coordinate.x + (alignLeft? offset.x : 0),
      y: coordinate.y,
    }

    this.drawBackground(canvas, x, y, textWidth, textHeight, iconOffset, 10);
    this.drawIcon(canvas, x, y);
    this.drawText(canvas, textCoordinate, alignLeft);
  }
}
