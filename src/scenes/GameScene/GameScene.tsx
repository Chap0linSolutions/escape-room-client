import React, { useRef, useEffect } from 'react';
import { usePopupContext } from '../../contexts';
import { useGameLoop, useGameState } from '../../hooks';
import { Button } from './GameScene.style';

export type GameCallbacks = {
  showPopup: () => void;
};
export function GameScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { showPopup, popupOpened } = usePopupContext();
  const { startGame } = useGameLoop({ showPopup });
  const { resumeGame } = useGameState();

  useEffect(() => {
    if (popupOpened === false) {
      resumeGame();
    }
  }, [popupOpened]);

  const handleStartGame = () => {
    startGame(canvasRef);
  };

  return (
    <div>
      <h1 onClick={showPopup}>Game</h1>
      <canvas
        style={{ border: '1px solid gold' }}
        ref={canvasRef}
        width={1280}
        height={720}></canvas>
      <Button onClick={handleStartGame}>Start</Button>
    </div>
  );
}
