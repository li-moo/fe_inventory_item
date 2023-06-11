// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './StoreOrdersDetail.module.css';
// import { logInState } from '../../state/loginState';
// import { useRecoilState } from 'recoil';
// import { Popconfirm, Button, Tabs } from 'antd';

// const { TabPane } = Tabs;

// function StoreOrdersDetail(props) {
//   const [storeOrdersDetailListData, setStoreOrdersDetailListData] = useState([]);
//   const [loginData, setLoginData] = useRecoilState(logInState);
//   const [groupedOrders, setGroupedOrders] = useState({});
//   const [selectedGroupId, setSelectedGroupId] = useState(0); // 초기 선택된 groupId 설정
//   const [showAllData, setShowAllData] = useState(true); // 전체 데이터 보기 상태 설정

//   useEffect(() => {
//     fetchStoreOrdersDetailListData();
//   }, [props.selectedId]);

//   const orders_date = props.selectedId;
//   const url_be_detail_list = `http://localhost:8080/orders/store-orders-detail-list`;
//   const getFeData = { store_id: loginData.store_id, orders_date: orders_date };

//   const fetchStoreOrdersDetailListData = () => {
//     const requestData = {
//       storeId: loginData.store_id,
//       orderDate: orders_date,
//     };

//     axios
//       .get(url_be_detail_list, {
//         params: requestData,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//       .then((res) => {
//         console.log("# Store fetch-list 받은 데이터 res.data>>>", res.data);
//         setStoreOrdersDetailListData(res.data);
//         // Group ==> orders_type_id -> 1: 일반, 2: 자동, 3:이벤트
//         const groupedData = res.data.reduce((result, item) => {
//           if (!result[item.orders_type_id]) {
//             result[item.orders_type_id] = [];
//           }
//           result[item.orders_type_id].push(item);
//           return result;
//         }, {});

//         setGroupedOrders(groupedData);
//       })
//       .catch((err) => console.log("storeOrdersDetail/err", err));
//   };

//   const updateQnt = (tarId, tarQnt) => {
//     const url_be_updateQnt = "http://localhost:8080/orders/update-orders";

//     axios(url_be_updateQnt, {
//       method: 'PUT',
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Content-Type': 'application/json',
//         withCredentials: true,
//         mode: 'no-cors',
//       },
//       data: {
//         id: tarId,
//         qnt: tarQnt,
//         delivery_id: 1,
//       },
//     }).catch(function (error) {
//       if (error.response) {
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//       }
//     });
//   };

//   const deleteOrder = (id) => {
//     const url_be_deleteOrder = `http://localhost:8080/orders/orderdetail/delete/${id}`;

//     axios(url_be_deleteOrder, {
//       method: 'DELETE',
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Content-Type': 'application/json',
//         withCredentials: true,
//         mode: 'no-cors',
//       },
//       data: {
//         id: id,
//       },
//     })
//       .then(() => {
//         fetchStoreOrdersDetailListData();
//       })
//       .catch(function (error) {
//         console.log("error-> StoreOrdersDetail:", error);
//       });
//   };

//   const handleGroupButtonClick = (groupId) => {
//     setSelectedGroupId(groupId);
//   };

//   const handleShowAllData = () => {
//     setShowAllData(true);
//     setSelectedGroupId(0);
//   };

//   const handleShowGroupData = (groupId) => {
//     setShowAllData(false);
//     setSelectedGroupId(groupId);
//   };

//   return (
//     <div>
//       <div style={{ overflowX: 'auto', maxHeight: '490px' }}>
//         <Tabs activeKey={showAllData ? 'all' : selectedGroupId.toString()} onChange={handleShowGroupData}>
//           <TabPane tab={`전체 (${storeOrdersDetailListData.length})`} key="all">
//             <table className={styles.table}>
//               <thead>
//                 <tr>
//                   <th>SKU</th>
//                   <th>상품이름</th>
//                   <th>발주수량</th>
//                   <th></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {storeOrdersDetailListData.map((item) => (
//                   <tr key={item.id}>
//                     <td>{item.product_code}</td>
//                     <td>({item.product_info_brand}){item.product_name}</td>
//                     <td>{item.qnt}</td>
//                     <td></td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </TabPane>
//           {Object.entries(groupedOrders).map(([groupId, orders]) => (
//             <TabPane
//               key={groupId}
//               tab={
//                 groupId == 1 ? `일반 (${orders.length})` :
//                 groupId == 2 ? `자동 (${orders.length})` :
//                 groupId == 3 ? `이벤트/날씨 (${orders.length})` : ''
//               }
//             >
//               <table className={styles.table}>
//                 <thead>
//                   <tr>
//                     <th>SKU</th>
//                     <th>상품이름</th>
//                     <th>발주수량</th>
//                     <th></th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orders.map((item) => (
//                     <tr key={item.id}>
//                       <td>{item.product_code}</td>
//                       <td>({item.product_info_brand}){item.product_name}</td>
//                       <td>
//                         {item.orders_status === "배송준비중" ? (
//                           <input
//                             type="number"
//                             value={item.qnt}
//                             style={{ width: '60px' }}
//                             className={styles.roundedInput}
//                             onChange={(e) => {
//                               const newQuantity = parseInt(e.target.value) || item.qnt - 1;
//                               if (!isNaN(newQuantity) && newQuantity > 0) {
//                                 const updatedOrders = groupedOrders[selectedGroupId].map((order) => {
//                                   if (order.id === item.id) {
//                                     return { ...order, qnt: newQuantity };
//                                   }
//                                   return order;
//                                 });

//                                 setGroupedOrders({
//                                   ...groupedOrders,
//                                   [selectedGroupId]: updatedOrders,
//                                 });
//                               }
//                               const tarId = item.id;
//                               const tarQnt = newQuantity;
//                               updateQnt(tarId, tarQnt);
//                             }}
//                           />

//                         ) : (
//                           item.qnt
//                         )}
//                       </td>
//                       {item.orders_status === "배송준비중" ? (
//                         <td>
//                           <Popconfirm
//                             title="발주내역을 삭제 하시겠습니까?"
//                             onConfirm={() => deleteOrder(item.id)}
//                             okText="네"
//                             cancelText="아니오"
//                           >
//                             <Button style={{ position: 'static', zIndex: 1 }}>삭제</Button>
//                           </Popconfirm>
//                         </td>
//                       ) : (
//                         ''
//                       )}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </TabPane>
//           ))}
//         </Tabs>
//       </div>
//     </div>
//   );
// }

// export default StoreOrdersDetail;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './StoreOrdersDetail.module.css';
import { logInState } from '../../state/loginState';
import { useRecoilState } from 'recoil';
import { Popconfirm, Button, Tabs } from 'antd';

const { TabPane } = Tabs;

function StoreOrdersDetail(props) {
  const [storeOrdersDetailListData, setStoreOrdersDetailListData] = useState([]);
  const [loginData, setLoginData] = useRecoilState(logInState);
  const [groupedOrders, setGroupedOrders] = useState({});
  const [selectedGroupId, setSelectedGroupId] = useState(0); // 초기 선택된 groupId 설정
  const [showAllData, setShowAllData] = useState(true); // 전체 데이터 보기 상태 설정

  useEffect(() => {
    fetchStoreOrdersDetailListData();
  }, [props.selectedId]);

  const orders_date = props.selectedId;
  const url_be_detail_list = `http://localhost:8080/orders/store-orders-detail-list`;
  const getFeData = { store_id: loginData.store_id, orders_date: orders_date };

  const fetchStoreOrdersDetailListData = () => {
    const requestData = {
      storeId: loginData.store_id,
      orderDate: orders_date,
    };

    axios
      .get(url_be_detail_list, {
        params: requestData,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log("# Store fetch-list 받은 데이터 res.data>>>", res.data);
        setStoreOrdersDetailListData(res.data);
        // Group ==> orders_type_id -> 1: 일반, 2: 자동, 3:이벤트
        const groupedData = res.data.reduce((result, item) => {
          if (!result[item.orders_type_id]) {
            result[item.orders_type_id] = [];
          }
          result[item.orders_type_id].push(item);
          return result;
        }, {});

        setGroupedOrders(groupedData);
      })
      .catch((err) => console.log("storeOrdersDetail/err", err));
  };

  const updateQnt = (tarId, tarQnt) => {
    const url_be_updateQnt = "http://localhost:8080/orders/update-orders";

    axios(url_be_updateQnt, {
      method: 'PUT',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        withCredentials: true,
        mode: 'no-cors',
      },
      data: {
        id: tarId,
        qnt: tarQnt,
        delivery_id: 1,
      },
    }).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
  };

  const deleteOrder = (id) => {
    const url_be_deleteOrder = `http://localhost:8080/orders/orderdetail/delete/${id}`;

    axios(url_be_deleteOrder, {
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        withCredentials: true,
        mode: 'no-cors',
      },
      data: {
        id: id,
      },
    })
      .then(() => {
        fetchStoreOrdersDetailListData();
      })
      .catch(function (error) {
        console.log("error-> StoreOrdersDetail:", error);
      });
  };

  const handleGroupButtonClick = (groupId) => {
    setSelectedGroupId(groupId);
  };

  const handleShowAllData = () => {
    setShowAllData(true);
    setSelectedGroupId(0);
  };

  const handleShowGroupData = (groupId) => {
    setShowAllData(false);
    setSelectedGroupId(groupId);
  };

  const handleQuantityChange = (e, itemId) => {
    const newQuantity = parseInt(e.target.value) || 0;
    const updatedOrders = storeOrdersDetailListData.map((order) => {
      if (order.id === itemId) {
        return { ...order, qnt: newQuantity };
      }
      return order;
    });
    setStoreOrdersDetailListData(updatedOrders);
    const tarId = itemId;
    const tarQnt = newQuantity;
    updateQnt(tarId, tarQnt);
  };

  const handleDeleteOrder = (itemId) => {
    const url_be_deleteOrder = `http://localhost:8080/orders/orderdetail/delete/${itemId}`;

    axios(url_be_deleteOrder, {
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        withCredentials: true,
        mode: 'no-cors',
      },
      data: {
        id: itemId,
      },
    })
      .then(() => {
        const updatedOrders = storeOrdersDetailListData.filter((order) => order.id !== itemId);
        setStoreOrdersDetailListData(updatedOrders);
      })
      .catch(function (error) {
        console.log("error-> StoreOrdersDetail:", error);
      });
  };

  return (
    <div>
      <div style={{ overflowX: 'auto', maxHeight: '490px' }}>
        <Tabs activeKey={showAllData ? 'all' : selectedGroupId.toString()} onChange={handleShowGroupData}>
          <TabPane tab={`전체 (${storeOrdersDetailListData.length})`} key="all">
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>상품이름</th>
                  <th>발주수량</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {storeOrdersDetailListData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product_code}</td>
                    <td>({item.product_info_brand}){item.product_name}</td>
                    <td>
                      {item.orders_status === "배송준비중" ? (
                        <input
                          type="number"
                          value={item.qnt}
                          style={{ width: '60px' }}
                          className={styles.roundedInput}
                          onChange={(e) => handleQuantityChange(e, item.id)}
                        />
                      ) : (
                        item.qnt
                      )}
                    </td>
                    {item.orders_status === "배송준비중" ? (
                      <td>
                        <Popconfirm
                          title="발주내역을 삭제 하시겠습니까?"
                          onConfirm={() => handleDeleteOrder(item.id)}
                          okText="네"
                          cancelText="아니오"
                        >
                          <Button size="small" danger>
                            삭제
                          </Button>
                        </Popconfirm>
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </TabPane>
          {Object.entries(groupedOrders).map(([groupId, orders]) => (
            <TabPane
              key={groupId}
              tab={`${groupId === '1' ? '일반' : groupId === '2' ? '자동' : '날씨/이벤트'} (${orders.length})`}
            >
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>상품이름</th>
                    <th>발주수량</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((item) => (
                    <tr key={item.id}>
                      <td>{item.product_code}</td>
                      <td>({item.product_info_brand}){item.product_name}</td>
                      <td>
                        {item.orders_status === "배송준비중" ? (
                          <input
                            type="number"
                            value={item.qnt}
                            style={{ width: '60px' }}
                            className={styles.roundedInput}
                            onChange={(e) => handleQuantityChange(e, item.id)}
                          />
                        ) : (
                          item.qnt
                        )}
                      </td>
                      {item.orders_status === "배송준비중" ? (
                        <td>
                          <Popconfirm
                            title="발주내역을 삭제 하시겠습니까?"
                            onConfirm={() => handleDeleteOrder(item.id)}
                            okText="네"
                            cancelText="아니오"
                          >
                            <Button size="small" danger>
                              삭제
                            </Button>
                          </Popconfirm>
                        </td>
                      ) : (
                        <td></td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default StoreOrdersDetail;
