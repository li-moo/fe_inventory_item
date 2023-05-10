import React, { useState, useEffect } from 'react';
import { Table } from "antd";
import { Link } from "react-router-dom";

function ProductList() {
  const [productData, setProducData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/product/list');
      const data = await response.json();
      setProducData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '이름',
      dataIndex: 'name',
      render: (text, record) => (
        <Link to={`/product/detail/${record.id}`}>{text}</Link>
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
  ];

  return (
    <>
      <Table dataSource={productData} columns={columns} />
    </>
  );
}

export default ProductList;

// function ProductList() {
//   const [productData, setProducData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/product/list');
//       const data = await response.json();
//       setProducData(data);
//       console.log(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const columns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//     },
//     {
//       title: '이름',
//       dataIndex: 'name',
//       onCell: (record) => ({
//         onClick: () => {
//           console.log(record.id);
//         },
//       }),
//     },
//     {
//       title: '수량',
//       dataIndex: 'qnt',
//     },
//     {
//       title: '가격',
//       dataIndex: 'price',
//     },
//     {
//       title: 'cost',
//       dataIndex: 'cost',
//     },
//     {
//       title: 'exp',
//       dataIndex: 'exp',
//     },
//   ];

//   return (
//     <>
//       <Table dataSource={productData} columns={columns} />
//     </>
//   );
// }
