import React, { ReactNode } from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import DraggableTypes from './DraggableTypes';

type DraggableProps = {
  name: string,
  children: ReactNode,
  cssClass: string,
};

export const Draggable: React.FC<DraggableProps> = ({ name, children, cssClass }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { name, type: DraggableTypes.FIELD },
    end: (item: { name: string } | undefined, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{width: 'min-content', cursor: 'drag'}} className={cssClass}>
      {children}
    </div>
  );
};
