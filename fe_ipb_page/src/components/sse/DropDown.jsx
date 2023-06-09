import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
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
  const navigate = useNavigate();


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
    fetchLowItemSSE();
  }, [cartListData]);


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
  }

  const handleNavigateLOW = () => {
    navigate("/order");
  }

  return (
    <div id='top-myDrop'  style={{position: 'static', zIndex: 1000 }}>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction} id='top-myDrop--i'>
        <DropdownToggle id='top-myDrop--ii' style={{ border: 'none', backgroundColor: '#FFFFFF', color: 'grey' }}>
          <HiOutlineBell />
          <div>{alarmData > 0 && <p className={styles.alarmRed}></p>}</div>
        </DropdownToggle>
        {/* <DropdownMenu style={{ width: '400px', maxHeight: '200px', overflowY: 'auto' }} {...args}> */}
        <DropdownMenu style={{ width: '400px', maxHeight: '200px', overflowY: 'auto' }}>
          <div className={styles.dropList}>
            {messages.map((message, index) => (
              <div key={index} className={styles.dropItemExpMessage} onClick={handleNavigateEXP}>
                {" "}<FiAlertCircle /> {message}
                </div>
            ))}
            {messagesLowItem.map((message, index) => (
              <div>                
                <div key={index} className={styles.dropItemLowMessage} onClick={handleNavigateLOW}>
                {" "}<FiAlertCircle /> {message}
                </div>
              </div>
            ))}
          </div>

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
      </Dropdown>
      {/* <div>
        {
          cartListData && cartListData.map((item, index) => (
            <div key={index} className={styles.dropItemMessage}>
              <p>{item}</p>
            </div>
          ))
        }
      </div> */}
    </div>
  );
}

DropDown.propTypes = {
  direction: PropTypes.string,
};

export default DropDown;