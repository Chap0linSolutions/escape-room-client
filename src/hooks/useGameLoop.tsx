import { RefObject, useRef } from "react"
import { GameCallbacks } from "../scenes/GameScene"
import { Game } from "../gameLogic/Game"

export const useGameLoop = ( gameCallbacks: GameCallbacks) => {
  let ctx: CanvasRenderingContext2D
  let game: Game

  const lastTS = useRef(0);

  const loop = (ts: number) => {
    const dt = ts - lastTS.current;
    lastTS.current = ts;
    game.GameLoop(ctx, dt);
    requestAnimationFrame(loop);
  };

  
  const startGame = (ref: RefObject<HTMLCanvasElement>) => {
    if (!ref.current) return null
    const gameCtx = ref.current.getContext("2d")
    if (!gameCtx) return null
    ctx = gameCtx
    game = new Game()
    game.initialSetup();
    requestAnimationFrame(loop)
  }

  return {
    startGame
  }
}