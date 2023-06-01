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

import React, { useState, useEffect } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { HiOutlineBell } from "react-icons/hi";
import styles from './DropDown.module.css'

function DropDown({ direction, ...args }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // SSE
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
        <div id='top-myDrop'>
        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction} id='top-myDrop--i'>
          <DropdownToggle id='top-myDrop--ii' style={{ border: 'none', backgroundColor: '#2962FF', color: '#cddafd' }}>
            <HiOutlineBell />
          </DropdownToggle>
          <DropdownMenu style={{ maxHeight: '200px', overflowY: 'auto' }} {...args}>
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