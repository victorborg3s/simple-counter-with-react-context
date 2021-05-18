import { NetworkStatus } from "../NetworkStatus";

export interface CounterState {
  status: NetworkStatus,
  value: number,
  newValue: number | null,
  hasNewData: boolean,
}
