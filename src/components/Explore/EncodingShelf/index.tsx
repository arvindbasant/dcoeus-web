import React, { CSSProperties } from 'react';
import { DropZone } from 'components/DropZone';
import Icon from 'antd/lib/icon';
import './EncodingShelf.scss';

const EncodingShelf = ({ name, icon }: { name: string, icon?: { name: string, style?: CSSProperties } }) => (
  <div className="encoding-shelf">
    <div className="encoding-shelf__label">
      {icon && <Icon type={icon.name} style={icon.style} />}
      <div>{name}</div>
    </div>
    <DropZone />
  </div>
);

export default EncodingShelf;