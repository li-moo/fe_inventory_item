import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { logInState } from '../../state/loginState';
import axios from 'axios';
import { Divider, Input, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

function StoreAutoOrdersList() {
  const [storeAutoOrdersData, setStoreAutoOrdersData] = useState([]);
  const [logInData, setLogInData] = useRecoilState(logInState);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const url_be = `http://localhost:8080/auto/getList/${logInData.store_id}`;

  const fetchData = () => {
    axios
      .get(url_be)
      .then((res) => {
        console.log("res:", res);
        setStoreAutoOrdersData(res.data);
      })
      .catch((err) => console.log("storeProdutList/err", err));
  };
  return (
    <>
      <h4>사용자설정 자동발주</h4>
      <Divider/>
      <table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>상품이름</th>
            <th>매입가</th>
            <th>판매가</th>
            <th>최소재고수량</th>
            <th>기준재고수량</th>
          </tr>
        </thead>
        <tbody>
          {storeAutoOrdersData && storeAutoOrdersData.map((item) => (

            <tr key={item.id}>
              <td>{item.product_code}</td>
              <td>{item.product_name}</td>
              <td>{item.qnt}</td>
              <td>{item.price}</td>
              <td>{item.exp}</td>
              <td>{item.storage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default StoreAutoOrdersList;


