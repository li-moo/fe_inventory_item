import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { logInState } from '../../state/loginState';
import styles from './StoreExp.module.css';

function StoreExp() {
  const [storeProductData, setStoreProductData] = useState([]);
  const [logInData, setLogInData] = useRecoilState(logInState);
  const [additionalData, setAdditionalData] = useState([]);

  const today = new Date();
  const year = today.getFullYear();
  // 
  const month = String(today.getMonth() + 1).padStart(2, '0'); 
  const day = String(today.getDate()).padStart(2, '0');
  const todayDate = `${year}-${month}-${day}`;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://43.202.9.215:8080/storeproduct/list/${logInData.store_id}`);
      const data = await response.json();

      // 현재 날짜와 마이너스 연산하여 expDataCalculate에 저장
      const addData = data.map((item) => ({
        ...item,
        addData: subtractDates(todayDate, item.exp),
      }));

      setStoreProductData(addData);
    } catch (error) {
      console.error(error);
    }
  };

  // 날짜 간의 차이 계산 함수
  const subtractDates = (date1, date2) => {
    const oneDay = 24 * 60 * 60 * 1000; // 1일을 밀리초로 변환
    const diffDays = Math.round((new Date(date2) - new Date(date1)) / oneDay);
    return diffDays;
  };

  // 추가 데이터를 저장하는 함수
  const saveAdditionalData = (data) => {
    setAdditionalData([...additionalData, data]);
  };

  return (
    <>
    <h2>유통기한 관리</h2>
      <p>오늘 날짜는 {todayDate} 입니다. </p>

      <div className={styles.policyStatement}>
        <div>
          <p className={styles.redExp}></p>
          <p>:유통기한 지남</p>
        </div>
        <div>
          <p className={styles.yellowExp}></p>
          <p>:D-3</p>
        </div>
        <div>
          <p className={styles.greenExp}></p>
          <p>:D-5</p>
        </div>
        <div>
          <p className={styles.blueExp}></p>
          <p>:D-7</p>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>SKU Code</th>
            <th>상품 이름</th>
            <th>재고</th>
            <th>판매가</th>
            <th>유통기한</th>
            <th className={styles['exp-column']}>유통기한연산</th>
            <th>유통기한연산CSS</th>
          </tr>
        </thead>
        <tbody>
        {storeProductData.map((item) => {
          if (item.addData <= 7) {
            return (
              <tr key={item.id}>
                <td>{item.product_code}</td>
                <td>
                  <Link to={`/product/detail/${item.id}`}>{item.product_name}</Link>
                </td>
                <td>{item.qnt}</td>
                <td>{item.price}</td>
                <td>
                  {item.addData <= -1 && (
                    <p className={styles.redExp}></p>
                  )}
                  {item.addData > -1 && item.addData <= 3 && (
                    <p className={styles.yellowExp}></p>
                  )}
                  {item.addData > 3 && item.addData <= 5 && (
                     <p className={styles.greenExp}></p>
                  )}
                  {item.addData > 5 && item.addData <= 7 && (
                      <p className={styles.blueExp}></p>
                  )}
                  {item.addData > 7 && <span>{item.addData}</span>}
                  {item.exp}</td>
                <td>
                  {item.addData}
                </td>
                <td>
                {item.addData <= -1 && (
                    <p className={styles.redExp}></p>
                  )}
                  {item.addData > -1 && item.addData <= 3 && (
                    <p className={styles.yellowExp}></p>
                  )}
                  {item.addData > 3 && item.addData <= 5 && (
                     <p className={styles.greenExp}></p>
                  )}
                  {item.addData > 5 && item.addData <= 7 && (
                      <p className={styles.blueExp}></p>
                  )}
                  {item.addData > 7 && <span>{item.addData}</span>}
                </td>
              </tr>
            );
  } else {
    return null; // Skip rendering the item if item.addData is greater than 7
  }})}
        </tbody>
      </table>

      {/* 추가 데이터 저장 버튼 */}
      {/* <button onClick={() => saveAdditionalData('Additional Data')}>Save Additional Data</button> */}

      {/* 저장된 추가 데이터 출력 */}
      {/* <ul>
        {additionalData.map((data, index) => (
          <li key={index}>{data}</li>
        ))}
      </ul> */}
    </>
  );
}

export default StoreExp;
