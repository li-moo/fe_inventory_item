import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Input, Pagination } from 'antd';

const { Search } = Input;

const MiniBoard2020 = () => {
  const [boardData, setBoardData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); //페이지 처리 개수 

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
      title: '공지사항',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Link to={`/boarddetail/${record.id}`} style={{ color: 'black', textDecoration: 'none' }}>
          {text}
        </Link>
      ),
      ellipsis: true,
      width: 350,
    },
    {
      title: '작성자',
      dataIndex: 'name',
      key: 'staff_id',
      render: (text) => (
        <span style={{ color: 'black' }}>{text}</span>
      ),
    },
  ];

  const handleSearch = (value) => {
    const filtered = boardData.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);

  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: '5px', borderRadius: '4px', maxWidth: '500px' }}>
      <Table dataSource={displayedData} columns={columns} pagination={false} />
      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={filteredData.length}
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: '16px', textAlign: 'center' }}
      />
    </div>
  );
};

export default MiniBoard2020;

