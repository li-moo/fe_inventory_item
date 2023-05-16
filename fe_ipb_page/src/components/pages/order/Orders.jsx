import React, { useEffect, useState } from 'react';
import { Divider } from "antd";
import { Container, Row, Col } from 'react-bootstrap';
import OrderProductList from './OrderProductList';
import Cart from '../cart/Cart';
import axios from 'axios';


function Order() {
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
    axios.get(`http://localhost:8080/cart/cartlist/${storeId}`)
    .then((res) => {
      console.log('Orders/res = ', res);
      setCartList(res.data);
    })
    .catch((err) => console.log("err: ", err));

  }, [isAdd]);

  return (
    <>
    <h2>오다 리스트</h2>
      <Divider />
      <Container>
      <Row>
        <Col sm={8} className="bg-gray-300">
          <OrderProductList 
            isAdd={isAdd}
            setIsAdd={setIsAdd}
          />
        </Col>
        <Col sm={4} className="bg-gray-600">
          <Cart 
            cartList= {cartList}
            test="안녕"
          />
        </Col>
      </Row>
</Container>
    </>
  );
}

export default Order;