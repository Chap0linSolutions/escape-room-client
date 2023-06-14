import { useRef, useEffect } from 'react';
import { usePopupContext } from '../../contexts';
import { useGameLoop, useGameState } from '../../hooks';
import { Button, Content, GameCanvas } from './GameScene.style';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../constants';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

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
    <Background>
      <Header logo/>
      <Content>
        <GameCanvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
        <Sidebar/>
        <Button onClick={handleStartGame}>Start</Button>
      </Content>
    </Background>
  );
}
