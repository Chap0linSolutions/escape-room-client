import { useEffect, useState } from 'react';
import './ToastNotification.css';

type ToastProps = {
  position: string;
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
  position,
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
    <div id="toastParent">
      <div className={`notification-container ${position}`}>
        {list.map((toast, i) => (
          <div
            key={i}
            className={`notification toast ${position}`}
            style={{ backgroundColor: toast.backgroundColor }}>
            <button onClick={() => deleteToast(toast.id)}>x</button>
            <div className="notification-image">
              <img src={toast.icon} alt="" />
            </div>
            <div>
              <p className="notification-title">{toast.title}</p>
              <p className="notification-message">{toast.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
