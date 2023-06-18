import React, { useEffect, useState } from 'react';
import { Divider } from "antd";
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { logInState } from '../../state/loginState';
import { useRecoilState } from 'recoil';
import styles from './OrdersList2220.module.css';
import StoreOrdersDetail from './StoreOrdersDetail2220';

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
  };

  useEffect(() => {

    fetchStoreOrdersDetailData();
    // fetchStoreOrdersDetailListData();
  }, [isAddOr, setIsAddOr]);

  const url_be = `${process.env.REACT_APP_BE_API}/orders/all`;

  const fetchStoreOrdersDetailData = () => {
    axios(url_be, {
      method: 'get'
    })
      .then((res) => {
        setStoreOrdersDetailData(res.data);
      })
      .catch((err) => console.log("storeexp/err", err))
  }

  const url_be_detail_list = `${process.env.REACT_APP_BE_API}/orders/store-orders-detail-list`;
  //const url_be_detail_list = `http://localhost:8080/orders/store-orders-detail-list?store_id=${loginData.store_id}&orders_date=${storeOrdersDetailData.orders_date}`;

  return (
    <>
      <div>
        <h4 >발주내역</h4>
        <div style={{ borderBottom: '4px solid #CCCCCC', width: '97px', paddingTop: '2px' }}></div>
      </div >
      {/* <Divider /> */}
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