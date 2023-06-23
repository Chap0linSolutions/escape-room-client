import { RefObject, useRef } from 'react';
import { GameCallbacks, coordinate } from '../types';
import { Game } from '../gameLogic/Game';

export const useGameLoop = (gameCallbacks: GameCallbacks) => {
  let animationLoop: number;
  let ctx: CanvasRenderingContext2D;
  let game: Game;
  let mouseRef: React.MutableRefObject<coordinate>; 

  const lastTS = useRef(0);

  const loop = (ts: number) => {
    const dt = ts - lastTS.current;
    lastTS.current = ts;
    const mouseXY = mouseRef.current;
    game.GameLoop(ctx, mouseXY, dt);
    animationLoop = requestAnimationFrame(loop);
  };

  const startGame = (canvas: RefObject<HTMLCanvasElement>, mouse: React.MutableRefObject<coordinate>) => {
    if (!canvas.current) return null;
    const gameCtx = canvas.current.getContext('2d');
    if (!gameCtx) return null;
    animationLoop && cancelAnimationFrame(animationLoop);
    ctx = gameCtx;
    mouseRef = mouse; 
    game = new Game({ gameCallbacks });
    game.initialSetup();
    animationLoop = requestAnimationFrame(loop);
  };

  return {
    startGame,
  };
};
