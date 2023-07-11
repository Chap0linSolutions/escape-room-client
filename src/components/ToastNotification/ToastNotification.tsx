import React from 'react';
import {
  NotificationContainer,
  NotificationToast,
  CloseButton,
  ImageContainer,
  Image,
  MessageContainer,
  Title,
  Message,
} from './ToastNotification.style';

type ToastProps = {
  toastList: {
    id: number;
    title: string;
    description: string;
    backgroundColor: string;
    icon: string;
  }[];
  deleteToast: (id: number) => void;
};

export const ToastNotification = ({ toastList, deleteToast }: ToastProps) => {
  return (
    <NotificationContainer>
      {toastList.map((toast) => (
        <NotificationToast
          key={toast.id}
          style={{ backgroundColor: toast.backgroundColor }}>
          <CloseButton onClick={() => deleteToast(toast.id)}>x</CloseButton>
          <ImageContainer>
            <Image src={toast.icon} alt="" />
          </ImageContainer>
          <MessageContainer>
            <Title>{toast.title}</Title>
            <Message>{toast.description}</Message>
          </MessageContainer>
        </NotificationToast>
      ))}
    </NotificationContainer>
  );
};
