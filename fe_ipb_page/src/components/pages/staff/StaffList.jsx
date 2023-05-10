import React, { useState, useEffect } from 'react';
import { Table, Input } from 'antd';

const { Search } = Input;

function StaffList() {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/staff/list');
      const data = await response.json();
      setUserData(data);
      setFilteredData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (value) => {
    const filtered = userData.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
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
      <Search
        placeholder="이름으로 검색"
        onSearch={handleSearch}
        style={{ width: 200, marginBottom: 16 }}
      />
      <Table dataSource={filteredData} columns={columns} />
    </>
  );
}

export default StaffList;