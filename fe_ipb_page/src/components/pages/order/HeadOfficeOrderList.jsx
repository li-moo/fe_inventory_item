// import React, { useEffect, useState } from 'react';
// import { Divider } from "antd";
// import { Row, Col } from 'react-bootstrap';
// import axios from 'axios';
// import { logInState } from '../../state/loginState';
// import { useRecoilState } from 'recoil';
// import styles from './OrdersList.module.css';
// import StoreOrdersDetail from './StoreOrdersDetail';

// function OrdersList() {

//   const [loginData, setLoginData] = useRecoilState(logInState);
//   const [storeOrdersDetailData, setStoreOrdersDetailData] = useState([]);
//   // const [storeOrdersDetailListData, setStoreOrdersDetailListData] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const [ordersStatus, setOrdersStatus] = useState(null);
//   const [isAddOr, setIsAddOr] = useState(false);

//   const handleRowClick = (id, ordersStatus) => {
//     setSelectedId(id);
//     setOrdersStatus(ordersStatus);
//     // fetchStoreOrdersDetailListData(ordersDate);
//     console.log("------> ordersDate : ", id);
//     console.log("------> ordersDate : ", id);
//   };

//   useEffect(() => {

//     fetchStoreOrdersDetailData();
//     // fetchStoreOrdersDetailListData();
//   }, [isAddOr, setIsAddOr]);

//   console.log("fetch 받은 데이터 logInData.store_id>>>", loginData.store_id);

//   // const url_be = `http://localhost:8080/orders/select-store-orders/${loginData.store_id}`;
//   // const url_be = `http://localhost:8080/orders/select-store-orders/${loginData.store_id}`;
//   const url_be = `http://localhost:8080/orders/store-orders-date/${loginData.store_id}`;

//   const fetchStoreOrdersDetailData = () => {
//     axios(url_be, {
//       method: 'get'
//     })
//       .then((res) => {
//         console.log("> fetchStoreOrdersDetailData > fetch 받은 데이터 res.data>>>", res.data);
//         setStoreOrdersDetailData(res.data);
//       })
//       .catch((err) => console.log("storeexp/err", err))
//   }

//   const url_be_detail_list = `http://localhost:8080/orders/store-orders-detail-list`;
//   //const url_be_detail_list = `http://localhost:8080/orders/store-orders-detail-list?store_id=${loginData.store_id}&orders_date=${storeOrdersDetailData.orders_date}`;

//   // const fetchStoreOrdersDetailListData = () => {
//   //   axios(url_be_detail_list, {
//   //     method: 'get',
//   //     // data: {
//   //     //   store_id: loginData.store_id,
//   //     //   orders_date: storeOrdersDetailData.orders_date
//   //     // }
//   //     params: {
//   //       store_id: loginData.store_id,
//   //       orders_date: storeOrdersDetailData.orders_date,
//   //     },
//   //   })
//   //     .then((res) => {
//   //       // console.log("fetch-list 받은 데이터 res.data>>>", res.data);
//   //       // setStoreOrdersDetailListData(res.data);

//   //     })
//   //     .catch((err) => console.log("storeexp/err", err))
//   // }


//   return (
//     <>
//       <h4>발주내역</h4>
//       <Divider />
//       <Row>
//         <Col sm={4} className="bg-gray-300">
//           <table className={styles.table}>
//             <thead>
//               <tr>
//                 <th>NUM</th>
//                 <th>발주내역</th>
//                 <th>배송상태</th>
//               </tr>
//             </thead>
//             <tbody>
//               {storeOrdersDetailData.map((item) => (
//                 // <tr key={item.id}>
//                 // <tr key={item.id} onClick={() => handleRowClick(item.id || item.orders_date)}>
//                 <tr key={item.id} onClick={() => handleRowClick(item.orders_date, item.orders_status)}>
//                   <td>{item.id}</td>
//                   <td>{item.orders_date} 발주내역</td>
//                   {/* <td>{new Date(item.orders_date).toISOString().split('T')[0]}일자 발주내역</td> */}
//                   {/* <td>{item.delivery_id} */}
//                   {/* <td>
//                     {item.delivery_id === 1 && '배송준비중'}
//                     {item.delivery_id === 2 && '배송중'}
//                     {item.delivery_id === 3 && '배송완료'}
//                     {item.delivery_id === 4 && '주문취소'}
//                   </td> */}
//                   <td>{item.orders_status}</td>
//                 </tr>

//               ))}
//             </tbody>
//           </table>

//         </Col>
//         <Col sm={8} className="bg-gray-600">
//           {selectedId && (
//             <>
//             <StoreOrdersDetail
//               selectedId={selectedId} //ordersDate
//               ordersStatus={ordersStatus}
//             />
//               {/* <div>선택된 ID: {selectedId}</div> */}
//               </>
//           )}
//         </Col>
//       </Row >
//     </>
//   );
// }

// export default OrdersList;

import React, { useEffect, useState } from 'react';
import { Divider } from "antd";
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { logInState } from '../../state/loginState';
import { useRecoilState } from 'recoil';
import styles from './OrdersList.module.css';
import StoreOrdersDetail from './StoreOrdersDetail';

function HeadOfficeOrdersList() {

  const [loginData, setLoginData] = useRecoilState(logInState);
  const [storeOrdersDetailData, setStoreOrdersDetailData] = useState([]);
  // const [storeOrdersDetailListData, setStoreOrdersDetailListData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [ordersStatus, setOrdersStatus] = useState(null);
  const [isAddOr, setIsAddOr] = useState(false);

  const handleRowClick = (id, ordersStatus) => {
    setSelectedId(id);
    setOrdersStatus(ordersStatus);
    // fetchStoreOrdersDetailListData(ordersDate);
    console.log("------> ordersDate : ", id);
    console.log("------> ordersDate : ", id);
  };

  useEffect(() => {

    fetchStoreOrdersDetailData();
    // fetchStoreOrdersDetailListData();
  }, [isAddOr, setIsAddOr]);

  console.log("fetch 받은 데이터 logInData.store_id>>>", loginData.store_id);

  // const url_be = `http://localhost:8080/orders/select-store-orders/${loginData.store_id}`;
  // const url_be = `http://localhost:8080/orders/select-store-orders/${loginData.store_id}`;
  const url_be = `http://localhost:8080/orders/all`;

  const fetchStoreOrdersDetailData = () => {
    axios(url_be, {
      method: 'get'
    })
      .then((res) => {
        console.log("> fetchStoreOrdersDetailData > fetch 받은 데이터 res.data>>>", res.data);
        setStoreOrdersDetailData(res.data);
      })
      .catch((err) => console.log("storeexp/err", err))
  }

  const url_be_detail_list = `http://localhost:8080/orders/store-orders-detail-list`;
  //const url_be_detail_list = `http://localhost:8080/orders/store-orders-detail-list?store_id=${loginData.store_id}&orders_date=${storeOrdersDetailData.orders_date}`;

  // const fetchStoreOrdersDetailListData = () => {
  //   axios(url_be_detail_list, {
  //     method: 'get',
  //     // data: {
  //     //   store_id: loginData.store_id,
  //     //   orders_date: storeOrdersDetailData.orders_date
  //     // }
  //     params: {
  //       store_id: loginData.store_id,
  //       orders_date: storeOrdersDetailData.orders_date,
  //     },
  //   })
  //     .then((res) => {
  //       // console.log("fetch-list 받은 데이터 res.data>>>", res.data);
  //       // setStoreOrdersDetailListData(res.data);

  //     })
  //     .catch((err) => console.log("storeexp/err", err))
  // }


  return (
    <>
      <h4>발주내역</h4>
      <Divider />
      <Row>
        <Col sm={4} className="bg-gray-300">
          <table className={styles.table}>
            <thead>
              <tr>
                <th>NUM</th>
                <th>발주내역</th>
                <th>배송상태</th>
              </tr>
            </thead>
            <tbody>
              {storeOrdersDetailData.map((item) => (
                // <tr key={item.id}>
                // <tr key={item.id} onClick={() => handleRowClick(item.id || item.orders_date)}>
                <tr key={item.id} onClick={() => handleRowClick(item.orders_date, item.orders_status)}>
                  <td>{item.id}</td>
                  <td>{item.orders_date} 발주내역</td>
                  {/* <td>{new Date(item.orders_date).toISOString().split('T')[0]}일자 발주내역</td> */}
                  {/* <td>{item.delivery_id} */}
                  {/* <td>
                    {item.delivery_id === 1 && '배송준비중'}
                    {item.delivery_id === 2 && '배송중'}
                    {item.delivery_id === 3 && '배송완료'}
                    {item.delivery_id === 4 && '주문취소'}
                  </td> */}
                  <td>{item.orders_status}</td>
                </tr>

              ))}
            </tbody>
          </table>

        </Col>
        <Col sm={8} className="bg-gray-600">
          {selectedId && (
            <>
            <StoreOrdersDetail
              selectedId={selectedId} //ordersDate
              ordersStatus={ordersStatus}
            />
              {/* <div>선택된 ID: {selectedId}</div> */}
              </>
          )}
        </Col>
      </Row >
    </>
  );
}

export default HeadOfficeOrdersList;

// import React, { useState } from 'react';
// import { Divider, Input, Button, Timeline, Table, Card, Modal, DatePicker } from "antd";
// import { Link } from "react-router-dom";
// import { AiOutlineShoppingCart } from 'react-icons/ai'; // Replace 'AiOutlineShoppingCart' with the desired icon from react-icons


// function HeadOfficeOrderList() {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedTrackingNumber, setSelectedTrackingNumber] = useState(null);
//   const [selectedDates, setSelectedDates] = useState([]);

  
// const { RangePicker } = DatePicker;

// const handleSearchButtonClick = () => {
//     // 검색 로직을 여기에 추가하세요
//     console.log("검색 버튼이 클릭되었습니다.");
//   };

//   const columns = [
//     {
//       title: '상품명',
//       dataIndex: 'productName',
//       key: 'productName',
//       render: (text, record) => (
//         <div>
//           <span style={{ marginRight: '8px' }}>{record.icon}</span>
//           {text}
//         </div>
//       ),
//     },
//     {
//       title: '수량',
//       dataIndex: 'quantity',
//       key: 'quantity',
      

//     },
//     {
//       title: '가격',
//       dataIndex: 'price',
//       key: 'price',
//     },
//     {
//       title: '운송장번호',
//       dataIndex: 'trackingNumber',
//       key: 'trackingNumber',
//       render: (trackingNumber) => (
//         <Button type="primary" onClick={() => handleDeliverySearch(trackingNumber)}>
//           배송조회
//         </Button>
//       ),
//     },
//   ];

//   const data = [
//     {
//       key: '1',
//       productName: '상품 1',
//       quantity: 2,
//       price: 100,
//       trackingNumber: '1234567890',
//       icon: <AiOutlineShoppingCart />, // 장바구니 아이콘 
//     },
//     {
//       key: '2',
//       productName: '상품 2',
//       quantity: 1,
//       price: 50,
//       trackingNumber: '0987654321',
//       icon: <AiOutlineShoppingCart />, // 장바구니 아이콘 
//     },
//     {
//       key: '3',
//       productName: '상품 3',
//       quantity: 3,
//       price: 200,
//       trackingNumber: '5432167890',
//       icon: <AiOutlineShoppingCart />, // 장바구니 아이콘 
//     },
//     {
//         key: '4',
//         productName: '상품 4',
//         quantity: 2,
//         price: 100,
//         trackingNumber: 'D323112390',
//         icon: <AiOutlineShoppingCart />, // 장바구니 아이콘 
//       },
//       {
//         key: '4',
//         productName: '상품 4',
//         quantity: 2,
//         price: 100,
//         trackingNumber: 'D3231423',
//         icon: <AiOutlineShoppingCart />, // 장바구니 아이콘 
//       },
//       {
//         key: '5',
//         productName: '상품 12',
//         quantity: 2,
//         price: 100,
//         trackingNumber: 'D323310',
//         icon: <AiOutlineShoppingCart />, // 장바구니 아이콘 
//       },
//       {
//         key: '6',
//         productName: '상품 3',
//         quantity: 2,
//         price: 100,
//         trackingNumber: 'D323890',
//         icon: <AiOutlineShoppingCart />, // 장바구니 아이콘 
//       },
//       {
//         key: '7',
//         productName: '상품 8',
//         quantity: 2,
//         price: 100,
//         trackingNumber: 'D327890',
//         icon: <AiOutlineShoppingCart />, // 장바구니 아이콘 
//       },

//   ];

//   const handleDeliverySearch = (trackingNumber) => {
//     setModalVisible(true);
//     setSelectedTrackingNumber(trackingNumber);
//   };

//   const handleModalClose = () => {
//     setModalVisible(false);
//     setSelectedTrackingNumber(null);
//   };

//   const handleDateChange = (dates) => {
//     setSelectedDates(dates);
//     // 시작일과 종료일에 대한 처리
//     const [startDate, endDate] = dates;
//     console.log(startDate, endDate);
//   };

//   const handleSearch = (range) => {
//     const today = new Date();
//     let startDate, endDate;
  
//     switch (range) {
//       case 'today':
//         startDate = today;
//         endDate = today;
//         break;
//       case '1w':
//         startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
//         endDate = today;
//         break;
//       case '1m':
//         startDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
//         endDate = today;
//         break;
//       case '3m':
//         startDate = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
//         endDate = today;
//         break;
//       case '6m':
//         startDate = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());
//         endDate = today;
//         break;
//       case '1y':
//         startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
//         endDate = today;
//         break;
//       default:
//         break;
//     }
  
//     setSelectedDates([startDate, endDate]);
//     console.log(startDate, endDate);
//   };

//   return (
//     <>
//       <h2>전체 배송 조회 리스트</h2>
//       <Divider />

//       <Card title="배송 상품 목록">
//         <div style={{ display: 'flex', marginBottom: '16px' }}>
//           <RangePicker onChange={handleDateChange} /> {/* handleDateChange 함수를 정의하지 않았습니다 */}
//           <Button type="primary" style={{ marginLeft: '8px' }} onClick={handleSearchButtonClick}>
//         검색
//       </Button>
//           <Button type="primary" style={{ marginLeft: '8px' }} onClick={() => handleSearch('today')}>
//             오늘
//           </Button>
//           <Button type="primary" style={{ marginLeft: '8px' }} onClick={() => handleSearch('1w')}>
//             1주일
//           </Button>
//           <Button type="primary" style={{ marginLeft: '8px' }} onClick={() => handleSearch('1m')}>
//             1개월
//           </Button>
//           <Button type="primary" style={{ marginLeft: '8px' }} onClick={() => handleSearch('3m')}>
//             3개월
//           </Button>
//           <Button type="primary" style={{ marginLeft: '8px' }} onClick={() => handleSearch('6m')}>
//             6개월
//             </Button>
//     </div>
//             <Table columns={columns} dataSource={data} />
//           </Card>
    
//           <Modal
//             title="배송 조회"
//             visible={modalVisible}
//             onCancel={handleModalClose}
//             footer={null}
//           >
//             <p>운송장번호: {selectedTrackingNumber}</p>
//             <Timeline>
//               {/* 배송 조회 로직 추가 */}
//               <Timeline.Item>단계 1</Timeline.Item>
//               <Timeline.Item>단계 2</Timeline.Item>
//               <Timeline.Item>단계 3</Timeline.Item>
//             </Timeline>
//           </Modal>
//         </>
//       );
//     }
    
//     export default HeadOfficeOrderList;