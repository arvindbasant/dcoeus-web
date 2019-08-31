import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { configureStore, history, sagaMiddleware } from './store/index';
import rootSaga from './store/root-saga';
import App from 'components/App';
import './index.scss';

const store = configureStore();
sagaMiddleware.run(rootSaga);

ReactDOM.render(<App store={store} history={history} />, document.getElementById('root'));

serviceWorker.unregister();
