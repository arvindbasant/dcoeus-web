import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { shelfSpecReducer } from './shelf/specReducer';
import { datasetReducer } from './datasetReducer';

export const createRootReducer = (history: any) => combineReducers({
  router: connectRouter(history),
  spec: shelfSpecReducer,
  dataset: datasetReducer,
});