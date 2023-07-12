import { RefObject, useRef } from 'react';
import { GameCallbacks } from '../types';
import { Game } from '../gameLogic/Game';

export const useGameLoop = (gameCallbacks: GameCallbacks) => {
  let animationLoop: number;
  let ctx: CanvasRenderingContext2D;
  let game: Game;

  const lastTS = useRef(0);

  const loop = (ts: number) => {
    const dt = ts - lastTS.current;
    lastTS.current = ts;
    game.GameLoop(ctx, dt);
    animationLoop = requestAnimationFrame(loop);
  };

  const startGame = async (canvas: RefObject<HTMLCanvasElement>) => {
    if (!canvas.current) return null;
    const gameCtx = canvas.current.getContext('2d');
    if (!gameCtx) return null;
    animationLoop && cancelAnimationFrame(animationLoop);
    ctx = gameCtx;
    game = new Game({ gameCallbacks });
    await game.initialSetup();
    animationLoop = requestAnimationFrame(loop);
  };

  return {
    startGame,
  };
};
