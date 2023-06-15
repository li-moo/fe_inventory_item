import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
// import { logInState } from '../src/components/state/loginState';
import { logInState } from '../../state/loginState';
import axios from 'axios';
import styles from '../auto/EventAutoOrders2230.module.css';
import { Link } from 'react-router-dom';

function EventAutoOrders2230() {

  const [loginData, setLogInData] = useRecoilState(logInState);
  const [evnetAutoData, setEventAutoData] = useState([]);

  const url_be = `${process.env.REACT_APP_BE_API}/eventAutoOrders/${loginData.store_id}`;
  // const url_be = `http://43.202.9.215:8080/eventAutoOrders/${loginData.store_id}`;

  useEffect(() => {
    fetchDataEventAutoOrders();
    updateQnt();
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

  const updateQnt = (tarId, tarQnt) => {
    const url_be_updateQnt = `${process.env.REACT_APP_BE_API}/eventAutoOrders/update`;

    axios(url_be_updateQnt,
      {
        method: 'put',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        data: {
          id: tarId,
          qnt: tarQnt
        }
      }
    ).catch(function (error) {
      console.log("error: ", error);
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

  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  }

  return (
    <div>
      <div>
        <h4 >이벤트 자동발주</h4>
        <div style={{ borderBottom: '5px solid #817D7D', width: '180px', paddingTop: '2px' }}></div>
      </div >
      <table className={styles.table}>
        <thead>
          <tr>
          <th>이벤트 이름</th>
            <th>SKU</th>
            <th>상품 이름</th>
            <th>판매가</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody>
          {evnetAutoData.map((item) => (
            <tr key={item.id}>
              <td><Link
                to={`/event/detail/${item.event_id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
                key={item.event_id}
              >{item.name}</Link></td>
                 <td>
                  {/* <Link
                    to={`/storeproduct/detail/${item.product_id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  > */}
                    {item.product_info_id}
                  {/* </Link> */}
                 </td>
              <td>
              {/* <Link
                    to={`/storeproduct/detail/${item.product_id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  > */}
                    [{item.brand}]{' '}{item.product_name}
                  {/* </Link> */}
                </td>
              <td>{addComma(item.price)}</td>
              {/* <td>{item.qnt}</td> */}
              <td>
                <input
                  type="number"
                  value={item.qnt}
                  style={{ width: '60px', paddingLeft: '6px' }}
                  className={styles.roundedInput}
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value) || item.qnt - 1;
                    console.log("하이요");
                    console.log("e.target.value", e.target.value);
                    if (!isNaN(newQuantity) && newQuantity > 0) {
                      const updatedCartData = evnetAutoData.map((eventAutoItem) => {
                        if (eventAutoItem.id === item.id) {
                          console.log("이거 실행되긴하나?");
                          return { ...eventAutoItem, qnt: newQuantity };
                        }
                        return eventAutoItem;
                      });

                      setEventAutoData(updatedCartData);
                    }
                    const tarId = item.id;
                    const tarQnt = newQuantity;
                    updateQnt(tarId, tarQnt);
                  }
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
export default EventAutoOrders2230;
