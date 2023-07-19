import { Floor } from '../classes/Floor';
import { Player } from '../classes/Player';
import { InteractiveObject } from '../classes/InteractiveObject';
import { coordinate } from '../types';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  SHOW_WALK_TOGGLE_PADDING,
  WALK_TOGGLE_PADDING,
} from '../constants';
import { getDistance, renderHitbox } from './Metrics';
import { SHOW_DISTANCE_TO_BOTTOM_CORNER } from '../constants';

interface RendererProps {
  context: CanvasRenderingContext2D;
  players: Player[];
  objects: InteractiveObject[];
  floor: Floor | undefined;
}

type ObjectAndDistance = {
  object: Player | InteractiveObject;
  origin: coordinate;
  center: coordinate;
};

const canvasBottom = {
  x: CANVAS_WIDTH / 2,
  y: CANVAS_HEIGHT,
};

const renderWalkPadding = (canvas: CanvasRenderingContext2D) => {
  canvas.fillStyle = '#FF000022';
  canvas.fillRect(0, 0, WALK_TOGGLE_PADDING, CANVAS_HEIGHT);
  canvas.fillRect(
    WALK_TOGGLE_PADDING,
    0,
    CANVAS_WIDTH - WALK_TOGGLE_PADDING,
    WALK_TOGGLE_PADDING
  );
  canvas.fillRect(
    CANVAS_WIDTH - WALK_TOGGLE_PADDING,
    WALK_TOGGLE_PADDING,
    WALK_TOGGLE_PADDING,
    CANVAS_HEIGHT - WALK_TOGGLE_PADDING
  );
  canvas.fillRect(
    WALK_TOGGLE_PADDING,
    CANVAS_HEIGHT - WALK_TOGGLE_PADDING,
    CANVAS_WIDTH - 2 * WALK_TOGGLE_PADDING,
    WALK_TOGGLE_PADDING
  );
};

const renderDistance = (
  canvas: CanvasRenderingContext2D,
  origin: coordinate,
  floor: Floor
) => {
  canvas.strokeStyle = 'red';
  canvas.lineWidth = 5;
  canvas.beginPath();
  canvas.moveTo(origin.x, origin.y);
  canvas.lineTo(canvasBottom.x, canvasBottom.y);
  canvas.stroke();
  canvas.closePath();
};

export default function RenderAll({
  context,
  players,
  objects,
  floor,
}: RendererProps) {
  const ground = floor;
  if (!ground) return;
  const renderables: ObjectAndDistance[] = [];
  const fragments: InteractiveObject[] = [];

  players &&
    players.forEach((p) => {
      const { x, y, feetOffset } = p.getAllDimensions();
      const origin = { x: x + feetOffset.x, y: y + feetOffset.y };
      renderables.push({
        object: p,
        origin: origin,
        center: { x: p.positionOnMap.x, y: p.positionOnMap.y },
      });
    });

  objects.forEach((o) => {
    const { position, width, height } = o.getAllDimensions();
    const origin = {
      x: position.canvas.x + width / 2,
      y: position.canvas.y + 0.75 * height,
    };
    renderables.push({
      object: o,
      origin: origin,
      center: { x: o.position.referenceTile.x, y: o.position.referenceTile.y },
    });
    o.fragment && o.fragment.isVisible() && fragments.push(o);
  });

  ground.render(context);

  renderables.sort((a, b) => {
    const h = b.center.x - a.center.x;
    const l = b.center.y - a.center.y;
    const g = getDistance(b.center, a.center);
    const angle = 180 * Math.asin(l / g) / Math.PI;
    if ((h > 0 && angle > 35 ) || (angle > -35 && h <= 0)) {
      return -1;
    }
    return 1;
  });
  
  renderables.forEach((r) => {
    r.object.render(context);
    SHOW_DISTANCE_TO_BOTTOM_CORNER && renderDistance(context, r.origin, ground);
  });

  fragments.forEach((f) => f.renderFragment(context));

  SHOW_WALK_TOGGLE_PADDING && renderWalkPadding(context);
}
