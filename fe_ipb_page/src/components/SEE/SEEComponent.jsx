import React, { useEffect, useState } from 'react';
import EventSource from 'eventsource';

const SSEComponent = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const eventSource = new EventSource('/your-sse-endpoint');

    eventSource.onmessage = (event) => {
      // 수신한 Server-Sent Event 처리
      setMessage(event.data);
    };

    return () => {
      // 이벤트 소스 연결 해제
      eventSource.close();
    };
  }, []);

  return (
    <div>
      {/* <h1>Server-Sent Event</h1> */}
      <p>{message}</p>
    </div>
  );
};

export default SSEComponent;
