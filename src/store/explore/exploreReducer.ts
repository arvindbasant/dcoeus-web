import { combineReducers } from 'redux';
import { markPickerReducer } from './MarkPicker/reducer';

export const exploreReducer = combineReducers(markPickerReducer);