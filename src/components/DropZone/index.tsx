import React from 'react';
import { useDrop } from 'react-dnd';
import DraggableTypes from 'components/Draggable/DraggableTypes';

export const DropZone: React.FC = () => {
  const [{ isOver, canDrop, item }, drop] = useDrop({
    accept: DraggableTypes.FIELD,
    drop: () => ({ name: 'DropZone' }),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      item: monitor.getItem(),
    })
  });
  const isActive = canDrop && isOver;
  let backgroundColor = '#fff';
  let border = 'none';
  if (isActive) {
    backgroundColor = '#fff';
    border = '0.09rem dashed #4CAF50';
  } else if (canDrop) {
    backgroundColor = '#d9eeda';
    border = '0.09rem dashed #4CAF50';
  }
  return (
    <div ref={drop} style={{ backgroundColor, border, width: '100%', height: '100%', borderTopRightRadius: '0.25rem', borderBottomRightRadius: '0.25rem' }} />
  );
};