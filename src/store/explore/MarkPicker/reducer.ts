import { Reducer } from 'redux';
import { MarkPickerState, DEFAULT_MARK_PICKER_STATE } from './type';
import { MarkPickerActions } from './action';

export const markPickerReducer: Reducer<MarkPickerState, MarkPickerActions> = (
  state: MarkPickerState = DEFAULT_MARK_PICKER_STATE,
  action: MarkPickerActions
): MarkPickerState => {
  switch (action.type) {
    case 'MARK_PICKER_CHANGE':
      return { ...state, mark: action.payload.mark };
    case 'RESET':
      return { ...state, mark: 'auto' };
  }
};