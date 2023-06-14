import styled from '@emotion/styled';
import backgroundImg from '../../assets/background.png';

export const AppBackground = styled.div`
  min-width: 100vw;
  height: 100%;
  background: url(${backgroundImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;
