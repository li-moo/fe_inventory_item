import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { logInState } from "../../state/loginState";

function StoreSalesListCategory() {
  const [storeSalesData, setStoreSalesData] = useState([]);
  const [logInData, setLogInData] = useRecoilState(logInState);

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


  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Category ID</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Cost</th>
            <th>Expiration Date</th>
            <th>Sales Date</th>
            <th>Store Name</th>
            <th>Store Product ID</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {storeSalesData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.product_name}</td>
              <td>{item.category_id}</td>
              <td>{item.price}</td>
              <td>{item.qnt}</td>
              <td>{item.cost}</td>
              <td>{item.exp}</td>
              <td>{item.sales_date}</td>
              <td>{item.store_name}</td>
              <td>{item.store_product_id}</td>
              <td>{item.price * item.qnt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default StoreSalesListCategory;