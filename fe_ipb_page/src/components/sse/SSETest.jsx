import React, { useState, useEffect } from 'react';
import { logInState } from "../state/loginState";
import { useRecoilState, useRecoilValue } from 'recoil';


function SSETest() {

  //
  const [messages, setMessages] = useState([]);
  const [loginData, setLoginData] = useRecoilState(logInState);

  useEffect(() => {
    // const eventSource = new EventSource('/alarm/sse');
    // const eventSource = new EventSource('http://localhost:8080/alarm/sse');
    const eventSource = new EventSource(`http://localhost:8080/notifications/expiration?store_id=${loginData.store_id}`);

    // eventSource.onmessage 이벤트 핸들러는 서버로부터 메시지를 수신할 때마다 실행
    //  data 속성에는 서버로부터 받은 메시지의 내용
    eventSource.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
      console.log("messages: ", messages);
    };
    // SSE 연결 중에 오류가 발생할 경우 실행
    eventSource.onerror = (error) => {
      console.error('EventSource error:', error);
      console.error('에러가 발생하였습니다.');
    };

    return () => {
      eventSource.close(); //  SSE 연결 종료
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