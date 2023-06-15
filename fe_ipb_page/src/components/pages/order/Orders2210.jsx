import React, { useEffect, useState } from 'react';
import { Divider, Modal } from "antd";
import { Container, Row, Col } from 'react-bootstrap';
import OrderProductList2210 from './OrderProductList2210';
import Cart2210 from '../cart/Cart2210';
import axios from 'axios';
import styles from './OrderProductList2210.module.css'
import { CiShoppingCart } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";


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

  const info = () => {
    Modal.info({
      title: '발주하기 Tip!',
      content: (
        <div>
          <div>현 재고를 보고 재고가 적은 제품들을 발주해주세요.</div>
          <p>{''}</p>
          <div className={styles.line}>
            <div className={styles.infoFlex}>
              <div style={{width: '30px'}}><CiShoppingCart size={{ width: '4px'}} /></div>
              <div>: 발주 예정 목록에 담기</div>
            </div>
            <div className={styles.infoFlex}>
              <div style={{width: '30px'}}><CiDeliveryTruck size={{ width: '4px'}} /></div>
              <div>: 발주 예정 목록에 담긴 상품 발주하기</div>
            </div>
            <div className={styles.infoFlex}>
              <div style={{width: '30px'}}><CiTrash size={{ width: '4px'}} /></div>
              <div>: 발주 예정 목록에서 삭제하기</div>
            </div>
          </div>
            <div>
            </div>
        </div>
      ),
      onOk() { },
    });
  };

  return (
    <div style={{ margin: '0px' }}>
      <div className={styles.headerContent}>
      <h4>발주하기</h4>
          <button className={styles.qBtn} onClick={info}>
            ?
          </button>
        </div>
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