import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import { usePopupContext } from '../../contexts';
import { useGameLoop, useGameState } from '../../hooks';
import { InputHandler } from '../../events/InputHandler';
import { Button } from './GameScene.style';
import { ComputerScene } from '../ComputerMechanics/ComputerScene';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../constants';

export function GameScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { showPopup, popupOpened, showToast } = usePopupContext();
  const { startGame } = useGameLoop({ showPopup, showToast });
  const { resumeGame } = useGameState();
  const [gameScale, setGameScale] = useState(1);

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

  const randomFragment = <ComputerScene owner = "senior" />;

  useLayoutEffect(() => {
    // Still need to add a loading state
    const width = window.innerWidth;
    const height = window.innerHeight;

    const heightRatio = height / CANVAS_HEIGHT;

    const widthRatio = width / CANVAS_WIDTH;

    if (heightRatio > widthRatio) {
      // scale based on width
      setGameScale(widthRatio);
    } else {
      // scale based on height
      setGameScale(heightRatio);
    }
    handleStartGame();
    showPopup(randomFragment)
  }, []);

  return (
    <>
      <div
        style={{
          background: '#272727',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <canvas
          style={{
            transform: `scale(${gameScale})`,
          }}
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}></canvas>
        {/* <div>
          <Button onClick={handleStartGame}>Start</Button>
          <button onClick={callToast}>Click me!</button>
        </div> */}
      </div>
    </>
  );
}
