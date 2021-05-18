import React from 'react';

import { useCounter } from './Counter/CounterContext';
import UpdatedDataNotification from './UpdatedDataNotification';
import Counter, { CounterActions } from './Counter';
import './App.css';

function App() {
  const { state, dispatch } = useCounter();

  return (
    <article>
      <UpdatedDataNotification
        hasNewData={state.hasNewData}
        onAcceptNewData={() => dispatch(CounterActions.acceptNewData())}
        onDiscardNewData={() => dispatch(CounterActions.discardNewData())}
      >
        There were an update on the data. Want to retrive the updated data?
      </UpdatedDataNotification>
      <Counter />
    </article>
  );
}

export default App;
