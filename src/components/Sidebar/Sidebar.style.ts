import styled from '@emotion/styled';

export const Bar = styled.div`
    position: fixed;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    min-width: 80px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background: rgba(26, 44, 29, 0.7);
`;

export const Slot = styled.div`
    flex-shrink: 0;
    margin: 8px 22px;
    width: 96px;
    height: 96px;
    border: 2px solid #fffbee;
`;

export const Arrow = styled.div`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
`;