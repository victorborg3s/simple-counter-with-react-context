import type { CounterState } from './CounterState';
import type { AnyAction } from './AnyAction';
import { NetworkStatus } from "../NetworkStatus";
import CounterActions from './CounterActions';

const mapActionTypeToReducer = {
  [CounterActions.UPDATE_CURRENT_STATUS]: (state: CounterState, payload: { status: NetworkStatus }): CounterState => {
    return {
      ...state,
      status: payload.status,
    };
  },
  [CounterActions.UPDATE_VALUE]: (state: CounterState, payload: { value: number }): CounterState => {
    return {
      ...state,
      value: payload.value,
    };
  },
  [CounterActions.NEW_DATA_DETECTED]: (state: CounterState, payload: { newValue: number }): CounterState => {
    return {
      ...state,
      hasNewData: true,
      newValue: payload.newValue,
    };
  },
  [CounterActions.ACCEPT_NEW_DATA]: (state: CounterState): CounterState => {
    if (state.newValue == null) {
      throw new Error('Cannot update current value of counter with [newValue=null].');
    }
    return {
      ...state,
      value: state.newValue,
      newValue: null,
      hasNewData: false,
    };
  },
  [CounterActions.DISCARD_NEW_DATA]: (state: CounterState): CounterState => {
    return {
      ...state,
      newValue: null,
      hasNewData: false,
    };
  },
};

export default function counterReducer(state: CounterState, action: AnyAction) {
  const actionReducer = mapActionTypeToReducer[action.type];
  if (actionReducer == null) {
    return state;
  } else {
    return actionReducer(state, action.payload);
  }
}
