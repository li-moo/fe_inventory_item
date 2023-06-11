import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, } from 'reactstrap';
import PropTypes from 'prop-types';
import { HiOutlineBell } from 'react-icons/hi';
import { logInState } from '../state/loginState';
import { useRecoilState } from 'recoil';
import { alarmState } from '../state/alarmState';
import styles from './DropDown.module.css'
import { Navigate, useNavigate } from 'react-router-dom';
import { FiAlertCircle } from "react-icons/fi";


function DropDown({ direction, ...args }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loginData, setLoginData] = useRecoilState(logInState);
  const [messages, setMessages] = useState([]);
  const [alarmData, setAlarmData] = useRecoilState(alarmState);
  const [messagesLowItem, setMessagesLowItem] = useState([]);
  const [cartListData, setCartListData] = useState([]);
  const [readMessageEXP, setReadMessageEXP] = useState(false);
  const [readMessageLOW, setReadMessageLOW] = useState(false);

  const navigate = useNavigate();

  const combinedMessages = [...messages, ...messagesLowItem];


  // const toggle = () => setDropdownOpen((prevState) => !prevState);

  const toggle = () => {
    setDropdownOpen((prevState) => !prevState);
    if (!dropdownOpen) {
      setAlarmData(0);
    }
  };


  const url = `http://localhost:8080/notifications/expiration/${loginData.store_id}`;

  // useEffect(() => {
  //   fetchSSE();
  //   fetchLowItemSSE();
  // }, [cartListData]);
  useEffect(() => {
    fetchSSE();
    fetchLowItemSSE();
  }, []);



  const fetchSSE = () => {
    const eventSource = new EventSource(url, {
      headers: {
        Accept: 'text/event-stream',
      }
    });

    eventSource.onopen = function (event) {
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

  const fetchLowItemSSE = () => {
    const LowItem_url = `http://localhost:8080/notifications/low-inventory/${loginData.store_id}`;
    const eventSource = new EventSource(LowItem_url, {
      headers: {
        Accept: 'text/event-stream',
      }
    });

    eventSource.onopen = function (event) {
      if (eventSource.readyState === EventSource.OPEN) {
        console.log('연결 성공');
      } else {
        console.log('연결 실패');
      }
    };

    eventSource.onmessage = (e) => {
      const firstData = JSON.parse(e.data)[1].data;
      const secondData = JSON.parse(firstData)
      // const mesage02Data = JSON.parse(mesage01Data.message)
      // console.log("firstData ", firstData);
      // console.log("mesage01Data ", secondData);
      const messageLow = secondData.message;
      const productsLow = secondData.products;
      // const thirdData = JSON.parse(secondData)
      // console.log("messageLow ", messageLow);
      // // console.log("thirdData ", thirdData);
      // console.log("secondData.message ", secondData.message);
      // console.log("secondData.product ", secondData.products);
      // console.log("productsLow", productsLow);
      // console.log("productsLow[1]", productsLow[1]);
      // console.log("productsLow[1].id", productsLow[1].id);

      //
      // let tempCartListData = [];
      // for (var i = 0; i < productsLow.length; i++) {
      //   // console.log("productsLow[i]", productsLow[i]);
      //   // console.log("productsLow[i]", productsLow[i].id);
      //   let cartData = {
      //     "product_id": productsLow[i].id,
      //     "store_id": loginData.store_id,
      //     "qnt": 1
      //   };
      //   // console.log("cartData", cartData);
      //   tempCartListData.push(cartData);
      //   // setCartListData([...cartListData, cartData]); -> 285만 유지됨
      // }
      // setCartListData(tempCartListData);
      //
      setCartListData(messageLow)


      /////////////

      // const secondData = firstData.trim().split(':')[1].trim();
      // console.log("secondData.JSON.parse(): ", JSON.parse(secondData)); // [StoreProduct(), ...]
      // console.log("secondData: ", JSON.parse(secondData)); // 공백제거 후 ":" 가준으로 split 한 후 [1] 번째 값을 JSON.parse() 하자!
      const onmessageData = JSON.parse(e.data)[1].data
      // setMessages((prev) => [...prev, JSON.parse(e.data)[1].data]);
      setMessagesLowItem((prev) => [...prev, messageLow]);
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

  const handleNavigateEXP = () => {
    navigate("/storeexp");
    setReadMessageEXP(true);
  }

  const handleNavigateLOW = () => {
    navigate("/order");
    setReadMessageLOW(true);
  }

  return (
    <>
      <div>
        <div id='top-myDrop' >
          <UncontrolledDropdown isOpen={dropdownOpen} toggle={toggle} direction={direction} id='top-myDrop--i'>
            {/* <DropdownToggle id='top-myDrop--ii' style={{ border: 'none', backgroundColor: '#FFFFFF', color: 'grey' }}>
              <HiOutlineBell />
              <div>{alarmData > 0 && <p className={styles.alarmRed}></p>}</div>
            </DropdownToggle> */}
            <DropdownToggle id='top-myDrop--ii' style={{ border: 'none', backgroundColor: '#262627', color: 'grey' }}>
              <div className={styles.BellRed}>
                <HiOutlineBell />
                <div>{alarmData > 0 && <p className={styles.alarmRed}></p>}</div>
              </div>
            </DropdownToggle>
            {/* <DropdownMenu style={{ width: '400px', maxHeight: '200px', overflowY: 'auto' }} {...args}> */}
            <div>
              <DropdownMenu style={{
                width: '410px', maxHeight: '200px', overflowY: 'auto', backgroundColor: 'white',
                position: 'absolute', zIndex: 99999999, opacity: 1
              }}>

                <div className={styles.dropList}>
                  {messages.map((message, index) => (
                    // <div key={index} className={styles.dropItemExpMessage} onClick={handleNavigateEXP}>
                    <div key={index} className={styles.dropItemExpMessage} onClick={() => { handleNavigateEXP(); setDropdownOpen(!dropdownOpen); }}>
                      {readMessageEXP == true ? (
                        <td style={{ textDecoration: 'line-through', opacity: '0.5' }}>
                          {" "}<FiAlertCircle /> {message}
                        </td>
                      ) : (
                        <td style={{ color: "244, 216, 59" }}>
                          {" "}<FiAlertCircle /> {message}
                        </td>
                      )}
                    </div>
                  ))}
                  {messagesLowItem.map((message, index) => (
                    <div>
                      {/* <div key={index} className={styles.dropItemLowMessage} onClick={handleNavigateLOW}> */}
                      <div key={index} className={styles.dropItemLowMessage} onClick={() => { handleNavigateLOW(); setDropdownOpen(!dropdownOpen); }}>
                        {readMessageLOW == true ? (
                          <td style={{ textDecoration: 'line-through', opacity: '0.5' }}>
                            {" "}<FiAlertCircle /> {messagesLowItem}
                          </td>
                        ) : (
                          <td style={{ color: "80, 206, 80" }}>
                            {" "}<FiAlertCircle /> {messagesLowItem}
                          </td>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {/* <div className={styles.dropList}>
            {combinedMessages.map((message, index) => (
              <div key={index} className={styles.dropItemExpMessage} onClick={handleNavigateEXP}>
                {" "}<FiAlertCircle /> {message}
              </div>
            ))}
          </div> */}

                {/* /// */}
                {/* <div>
            {
              cartListData.map((item, index) => (
                <div key={index} className={styles.dropItemMessage}>
                  <p>{item.product_id}</p>
                </div>
              ))
            }
          </div> */}
              </DropdownMenu>

            </div>
          </UncontrolledDropdown>
        </div>
      </div >
    </>
  );
}

DropDown.propTypes = {
  direction: PropTypes.string,
};

export default DropDown;


// import React, { useState } from "react";
// import {
//   Navbar,
//   Collapse,
//   Nav,
//   NavbarBrand,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Button,
//   Container,
// } from "reactstrap";
// import 'bootstrap/dist/css/bootstrap.css';
// import { Link } from "react-router-dom";

// const DropDown = () => {
//   const [isOpen, setIsOpen] = React.useState(false);
//   const [isHovered, setIsHovered] = React.useState(false);
//   const [isOrderClicked, setIsOrderClicked] = useState(false);

//   const handleOrderClick = () => {
//     setIsOrderClicked(true);
//     console.log("isOrderClicked", isOrderClicked)
//   };


//   const toggle = () => setIsOpen(!isOpen);

//   const handleMouseEnter = () => setIsHovered(true);

//   const handleMouseLeave = () => setIsHovered(false);

//   return (
//     <div>
//       <Navbar dark expand="md">
//         <div className="d-flex align-items-center">
//           <NavbarBrand href="/" className="d-lg-none">
//             {/* <LogoWhite /> */}
//           </NavbarBrand>
//         </div>

//         <Collapse navbar isOpen={isOpen || isHovered}>
//           <Nav className="me-auto" navbar>
//             <Collapse navbar isOpen={isOpen}>
//               <Nav className="mx-auto" navbar>
//                 <UncontrolledDropdown inNavbar nav >
//                   <DropdownToggle caret nav style={{ color: 'grey'}}>
//                     상품 관리
//                   </DropdownToggle>
//                   <DropdownMenu end>
//                     <DropdownItem>
//                       <Link to="/storeproductlist" style={{ textDecoration: 'none', color: 'grey' }}>재고 관리</Link>
//                     </DropdownItem>
//                     <DropdownItem>
//                       <Link to="/storeexp" style={{ textDecoration: 'none', color: 'grey' }}>유통기한 관리</Link>
//                     </DropdownItem>
//                   </DropdownMenu>
//                 </UncontrolledDropdown>
//               </Nav>
//             </Collapse>
//           </Nav>
//         </Collapse>
//       </Navbar>
//     </div>
//   );
// };

// export default DropDown;