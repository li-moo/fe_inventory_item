import React, { useState, useEffect } from 'react';
import { Table, Input } from 'antd';

const { Search } = Input;

function EventList() {

  // useState ->  state의 초기값과 해당 state를 변경하는 함수를 반환
  const [eventData, setEventData] = useState([]);

  // 이름으로 검색을 하기 위한 useState
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // fetch localhost:8080으로 /evnetlist를 받아와서 respose라는 변수 명으로 담는다
      // reponse를 .json형식으로 바꿔주고 data라는 변수 명으로 데이터를 담는다
      const response = await fetch('http://localhost:8080/eventlist');
      const data = await response.json();
      // setEventData라는 useState, 에 data를 넣어준다
      setEventData(data);
      setFilteredData(data);
      // console.log로 제이슨 형식으로 넘어온 data를 콘솔에 찍어본다.
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
      <Table 
        dataSource={filteredData} 
        columns={columns} 
        />
    </>
  );
}

export default EventList;