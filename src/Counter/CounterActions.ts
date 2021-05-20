import type { Dispatch } from './Dispatch';
import { NetworkStatus } from '../NetworkStatus';
import CounterApi from './CounterApi';

export default class CounterActions {
  public static get UPDATE_CURRENT_STATUS(): string { return 'COUNTER_UPDATE_CURRENT_STATUS'};
  public static get UPDATE_VALUE(): string { return 'COUNTER_UPDATE_VALUE'};
  public static get NEW_DATA_DETECTED(): string { return 'COUNTER_NEW_DATA_DETECTED'};
  public static get ACCEPT_NEW_DATA(): string { return 'COUNTER_ACCEPT_NEW_DATA'};
  public static get DISCARD_NEW_DATA(): string { return 'COUNTER_DISCARD_NEW_DATA'};

  public static updateCurrentStatus = (status: NetworkStatus) => ({
    type: CounterActions.UPDATE_CURRENT_STATUS,
    payload: { status },
  });

  public static updateValue = (value: number) => ({
    type: CounterActions.UPDATE_VALUE,
    payload: { value },
  });

  public static newDataDetected = (newValue: number) => ({
    type: CounterActions.NEW_DATA_DETECTED,
    payload: { newValue }
  });

  public static acceptNewData = () => ({
    type: CounterActions.ACCEPT_NEW_DATA,
  });

  public static discardNewData = () => ({
    type: CounterActions.DISCARD_NEW_DATA,
  });

  public static increment = (dispatch: Dispatch) => {
    dispatch(CounterActions.updateCurrentStatus(NetworkStatus.loading));
    CounterApi.increment()
      .then((value) => {
        dispatch(CounterActions.updateValue(value));
        dispatch(CounterActions.updateCurrentStatus(NetworkStatus.idle));
      })
      .catch(() => NetworkStatus.error);
  };

  public static decrement = (dispatch: Dispatch) => {
    dispatch(CounterActions.updateCurrentStatus(NetworkStatus.loading));
    CounterApi.decrement()
      .then((value) => {
        dispatch(CounterActions.updateValue(value));
        dispatch(CounterActions.updateCurrentStatus(NetworkStatus.idle));
      })
      .catch(() => NetworkStatus.error);
  };

  public static startUpdateDetection = (dispatch: Dispatch, value: number) => {
    const runningUpdateDetectionTimeout = setInterval(() => {
      CounterApi.queryValue().then((updatedValue) => {
        if (value !== updatedValue) {
          dispatch(CounterActions.newDataDetected(updatedValue));
        }
      });
    }, 7000);
    return runningUpdateDetectionTimeout;
  };
}
