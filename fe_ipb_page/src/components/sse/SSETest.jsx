import React, { useState, useEffect } from 'react';
import { logInState } from "../state/loginState";
import { useRecoilState, useRecoilValue } from 'recoil';
import { EventSourcePolyfill } from 'event-source-polyfill';


function SSETest() {
  const [messages, setMessages] = useState([]);
  const [loginData, setLoginData] = useRecoilState(logInState);

  console.log("SSETEst>> 로그인데이타:", loginData?.store_id);

  // PathVariable이면 URL이... 이렇게..!!!!
  const url = `http://localhost:8080/notifications/expiration/${loginData.store_id}`;

  useEffect(() => {
    fetchSSE();
  }, []);

  const fetchSSE = () => {
    const eventSource = new EventSource(url, {
      headers: {
        Accept: 'text/event-stream',
      }
    });

    // eventSource.onopen = (e) => {
    //   console.log("1. 서버와 연결되셨습니다.");
      
    // };\
    eventSource.onopen = function(event) {
      if (eventSource.readyState === EventSource.OPEN) {
        console.log('연결 성공');
      } else {
        console.log('연결 실패');
      }
    };
    
    eventSource.onmessage = (e) => {      
      console.log(JSON.parse(e.data)[1].data);
      const onmessageData = JSON.parse(e.data)[1].data
      // setMessages((prev) => [...prev, JSON.parse(e.data)[1].data]);
      setMessages((prev) => [...prev, onmessageData]);
    };

    eventSource.onerror = (e) => {
      // 종료 또는 에러 발생 시 할 일
      eventSource.close();

      if (e.error) {
        console.log("에러가 발생했습니다.");
        console.log(e);
      }

      if (e.target.readyState === EventSource.CLOSED) {
        // 종료 시 할 일
      }
      return () => {
        eventSource.close(); //  SSE 연결 종료
      };
    };
  };

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