import React, { useRef, useEffect } from 'react';
import { usePopupContext } from '../../contexts';
import { useGameLoop, useGameState } from '../../hooks';
import { Button } from './GameScene.style';

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

  const randomFragment = <h1 style={{ color: 'green' }}>Daleeeeeee brabo</h1>;

  return (
    <div>
      <h1 onClick={() => showPopup(randomFragment)}>Game</h1>
      <canvas
        style={{ border: '1px solid gold' }}
        ref={canvasRef}
        width={1280}
        height={720}></canvas>
      <Button onClick={handleStartGame}>Start</Button>
    </div>
  );
}
