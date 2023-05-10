import React, { useState, useEffect } from 'react';
import { Table } from "antd";

function StaffList() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/staff/list');
      const data = await response.json();
      setUserData(data);
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
    },
    {
      title: '로그인 ID',
      dataIndex: 'login_id',
    },
    {
      title: '비밀번호',
      dataIndex: 'pwd',
    },
    {
      title: 'Store ID',
      dataIndex: 'store_id',
    },
  ];

  return (
    <>
      <Table dataSource={userData} columns={columns} />

    </>
  );
}

export default StaffList;