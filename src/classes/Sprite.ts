import { coordinate, quad } from '../types';

type constructorType = {
  sprite: string;
  size: number;
  rows: number;
  columns: number;
  maxCount?: number;
}

export class Sprite {
  source: HTMLImageElement;
  rows: number;
  columns: number;
  quad: quad;
  maxCount: number;
  count: number;
  lastFrame: number;
  size: number;

  constructor({
    sprite,
    size,
    rows,
    columns,
    maxCount
  }: constructorType) {
    this.source = new Image();
    this.source.src = sprite;
    this.size = size;
    this.quad = [0, 0];
    this.count = 0;
    this.maxCount = (maxCount)? maxCount : 0;
    this.columns = columns;
    this.rows = rows;
    this.lastFrame = 0;
  }

  setSource(newSource: string) {
    this.source.src = newSource;
  }

  reset() {
    this.quad[0] = 0;
  }

  getSize() {
    return this.size;
  }

  getAllDimensions(){
    const sourceH = this.source.height;
    const sourceW = this.source.width;
    const ratio = sourceH / this.rows / (sourceW / this.columns);

    return {
      sourceW,
      sourceH,
      width: this.size,
      height: this.size * ratio,
    }
  }

  getQuad() {
    return this.quad;
  }

  setSize(newSize: number) {
    this.size = newSize;
  }

  setQuad(newQuad: number | quad) {
    this.quad = (typeof newQuad === 'number')
    ? [newQuad, this.quad[1]]
    : newQuad;
  }

  nextSprite() {
    const next = this.quad[0] + 1;
    return next < this.columns ? next : 0;
  }

  ////////////////////////////////////////////////////////////////////////////////

  update(dt: number) {
    if (this.count < this.maxCount) {
      return (this.count += dt);
    }
    this.count = 0;
    this.setQuad(this.nextSprite());
  }

  render(canvas: CanvasRenderingContext2D, position: coordinate) {
    const {sourceW, sourceH, width, height} = this.getAllDimensions();

    canvas.drawImage(
      this.source, // src da imagem a ser desenhada
      this.quad[0] * (sourceW / this.columns),
      this.quad[1] * (sourceH / this.rows), // coordenadas X e Y, relativos à própria imagem, do início do quadrante
      sourceW / this.columns,
      sourceH / this.rows, // tamanho do quadrante (width, height)
      position.x,
      position.y, // coordenadas X e Y do início do desenho (canto superior esquerdo)
      width,
      height // tamanho final da imagem (width, height)
    );
  }
}
