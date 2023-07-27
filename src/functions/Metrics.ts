import { CANVAS_HEIGHT, CANVAS_WIDTH, WALK_TOGGLE_PADDING } from '../constants';
import { clickableArea, coordinate } from '../types';

const topLeft = { x: WALK_TOGGLE_PADDING, y: WALK_TOGGLE_PADDING };
const bottomRight = {
  x: CANVAS_WIDTH - WALK_TOGGLE_PADDING,
  y: CANVAS_HEIGHT - WALK_TOGGLE_PADDING,
};

export function getDistance(origin: coordinate, destination: coordinate) {
  return Math.hypot(origin.x - destination.x, origin.y - destination.y);
}

export function isInsideAllowedSpace(destination: coordinate) {
  if (
    destination.x < topLeft.x ||
    destination.x > bottomRight.x ||
    destination.y < topLeft.y ||
    destination.y > bottomRight.y
  )
    return false;
  return true;
}

export function isInsideBox(
  target: coordinate,
  boxTopLeft: coordinate,
  boxWidth: number,
  boxHeight: number
) {
  if (
    target.x < boxTopLeft.x ||
    target.y < boxTopLeft.y ||
    target.x > boxTopLeft.x + boxWidth ||
    target.y > boxTopLeft.y + boxHeight
  ) {
    return false;
  }
  return true;
}

export function isWithin(what: clickableArea, target: coordinate) {
  return getDistance(what.coordinate, target) < what.radius;
}

export function renderHitbox(
  canvas: CanvasRenderingContext2D,
  center: coordinate,
  radius?: number,
  color?: string
) {
  const prevStyle = canvas.fillStyle;
  canvas.fillStyle = color ? color : 'lime';
  canvas.beginPath();
  canvas.arc(center.x, center.y, radius ? radius : 10, 0, 2 * Math.PI);
  canvas.fill();
  canvas.closePath();
  canvas.fillStyle = prevStyle;
}