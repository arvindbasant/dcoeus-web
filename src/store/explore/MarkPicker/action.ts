import { Mark } from 'vega-lite/build/src/mark';
import { createAction } from 'store/util/createAction';
import { ActionUnion } from 'store/util/actionUnion';

export const MarkPickerActions = {
  markPickerChange: (mark: Mark | 'auto') => createAction('MARK_PICKER_CHANGE', { mark }),
  reset: () => createAction('RESET'),
};

export type MarkPickerActions = ActionUnion<typeof MarkPickerActions>;
