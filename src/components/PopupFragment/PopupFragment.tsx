import React, { ReactNode } from 'react';

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
          alignItems: 'center',
          background: 'white',
          width: '500px',
          height: '500px',
        }}>
        {children}
        <button onClick={closePopup}>Close</button>
      </div>
    </div>
  );
};
