import { useEffect, useState } from 'react';
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
import './ToastNotification.css';

type ToastProps = {
  toastList: {
    id: number;
    title: string;
    description: string;
    backgroundColor: string;
    icon: string;
  }[];
  autoDelete: boolean;
  autoDeleteTime: number;
};

export const ToastNotification = ({
  toastList,
  autoDelete,
  autoDeleteTime,
}: ToastProps) => {
  const [list, setList] = useState(toastList);

  useEffect(() => {
    setList(toastList);
  }, [toastList]);

  const deleteToast = (id: number) => {
    const index = list.findIndex((e) => e.id === id);
    const toastListItem = toastList.findIndex((e) => e.id === id);

    list.splice(index, 1);
    toastList.splice(toastListItem, 1);

    setList([...list]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length && list.length) {
        deleteToast(toastList[0].id);
      }
    }, autoDeleteTime);

    return () => {
      clearInterval(interval);
    };
  }, [toastList, autoDelete, autoDeleteTime, list]);

  return (
    <NotificationContainer>
      {list.map((toast, i) => (
        <NotificationToast
          key={i}
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
