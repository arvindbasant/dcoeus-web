import React from 'react';
import './Field.scss';
import { Icon } from 'antd';

type ColumnProps = {
  name: string,
  type: 'temporal' | 'ordinal' | 'quantitative' | 'nominal',
};

const Field: React.FC<ColumnProps> = ({ name, type }) => (
  <div className="field">
    <div className={`field__icon--${type}`}>
      {type === 'temporal' && <Icon type="calendar" />}
      {type === 'quantitative' && <Icon type="number" />}
      {type === 'ordinal' && <Icon type="menu" />}
      {type === 'nominal' && <span style={{fontWeight: 600}}>ab</span>}
    </div>
    <div className={`field__${type}`}>{name}</div>
  </div>
);

export default Field;