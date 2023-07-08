import styled from '@emotion/styled';

interface NotificationToastProps {
  bottom?: boolean;
  left?: boolean;
}

export const NotificationContainer = styled.div<NotificationToastProps>`
  font-size: 14px;
  box-sizing: border-box;
  position: fixed;
  z-index: 10;
  ${(props) => (!props.bottom ? 'top: 12px' : 'bottom: 12px')};
  ${(props) => (!props.left ? 'right: 12px' : 'left: 12px')};
`;

export const NotificationToast = styled.div<NotificationToastProps>`
  background: #fff;
  transition: 0.3s ease;
  position: relative;
  pointer-events: auto;
  overflow: hidden;
  margin: 0 0 6px;
  margin-bottom: 15px;
  max-height: 100px;
  border-radius: 3px 3px 3px 3px;
  box-shadow: 0 0 10px #999;
  opacity: 0.9;
  background-position: 15px;
  background-repeat: no-repeat;
  &:hover {
    box-shadow: 0 0 12px #fff;
    opacity: 1;
    cursor: pointer;
  }
  height: 50px;
  width: 365px;
  color: #fff;
  padding: 20px 15px 10px 10px;
  transition: transform 0.6s ease-in-out;
  ${(props) => (!props.bottom ? 'top: 12px' : 'bottom: 12px')};
  ${(props) => (!props.left ? 'right: 12px' : 'left: 12px')};
  ${(props) =>
    props.left
      ? 'animation: toast-in-left 0.7s'
      : 'animation: toast-in-right 0.7s'};

  @keyframes toast-in-right {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes toast-in-left {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

export const CloseButton = styled.button`
  position: relative;
  right: -0.3em;
  top: -0.3em;
  float: right;
  font-weight: 700;
  color: #fff;
  outline: none;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.8;
  line-height: 1;
  font-size: 16px;
  padding: 0;
  cursor: pointer;
  background: 0 0;
  border: 0;
`;

export const ImageContainer = styled.div`
  float: left;
  margin-right: 15px;
`;

export const Image = styled.img`
  width: 30px;
  height: 30px;
`;

export const MessageContainer = styled.div``;

export const Title = styled.p`
  font-weight: 700;
  font-size: 16px;
  text-align: left;
  margin-top: 0;
  margin-bottom: 6px;
  width: 300px;
  height: 18px;
`;

export const Message = styled.p`
  margin: 0;
  text-align: left;
  height: 18px;
  margin-left: -1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
