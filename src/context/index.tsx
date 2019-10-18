import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { ApplicationState, DEFAULT_APPLICATION_STATE } from './types';
import { RootReducer } from './rootReducer';
import { AllActions } from './actions';

export interface StoreState {
  state: ApplicationState;
  dispatch: Dispatch<AllActions>;
}
export const DEFAULT_STORE_STATE: StoreState = {
  state: DEFAULT_APPLICATION_STATE,
  // tslint:disable-next-line: no-empty
  dispatch: (): void => { },
};

export const StoreContext = createContext<StoreState>(DEFAULT_STORE_STATE);

export const StoreProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(RootReducer, DEFAULT_APPLICATION_STATE);
  return (
    <StoreContext.Provider value={{ state, dispatch }} children={children} />
  );
};

export const useStore = () => useContext(StoreContext);