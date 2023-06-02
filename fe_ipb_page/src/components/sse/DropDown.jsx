// import React, { useState, useEffect } from 'react';
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// import PropTypes from 'prop-types';
// import { HiOutlineBell } from 'react-icons/hi';
// import { logInState } from '../state/loginState';
// import { useRecoilState } from 'recoil';

// function DropDown({ direction, ...args }) {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [loginData, setLoginData] = useRecoilState(logInState);
//   const [messages, setMessages] = useState([]);

//   const toggle = () => setDropdownOpen((prevState) => !prevState);

//   // useEffect(() => {
//   //   const eventSource = new EventSource(`http://localhost:8080/notifications/expiration?store_id=${loginData.store_id}`);

//   //   eventSource.onmessage = (event) => {
//   //     setMessages((prevMessages) => [...prevMessages, event.data]);
//   //   };

//   //   eventSource.onerror = (error) => {
//   //     console.error('EventSource error:', error);
//   //   };

//   //   return () => {'0
//   //     eventSource.close();
//   //   };
//   // }, [loginData.store_id]);
//   //-------------
//   // useEffect(() => {
//   //   const eventSource = new EventSource(`http://localhost:8080/notifications/expiration?store_id=${loginData.store_id}`);

//   //   eventSource.onmessage = (event) => {
//   //     const newMessage = JSON.parse(event.data);
//   //     console.log(">>>>>.messages: ", messages);
//   //     setMessages((prevMessages) => [...prevMessages, newMessage]);
//   //   };

//   //   eventSource.onerror = (error) => {
//   //     console.error('EventSource error:', error);
//   //   };

//   //   return () => {
//   //     eventSource.close();
//   //   };
//   // }, [loginData.store_id]);
//   // ---------

//   useEffect(() => {
//     const eventSource = new EventSource(`http://localhost:8080/notifications/expiration?store_id=${loginData.store_id}`, {
//       headers: {
//         'Content-Type': 'text/event-stream',
//       },
//     });

//     eventSource.onmessage = (event) => {
//       const newMessage = JSON.parse(event.data);
//       console.log(">>>>>.messages: ", messages);
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     };

//     eventSource.onerror = (error) => {
//       console.error('EventSource error:', error);
//     };

//     return () => {
//       eventSource.close();
//     };
//   }, [loginData.store_id]);


//   //

//   return (
//         <div id='top-myDrop'>
//       <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction} id='top-myDrop--i'>
//         <DropdownToggle id='top-myDrop--ii' style={{ border: 'none', backgroundColor: '#2962FF', color: 'white'  }}>
//         <HiOutlineBell />
//         </DropdownToggle>
//         <DropdownMenu {...args}>
//           {/* <DropdownItem header>Header</DropdownItem>
//           <DropdownItem>Some Action</DropdownItem>
//           <DropdownItem text>Dropdown Item Text</DropdownItem>
//           <DropdownItem disabled>Action (disabled)</DropdownItem> */}
//           <DropdownItem divider />
//           <DropdownItem>메세지1</DropdownItem>
//           {messages.map((message, index) => (
//             <DropdownItem key={index}>{message}</DropdownItem>
//           ))}
//         </DropdownMenu>
//       </Dropdown>
//     </div>
//   );
// }

// DropDown.propTypes = {
//   direction: PropTypes.string,
// };

// export default DropDown;

import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { HiOutlineBell } from 'react-icons/hi';
import { logInState } from '../state/loginState';
import { useRecoilState } from 'recoil';
import { alarmState } from '../state/alarmState';
import styles from './DropDown.module.css'

function DropDown({ direction, ...args }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loginData, setLoginData] = useRecoilState(logInState);
  const [messages, setMessages] = useState([]);
  const [alarmData, setAlarmData] = useRecoilState(alarmState);

  // const toggle = () => setDropdownOpen((prevState) => !prevState);

  const toggle = () => {
    setDropdownOpen((prevState) => !prevState);
    if (!dropdownOpen) {
      setAlarmData(0);
    }
  };

  const url = `http://localhost:8080/notifications/expiration/${loginData.store_id}`;

  useEffect(() => {
    fetchSSE();
  }, []);

  // useEffect(() => {
  //   const eventSource = new EventSource(`http://localhost:8080/notifications/expiration?store_id=${loginData.store_id}`, {
  //     headers: {
  //       'Content-Type': 'text/event-stream',
  //     },
  //   });

  //   console.log("eventSource", eventSource);
  //   eventSource.onmessage = (event) => {
  //     const newMessage = JSON.parse(event.data);
  //     console.log(">>>>>.messages: ", messages);
  //     setMessages((prevMessages) => [...prevMessages, newMessage]);
  //   };

  //   eventSource.onerror = (error) => {
  //     console.error('EventSource error:', error);
  //   };

  //   return () => {
  //     eventSource.close();
  //   };
  // }, [loginData.store_id]);

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
      setAlarmData(onmessageData.length)
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
    // <div id='top-myDrop'>
    //   <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction} id='top-myDrop--i'>
    //     <DropdownToggle id='top-myDrop--ii' style={{ border: 'none', backgroundColor: '#2962FF', color: 'white' }}>
    //       <HiOutlineBell />
    //       {/* <p> {cartData && cartData.map((item) => (</p> */}
    //       {
    //         alarmData && (
    //           <p className={styles.alarmRed}></p>
    //           )
    //       }
    //       {
    //         dropdownOpen && (
    //           setAlarmData === null
    //         )
    //       }
    //     </DropdownToggle>
    //     <DropdownMenu {...args}>
    //       <DropdownItem divider />
    //       <DropdownItem>{alarmData}</DropdownItem>
    //       {messages.map((message, index) => (
    //         <DropdownItem key={index}>{message}</DropdownItem>
    //       ))}
    //     </DropdownMenu>
    //   </Dropdown>
    // </div>
    <div id='top-myDrop'>
    <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction} id='top-myDrop--i'>
      <DropdownToggle id='top-myDrop--ii' style={{ border: 'none', backgroundColor: '#2962FF', color: 'white' }}>
        <HiOutlineBell />
        {alarmData > 0 && <p className={styles.alarmRed}></p>}
        {/* {!dropdownOpen && alarmData === 0 && <p className={styles.alarmblack}></p>} */}
      </DropdownToggle>
      <DropdownMenu {...args}>
        <DropdownItem divider />
        <DropdownItem>{alarmData}</DropdownItem>
        {messages.map((message, index) => (
          <DropdownItem key={index}>{message}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  </div>
  );
}

DropDown.propTypes = {
  direction: PropTypes.string,
};

export default DropDown;