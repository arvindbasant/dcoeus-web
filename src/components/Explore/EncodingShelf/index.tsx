import React, { FC } from 'react';
import { ShelfFieldDef, ShelfValueDef, ShelfId } from 'models/shelf/spec';
import { useDrop } from 'react-dnd';
import { DraggableTypes } from 'components/constants';
import classnames from 'classnames';
import Field, { FieldParentType } from '../Field';
import FunctionPicker from '../FunctionPicker';
import { SpecActions } from 'context/shelf/specActions';

import './EncodingShelf.scss';
import { useStore } from 'context';

export interface EncodingShelfProps {
  id: ShelfId;
  fieldDef?: ShelfFieldDef;
  valueDef?: ShelfValueDef;
}

const renderField = ({ id, fieldDef }: EncodingShelfProps, dispatch: any) => {

  const canRenderFunctionPicker = (fieldDef!.type === 'quantitative' || fieldDef!.type === 'temporal') && fieldDef!.field !== 'Count';

  const functionPicker = canRenderFunctionPicker ?
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
  const { dispatch } = useStore();

  return (
    <div ref={drop} className={classnames('encoding-shelf', { 'encoding-shelf--active': active }, { 'encoding-shelf--can-drop': highlighted && !active })} >
      {fieldDef && renderField({ id, fieldDef, valueDef }, dispatch)}
    </div>
  );
};

export default EncodingShelf;