import { Mark } from 'vega-lite/build/src/mark';

export interface MarkPickerState {
  mark: Mark | 'auto';
}

export const DEFAULT_MARK_PICKER_STATE: MarkPickerState = {
  mark: 'auto'
};