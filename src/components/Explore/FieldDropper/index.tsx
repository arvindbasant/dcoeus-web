import React, { CSSProperties } from 'react';
import { DropZone } from 'components/DropZone';
import Icon from 'antd/lib/icon';
import './FieldDropper.scss';

const FieldDropper = ({ name, icon }: { name: string, icon?: { name: string, style?: CSSProperties } }) => (
  <div className="field-dropper">
    <div className="field-dropper__label">
      {icon && <Icon type={icon.name} style={icon.style} />}
      <div>{name}</div>
    </div>
    <DropZone />
  </div>
);

export default FieldDropper;