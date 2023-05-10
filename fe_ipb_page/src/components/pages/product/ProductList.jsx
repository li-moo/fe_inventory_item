import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';

function ProductList() {
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

  const handleDelete = async (id) => {
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
      title: '삭제',
      dataIndex: 'id',
      render: (id) => (
        <Popconfirm
          title="정말로 삭제하시겠습니까?"
          onConfirm={() => handleDelete(id)}
          okText="삭제"
          cancelText="취소"
        >
          <a>삭제</a>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={productData.map((item) => ({ ...item, key: item.id }))} columns={columns} />
    </>
  );
}

export default ProductList;