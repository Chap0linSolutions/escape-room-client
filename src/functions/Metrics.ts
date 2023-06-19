import { coordinate } from '../types';

export function getDistance(origin: coordinate, destination: coordinate) {
  return Math.hypot(origin.x - destination.x, origin.y - destination.y);
}

export function renderHitbox(canvas: CanvasRenderingContext2D, center: coordinate, radius?: number, color?: string){
  const prevStyle = canvas.fillStyle;
  canvas.fillStyle = color? color : 'lime';
  canvas.beginPath();
  canvas.arc(center.x, center.y, (radius)? radius : 10, 0, 2 * Math.PI);
  canvas.fill();
  canvas.closePath();
  canvas.fillStyle = prevStyle;    
}