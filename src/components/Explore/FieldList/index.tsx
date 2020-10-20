import React, { Fragment, Dispatch } from 'react';
import Field, { FieldParentType } from '../Field';
import { Type } from 'vega-lite/build/src/type';
import FunctionPicker from '../FunctionPicker';
import { ShelfFieldDef } from 'models/shelf/spec';
import { DatasetActions } from 'context/dataset/datasetActions';
import { Dataset } from 'models/dataset';
import { useStore } from 'context';
import './FieldList.scss';

const SUPPORTED_FIELD_TYPES: Type[] = ['nominal', 'quantitative', 'ordinal', 'temporal'];

const renderFunctionPicker = (fieldDef: ShelfFieldDef, dispatch: Dispatch<DatasetActions>) => {
  let fieldDefParts: ShelfFieldDef = { ...fieldDef };
  if (fieldDef.fn) {
    fieldDefParts = { ...fieldDefParts, fn: fieldDef.fn };
  }
  return (
    <FunctionPicker
      fieldDefParts={fieldDefParts}
      onFunctionChange={(fn) => dispatch(DatasetActions.updateTableSchema(fieldDef.field, { 'fn': fn }))}
    />
  );
};

const renderFields = (fieldType: Type, index: number, dispatch: Dispatch<DatasetActions>, dataset: Dataset) => (
  <Fragment key={index}>
    <div className="field-list__label">{fieldType}</div>
    {dataset.tableSchema.filter(d => d.type === fieldType).map((fieldDef, key) => {
      return (
        <div key={key} className="field-list__item">
          <Field
            isPill={false}
            fieldDef={fieldDef}
            popupComponent={(fieldDef.type === 'quantitative' || fieldDef.type === 'temporal') && fieldDef.field !== 'Count' ? renderFunctionPicker(fieldDef, dispatch) : <div />}
            parentId={{ type: FieldParentType.FIELD_LIST }}
          />
        </div>
      );
    })}
  </Fragment>
);

const FieldList = () => {
  const { state, dispatch } = useStore();
  const { dataset } = state;

  return (
    <div className="field-list">
      {SUPPORTED_FIELD_TYPES.map((fieldType, index) => renderFields(fieldType, index, dispatch, dataset))}
    </div>
  );
};

export default FieldList;