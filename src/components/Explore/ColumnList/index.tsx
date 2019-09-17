import React, { Fragment } from 'react';
import { DATA_COLUMNS } from 'components/constants';
import Field from '../Field';
import { Draggable } from 'components/Draggable';
import './ColumnLIst.scss';

const fieldTypes: Array<'ordinal' | 'temporal' | 'quantitative' | 'nominal'> = ['nominal', 'quantitative', 'ordinal', 'temporal'];

const renderFields = (fieldType: 'ordinal' | 'temporal' | 'quantitative' | 'nominal') => (
  <Fragment>
    <div className="column-list__label">{fieldType}</div>
    {DATA_COLUMNS.filter(val => val.type === fieldType).map(({ name, type }, index) => (
      <Draggable name={name} key={index} cssClass="column-list__item">
        <Field name={name} type={type} />
      </Draggable>
    ))}
  </Fragment>
);

const ColumnList = () => (
  <div className="column-list">
    {fieldTypes.map(fieldType => renderFields(fieldType))}
  </div>
);

export default ColumnList;