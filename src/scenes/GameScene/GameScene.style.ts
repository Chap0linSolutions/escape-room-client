import styled from '@emotion/styled';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const GameCanvas = styled.canvas`
  border: 2px solid #1A2C1D;
  border-radius: 20px;
  background: #fffbee;
`;

export const Button = styled.button`
  padding: 10px 30px;
  background: #1a2c1d;
  color: fffbee;
  font-size: 20px;
  font-family: Helvetica;
  border-radius: 10px;
  border: 2px solid fffbee;
  cursor: pointer;
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
`;
