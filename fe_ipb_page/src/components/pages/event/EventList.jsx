import React, { useState, useEffect } from 'react';
import { Table, Input } from 'antd';

const { Search } = Input;

function EventList() {
  const [eventData, setEventData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/eventlist');
      const data = await response.json();
      setEventData(data);
      setFilteredData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (value) => {
    const filtered = eventData.filter((eventName) =>
    eventName.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '이벤트 이름',
      dataIndex: 'name',
    },
    {
      title: '시작 일',
      dataIndex: 'start_date',
    },
    {
      title: '마지막 일',
      dataIndex: 'end_date',
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

export default EventList;