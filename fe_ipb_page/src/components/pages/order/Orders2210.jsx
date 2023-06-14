import React, { useEffect, useState } from 'react';
import { Divider } from "antd";
import { Container, Row, Col } from 'react-bootstrap';
import OrderProductList2210 from './OrderProductList2210';
import Cart2210 from '../cart/Cart2210';
import axios from 'axios';


// Orders라는 부모 컴포넌트에 OrderProductList, Cart 라는 자식 컴포넌트가 있는데,
// OrderProductList 에는 본사의 상품 리스트를 뿌려주고 상품담기를 누르면 발주Cart에 추가된다 .
// Orders에 props로 OrderProductList -> isAdd={isAdd} setIsAdd={setIsAdd} // Cart에는 cartList를 전달해주면서 useEffect를 통해
// 값이 바뀌면 상태가 변경되서 리랜더링 된다.


function Orders2210() {

  const [cartList, setCartList] = useState([]);
  const [isAdd, setIsAdd] = useState(false);

  const localStorageString = localStorage.getItem('recoil-persist');
  console.log(localStorageString);

  // localStorageString 문자열을 JavaScript 객체로 변환
  const localStorageobj = JSON.parse(localStorageString);
  console.log("localStorage : " + localStorageobj);

  // localStorageobj 객체에서 logInState 객체를 꺼냅니다
  const logInStateObj = localStorageobj["logInState"];
  console.log("logInState : " + logInStateObj);

  // logInState 객체의 점포아이디 값을 가져옵니다
  const storeId = logInStateObj["store_id"]
  console.log("storeId : " + storeId);

  useEffect(() => {
    console.log("storeId: ", storeId);
    axios.get(`${process.env.REACT_APP_BE_API}/cart/cartlist/${storeId}`)
      .then((res) => {
        console.log('Orders/res = ', res);
        setCartList(res.data);
        console.log(">>>>>>>>>res.data>>>>>...", res.data);
      })
      .catch((err) => console.log("err: ", err));

  }, [isAdd, storeId]);

  return (
    <div style={{ margin: '0px' }}>
      <h4>발주하기</h4>
      {/* <Divider /> */}

      <Row>
        <Col sm={7} className="bg-gray-300">
          <OrderProductList2210
            isAdd={isAdd}
            setIsAdd={setIsAdd}
          />
        </Col>
        <Col sm={5} className="bg-gray-600">
          <Cart2210
            cartList={cartList}

          // test="안녕"
          />
        </Col>
      </Row>

    </div>
  );
}

export default Orders2210;