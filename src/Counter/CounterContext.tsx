import React, { useReducer } from 'react';

import type { CounterState } from './CounterState';
import type { Dispatch } from './Dispatch';
import { NetworkStatus } from "../NetworkStatus";
import counterReducer from './counterReducer';

type CounterProviderProps = {children: React.ReactNode}

const CounterStateContext = React.createContext<
  {state: CounterState; dispatch: Dispatch} | undefined
>(undefined);

const initialState: CounterState = {
  status: NetworkStatus.idle,
  value: 0,
  newValue: null,
  hasNewData: false,
};

function CounterProvider({ children }: CounterProviderProps) {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  const value = {state, dispatch}
  return (
    <CounterStateContext.Provider value={value}>
      {children}
    </CounterStateContext.Provider>
  )
}
function useCounter() {
  const context = React.useContext(CounterStateContext)
  if (context === undefined) {
    throw new Error('useCounter must be used within a CounterProvider')
  }
  return context
}
export { CounterProvider, useCounter }