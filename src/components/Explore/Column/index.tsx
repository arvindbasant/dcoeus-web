import React from 'react';
import './Column.scss';
import { Icon } from 'antd';

type ColumnProps = {
  name: string,
  type: 'temporal' | 'ordinal' | 'quantitative' | 'nominal',
};

const Column: React.FC<ColumnProps> = ({ name, type }) => (
  <div className="data-column">
    <div className={`data-column__icon--${type}`}>
      {type === 'temporal' && <Icon type="calendar" />}
      {type === 'quantitative' && <Icon type="number" />}
      {type === 'ordinal' && <Icon type="menu" />}
      {type === 'nominal' && <span style={{fontWeight: 600}}>ab</span>}
    </div>
    <div className={`data-column__${type}`}>{name}</div>
  </div>
);

export default Column;