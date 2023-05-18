// import React, { useState, useEffect } from 'react';
// import { Card, Input, Divider, Row, Col, DatePicker, Button, Modal } from 'antd';
// import { EyeOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
// import { Link } from 'react-router-dom';

// const { Search } = Input;

// function EventList() {
//   const [eventData, setEventData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [deleteModalVisible, setDeleteModalVisible] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [eventData2, setEventData2] = useState([]); 

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       // const response = await fetch('http://localhost:8080/eventlist');
//       const response = await fetch('http://43.202.9.215:8080/eventlist');
//       const data = await response.json();
//       setEventData(data);
//       // console.log("ddd", data);
//       // console.log("ccc", eventData);
//       // console.log("filteredData", filteredData);
//       setEventData2(data);
//       console.log("EventData2", eventData2);
//       console.log("data>>>>>.", data);
//       setFilteredData(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleSearch = (value) => {
//     const filtered = eventData.filter((eventName) =>
//       eventName.name.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredData(filtered);
//   };

//   const handleStartDateChange = (date) => {
//     setStartDate(date);
//     filterEvents(date, endDate);
//   };

//   const handleEndDateChange = (date) => {
//     setEndDate(date);
//     filterEvents(startDate, date);
//   };

//   const filterEvents = (start, end) => {
//     const filtered = eventData.filter((event) => {
//       const startDate = new Date(event.start_date);
//       const endDate = new Date(event.end_date);

//       if (start && end) {
//         return startDate >= start && endDate <= end;
//       } else if (start) {
//         return startDate >= start;
//       } else if (end) {
//         return endDate <= end;
//       }
//       return true;
//     });

//     setFilteredData(filtered);
//   };

//   const handleDeleteModal = (event) => {
//     console.log("handleDeleteModal안 event:", event);
//     setSelectedEvent(event);
//     setDeleteModalVisible(true);
//   };

//   const handleDelete = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/eventdetail/delete/${selectedEvent.id}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         // 삭제된 이벤트를 filteredData에서 제거
//         const updatedData = filteredData.filter((event) => event.id !== selectedEvent.id);
//         setFilteredData(updatedData);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setDeleteModalVisible(false);
//     }
//   };

//   return (
//     <>
//       <Search
//         placeholder="이름으로 검색"
//         onSearch={handleSearch}
//         style={{ width: 200, marginBottom: 16 }}
//       />
//       <Divider />
//       <Row gutter={16}>
//         <Col span={24} style={{ marginBottom: 16 }}>
//           <DatePicker.RangePicker
//             onChange={(dates) => {
//               if (dates && dates.length === 2) {
//                 handleStartDateChange(dates[0]);
//                 handleEndDateChange(dates[1]);
//               }
//             }}
//           />
//         </Col>
//         {filteredData.map((event) => (
//           <Col span={8} key={event.id}>
//             <Card
//               style={{ marginTop: 16 }}
//               actions={[
//                 <EyeOutlined key="show" />,
//                 <DeleteOutlined key="delete" onClick={() => handleDeleteModal(event.id)}/>,
//               ]}
//             >
//               {
//                 console.log(">>>>>>>... map ----------- event", event)
//               }
//                           {
//                 console.log(">>>>>>>... map ----------- event.id", event.id)
//               }
//               <Card.Meta
//                 title={<div style={{ textAlign: 'left' }}>{event.name}</div>}
//                 description={
//                   <>
//                     <p style={{ textAlign: 'left' }}>시작 일: {event.start_date}</p>
//                     <p style={{ textAlign: 'left' }}>마지막 일: {event.end_date}</p>
//                   </>
//                 }
//               />
//               <img
//                 style={{ width: '100%', marginTop: '16px' }}
//                 src={event.image}
//                 alt={event.name}
//               />
//             </Card>
//           </Col>
//         ))}
//       </Row>
//       <Link to="/event/eventadd">
//         <Button type="primary" icon={<PlusOutlined />}>
//           이벤트 작성
//         </Button>
//       </Link>
//       <Modal
//         title="이벤트 삭제"
//         visible={deleteModalVisible}
//         onOk={handleDelete}
//         onCancel={() => setDeleteModalVisible(false)}
//       >
//         <p>이벤트를 삭제하시겠습니까?</p>
//       </Modal>
//     </>
//   );
// }

// export default EventList

import React, { useState, useEffect } from 'react';
import { Card, Input, Divider, Row, Col, DatePicker, Button, Modal } from 'antd';
import { EyeOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Search } = Input;

function EventList() {
  const [eventData, setEventData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventData2, setEventData2] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const response = await fetch('http://localhost:8080/eventlist');
      const response = await fetch('http://43.202.9.215:8080/eventlist');
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

  const handleDeleteModal = (event) => {
    setSelectedEvent(event);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      // const response = await fetch(`http://localhost:8080/eventdetail/delete/${filteredData.id}`, {
        const response = await fetch(`http://43.202.9.215:8080/eventdetail/delete/${filteredData.id}`, {
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

  return (
    <>
      <Row gutter={12} align="middle">
        <Col span={12}>
          <Search
            placeholder="이름으로 검색"
            onSearch={handleSearch}
            style={{ height: 32 }}
          />
        </Col>
        <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link to="/event/eventadd">
            <Button type="primary" icon={<PlusOutlined />}>
              이벤트 작성
            </Button>
          </Link>
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
        {filteredData.map((event) => (
          <Col span={12} key={event.id}>
            <Card
              style={{ marginTop: 12, height: '100%' }}
              actions={[
                <EyeOutlined key="show" />,
                <DeleteOutlined key="delete" onClick={() => handleDeleteModal(event)} />,
              ]}
            >
              <Card.Meta
                title={<div style={{ textAlign: 'left' }}>{event.name}</div>}
                description={
                  <>
                    <p style={{ textAlign: 'left' }}>시작: {event.start_date}</p>
                    <p style={{ textAlign: 'left' }}>마지막: {event.end_date}</p>
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

export default EventList