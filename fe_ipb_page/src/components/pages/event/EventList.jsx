import React, { useState, useEffect } from 'react';
import { Card, Input, Divider, Row, Col, DatePicker, Button } from 'antd';
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Search } = Input;

function EventList() {
  const [eventData, setEventData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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

  const handleStartDateChange = (date) => {
    setStartDate(date);
    filterEvents(date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    filterEvents(startDate, date);
  };

  const filterEvents = (start, end) => {
    const filtered = eventData.filter((event) => {
      const startDate = new Date(event.start_date);
      const endDate = new Date(event.end_date);

      if (start && end) {
        return startDate >= start && endDate <= end;
      } else if (start) {
        return startDate >= start;
      } else if (end) {
        return endDate <= end;
      }
      return true;
    });

    setFilteredData(filtered);
  };

  return (
    <>
      <Search
        placeholder="이름으로 검색"
        onSearch={handleSearch}
        style={{ width: 200, marginBottom: 16 }}
      />
      <Divider />
      <Row gutter={16}>
        <Col span={24} style={{ marginBottom: 16 }}>
          <DatePicker.RangePicker
            onChange={(dates) => {
              if (dates && dates.length === 2) {
                handleStartDateChange(dates[0]);
                handleEndDateChange(dates[1]);
              }
            }}
          />
        </Col>
        {filteredData.map((event) => (
          <Col span={8} key={event.id}>
            <Card
              style={{ marginTop: 16 }}
              actions={[
                <EyeOutlined key="show" />,
              ]}
            >
              <Card.Meta
                title={<div style={{ textAlign: 'left' }}>{event.name}</div>}
                description={
                  <>
                    <p style={{ textAlign: 'left' }}>시작 일: {event.start_date}</p>
                    <p style={{ textAlign: 'left' }}>마지막 일: {event.end_date}</p>
                  </>
                }
              />
              <img
                style={{ width: '100%', marginTop: '16px' }}
                src={event.image}
                alt={event.name}
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Link to="/event/eventadd">
  <Button type="primary" icon={<PlusOutlined />}>
    이벤트 작성
  </Button>
</Link>
    </>
  );
}

export default EventList;
