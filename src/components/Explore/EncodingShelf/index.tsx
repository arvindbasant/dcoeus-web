import React, { FC } from 'react';
import { ShelfFieldDef, ShelfValueDef, ShelfId, ShelfChannelId } from 'models/shelf/spec';
import { useDrop } from 'react-dnd';
import { DraggableTypes } from 'components/constants';
import classnames from 'classnames';
import Field, { FieldParentType } from '../Field';
import FunctionPicker from '../FunctionPicker';
import { useDispatch } from 'react-redux';
import { SpecActions } from 'actions/shelf/spec';

import './EncodingShelf.scss';

export interface EncodingShelfProps {
  id: ShelfId;
  fieldDef?: ShelfFieldDef;
  valueDef?: ShelfValueDef;
}

const renderField = ({ id, fieldDef }: EncodingShelfProps, dispatch: any) => {

  const renderFunctionPicker = (fieldDef!.type === 'quantitative' || fieldDef!.type === 'temporal') && fieldDef!.field !== 'Count';

  const functionPicker = renderFunctionPicker ?
    <FunctionPicker
      fieldDefParts={fieldDef!}
      onFunctionChange={(fn) => dispatch(SpecActions.specFunctionChange(id, fn))}
    /> : undefined;

  return (
    <Field
      fieldDef={fieldDef!}
      isPill={true}
      onRemove={() => { dispatch(SpecActions.specFieldRemove({ ...id })); }}
      parentId={{ type: FieldParentType.ENCODING_SHELF, id }}
      popupComponent={functionPicker}
    />
  );
};

const EncodingShelf: FC<EncodingShelfProps> = ({ id, fieldDef, valueDef }) => {
  const [{ hovered, highlighted }, drop] = useDrop({
    accept: DraggableTypes.FIELD,
    drop: () => ({ ...id }),
    collect: monitor => ({
      hovered: monitor.isOver(),
      highlighted: monitor.canDrop(),
    }),
  });
  const active = highlighted && hovered;
  const dispatch = useDispatch();

  return (
    <div ref={drop} className={classnames('encoding-shelf', { 'encoding-shelf--active': active }, { 'encoding-shelf--can-drop': highlighted && !active })} >
      {fieldDef && renderField({ id, fieldDef, valueDef }, dispatch)}
    </div>
  );
};

export default EncodingShelf;