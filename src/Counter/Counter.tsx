import React from 'react';

import CounterActions from './CounterActions';
import { useCounter } from './CounterContext';

function Counter() {
  const { state, dispatch } = useCounter();
  const { value } = state;

  React.useEffect(() => {
    const runningUpdateDetectionTimeout = CounterActions.startUpdateDetection(dispatch, value);
    return () => clearInterval(runningUpdateDetectionTimeout);
  }, [dispatch, value]);

  return (
    <section>
      <header>
        <h1>Counter: {value}</h1>
      </header>
      <button onClick={() => CounterActions.decrement(dispatch)}>
        decrement
      </button>
      <button onClick={() => CounterActions.increment(dispatch)}>
        increment
      </button>
    </section>
  );
}

export default Counter;
