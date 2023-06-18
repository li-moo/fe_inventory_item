import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, message, Divider, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { logInState } from '../../state/loginState';

function _StoreProductList02() {

  const [storeProductData, setStoreProductData] = useState([]);
  const [logInData, setLogInData] = useRecoilState(logInState);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Local Storage에서 logInState 객체 가져오기, 키 값을 입력해줘야 함
    // localStorageString는 String 타입입니다
    const localStorageString = localStorage.getItem('recoil-persist');

    // localStorageString 문자열을 JavaScript 객체로 변환
    const localStorageobj = JSON.parse(localStorageString);

    // localStorageobj 객체에서 logInState 객체를 꺼냅니다
    const logInStateObj = localStorageobj["logInState"];

    // logInState 객체의 점포아이디 값을 가져옵니다
    const storeId = logInStateObj["store_id"]

    try {
      const response = await fetch(`${process.env.REACT_APP_BE_API}/storeproduct/list/${logInData.store_id}`);
      const data = await response.json();
      setStoreProductData(data);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleAddCart = async (id) => {
  //   try {
  //     await fetch(`http://localhost:8080/product/delete/${id}`, {
  //       method: 'DELETE',
  //     });
  //     message.success('상품이 삭제되었습니다.');
  //     fetchData();
  //   } catch (error) {
  //     console.error(error);
  //     message.error('상품 삭제에 실패하였습니다.');
  //   }
  // };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '이름',
      dataIndex: 'product_name',
      sorter: (a, b) => a.product_name.localeCompare(b.product_name),
      render: (text, record) => (
        <Link to={`/product/detail/${record.id}`} key={record.id}>{text}</Link>
      ),
    },
    {
      title: '재고',
      dataIndex: 'qnt',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.qnt - b.qnt,
    },
    // {
    //   title: '가격',
    //   dataIndex: 'product_price',
    // },
    {
      title: '가격',
      dataIndex: 'price',
    },
    {
      title: '유통기한',
      dataIndex: 'exp',
      sorter: (a, b) => a.exp.localeCompare(b.exp),
    },
  ];


  return (
    <>
      <Table
        dataSource={storeProductData.map((item) => ({ ...item, key: item.id }))}
        columns={columns}
        scroll={{ y: 450, }}
        pagination={{ pageSize: 5000, }}
      />
    </>
  );
}

export default _StoreProductList02;