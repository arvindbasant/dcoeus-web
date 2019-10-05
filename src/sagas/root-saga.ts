import { all } from 'redux-saga/effects';
// import datasetSaga from './dataset/dataset-actions';

export default function* rootSaga() {
  yield all([
    // datasetSaga,
  ]);
}
