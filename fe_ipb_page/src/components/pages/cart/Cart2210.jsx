import React, { useState, useEffect } from 'react';
import { Popconfirm, Button, Input } from 'antd';
import axios from 'axios';
import styles from './Cart2210.module.css';
import { logInState } from "../../state/loginState";
import { useRecoilState } from 'recoil';
import { avigate, useNavigate } from 'react-router-dom';
import { TbTruckDelivery } from "react-icons/tb";
import { CiTrash } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";



const { Search } = Input;

function Cart2210(props) {
  const [cartData, setCartData] = useState([]);
  const [logInData, setLogInData] = useRecoilState(logInState);
  const [addOrder, setAddOrder] = useState(false);
  const [increQnt, setIncreQnt] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // const [orderCartState, setOrderCartState] = useState(false)
  const [orderCartState, setOrderCartState] = useState(true)
  const [propsCartProductQntList, setPropsCartProductQntList] = useState([]);
  const [tarNewQnt, setTarNewQnt] = useState([props.cartList.qnt]);

  const navigate = useNavigate();

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayDate = `${year}-${month}-${day}`;

  useEffect(() => {
    fetchCartData()

    // handleDeleteCart();
    handleAddMax()


  }, [props.cartList]);

  const fetchCartData = () => {
    const url_be_cartlist = `${process.env.REACT_APP_BE_API}/cart/cartlist/${logInData.store_id}`;

    axios(url_be_cartlist, {
      method: 'get'
    })
      .then((res) => {
        setCartData(res.data)
      })
      .catch((err) => {

      });
    // handleAddMax()
  }

  const handleDeleteCart = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_BE_API}/cart/delete/${id}`, {
        method: 'DELETE',
      });
      // fetchData();
      fetchCartData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddOrder = (id) => {
    const url_be_addorder = `${process.env.REACT_APP_BE_API}/orders/addorder`;

    axios(url_be_addorder,
      {
        method: 'post',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',

          mode: 'no-cors'
        },
        data: {
          store_id: logInData.store_id,
        }
      }

    )
      .then(() => {
        fetchCartData();
      })
      .catch(function (error) {
        if (error.response) {

        }
      })
    setAddOrder(!addOrder);
  }
  const handleMaxOrder = () => {
    const url_be_maxorder = `${process.env.REACT_APP_BE_API}/orders/maxorder`;
    // const url_be = "http://43.202.9.215:8080/orders/maxorder";

    axios(url_be_maxorder,
      {
        method: 'post',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          withCredentials: true,
          mode: 'no-cors'
        },
        // data: { //post 라면 . . .
        //   // id: cartData.id,
        //   // qnt: cartData.qnt,
        //   // product_id: cartData.product_id,
        //   id: tarId,
        //   qnt: tarQnt,
        //   product_id: tarProductId,
        //   store_id: logInData.store_id,
        //   delivery_id: 1,
        //   // orders_date: "2023-05-25",
        //   orders_type_id: todayDate,
        // }
        data: cartData
      }
    )
      .then(() => {
        fetchCartData();
      })
      .catch(function (error) {
        if (error.response) {

        }
      })
    setAddOrder(!addOrder);
  }

  // if (addOrder) {
  //   navigate("/order");
  // }

  const updateQnt = (tarId, tarQnt, tarProductId) => {
    const url_be_updateQnt = `${process.env.REACT_APP_BE_API}/cart/update`;
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

      }
    }

    )
    // handleInputChange(event) {
    //   const inputValue = event.target.value;
    //   this.fetchData(inputValue);
    // }

    //setAddOrder(true);
    // handleAddMax();
    setTarNewQnt(tarQnt);

  }

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredProducts = cartData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.product_code.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMax = (tarId, tarQnt) => {

    const tempCartProductQntList = [];
    for (var i = 0; i < props.cartList.length; i++) {
      const CartProductQnt = {
        "product_qnt": props.cartList[i].product_qnt,
        "qnt": props.cartList[i].qnt,
        "id": props.cartList[i].id,
      };
      tempCartProductQntList.push(CartProductQnt);
    }
    setPropsCartProductQntList(tempCartProductQntList);

    for (var i = 0; i < propsCartProductQntList.length; i++) {
      if (propsCartProductQntList[i].id === tarId) {
        for (var j = 0; j < propsCartProductQntList.length; j++) {
          if (propsCartProductQntList[i].product_qnt >= tarQnt) {
            setOrderCartState(true); // 본사 재고가 구매하려는 재고량보다 많을 때
          } else {
            setOrderCartState(false); // 본사 재고가 구매하려는 재고량보다 적을 때
          }
        }
      }
    }

  }

  return (
    <>
      <div>
        <Search
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="상품 이름, SKU 검색"
          // enterButton={<SearchOutlined />}
          className={styles.searchInput}
          style={{ position: 'static', zIndex: 1 }}
        />
      </div>
      <div style={{ overflowX: 'auto', maxHeight: '469px' }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>SKU</th>
              <th>상품 이름</th>
              <th>수량</th>
              <th>
                {orderCartState ? (
                  <Popconfirm
                    title="발주하시겠습니까?"
                    okText="예"
                    cancelText="아니요"
                    // okText="아니요"
                    // cancelText="예"
                    onConfirm={() => handleAddOrder(logInData.store_id)}
                  // onCancel={() => handleAddOrder(logInData.store_id)}
                  >
                    <Button type="primary" ghost>
                      < CiDeliveryTruck size={{ width: '10px' }} />
                    </Button>
                  </Popconfirm>
                  // <p>true</p>
                ) : (
                  <Popconfirm
                    title={(
                      <>
                        <p>본사에 재고가 부족합니다.</p>
                        <div>발주 가능한 수량만큼만 주문하시겠습니까?</div>
                      </>
                    )}
                    okText="네"
                    cancelText="아니요"
                    onConfirm={() => handleMaxOrder()}
                    onCancel={() => handleAddOrder(logInData.store_id)}
                  >
                    <Button type="primary" danger ghost>
                      < CiDeliveryTruck size={{ width: '10px' }} />
                    </Button>
                  </Popconfirm>
                  // <p>false</p>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {cartData && cartData.map((item) => ( */}
            {filteredProducts && filteredProducts.map((item) => (
              <tr key={item.id}>
                <td style={{ width: "10px" }}>{item.product_code}</td>

                {/* <td>({item.brand}){item.name}</td> */}
                {item.product_qnt >= item.qnt ? (
                  <td style={{ color: "black" }}>
                    [{item.brand}]{item.name}
                  </td>
                ) : (
                  <td style={{ color: "red" }}>
                    [{item.brand}]{item.name}
                  </td>
                )}

                <td>
                  <div className={styles.pmBtn}>
                    <input
                      type="number"
                      value={item.qnt}
                      style={{ width: '55px', paddingLeft: '6px' }}
                      className={styles.roundedInput}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value) || item.qnt - 1;
                        if (!isNaN(newQuantity) && newQuantity > 0) {
                          const updatedCartData = cartData.map((cartItem) => {
                            if (cartItem.id === item.id) {
                              return { ...cartItem, qnt: newQuantity };
                            }
                            return cartItem;
                          });

                          setCartData(updatedCartData);
                        }
                        const tarId = item.id;
                        // const tarQnt = item.newQuantity
                        const tarProductId = item.product_id;
                        const tarQnt = newQuantity;
                        updateQnt(tarId, tarQnt);
                        handleAddMax(tarId, tarQnt, tarProductId);
                      }
                      }
                    />
                    {/* <button onClick={() => decreaseQuantity(item)}>-</button> */}
                  </div>
                </td>
                <td>
                  <Popconfirm
                    title="삭제시겠습니까?"
                    onConfirm={() => handleDeleteCart(item.id)}
                    okText="네"
                    cancelText="아니요"
                  >
                    <Button classNames={styles.conBtn}
                      style={{ position: 'static', zIndex: 1 }}
                      danger
                    >
                      <CiTrash size={{ width: '0.1px' }} />
                    </Button>
                  </Popconfirm>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>

    </>
  );
}

export default Cart2210;