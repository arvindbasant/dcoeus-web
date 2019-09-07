import React from 'react';
import './Toolbar.scss';
import { TOOLBAR_ITMES } from 'components/constants';
import { Icon, Tooltip } from 'antd';

const Toolbar: React.FC = () => {
  return (
    <div className="toolbar">
      <div className="toolbar__actions">
        <ul>
          {TOOLBAR_ITMES.map(({ label, icon }, index) => (
            <li key={index} >
              <Tooltip placement="bottom" title={label}>
                <Icon type={icon} style={{ fontSize: '1.25rem', color: '#004261' }} />
              </Tooltip>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Toolbar;
