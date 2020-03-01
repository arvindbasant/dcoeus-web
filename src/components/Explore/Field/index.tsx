import React from 'react';
import { Icon } from 'antd';
import { ShelfFieldDef, ShelfId } from 'models/shelf/spec';
import { Type } from 'vega-lite/build/src/type';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { DraggableTypes } from 'components/constants';
import { SpecActions } from 'context/shelf/specActions';

import './Field.scss';
import { useStore } from 'context';

export enum FieldParentType {
  ENCODING_SHELF,
  FIELD_LIST
}

export type FieldParentId = {
  type: typeof FieldParentType.ENCODING_SHELF,
  id: ShelfId
} | {
  type: typeof FieldParentType.FIELD_LIST
};
export interface FieldProps {
  fieldDef: ShelfFieldDef;
  isPill: boolean;
  onRemove?: () => void;
  popupComponent?: JSX.Element;
  parentId: FieldParentId;
}

const renderFieldIcon = (type: Type) => {
  switch (type) {
    case 'nominal':
      return <span style={{ fontWeight: 600 }}>ab</span>;
    case 'quantitative':
      return <Icon type="number" />;
    case 'ordinal':
      return <Icon type="menu" />;
    case 'temporal':
      return <Icon type="calendar" />;
    case 'geojson':
      return <Icon type="dribbble" />;
  }
};

const renderFieldLabel = (fieldDef: ShelfFieldDef) => {
  if (fieldDef.fn) {
    return `${fieldDef.fn}( ${fieldDef.field} )`;
  }
  return fieldDef.field;
};

const Field: React.FC<FieldProps> = ({ fieldDef, isPill, onRemove, popupComponent, parentId }) => {
  const { type, field } = fieldDef;
  const { state, dispatch } = useStore();
  const [{ isDragging }, drag] = useDrag({
    item: { fieldDef, parentId, type: DraggableTypes.FIELD },
    end: (item: { fieldDef: ShelfFieldDef, parentId: FieldParentId, type: FieldParentType } | undefined, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        switch (item.parentId.type) {
          case FieldParentType.FIELD_LIST:
            dispatch(SpecActions.specFieldAdd({ channel: dropResult.channel }, item.fieldDef, true));
            break;
          case FieldParentType.ENCODING_SHELF:
            dispatch(SpecActions.specFieldMove(item.parentId.id, { channel: dropResult.channel }));
        }
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div className="field" ref={drag} style={{ width: 'min-content', cursor: 'drag' }}>
      <div className={`field__icon--${type}`}>
        {renderFieldIcon(type)}
      </div>
      <div className={`field__${type}`}>
        <div className={`field__${type}__popup`}>{popupComponent}</div>
        <div className={`field__${type}__label`}>{renderFieldLabel(fieldDef)}</div>
        {isPill && onRemove && <div className={`field__${type}__remove`} onClick={() => onRemove()}>
          <Icon type="close" />
        </div>}
      </div>
    </div>
  );
};

export default Field;