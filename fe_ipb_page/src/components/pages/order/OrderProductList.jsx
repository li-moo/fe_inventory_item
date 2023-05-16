import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, message, Divider, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

function OrderProductList(props) {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/product/list');
      const data = await response.json();
      setProductData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleAddCart = async (id) => {
  //   try {
  //     await fetch(`http://localhost:8080/cart/add`, {
  //       method: 'post',
  //     });
  //     message.success('상품을 담았습니다.');
  //     console.log(id);
  //     fetchData();
  //   } catch (error) {
  //     console.error(error);
  //     message.error('상품 담기에 실패하였습니다.');
  //   }
  // };

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

  const handleAddCart = (id) => {
    const url_be = "http://localhost:8080/cart/add";

    axios(url_be,
      {
        method: 'post',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          withCredentials: true,
          mode: 'no-cors'
        },
        data: { //post 라면 . . .
          qnt: 1,
          product_id: id,
          store_id: storeId,
        }
      }
    ).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    })

    props.setIsAdd(!props.isAdd);
  };



  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '이름',
      dataIndex: 'name',
      render: (text, record) => (
        <Link to={`/product/detail/${record.id}`} key={record.id}>{text}</Link>
      ),
      // 모달 창으로 리펙토링 해야함
    },
    {
      title: '발주가능수량',
      dataIndex: 'qnt',
    },
    {
      title: '가격',
      dataIndex: 'price',
    },
    {
      title: '원가',
      dataIndex: 'cost',
    },
    {
      title: '유통기한',
      dataIndex: 'exp',
    },
    {
      title: '',
      dataIndex: 'id',
      render: (id) => (
        <Popconfirm
          title="장바구니에 상품을 담으시겠습니까??"
          onConfirm={() => handleAddCart(id)}
          okText="네"
          cancelText="아니오"
        >
          <Button>
          <a>상품담기</a>
          </Button>
        </Popconfirm>
      ),
    },
  ];


  return (
    <>
    {/* 실제 사용시 <h2></h2> 는 주석 처리나 삭제 해주세요 */}
    {/* <h2>점포에서 상품을 담기위해 product에서 장바구니를 담을 때 사용하는 페이지 입니다</h2> */}
    {/* <Divider /> */}
    <>
      <Table dataSource={productData.map((item) => ({ ...item, key: item.id }))} columns={columns} />
    </>
    </>
  );
}

export default OrderProductList;