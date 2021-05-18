import React from 'react';

interface UpdateDataNotificationProps {
  hasNewData: boolean,
  children: React.ReactNode,
  onAcceptNewData: () => void,
  onDiscardNewData: () => void,
}

function UpdateDataNotification({
  children, hasNewData, onAcceptNewData, onDiscardNewData,
}: UpdateDataNotificationProps) {
  if (hasNewData) {
    return (
      <section>
        <header>
          <h1>{children}</h1>
        </header>
        <button onClick={() => onAcceptNewData()}>
          yes
        </button>
        <button onClick={() => onDiscardNewData()}>
          no
        </button>
      </section>
    );
  }
  
  return null;
}

export default UpdateDataNotification;
