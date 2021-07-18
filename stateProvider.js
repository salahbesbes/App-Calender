import React, { createContext, useReducer } from 'react';
import { authReducer, initialState } from './src/stateManager/reducers/auth-R';

export const AppStateContext = createContext('defaulttt');

const AppStateProvider = props => {
  const [authState, authDispatch] = useReducer(authReducer, initialState);
  // set the store with the init state of the auth reducer
  // store contain multiple reducers
  const store = {
    authContext: [authState, authDispatch],
  };

  return (
    <AppStateContext.Provider value={store}>
      {props.children}
    </AppStateContext.Provider>
  );
};
export default AppStateProvider;
