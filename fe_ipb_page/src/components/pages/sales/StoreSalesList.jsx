import React, { useState, useEffect } from 'react';
import { Button, Divider } from "antd";
import { Link } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { logInState } from "../../state/loginState";
import { Table } from 'antd';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width:50,
  },
  {
    title: 'Product Name',
    dataIndex: 'product_name',
    key: 'product_name',
  },
  {
    title: 'Category ID',
    dataIndex: 'category_id',
    key: 'category_id',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Quantity',
    dataIndex: 'qnt',
    key: 'qnt',
  },
  {
    title: 'Cost',
    dataIndex: 'cost',
    key: 'cost',
  },
  {
    title: 'Expiration Date',
    dataIndex: 'exp',
    key: 'exp',
  },
  {
    title: 'Sales Date',
    dataIndex: 'sales_date',
    key: 'sales_date',
  },
  {
    title: 'Store Product ID',
    dataIndex: 'store_product_id',
    key: 'store_product_id',
  },
  {
    title: 'Total Price',
    dataIndex: 'total_price',
    key: 'total_price',
  },
];

function StoreSalesList() {

  const [storeSalesData, setStoreSalesData] = useState([]);
  const [logInData, setLogInData] = useRecoilState(logInState);

  useEffect(() => {
    fetchData();
  }, []);


  const combinePriceForSameProductName = (data) => {
        const combinedData = [];
        const groupedData = {};
    
        data.forEach((item) => {
          const productName = item.product_name;
    
          if (groupedData[productName]) {
            groupedData[productName].price += item.price;
            groupedData[productName].total_price += item.price;
          } else {
            groupedData[productName] = {
              ...item,
              total_price: item.price,
            };
          }
        });
    
        Object.keys(groupedData).forEach((productName) => {
          combinedData.push(groupedData[productName]);
        });
    
        return combinedData;
      };

  console.log("logInData:", logInData);
  console.log("logInData.store_id:", logInData.store_id);

  const fetchData = async () => {


    try {
      // const response = await fetch(`http://localhost:8080/sales/listbystore?store_id=${logInData.store_id}`);
      const response = await fetch(`http://43.202.9.215:8080/sales/listbystore?store_id=${logInData.store_id}`);
      const data = await response.json();
      setStoreSalesData(data);
      // setFilteredData(data);
      console.log("여기는 fetchdata입니다")
      console.log("fetchdata",data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Table dataSource={storeSalesData} columns={columns} 
      scroll={{y:1000,}}
      />
    </>
  );
}

export default StoreSalesList;
