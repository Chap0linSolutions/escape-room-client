import React, { ReactNode, createContext, useContext, useState } from 'react';
import { PopupFragment, ToastNotification } from '../components';
import toastIcon from '../assets/icons/bulb.svg';

type ToastProperties = {
  id: number;
  title: string;
  description: string;
  backgroundColor: string;
  icon: string;
};

interface PopupContextValue {
  showPopup: (fragmentPiece: ReactNode) => void;
  closePopup: () => void;
  popupOpened: boolean;
  showToast: (params: Partial<ToastProperties>) => void;
}

const initialValues: PopupContextValue = {
  showPopup: () => null,
  closePopup: () => null,
  popupOpened: false,
  showToast: () => null,
};

const PopupContext = createContext<PopupContextValue>(initialValues);

interface PopupContextProviderProps {
  children: ReactNode;
}

export const PopupContextProvider = ({
  children,
}: PopupContextProviderProps) => {
  const [show, setShow] = useState(false);
  const [fragment, setFragment] = useState<ReactNode | null>(null);
  const [toastList, setToastList] = useState<ToastProperties[]>([]);

  const showPopup = (fragmentPiece: ReactNode) => {
    setFragment(fragmentPiece);
    setShow(true);
  };

  const closePopup = () => {
    setShow(false);
    setFragment(null);
  };

  const showToast = (params: Partial<ToastProperties>) => {
    setToastList((previousItems) => [
      ...previousItems,
      {
        id: Math.floor(Math.random() * 101 + 1),
        title: 'Toast Notification',
        description: 'Description Here',
        backgroundColor: '#ccc',
        icon: toastIcon,
        ...params,
      },
    ]);
  };

  const value: PopupContextValue = {
    showPopup,
    closePopup,
    popupOpened: show,
    showToast,
  };

  return (
    <PopupContext.Provider value={value}>
      <PopupFragment show={show} closePopup={() => setShow(false)}>
        {fragment}
      </PopupFragment>
      <div
        style={{
          height: '100%',
          width: '100%',
          filter: show ? 'blur(2px)' : 'none',
        }}>
        {children}
      </div>
      <ToastNotification
        toastList={toastList}
        autoDelete={true}
        autoDeleteTime={3000}
      />
    </PopupContext.Provider>
  );
};

export const usePopupContext = (): PopupContextValue => {
  const context = useContext(PopupContext);
  return context;
};
