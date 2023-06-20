import React from 'react';
import ReactDOM from 'react-dom/client';
import { GameScene } from './scenes/GameScene';
import './index.css';
import { PopupContextProvider } from './contexts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <PopupContextProvider>
    <GameScene />
  </PopupContextProvider>
);
