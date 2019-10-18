import shelfSpecReducer from './shelf/specReducer';
import { datasetReducer } from './dataset/datasetReducer';
import { ApplicationState, DEFAULT_APPLICATION_STATE } from './types';
import { AllActions } from './actions';
import { get } from 'lodash';

const reducers = {
  shelfSpec: shelfSpecReducer,
  dataset: datasetReducer,
};

export type Reducers = typeof reducers;

const combineReducer = (rds: Reducers) => {
  return (state: ApplicationState = DEFAULT_APPLICATION_STATE, action: AllActions) => {
    let nextState = state;
    for (const key of Object.keys(rds)) {
      const reducer = get(rds, key);
      const previousStateForKey = get(state, key);
      const nextStateForKey = reducer(previousStateForKey, action);
      
      nextState = { ...nextState, [key]: nextStateForKey };
    }
    return nextState;
  };
};

export const RootReducer = combineReducer(reducers);