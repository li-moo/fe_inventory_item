import React, { useState, useEffect } from 'react';
import { Card, Input, Divider, Row, Col, DatePicker, Button, Modal, Tabs } from 'antd';
import { EyeOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { logInState } from "../../state/loginState";

const { Search } = Input;
const { TabPane } = Tabs;

function EventList() {
  const [eventData, setEventData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventData2, setEventData2] = useState([]);
  const [logInData, setLogInData] = useRecoilState(logInState);
  const [ascending, setAscending] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterAndSortEvents();
  }, [startDate, endDate, ascending]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/eventlist');
      // const response = await fetch('http://43.202.9.215:8080/eventlist');
      const data = await response.json();
      setEventData(data);
      setEventData2(data);
      setFilteredData(data);
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
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const filterAndSortEvents = () => {
    let filtered = eventData;

    filtered = filtered.filter((event) => {
      const eventStartDate = new Date(event.start_date);
      const eventEndDate = new Date(event.end_date);

      if (startDate && endDate) {
        return eventStartDate >= startDate && eventEndDate <= endDate;
      } else if (startDate) {
        return eventStartDate >= startDate;
      } else if (endDate) {
        return eventEndDate <= endDate;
      }
      return true;
    });

    filtered.sort((a, b) => {
      if (ascending) {
        return new Date(a.start_date) - new Date(b.start_date);
      } else {
        return new Date(b.start_date) - new Date(a.start_date);
      }
    });

    setFilteredData(filtered);
  };

  const handleDeleteModal = (event) => {
    setSelectedEvent(event);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/eventdetail/delete/${selectedEvent.id}`, {
        // const response = await fetch(`http://43.202.9.215:8080/eventdetail/delete/${selectedEvent.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedData = filteredData.filter((event) => event.id !== selectedEvent.id);
        setFilteredData(updatedData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteModalVisible(false);
    }
  };

  const handleSortAscending = () => {
    setAscending(true);
  };

  const handleSortDescending = () => {
    setAscending(false);
  };

  const getEventStatus = (eventStartDate, eventEndDate) => {
    const today = new Date();
    eventStartDate = new Date(eventStartDate);
    eventEndDate = new Date(eventEndDate);

    if (eventStartDate > today) {
      return 'upcoming';
    } else if (eventEndDate < today) {
      return 'completed';
    } else {
      return 'ongoing';
    }
  };

  const renderEventCards = (events) => {
    return events.map((event) => (
      <Col span={12} key={event.id}>
        <Link 
          to={`/event/detail/${event.id}`} 
          style={{ textDecoration: 'none' }}
          key={event.id}
        >
          <Card
            style={{ marginTop: '50px', height: '100%' }}
            actions={[
              <EyeOutlined key="show" />,
              <DeleteOutlined key="delete" onClick={() => handleDeleteModal(event)} />,
            ]}
          >
            <Card.Meta
              title={<div style={{ textAlign: 'left' }}>{event.name}</div>}
              description={
                <>
                  <p style={{ textAlign: 'left' }}>시작일: {event.start_date}</p>
                  <p style={{ textAlign: 'left' }}>종료일: {event.end_date}</p>
                </>
              }
            />
            <img
              style={{ width: '100%', marginTop: '16px' }}
              src={event.imgname}
              alt={event.name}
            />
          </Card>
        </Link>
      </Col>
    ));
  };

  return (
    <>
      <Row gutter={12} align="middle">
        <Col span={12}>
          <Search
            placeholder="이름으로 검색"
            onSearch={handleSearch}
            style={{ height: 32, position: 'static', zIndex: 1 }}
          />
        </Col>
        <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {logInData.store_id === 1 && (
            <Link to="/event/add">
              <Button type="primary" icon={<PlusOutlined />}>
                이벤트 작성
              </Button>
            </Link>
          )}
        </Col>
      </Row>
      <Divider />
      <Row gutter={[8, 8]} align="middle">
        <Col span={12}>
          <DatePicker
            onChange={handleStartDateChange}
            style={{ width: '100%', minWidth: 100 }}
            placeholder="시작 날짜"
          />
        </Col>
        <Col span={12}>
          <DatePicker
            onChange={handleEndDateChange}
            style={{ width: '100%', minWidth: 100 }}
            placeholder="종료 날짜"
          />
        </Col>
      </Row>
      <Divider />
      <Row gutter={12}>
        <Col span={24} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleSortAscending}>오름차순</Button>
          <Button onClick={handleSortDescending}>내림차순</Button>
        </Col>
      </Row>
      <Tabs defaultActiveKey="ongoing" style={{ marginTop: '16px' }}>
        <TabPane tab="진행 중인 이벤트" key="ongoing">
          <Row gutter={12}>
            {renderEventCards(filteredData.filter(event => getEventStatus(event.start_date, event.end_date) === 'ongoing'))}
          </Row>
        </TabPane>
        <TabPane tab="완료된 이벤트" key="completed">
          <Row gutter={12}>
            {renderEventCards(filteredData.filter(event => getEventStatus(event.start_date, event.end_date) === 'completed'))}
          </Row>
        </TabPane>
        <TabPane tab="시작 예정 이벤트" key="upcoming">
          <Row gutter={12}>
            {renderEventCards(filteredData.filter(event => getEventStatus(event.start_date, event.end_date) === 'upcoming'))}
          </Row>
        </TabPane>
      </Tabs>
      <Modal
        title="이벤트 삭제"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
      >
        <p>이벤트를 삭제하시겠습니까?</p>
      </Modal>
    </>
  );
}

export default EventList;