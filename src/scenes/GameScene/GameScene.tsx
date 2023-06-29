import React, { useRef, useEffect } from 'react';
import { usePopupContext } from '../../contexts';
import { useGameLoop, useGameState } from '../../hooks';
import { Button } from './GameScene.style';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../constants';
import { coordinate } from '../../types';

export function GameScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<coordinate | undefined>();
  const { showPopup, popupOpened } = usePopupContext();
  const { startGame } = useGameLoop({ showPopup });
  const { resumeGame } = useGameState();

  useEffect(() => {
    if (popupOpened === false) {
      resumeGame();
    }
  }, [popupOpened]);

  const handleStartGame = () => {
    startGame(canvasRef, mouseRef);
  };

  const updateMouseState = (e: undefined | React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if(!e){
      mouseRef.current = undefined;
    } else {
      const pos = {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      }
      mouseRef.current = pos;
    }
  }

  const randomFragment = <h1 style={{ color: 'green' }}>Daleeeeeee brabo</h1>;

  return (
    <div>
      <h1 onClick={() => showPopup(randomFragment)}>Game</h1>
      <canvas
        style={{ border: '1px solid gold' }}
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onMouseDown={(e) => updateMouseState(e)}
        onMouseUp={() => updateMouseState(undefined)}
      ></canvas>
      <Button onClick={handleStartGame}>Start</Button>
    </div>
  );
}
