import styled from '@emotion/styled';

interface SlotProps {
  selected?: boolean;
}

export const Slot = styled.div<SlotProps>((props) => ({
  border: `2px solid ${props.selected ? 'gold' : 'white'}`,
  width: '96px',
  height: '96px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '@media (max-height: 850px)': {
    height: '56px',
    width: '56px',
  },
}));

export const ItemIcon = styled.img({
  width: '80px',
  height: '80px',
  objectFit: 'contain',
  '@media (max-height: 850px)': {
    height: '40px',
    width: '40px',
  },
});
