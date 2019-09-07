import React from 'react';
import { CHART_TYPES } from 'components/constants';
import { Icon, Tooltip } from 'antd';

import './ChartSelector.scss';

const ChartSelector: React.FC = () => {
  return (
    <div className="chart-selector">
      <ul>
        {CHART_TYPES.map(({ label, icon }, index) => (
          <li key={index} >
            <Tooltip placement="bottom" title={label}>
              <Icon type={icon} style={{ fontSize: '1.25rem', color: '#004261' }} />
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChartSelector;
