import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, message, Divider, Button } from 'antd';
import { Link } from 'react-router-dom';

function StoreProductList() {

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

  const handleAddCart = async (id) => {
    try {
      await fetch(`http://localhost:8080/product/delete/${id}`, {
        method: 'DELETE',
      });
      message.success('상품이 삭제되었습니다.');
      fetchData();
    } catch (error) {
      console.error(error);
      message.error('상품 삭제에 실패하였습니다.');
    }
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
    },
    {
      title: '수량',
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

export default StoreProductList;