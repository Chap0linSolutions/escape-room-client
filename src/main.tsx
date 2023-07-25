import React from 'react';
import ReactDOM from 'react-dom/client';
import { GameScene } from './scenes/GameScene';
import './index.css';
import { HUDContextProvider } from './contexts';
import { PopupContextProvider } from './contexts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HUDContextProvider>
    <PopupContextProvider>
      <GameScene />
    </PopupContextProvider>
  </HUDContextProvider>
);
