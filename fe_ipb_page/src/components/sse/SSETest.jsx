import React, { useState, useEffect } from 'react';


function SSETest() {

  //
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // const eventSource = new EventSource('/alarm/sse');
    const eventSource = new EventSource('http://localhost:8080/alarm/sse');

    eventSource.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
      console.log("messages: ", messages);
    };

    eventSource.onerror = (error) => {
      console.error('EventSource error:', error);
    };

    return () => {
      eventSource.close();
    };
  }, []);
//



  return ( 
    <>
    <div>
      <h4>SSE TEST 페이지 입니다.</h4>
{/* // */}
      <div>
      <h1>Server-Sent Events</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
{/* // */}
    </div>
    </>
  );
}

export default SSETest;