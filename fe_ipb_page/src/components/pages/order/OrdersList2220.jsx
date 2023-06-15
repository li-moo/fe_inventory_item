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
//       {/* <Divider /> */}
//       <Row>
//         <Col sm={4} className="bg-gray-300">
//           <div style={{ overflowX: 'auto', maxHeight: '490px' }}>
//           <table className={styles.table}>
//             <thead>
//               <tr>
//                 <th>No.</th>
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
//           </div>
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



// import React, { useEffect, useState } from 'react';
// import { Divider, Input, Pagination } from 'antd';
// import { Row, Col } from 'react-bootstrap';
// import axios from 'axios';
// import { logInState } from '../../state/loginState';
// import { useRecoilState } from 'recoil';
// import styles from './OrdersList2220.module.css';
// import StoreOrdersDetail2220 from './StoreOrdersDetail2220';

// const { Search } = Input;

// function OrdersList2220() {
//   const [loginData, setLoginData] = useRecoilState(logInState);
//   const [storeOrdersDetailData, setStoreOrdersDetailData] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const [ordersStatus, setOrdersStatus] = useState(null);
//   const [isAddOr, setIsAddOr] = useState(false);
//   const [searchValue, setSearchValue] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 10; // Number of items to display per page

//   const handleRowClick = (id, ordersStatus) => {
//     setSelectedId(id);
//     setOrdersStatus(ordersStatus);
//   };

//   useEffect(() => {
//     fetchStoreOrdersDetailData();
//   }, [isAddOr, setIsAddOr]);

//   console.log("fetch 받은 데이터 logInData.store_id>>>", loginData.store_id);

//   const url_be = `${process.env.REACT_APP_BE_API}/orders/store-orders-date/${loginData.store_id}`;

//   const fetchStoreOrdersDetailData = () => {
//     axios(url_be, {
//       method: 'get',
//     })
//       .then((res) => {
//         setStoreOrdersDetailData(res.data);
//       })
//       .catch((err) => console.log("storeexp/err", err));
//   };

//   const url_be_detail_list = `${process.env.REACT_APP_BE_API}/orders/store-orders-detail-list`;
//   //const url_be_detail_list = `http://localhost:8080/orders/store-orders-detail-list?store_id=${loginData.store_id}&orders_date=${storeOrdersDetailData.orders_date}`;

//   const handleSearch = (value) => {
//     setSearchValue(value);
//     setCurrentPage(1); // Reset the current page when searching
//   };

//   const filteredOrders = storeOrdersDetailData.filter((item) =>
//     item.orders_date.includes(searchValue)
//   );

//   // Pagination
//   const indexOfLastOrder = currentPage * pageSize;
//   const indexOfFirstOrder = indexOfLastOrder - pageSize;
//   const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <>
//       <h4 >발주내역</h4>
//       <div style={{ borderBottom: '4px solid #CCCCCC', width: '180px', paddingTop: '2px' }}></div>
//       <div className={styles.layout}>
//         <div>
//           <Search
//             placeholder="검색"
//             onSearch={handleSearch}
//             style={{ width: 200, marginBottom: 16, paddingTop: '5px' }}
//           />
//           <div style={{ overflowX: 'auto', maxHeight: '469px'}}>
//             <table className={styles.table}>
//               <thead>
//                 <tr>
//                   <th>No.</th>
//                   <th>발주내역</th>
//                   <th>배송상태</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentOrders.map((item, index) => (
//                   <tr
//                     key={item.id}
//                     onClick={() => handleRowClick(item.orders_date, item.orders_status)}
//                   >
//                     <td>{index + 1 + (currentPage - 1) * pageSize}</td>
//                     <td>{item.orders_date} 발주내역</td>
//                     <td>{item.orders_status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <Pagination
//             current={currentPage}
//             pageSize={pageSize}
//             total={filteredOrders.length}
//             onChange={handlePageChange}
//             style={{ marginTop: 16, textAlign: 'center' }}
//           />
//         </div>
//         <div>
//           {selectedId && (
//             <StoreOrdersDetail2220 selectedId={selectedId} ordersStatus={ordersStatus} />
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default OrdersList2220;



import React, { useEffect, useState } from 'react';
import { Divider, Input, Pagination, DatePicker } from 'antd';
import axios from 'axios';
import { logInState } from '../../state/loginState';
import { useRecoilState } from 'recoil';
import styles from './OrdersList2220.module.css';
import StoreOrdersDetail2220 from './StoreOrdersDetail2220';

function OrdersList2220() {
  const [loginData, setLoginData] = useRecoilState(logInState);
  const [storeOrdersDetailData, setStoreOrdersDetailData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [ordersStatus, setOrdersStatus] = useState(null);
  const [isAddOr, setIsAddOr] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items to display per page

  const handleRowClick = (id, ordersStatus) => {
    setSelectedId(id);
    setOrdersStatus(ordersStatus);
  };

  useEffect(() => {
    fetchStoreOrdersDetailData();
  }, [isAddOr, setIsAddOr]);

  console.log("fetch 받은 데이터 logInData.store_id>>>", loginData.store_id);

  const url_be = `${process.env.REACT_APP_BE_API}/orders/store-orders-date/${loginData.store_id}`;

  const fetchStoreOrdersDetailData = () => {
    axios(url_be, {
      method: 'get',
    })
      .then((res) => {
        setStoreOrdersDetailData(res.data);
      })
      .catch((err) => console.log("storeexp/err", err));
  };

  const url_be_detail_list = `${process.env.REACT_APP_BE_API}/orders/store-orders-detail-list`;
  //const url_be_detail_list = `http://localhost:8080/orders/store-orders-detail-list?store_id=${loginData.store_id}&orders_date=${storeOrdersDetailData.orders_date}`;

  const handleSearch = (date) => {
    if (date) {
      const searchValue = date.format('YYYY-MM-DD'); // 선택된 날짜의 문자열 형식을 가져옵니다.
      setSearchValue(searchValue);
      setCurrentPage(1); // 검색 시 현재 페이지를 초기화합니다.
    }
  };

  const filteredOrders = storeOrdersDetailData.filter((item) =>
    item.orders_date.includes(searchValue)
  );

  // Pagination
  const indexOfLastOrder = currentPage * pageSize;
  const indexOfFirstOrder = indexOfLastOrder - pageSize;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <h4 style={{marginLeft: '0px'}}>발주내역</h4>
      <div style={{ borderBottom: '4px solid #817D7D', width: '200px', paddingTop: '2px', marginLeft: '0px'  }}></div>
      <div className={styles.layout}>
        <div>
          <DatePicker
            placeholder="날짜 선택"
            onChange={handleSearch}
            style={{ width: '100%x', marginBottom: 7.3, marginTop: '5px' }}
          />
          <div style={{ overflowX: 'auto', maxHeight: '469px'}}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>발주내역</th>
                  <th>배송상태</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((item, index) => (
                  <tr
                    key={item.id}
                    onClick={() => handleRowClick(item.orders_date, item.orders_status)}
                  >
                    <td>{index + 1 + (currentPage - 1) * pageSize}</td>
                    <td>{item.orders_date} 발주내역</td>
                    <td>{item.orders_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredOrders.length}
            onChange={handlePageChange}
            style={{ marginTop: 16, textAlign: 'center' }}
          />
        </div>
        <div>
          {selectedId && (
            <StoreOrdersDetail2220 selectedId={selectedId} ordersStatus={ordersStatus} />
          )}
        </div>
      </div>
    </>
  );
}

export default OrdersList2220;