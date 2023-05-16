import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, message, Divider, Button } from 'antd';
import axios from 'axios';

function Cart(props) {
  
  const [cartData, setCartData] = useState([]);

  //

  useEffect(() => {
    console.log("props.cartData: ", cartData);
    setCartData(props.cartList);
    console.log("props.test: ", props.test);
    // fetchData();
  }, [fetchData]);

  //

  async function fetchData(){

    // Local Storage에서 logInState 객체 가져오기, 키 값을 입력해줘야 함
    // localStorageString는 String 타입입니다
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

    try {
      const response = await axios.get(`http://localhost:8080/cart/cartlist/${storeId}`);
      // console.log("response : " + JSON.stringify(response));
      const data = response["data"];
      console.log("[GET] cartList/data: ", data);
      setCartData(data);
      // console.log("cart product: ", data);
    } catch (error) {
      console.error(error);
    }
  };

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8080/cart/cartlist/2');
  //     console.log(typeof response);
  //     const data = await response.json();
  //     console.log(typeof data);
  //     setCartData(data);
  //     console.log("cartProduct: ", data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const columns = [
    {
      title: '상품아이디',
      dataIndex: 'product_id',
    },
    {
      title: '이름',
      dataIndex: 'name',
    },
    {
      title: '수량',
      dataIndex: 'qnt',
    },
  ];

  console.log("props.cartList", props.cartList);

  return (
    <>
      <Table 
        dataSource={
          cartData && cartData.map((item) => ({ ...item, key: item.id }))
        } 
        columns={columns}
      />
    </>
  );
}

export default Cart;