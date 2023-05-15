import React, { useState, useEffect } from 'react';
import { Table, Input } from 'antd';
import { useRecoilState } from 'recoil';
import { logInState } from '../../state/loginState';
import { useNavigate } from 'react-router';
import checkLogin from '../../globalFunction/checkLogin';

const { Search } = Input;

function StaffList() {
  const [staffData, setstaffData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [logInData, setLogInData] = useRecoilState(logInState);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/staff/list');
      const data = await response.json();
      setstaffData(data);
      setFilteredData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (value) => {
    const filtered = staffData.filter((user) =>
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
  useEffect(() => {
    console.log("enter StaffList.jsx / useEffect()");
    console.log("loginData: ", logInData);
    console.log("loginData.isLogin == false: ", logInData.isLogIn === false);
    checkLogin(logInData, navigate);

  }, [])

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