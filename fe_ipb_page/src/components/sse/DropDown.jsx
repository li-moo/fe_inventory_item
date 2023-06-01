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

function DropDown({ direction, ...args }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loginData, setLoginData] = useRecoilState(logInState);
  const [messages, setMessages] = useState([]);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:8080/notifications/expiration?store_id=${loginData.store_id}`, {
      headers: {
        'Content-Type': 'text/event-stream',
      },
    });

    eventSource.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      console.log(">>>>>.messages: ", messages);
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
        <DropdownToggle id='top-myDrop--ii' style={{ border: 'none', backgroundColor: '#2962FF', color: 'white' }}>
          <HiOutlineBell />
        </DropdownToggle>
        <DropdownMenu {...args}>
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