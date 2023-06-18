import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Input, Button } from 'antd';
import { useRecoilState } from 'recoil';
import { logInState } from "../../state/loginState";
import moment from 'moment';

const { Search } = Input;

function BoardList() {
  const [boardData, setBoardData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [logInData, setLogInData] = useRecoilState(logInState);
  const params = { key: process.env.REACT_APP_BE_API };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BE_API}/board/list`);
      const data = await response.json();
      setBoardData(data);
      setFilteredData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      title: '제목',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Link to={`/boarddetail/${record.id}`} style={{ color: 'inherit', textDecoration: 'none', fontWeight: 'bold' }}>
          {text}
        </Link>
      ),
    },
    {
      title: '작성자',
      dataIndex: 'name',
      key: 'staff_id',
    },
    {
      title: '작성일',
      dataIndex: 'write_date',
      key: 'write_date',
      render: (text) => moment(text).format('YYYY-MM-DD'),
    },
  ];

  const handleSearch = (value) => {
    const filtered = boardData.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Search
          placeholder="제목으로 검색"
          onSearch={handleSearch}
          style={{ width: 300, position: 'static', zIndex: 1 }}
        />
        {logInData.store_id === 1 && (
          <Button type="primary">
            <Link to="/board/add">글쓰기</Link>
          </Button>
        )}
      </div>
      <Table dataSource={filteredData} columns={columns} />
    </>
  );
}

export default BoardList;
