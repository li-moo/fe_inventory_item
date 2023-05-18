import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, message, Divider, Button, Input, Space } from 'antd';
import axios from 'axios';

function Cart(props) {
  
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    console.log("props.cartData: ", cartData);
    setCartData(props.cartList);
    console.log("props.test: ", props.test);
    // fetchData();
  }, [fetchData]);


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
      // const response = await axios.get(`http://localhost:8080/cart/cartlist/${storeId}`);
      const response = await axios.get(`http://43.202.9.215:8080/cart/cartlist/${storeId}`);
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

    const handleDeleteCart = async (id) => {
      try {
        await fetch(`http://localhost:8080/cart/delete/${id}`, {
          method: 'DELETE',
        });
        // message.success('상품이 삭제되었습니다.');
        fetchData();
      } catch (error) {
        console.error(error);
        // message.error('상품 삭제에 실패하였습니다.');
      }
    };

    // const handleQuantityChange = async (id, value) => {
    //   try {
    //     await axios.put(`http://localhost:8080/cart/update/${id}`, { qnt: value });
    //     fetchData();
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
  
    // const handleIncrement = (id, value) => {
    //   handleQuantityChange(id, value + 1);
    // };
  
    // const handleDecrement = (id, value) => {
    //   if (value > 1) {
    //     handleQuantityChange(id, value - 1);
    //   }
    // };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'product_id',
      width: 50,
    },
    {
      title: '이름',
      dataIndex: 'name',
    },
    {
      title: '수량',
      dataIndex: 'qnt',
      // render: (text, record) => (
      //   <Space>
      //     <Button onClick={() => handleDecrement(record.id, text)}>-</Button>
      //     <Input
      //       value={1}
      //       onChange={(e) => handleQuantityChange(record.id, e.target.value)}
      //     />
      //     <Button onClick={() => handleIncrement(record.id, text)}>+</Button>
      //   </Space>
      // ),
    },
    {
      title: '',
      dataIndex: 'id',
      render: (id) => (
        <Popconfirm
          title="삭제시겠습니까??"
          onConfirm={() => handleDeleteCart(id)}
          okText="네"
          cancelText="아니오"
        >
          <Button>
          <a>삭제</a>
          </Button>
        </Popconfirm>
      ),
    },
  ];

  console.log("props.cartList", props.cartList);

  return (
    <>
      <Table 
        dataSource={cartData && cartData.map((item) => ({ ...item, key: item.id }))} 
        columns={columns}
        scroll={{y:370,}}
        pagination={{pageSize: 5000,}}
      />
    </>
  );
}

export default Cart;