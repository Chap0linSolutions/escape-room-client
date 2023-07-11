import React, { useRef, useEffect } from 'react';
import { usePopupContext } from '../../contexts';
import { useGameLoop, useGameState } from '../../hooks';
import { InputHandler } from '../../events/InputHandler';
import { Button } from './GameScene.style';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../constants';

export function GameScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { showPopup, popupOpened, showToast } = usePopupContext();
  const { startGame } = useGameLoop({ showPopup, showToast });
  const { resumeGame } = useGameState();

  useEffect(() => {
    if (popupOpened === false) {
      resumeGame();
    }
  }, [popupOpened]);

  const handleStartGame = () => {
    new InputHandler(canvasRef);
    startGame(canvasRef);
  };

  const callToast = () => {
    showToast({
      title: 'Toast',
      description: 'You called this random color toast!',
    });
  };

  const randomFragment = <h1 style={{ color: 'green' }}>Daleeeeeee brabo</h1>;

  return (
    <>
      <div>
        <h1 onClick={() => showPopup(randomFragment)}>Game</h1>
        <canvas
          style={{ border: '1px solid gold' }}
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}></canvas>
        <div>
          <Button onClick={handleStartGame}>Start</Button>
          <button onClick={callToast}>Click me!</button>
        </div>
      </div>
    </>
  );
}
