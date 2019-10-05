import { routerMiddleware } from 'connected-react-router';
import {
  AnyAction,
  applyMiddleware,
  compose,
  createStore,
  Middleware,
  Store,
  StoreEnhancer
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createRootReducer } from '../reducers/root-reducer';
import { ApplicationState, DEFAULT_APPLICATION_STATE } from './types';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';

export const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();
const composeEnhancers = compose;
const middleware: Middleware[] = [routerMiddleware(history), sagaMiddleware];

export function configureStore(defaultState: ApplicationState = DEFAULT_APPLICATION_STATE): Store<ApplicationState, AnyAction> {
  const store: Store<ApplicationState> = createStore(
    createRootReducer(history),
    defaultState,
    composeWithDevTools(applyMiddleware(...middleware) as StoreEnhancer<any>)
  );
  return store;
}