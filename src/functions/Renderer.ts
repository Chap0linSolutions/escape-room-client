import { Floor } from '../classes/Floor';
import { Player } from '../classes/Player';
import { InteractiveObject } from '../classes/InteractiveObject';
//import { SHOW_DISTANCE_TO_BOTTOM_CORNER } from '../constants';
//import { coordinate } from '../types';

interface RendererProps {
  context: CanvasRenderingContext2D;
  players: Player[];
  objects: InteractiveObject[];
  floor: Floor | undefined;
}

// type ObjectAndDistance = {
//   object: Player | InteractiveObject;
//   origin: coordinate;
//   distance: number;
// };

// const renderDistance = (
//   canvas: CanvasRenderingContext2D,
//   origin: coordinate,
//   floor: Floor
// ) => {
//   const destination = floor.getBottomCornerCoordinates();
//   canvas.strokeStyle = 'red';
//   canvas.lineWidth = 5;
//   canvas.beginPath();
//   canvas.moveTo(origin.x, origin.y);
//   canvas.lineTo(destination.x, destination.y);
//   canvas.stroke();
//   canvas.closePath();
// };

export default function RenderAll({
  context,
  players,
  objects,
  floor,
}: RendererProps) {
  const ground = floor;
  if (!ground) return;
  //const renderables: ObjectAndDistance[] = [];

  ground.render(context);                     //TODO revert this to the state where rendering order is decided based on the distance to the bottom corner
  objects.forEach(o => o.render(context));    //that means you need to uncomment and adjust all the commented snippets within this page
  players.forEach(p => p.render(context));


  // players &&
  //   players.forEach((p) => {
  //     const { x, y, width, height } = p.getAllDimensions();
  //     const origin = { x: x + width / 2, y: y + height };
  //     renderables.push({
  //       object: p,
  //       origin: origin,
  //       distance: ground.getDistanceToBottomCorner({
  //         x: origin.x,
  //         y: origin.y,
  //       }),
  //     });
  //   });

  // objects.forEach((o) => {
  //   const { x, y, width, height } = o.getAllDimensions();
  //   const origin = { x: x + width / 2, y: y + height };
  //   renderables.push({
  //     object: o,
  //     origin: origin,
  //     distance: ground.getDistanceToBottomCorner({
  //       x: origin.x,
  //       y: origin.y,
  //     }),
  //   });
  // });

  // ground.render(context);
  // renderables.sort((a, b) => b.distance - a.distance);
  // renderables.forEach((r) => {
  //   r.object.render(context);
  //   SHOW_DISTANCE_TO_BOTTOM_CORNER && renderDistance(context, r.origin, ground);
  // });
}
