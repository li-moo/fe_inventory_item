import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
// import { logInState } from '../src/components/state/loginState';
import { logInState } from '../../state/loginState';
import axios from 'axios';
import styles from '../auto/EventAutoOrders.module.css';

function EventAutoOrders() {

  const [loginData, setLogInData] = useRecoilState(logInState);
  const [evnetAutoData, setEventAutoData] = useState([]);

  const url_be = `http://localhost:8080/eventAutoOrders/${loginData.store_id}`;
  // const url_be = `http://43.202.9.215:8080/eventAutoOrders/${loginData.store_id}`;

  useEffect(() => {
    fetchDataEventAutoOrders();
  }, []);

  const fetchDataEventAutoOrders = () => {
    axios(url_be, {
      method: 'get'
    })
      .then((res) => {
        console.log("EventAutoOrders->res.data::", res.data);
        setEventAutoData(res.data)
      })
      .catch((err) => console.log("storeexp/err", err))
  }


  return (
    <div>
      <table className={styles.table}>
        {/* <table> */}
        <thead>
          <tr>
            <th>이벤트 이름</th>
            <th>상품 이름</th>
            <th>가격</th>
            <th>판매가</th>
          </tr>
        </thead>
        <tbody>
          {evnetAutoData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.product_name}</td>
              <td>{item.price}</td>
              <td>{item.qnt}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
export default EventAutoOrders;
