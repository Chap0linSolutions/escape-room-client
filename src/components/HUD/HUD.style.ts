import styled from '@emotion/styled';

export const RightSideContainer = styled.div({
  position: 'absolute',
  right: '16px',
  top: '16px',
  width: '140px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  "@media (max-height: 850px)": {
    width: "100px"
  }
});

export const OptionsContainer = styled.div({
  background: '#404143',
  height: '102px',
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '20px',
  padding: '20px',
});

export const InventoryContainer = styled.div({
  padding: '16px',
  height: '680px',
  background: '#404143',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '16px',
  borderRadius: '20px',
  "@media (max-height: 850px)": {
    height: "400px"
  }
});

export const SlotContainer = styled.div({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});
