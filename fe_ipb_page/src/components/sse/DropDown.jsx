// import React, { useState, useEffect } from 'react';
// import {
//   Dropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
// } from 'reactstrap';
// import PropTypes from 'prop-types';
// import { HiOutlineBell } from "react-icons/hi";
// import styles from './DropDown.module.css'

// function DropDown({ direction, ...args }) {
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const toggle = () => setDropdownOpen((prevState) => !prevState);

//   // SSE
//   //
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     // const eventSource = new EventSource('/alarm/sse');
//     const eventSource = new EventSource('http://localhost:8080/alarm/sse');

//     eventSource.onmessage = (event) => {
//       setMessages((prevMessages) => [...prevMessages, event.data]);
//       console.log("messages: ", messages);
//     };

//     eventSource.onerror = (error) => {
//       console.error('EventSource error:', error);
//     };

//     return () => {
//       eventSource.close();
//     };
//   }, []);
//   //

//   return (
//     <div id='top-myDrop'>
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

// import React, { useState, useEffect } from 'react';
// import {
//   Dropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
// } from 'reactstrap';
// import PropTypes from 'prop-types';
// import { HiOutlineBell } from "react-icons/hi";
// import styles from './DropDown.module.css'
// import { logInState } from "../state/loginState";
// import { useRecoilState, useRecoilValue } from 'recoil';

// function DropDown({ direction, ...args }) {
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const toggle = () => setDropdownOpen((prevState) => !prevState);

//   // SSE 코드들
//   // 아래는 SSE TEST 코드입니다. 
//   const [messages, setMessages] = useState([]);
//   const [messagesEXP, setMessagesEXP] = useState([]);
//   const [loginData, setLoginData] = useRecoilState(logInState);

//   useEffect(() => {
//     // const eventSource = new EventSource('/alarm/sse');
//     // const eventSource = new EventSource('http://localhost:8080/alarm/sse');

//     eventSource.onmessage = (event) => {
//       setMessages((prevMessages) => [...prevMessages, event.data]);
//       console.log("messages: ", messages);
//     };

//     eventSource.onerror = (error) => {
//       console.error('EventSource error:', error);
//     };

//     const eventSource = new EventSource('/expiration?store_id=123');

//   const eventSourceEXP = new EventSource(`http://localhost:8080/notifications/expiration?store_id=${loginData.store_id}`);

//   console.log("loginData.store_id>>", loginData.store_id);
//   eventSourceEXP.onmessage = function(event) {
//   const notification = JSON.parse(event.data);
//   setMessagesEXP = JSON.parse(event.data);
//   console.log("messages: ", messages);
//   // 서버로부터 받은 알림 처리
// };

// eventSource.onerror = function(error) {
//   // 오류 처리
// };

// // 컴포넌트가 언마운트될 때 연결 해제
// // componentWillUnmount() {
// //   eventSource.close();
// // }

//     return () => {
//       eventSource.close();
//     };
//   }, []);
//   //


//   return (
//         <div id='top-myDrop'>
//         <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction} id='top-myDrop--i'>
//           <DropdownToggle id='top-myDrop--ii' style={{ border: 'none', backgroundColor: '#2962FF', color: '#cddafd' }}>
//             <HiOutlineBell />
//           </DropdownToggle>
//           <DropdownMenu style={{ maxHeight: '200px', overflowY: 'auto' }} {...args}>
//           <DropdownItem divider />
//           <DropdownItem>메세지1</DropdownItem>
//           {/* {messages.map((message, index) => (
//             <DropdownItem key={index}>{message}</DropdownItem>
//           ))} */}

//           </DropdownMenu>
//         </Dropdown>
//       </div>
    
//   );
// }

// DropDown.propTypes = {
//   direction: PropTypes.string,
// };

// export default DropDown;

// import React, { useState, useEffect } from 'react';
// import {
//   Dropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
// } from 'reactstrap';
// import PropTypes from 'prop-types';
// import { HiOutlineBell } from "react-icons/hi";
// import styles from './DropDown.module.css'
// import { logInState } from "../state/loginState";
// import { useRecoilState, useRecoilValue } from 'recoil';

// function DropDown({ direction, ...args }) {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//     const [loginData, setLoginData] = useRecoilState(logInState);

//   const toggle = () => setDropdownOpen((prevState) => !prevState);

//   // SSE
//   //
//   const [messages, setMessages] = useState([]);

//   console.log("loginData.store_id>>", loginData.store_id);

//   useEffect(() => {
//     // const eventSource = new EventSource('/alarm/sse');
//     const eventSource = new EventSource(`http://localhost:8080/notifications/expiration?store_id=${loginData.store_id}`);

//     eventSource.onmessage = (event) => {
//       setMessages((prevMessages) => [...prevMessages, event.data]);
//       console.log("messages: ", messages);
//     };

//     eventSource.onerror = (error) => {
//       console.error('EventSource error:', error);
//     };

//     return () => {
//       eventSource.close();
//     };
//   }, []);
//   //

//   return (
//     <div id='top-myDrop'>
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

function DropDown({ direction, ...args }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loginData, setLoginData] = useRecoilState(logInState);
  const [messages, setMessages] = useState([]);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // useEffect(() => {
  //   const eventSource = new EventSource(`http://localhost:8080/notifications/expiration?store_id=${loginData.store_id}`);

  //   eventSource.onmessage = (event) => {
  //     setMessages((prevMessages) => [...prevMessages, event.data]);
  //   };

  //   eventSource.onerror = (error) => {
  //     console.error('EventSource error:', error);
  //   };

  //   return () => {
  //     eventSource.close();
  //   };
  // }, [loginData.store_id]);
  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:8080/notifications/expiration?store_id=${loginData.store_id}`);

    eventSource.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    eventSource.onerror = (error) => {
      console.error('EventSource error:', error);
    };

    return () => {
      eventSource.close();
    };
  }, [loginData.store_id]);

  return (
        <div id='top-myDrop'>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction} id='top-myDrop--i'>
        <DropdownToggle id='top-myDrop--ii' style={{ border: 'none', backgroundColor: '#2962FF', color: 'white'  }}>
        <HiOutlineBell />
        </DropdownToggle>
        <DropdownMenu {...args}>
          {/* <DropdownItem header>Header</DropdownItem>
          <DropdownItem>Some Action</DropdownItem>
          <DropdownItem text>Dropdown Item Text</DropdownItem>
          <DropdownItem disabled>Action (disabled)</DropdownItem> */}
          <DropdownItem divider />
          <DropdownItem>메세지1</DropdownItem>
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