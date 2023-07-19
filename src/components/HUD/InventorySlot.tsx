import React from 'react';
import { Slot, ItemIcon } from './InventorySlot.style';

interface InventorySlotProps {
  item?: any;
  selected?: boolean;
  onClick?: () => void;
}

export const InventorySlot = ({
  item,
  selected,
  onClick,
}: InventorySlotProps) => {
  return (
    <Slot selected={selected} onClick={onClick}>
      {item.icon && (
        <ItemIcon src={item.icon} alt={item && item.name ? item.name : ''} />
      )}
    </Slot>
  );
};
