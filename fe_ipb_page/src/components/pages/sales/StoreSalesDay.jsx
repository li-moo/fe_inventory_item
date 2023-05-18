import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { logInState } from "../../state/loginState";
import { DatePicker, Button } from 'antd';

function StoreSalesListDay() {
  const [storeSalesData, setStoreSalesData] = useState([]);
  const [logInData, setLogInData] = useRecoilState(logInState);
  const [selectedDate, setSelectedDate] = useState(null);
  const [totalSalesByDate, setTotalSalesByDate] = useState(null); // 추가된 상태

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const response = await fetch(`http://localhost:8080/sales/listbystore?store_id=${logInData.store_id}`);
      const response = await fetch(`http://43.202.9.215:8080/sales/listbystore?store_id=${logInData.store_id}`);
      const data = await response.json();
      setStoreSalesData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotalSalesByDate = (salesData, targetDate) => {
    const filteredData = salesData.filter((item) => {
      const salesDate = item.sales_date.split('T')[0]; // 날짜 부분인 "YYYY-MM-DD" 추출
      return salesDate === targetDate;
    });

    const totalSales = filteredData.reduce((sum, item) => {
      return sum + item.price * item.qnt;
    }, 0);

    return totalSales;
  };

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const handleCalculateClick = () => {
    if (selectedDate) {
      const salesByDate = calculateTotalSalesByDate(storeSalesData, selectedDate);
      setTotalSalesByDate(salesByDate);
    }
  };

  return (
    <>
      <div style={{ marginBottom: '16px' }}>
        <DatePicker onChange={handleDateChange} />
        <Button onClick={handleCalculateClick} type="primary">Calculate</Button>
      </div>

      {totalSalesByDate && (
        <div>
          <p style={{ backgroundColor: 'white',
            padding: '6px'
        }} >일별 총액: {selectedDate}: {totalSalesByDate}</p>
        </div>
      )}

    </>
  );
}

export default StoreSalesListDay;