import React, { useEffect, useState } from 'react';
import { Divider } from "antd";
import { Container, Row, Col } from 'react-bootstrap';
import OrderProductList from './OrderProductList';
import Cart from '../cart/Cart';
import axios from 'axios';


// Orders라는 부모 컴포넌트에 OrderProductList, Cart 라는 자식 컴포넌트가 있는데,
// OrderProductList 에는 본사의 상품 리스트를 뿌려주고 상품담기를 누르면 발주Cart에 추가된다 .
// Orders에 props로 OrderProductList -> isAdd={isAdd} setIsAdd={setIsAdd} // Cart에는 cartList를 전달해주면서 useEffect를 통해
// 값이 바뀌면 상태가 변경되서 리랜더링 된다.


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
      // axios.get(`http://43.202.9.215:8080/cart/cartlist/${storeId}`)
      .then((res) => {
        console.log('Orders/res = ', res);
        setCartList(res.data);
        console.log(">>>>>>>>>res.data>>>>>...", res.data);
      })
      .catch((err) => console.log("err: ", err));

  }, [isAdd, storeId]);

  return (
    <>
      <h4>발주하기</h4>
      <Divider />

      <Row>
        <Col sm={8} className="bg-gray-300">
          <OrderProductList
            isAdd={isAdd}
            setIsAdd={setIsAdd}
          />
        </Col>
        <Col sm={4} className="bg-gray-600">
          <Cart
            cartList={cartList}
          // test="안녕"
          />
        </Col>
      </Row>

    </>
  );
}

export default Order;