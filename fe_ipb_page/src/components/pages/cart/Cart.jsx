import React, { useState, useEffect } from 'react';
import { Popconfirm, Button } from 'antd';
import axios from 'axios';
import styles from './Cart.module.css';
import { logInState } from "../../state/loginState";
import { useRecoilState } from 'recoil';
import { avigate, useNavigate } from 'react-router-dom';

function Cart(props) {
  const [cartData, setCartData] = useState([]);
  const [logInData, setLogInData] = useRecoilState(logInState);
  const [addOrder, setAddOrder] = useState(false);
  const [increQnt, setIncreQnt] = useState([]);

  const navigate = useNavigate();

  // useEffect(() => {
  //   setCartData(props.cartList);
  //   fetchCartData()
  //   console.log("useEffect/cartData:", cartData);
  //   console.log("useEffect/props.cartList:", props.cartList);
  // }, [props.cartList]);
  useEffect(() => {
    setCartData(props.cartList);
    fetchCartData()
    console.log("useEffect/cartData:", cartData);
    console.log("useEffect/props.cartList:", props.cartList);
  }, [props.cartList]);

  // async function fetchData() {
  //   try {
  //     const response = await axios.get(`http://localhost:8080/cart/cartlist/${logInData.store_id}`);
  //     const data = response.data;
  //     console.log("[GET] cartList/data: ", data);
  //     setCartData(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  const fetchCartData = () => {
    const url_be_cartlist = `http://localhost:8080/cart/cartlist/${logInData.store_id}`;

    axios(url_be_cartlist, {
      method: 'get'
    })
      .then((res) => {
        console.log("storeExp->res.data::", res.data);
        setCartData(res.data)
      })
      .catch((err) => console.log("storeexp/err", err))
  }

  // const fetchCartQntData = () => {
  //   const url_be_cartQnt = "http://localhost:8080/cart/update/";
  //   // const url_be = "http://43.202.9.215:8080/orders/addorder";

  //   axios(url_be_cartQnt,
  //     {
  //       method: 'PUT',
  //       headers: {
  //         'Access-Control-Allow-Origin': '*',
  //         'Content-Type': 'application/json',
  //         withCredentials: true,
  //         mode: 'no-cors'
  //       },
  //       data: { //post 라면 . . .
  //         id: cartData.id,
  //         qnt: cartData.qnt,
  //       }
  //     }
  //   ).catch(function (error) {
  //     if (error.response) {
  //       console.log(error.response.data);
  //       console.log(error.response.status);
  //       console.log(error.response.headers);
  //     }
  //   })
  //   setAddOrder(true);
  // }

  const handleDeleteCart = async (id) => {
    try {
      await fetch(`http://localhost:8080/cart/delete/${id}`, {
        method: 'DELETE',
      });
      // fetchData();
      fetchCartData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddOrder = (id) => {
    const url_be_addorder = "http://localhost:8080/orders/addorder";
    // const url_be = "http://43.202.9.215:8080/orders/addorder";

    axios(url_be_addorder,
      {
        method: 'post',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          withCredentials: true,
          mode: 'no-cors'
        },
        data: {
          store_id: logInData.store_id,
        }
      }
    ).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    })
    setAddOrder(true);
    window.location.reload();
  }
  // const handleMaxOrder = () => {
  //   const url_be_maxorder = "http://localhost:8080/orders/maxorder";
  //   // const url_be = "http://43.202.9.215:8080/orders/maxorder";

  //   axios(url_be_maxorder,
  //     {
  //       method: 'post',
  //       headers: {
  //         'Access-Control-Allow-Origin': '*',
  //         'Content-Type': 'application/json',
  //         withCredentials: true,
  //         mode: 'no-cors'
  //       },
  //       data: { //post 라면 . . .
  //         // id: cartData.id,
  //         // qnt: cartData.qnt,
  //         // product_id: cartData.product_id,
  //         id: 346,
  //         qnt: 23,
  //         product_id: 6,
  //         store_id: logInData.store_id,
  //         delivery_id: 1,
  //         orders_date: "2023-05-25",
  //         orders_type_id: 1,
  //       }
  //     }
  //   ).catch(function (error) {
  //     if (error.response) {
  //       console.log(error.response.data);
  //       console.log(error.response.status);
  //       console.log(error.response.headers);
  //     }
  //   })
  //   setAddOrder(true);
  // }
  // if (addOrder) {
  //   navigate("/order");
  // }

  const updateQnt = (tarId, tarQnt) => {
    const url_be_updateQnt = "http://localhost:8080/cart/update";
    // const url_be_updateQnt = "http://localhost:8080/cart/update";

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
          // id: cartData.id, // order_cart의 id
          // qnt: cartData.qnt,
          // id: cartItem.id, // order_cart의 id
          // qnt: cartItem.qnt,
          id: tarId,
          qnt: tarQnt
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

  // const increaseQuantity = (item) => {
  //   const updatedCartData = cartData.map((cartItem) => {
  //     if (cartItem.id === item.id) {
  //       return { ...cartItem, qnt: cartItem.qnt + 1 };
  //     }
  //     return cartItem;
  //   });
  //   setCartData(updatedCartData);
  //   // props.cartList(updatedCartData); // 업데이트
  // };

  // const decreaseQuantity = (item) => {
  //   const updatedCartData = cartData.map((cartItem) => {
  //     if (cartItem.id === item.id) {

  //       const newQuantity = cartItem.qnt - 1;
  //       // cartItem.qnt가 0보다 작으면 0으로 설정
  //       const updatedQuantity = newQuantity < 1 ? 1 : newQuantity;
  //       return { ...cartItem, qnt: updatedQuantity };
  //     }
  //     return cartItem;
  //   });
  //   setCartData(updatedCartData);
  //   // props.cartList(updatedCartData); // 업데이트
  // };

  console.log("props.cartList", props.cartList);
  console.log(":587 -> cartData", cartData);

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>SKU</th>
            <th>상품 이름</th>
            <th>수량</th>
            <th>
              <Popconfirm
                title="구매하시겠습니까?"
                okText="네"
                cancelText="아니오"
                // onConfirm={() => handleAddOrder(logInData.store_id)}
                onConfirm={() => handleAddOrder(logInData.store_id)}
              >
                <Button type="primary" ghost>구매</Button>
              </Popconfirm>
            </th>
          </tr>
        </thead>
        <tbody>
          {cartData && cartData.map((item) => (
            <tr key={item.id}>
              <td style={{ width: "10px" }}>{item.product_code}</td>
              <td>({item.brand}){item.name}</td>
              <td>
                <div className={styles.pmBtn}>
                  {/* <button onClick={() => increaseQuantity(item)}>+</button> */}
                  {/* <input
                    type="number"
                    value={item.qnt}
                    style={{ width: '40px' }}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      console.log("하이요");
                      console.log("e.target.value", e.target.value);
                      if (!isNaN(newQuantity)) { // 빈 값이 아니면 실행 
                        const updatedCartData = cartData.map((cartItem) => {
                          if (cartItem.id === item.id) {
                            console.log("이거 실행되긴하나?");
                            return { ...cartItem, qnt: newQuantity };
                          }
                          return cartItem;
                        });

                        setCartData(updatedCartData);
                      }
                    }}
                  /> */}
                  <input
                    type="number"
                    value={item.qnt}
                    style={{ width: '40px' }}
                    className={styles.roundedInput}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value) || item.qnt - 1;
                      console.log("하이요");
                      console.log("e.target.value", e.target.value);
                      if (!isNaN(newQuantity) && newQuantity > 0) {
                        const updatedCartData = cartData.map((cartItem) => {
                          if (cartItem.id === item.id) {
                            console.log("이거 실행되긴하나?");
                            return { ...cartItem, qnt: newQuantity };
                          }
                          return cartItem;
                        });

                        setCartData(updatedCartData);
                      }
                      const tarId = item.id;
                      // const tarQnt = item.newQuantity
                      const tarQnt = newQuantity;
                      updateQnt(tarId, tarQnt);
                    }
                    }
                  />
                  {/* <button onClick={() => decreaseQuantity(item)}>-</button> */}
                </div>
              </td>
              <td>
                <Popconfirm
                  title="삭제시겠습니까??"
                  onConfirm={() => handleDeleteCart(item.id)}
                  okText="네"
                  cancelText="아니오"
                >
                  <Button classNames={styles.conBtn}>
                    <a>삭제</a>
                  </Button>
                </Popconfirm>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Cart;
