import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './StoreOrdersDetail2220.module.css';
import { logInState } from '../../state/loginState';
import { useRecoilState } from 'recoil';
import { Popconfirm, Button, Menu } from 'antd';
import { CiTrash } from "react-icons/ci";

function StoreOrdersDetail2220(props) {
  const [storeOrdersDetailListData, setStoreOrdersDetailListData] = useState([]);
  const [loginData, setLoginData] = useRecoilState(logInState);
  const [groupedOrders, setGroupedOrders] = useState({});
  const [selectedGroupId, setSelectedGroupId] = useState(0); // 초기 선택된 groupId 설정
  const [showAllData, setShowAllData] = useState(true); // 전체 데이터 보기 상태 설정

  useEffect(() => {
    fetchStoreOrdersDetailListData();
  }, [props.selectedId]);

  const orders_date = props.selectedId;
  const url_be_detail_list = `${process.env.REACT_APP_BE_API}/orders/store-orders-detail-list`;
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
      .catch((err) => {

      });
  };

  const updateQnt = (tarId, tarQnt) => {
    const url_be_updateQnt = `${process.env.REACT_APP_BE_API}/orders/update-orders`;

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

      }
    });
  };

  const deleteOrder = (id) => {
    const url_be_deleteOrder = `${process.env.REACT_APP_BE_API}/orders/orderdetail/delete/${id}`;

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
      .catch((err) => {
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

  return (
    <div className={styles.container}>
      <div style={{ width: '100%', margin: '0px', padding: '0px' }}>
        <div className={styles.tabContainer}>
          <Menu mode="horizontal" selectedKeys={[showAllData ? 'all' : selectedGroupId.toString()]}>
            <Menu.Item key="all" onClick={handleShowAllData}>
              전체 ({storeOrdersDetailListData.length})
            </Menu.Item>
            <Menu.Item key="1" onClick={() => handleShowGroupData(1)}>
              일반 ({groupedOrders[1]?.length || 0})
            </Menu.Item>
            <Menu.Item key="2" onClick={() => handleShowGroupData(2)}>
              자동 ({groupedOrders[2]?.length || 0})
            </Menu.Item>
            <Menu.Item key="3" onClick={() => handleShowGroupData(3)}>
              이벤트/날씨 ({groupedOrders[3]?.length || 0})
            </Menu.Item>
          </Menu>
        </div>
        <div style={{ overflowX: 'auto', maxHeight: '465px', margin: '0px', padding: '0px' }}>
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
              {(showAllData
                ? Object.values(groupedOrders).flat()
                : groupedOrders[selectedGroupId] || [])?.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product_code}</td>
                    <td>[{item.product_info_brand}]{item.product_name}</td>
                    <td>
                      {item.orders_status === "배송준비중" ? (
                        <input
                          type="number"
                          value={item.qnt}
                          style={{ width: '60px' }}
                          className={styles.roundedInput}
                          onChange={(e) => {
                            const newQuantity = parseInt(e.target.value) || item.qnt - 1;
                            if (!isNaN(newQuantity) && newQuantity >= 0) {
                              const updatedOrders = Object.keys(groupedOrders).reduce((result, key) => {
                                const updatedGroup = groupedOrders[key].map((order) => {
                                  if (order.id === item.id) {
                                    return { ...order, qnt: newQuantity };
                                  }
                                  return order;
                                });
                                result[key] = updatedGroup;
                                return result;
                              }, {});

                              setGroupedOrders(updatedOrders);
                            }
                            const tarId = item.id;
                            const tarQnt = newQuantity;
                            const status = item.orders_status;
                            updateQnt(tarId, tarQnt, status);
                          }}
                        />
                      ) : (
                        item.qnt
                      )}
                    </td>
                    {item.orders_status === "배송준비중" ? (
                      <td>
                        <Popconfirm
                          title="발주내역을 삭제 하시겠습니까?"
                          onConfirm={() => deleteOrder(item.id)}
                          okText="네"
                          cancelText="아니오"
                        >
                          <Button danger style={{ position: 'static', zIndex: 1 }}> <CiTrash size={{ width: '4px' }} /></Button>
                        </Popconfirm>
                      </td>
                    ) : (
                      <td style={{ height: '46px' }} ></td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StoreOrdersDetail2220;