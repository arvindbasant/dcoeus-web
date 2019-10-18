import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
// import { configureStore, history, sagaMiddleware } from './context/index';
// import rootSaga from './sagas/root-saga';
import App from 'components/App';
import './index.scss';

// const store = configureStore();
// sagaMiddleware.run(rootSaga);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();