import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './StoreOrdersDetail.module.css';
import { logInState } from '../../state/loginState';
import { useRecoilState } from 'recoil';

function StoreOrdersDetail(props) {

  const [storeOrdersDetailListData, setStoreOrdersDetailListData] = useState([]);
  const [loginData, setLoginData] = useRecoilState(logInState);
  

  useEffect(() => {

    fetchStoreOrdersDetailListData();
  }, [props.selectedId]);
  
  console.log("&&&&&&&&&&&&&props.selectedId", props.selectedId);



  const orders_date = props.selectedId
  console.log("const orders_date", orders_date);

  const url_be_detail_list = `http://localhost:8080/orders/store-orders-detail-list`;
  //const url_be_detail_list = `http://localhost:8080/orders/store-orders-detail-list?store_id=${loginData.store_id}&orders_date=${orders_date}`;

  const getFeData = { store_id:loginData.store_id, orders_date: orders_date }
  console.log("넘겨줄 데이터 찍어보기-V1 ", loginData.store_id);
  console.log("넘겨줄 데이터 찍어보기-V2 ", orders_date);

  const fetchStoreOrdersDetailListData = () => {
    const requestData = {
      storeId: loginData.store_id,
      orderDate: orders_date,
    };
  
    axios.get(url_be_detail_list, {
      params: requestData,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        console.log("# Store fetch-list 받은 데이터 res.data>>>", res.data);
        setStoreOrdersDetailListData(res.data);
      })
      .catch((err) => console.log("storeOrdersDetail/err", err));
  }

  const updateQnt = (tarId, tarQnt) => {
    const url_be_updateQnt = "http://localhost:8080/orders/update-orders";

    axios(url_be_updateQnt,
      {
        method: 'PUT',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          withCredentials: true,
          mode: 'no-cors'
        },
        data: {
          id: tarId,
          qnt: tarQnt,
          delivery_id: 1,
          // 배송상태 id가 왜 들어가야하는지 이해 못했음
        }
      }
    ).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    })
    // handleInputChange(event) {
    //   const inputValue = event.target.value;
    //   this.fetchData(inputValue);
    // }

    //setAddOrder(true);
  }



  return (
    <>
      <div>
        {orders_date}
        {props.ordersStatus}
      </div>
      <div>
        <table className={styles.table}>
        {/* <table > */}
          <thead>
            <tr>
              <th>SKU</th>
              <th>상품이름</th>
              <th>발주수량</th>
              {/* <th>매입가(cost)</th>
              <th>판매가(price)</th> */}
            </tr>
          </thead>
          <tbody>
          {storeOrdersDetailListData.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.product_code}</td>
                <td>({item.product_info_brand}){item.product_name}</td>
                <td>
                  {item.orders_status === "배송준비중" ? (
                    // <input type="text" value={item.qnt} onChange={handleChange} />
                    // <input type="text" value={item.qnt} />
                    <input
                    type="number"
                    value={item.qnt}
                    style={{ width: '60px' }}
                    className={styles.roundedInput}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value) || item.qnt - 1;
                      console.log("하이요");
                      console.log("e.target.value", e.target.value);
                      if (!isNaN(newQuantity) && newQuantity > 0) {
                        const updatedCartData = storeOrdersDetailListData.map((SODitem) => {
                          if (SODitem.id === item.id) {
                            console.log("이거 실행되긴하나?");
                            return { ...SODitem, qnt: newQuantity };
                          }
                          return SODitem;
                        });

                        setStoreOrdersDetailListData(updatedCartData);
                      }
                      const tarId = item.id;
                      const tarQnt = newQuantity;
                      updateQnt(tarId, tarQnt);
                    }
                    }
                  />
                  ) : (
                    item.qnt
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
        </table>
      </div>
    </>
  );
}

export default StoreOrdersDetail;