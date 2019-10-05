import React from 'react';
import { CHART_TYPES } from 'components/constants';
import { Icon, Tooltip } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { Mark, PRIMITIVE_MARKS } from 'vega-lite/build/src/mark';
import { SpecActions } from 'actions/shelf/spec';
import { ShelfMark, SHORT_WILDCARD } from 'models/shelf/spec';
import './MarkPicker.scss';

const ALL_MARKS = [...PRIMITIVE_MARKS];

const MarkPicker: React.FC = () => {
  const dispatch = useDispatch();

  const onMarkChange = (mark: ShelfMark | SHORT_WILDCARD) => {
    dispatch(SpecActions.markChange(mark));
  };

  return (
    <div className="mark-picker">
      <ul>
        {CHART_TYPES.map(({ label, icon }, index) => (
          <li key={index} onClick={() => onMarkChange('area')}>
            <Tooltip placement="bottom" title={label}>
              <Icon type={icon} style={{ fontSize: '1.25rem', color: '#004261' }} />
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarkPicker;
