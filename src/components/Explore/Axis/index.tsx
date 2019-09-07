import React from 'react';
import './Axis.scss';
import { Icon } from 'antd';
import { DropZone } from 'components/DropZone';

const Axis = () => (
  <div className="axis">
    <div className="axis__item-wrapper">
      <div className="axis__item-wrapper__label">
        <Icon type={'menu'} style={{transform: 'rotate(90deg)'}} />
        <div>columns</div>
      </div>
      <DropZone />
    </div>
    <div className="axis__item-wrapper">
      <div className="axis__item-wrapper__label">
        <Icon type={'menu'} />
        <div>rows</div>
      </div>
      <DropZone />
    </div>
  </div>
);

export default Axis;