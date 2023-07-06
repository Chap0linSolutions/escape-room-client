import React, { useRef, useEffect, useState } from 'react';
import { usePopupContext } from '../../contexts';
import { useGameLoop, useGameState } from '../../hooks';
import { Button } from './GameScene.style';
import { ToastNotification } from '../../components/ToastNotification';
import toastIcon from '../../assets/icons/bulb.svg';

type toastProperties = {
  id: number;
  title: string;
  description: string;
  backgroundColor: string;
  icon: string;
};

export function GameScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { showPopup, popupOpened } = usePopupContext();
  const { startGame } = useGameLoop({ showPopup });
  const { resumeGame } = useGameState();
  const [toastList, setToastList] = useState<toastProperties[]>([]);

  useEffect(() => {
    if (popupOpened === false) {
      resumeGame();
    }
  }, [popupOpened]);

  const handleStartGame = () => {
    startGame(canvasRef);
  };

  const genRanHexColor = () => {
    return (
      '#' +
      [...Array(6)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join('')
    );
  };

  const callToast = () => {
    setToastList([
      ...toastList,
      {
        id: Math.floor(Math.random() * 101 + 1),
        title: 'Toast',
        description: 'You called this random color toast!',
        backgroundColor: genRanHexColor(),
        icon: toastIcon,
      },
    ]);
  };

  const randomFragment = <h1 style={{ color: 'green' }}>Daleeeeeee brabo</h1>;

  return (
    <>
      <div>
        <h1 onClick={() => showPopup(randomFragment)}>Game</h1>
        <canvas
          style={{ border: '1px solid gold' }}
          ref={canvasRef}
          width={1280}
          height={720}></canvas>
        <div>
          <Button onClick={handleStartGame}>Start</Button>
          <button onClick={callToast}>Click me!</button>
        </div>
      </div>
      <ToastNotification
        toastList={toastList}
        //hard coding position and time for now
        position={'top-right'}
        autoDelete={true}
        autoDeleteTime={3000}
      />
    </>
  );
}
