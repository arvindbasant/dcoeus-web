import React, { FC } from 'react';
import { ShelfFieldDef } from 'models/shelf/spec';
import { ShelfFunction, getSupportedFunction } from 'models/shelf/spec/shelfFunction';
import { Popover, Icon } from 'antd';
import { Type } from 'vega-lite/build/src/type';
import classnames from 'classnames';
import './FunctionPicker.scss';

export interface FunctionPickerProps {
  fieldDefParts: {
    [k in 'fn' | 'type']?: ShelfFieldDef[k]
  };
  onFunctionChange: (fn: ShelfFunction) => void;
}

const renderPopoverContent = (
  type: Type,
  onFunctionChange: (fn: ShelfFunction) => void,
  fn?: ShelfFunction, ) => {
  const supportedFns = getSupportedFunction(type);
  return supportedFns.map(shelfFn => (
    <div
      key={shelfFn}
      onClick={() => onFunctionChange(shelfFn)}
      className={classnames({ 'selected-function': shelfFn === fn })}
    >
      {shelfFn}
    </div>
  ));
};

const FunctionPicker: FC<FunctionPickerProps> = ({ fieldDefParts, onFunctionChange }) => {
  const { fn, type } = fieldDefParts;
  return (
    <Popover
      placement="bottom"
      content={renderPopoverContent(type!, onFunctionChange, fn)}
      overlayClassName={'function-picker'}
    >
      <Icon type="caret-down" />
    </Popover>
  );
};

export default FunctionPicker;
