import React, { ReactNode } from 'react';
import closeWindowIcon from '../../assets/PCMechanics/close-window-icon.png';

type PopupProps = {
  show?: boolean;
  closePopup: () => void;
  children?: ReactNode;
};

export const PopupFragment = ({ show, closePopup, children }: PopupProps) => {
  return (
    <div
      style={{
        display: show ? 'flex' : 'none',
        height: '100%',
        width: '100%',
        background: 'rgba(0,0,0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
      }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
          background: '#D9D9D9',
          width: '960px',
          height: '720px',
        }}>
        <button style={{
          borderRadius: '20px',
          background: '#D9D9D9',
          padding: '0px',
        }} onClick={closePopup}>
          <img src={closeWindowIcon}/>
        </button>
        {children}
      </div>
    </div>
  );
};
