// import React, { useState, useEffect } from 'react';
// import { Table, Popconfirm, message, Divider, Button, Input, Space } from 'antd';
// import axios from 'axios';
// import styles from './Cart.module.css'
// import { Link } from 'react-router-dom';

// function Cart(props) {

//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {
//     console.log("props.cartData: ", cartData);
//     setCartData(props.cartList);
//     console.log("props.test: ", props.test);
//     // fetchData();
//   }, [fetchData]);


//   async function fetchData(){

//     // Local Storage에서 logInState 객체 가져오기, 키 값을 입력해줘야 함
//     // localStorageString는 String 타입입니다
//     const localStorageString = localStorage.getItem('recoil-persist');
//     console.log(localStorageString);

//     // localStorageString 문자열을 JavaScript 객체로 변환
//     const localStorageobj = JSON.parse(localStorageString);
//     console.log("localStorage : " + localStorageobj);

//     // localStorageobj 객체에서 logInState 객체를 꺼냅니다
//     const logInStateObj = localStorageobj["logInState"];
//     console.log("logInState : " + logInStateObj);

//     // logInState 객체의 점포아이디 값을 가져옵니다
//     const storeId = logInStateObj["store_id"]
//     console.log("storeId : " + storeId);

//     try {
//       const response = await axios.get(`http://localhost:8080/cart/cartlist/${storeId}`);
//       // const response = await axios.get(`http://43.202.9.215:8080/cart/cartlist/${storeId}`);
//       // console.log("response : " + JSON.stringify(response));
//       const data = response["data"];
//       console.log("[GET] cartList/data: ", data);
//       setCartData(data);
//       // console.log("cart product: ", data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // const fetchData = async () => {
//   //   try {
//   //     const response = await fetch('http://localhost:8080/cart/cartlist/2');
//   //     console.log(typeof response);
//   //     const data = await response.json();
//   //     console.log(typeof data);
//   //     setCartData(data);
//   //     console.log("cartProduct: ", data);
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // };

//     const handleDeleteCart = async (id) => {
//       try {
//         await fetch(`http://localhost:8080/cart/delete/${id}`, {
//           // await fetch(`http://43.202.9.215:8080/cart/delete/${id}`, {
//           method: 'DELETE',
//         });
//         // message.success('상품이 삭제되었습니다.');
//         fetchData();
//       } catch (error) {
//         console.error(error);
//         // message.error('상품 삭제에 실패하였습니다.');
//       }
//     };

//     // const handleQuantityChange = async (id, value) => {
//     //   try {
//     //     await axios.put(`http://localhost:8080/cart/update/${id}`, { qnt: value });
//     //     fetchData();
//     //   } catch (error) {
//     //     console.error(error);
//     //   }
//     // };

//     // const handleIncrement = (id, value) => {
//     //   handleQuantityChange(id, value + 1);
//     // };

//     // const handleDecrement = (id, value) => {
//     //   if (value > 1) {
//     //     handleQuantityChange(id, value - 1);
//     //   }
//     // };

//   const columns = [
//     {
//       title: 'ID',
//       dataIndex: 'product_id',
//       width: 50,
//     },
//     {
//       title: '이름',
//       dataIndex: 'name',
//     },
//     {
//       title: '수량',
//       dataIndex: 'qnt',
//     },

//     {
//       title: '{<Button />}',
//       dataIndex: 'id',
//       render: (id) => (
//         <Popconfirm
//           title="삭제시겠습니까??"
//           onConfirm={() => handleDeleteCart(id)}
//           okText="네"
//           cancelText="아니오"
//         >
//           <Button>
//           <a>삭제</a>
//           </Button>
//         </Popconfirm>
//       ),
//     },
//   ];

//   console.log("props.cartList", props.cartList);

//   return (
//     <>
//       {/* <Table 
//         dataSource={cartData && cartData.map((item) => ({ ...item, key: item.id }))} 
//         columns={columns}
//         scroll={{y:370,}}
//         pagination={{pageSize: 5000,}}
//       /> */}

// <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>SKU</th>
//             <th>상품 이름</th>
//             <th>수량</th>
//             <th>수량조절버튼</th>
//             <th>판매가</th>
//             <th>구매하기버튼</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* {sortedProducts.map((item) => ( */}
//           { cartData && cartData.map((item) => (

//             <tr key={item.id}>
//               <td>{item.product_code}</td>
//               <td>({item.brand}){item.name}</td>
//               <td>{item.qnt}</td>
//               {/* // 여기에 <input></input> 넣을 수 있게 */}
//               <td>수량조절버튼</td>
//               <td>판매가</td>
//               <td>
//               <Popconfirm
//                 title="삭제시겠습니까??"
//                 onConfirm={() => handleDeleteCart(item.id)}
//                 okText="네"
//                 cancelText="아니오"
//               >
//                 <Button>
//                 <a>삭제</a>
//                 </Button>
//               </Popconfirm>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// }

// export default Cart;

// import React, { useState, useEffect } from 'react';
// import { Popconfirm, Button } from 'antd';
// import axios from 'axios';
// import styles from './Cart.module.css'
// import { logInState } from "../../state/loginState";
// import { useRecoilState } from 'recoil';

// function Cart(props) {

//   const [cartData, setCartData] = useState([]);
//   const [logInData, setLogInData] = useRecoilState(logInState);

//   useEffect(() => {
//     console.log("props.cartData: ", cartData);
//     setCartData(props.cartList);
//     console.log("props.test: ", props.test);
//     // fetchData();
//     // handleDeleteCart();
//   }, [fetchData]);


//   async function fetchData() {

//     // // Local Storage에서 logInState 객체 가져오기, 키 값을 입력해줘야 함
//     // // localStorageString는 String 타입입니다
//     // const localStorageString = localStorage.getItem('recoil-persist');
//     // console.log(localStorageString);

//     // // localStorageString 문자열을 JavaScript 객체로 변환
//     // const localStorageobj = JSON.parse(localStorageString);
//     // console.log("localStorage : " + localStorageobj);

//     // // localStorageobj 객체에서 logInState 객체를 꺼냅니다
//     // const logInStateObj = localStorageobj["logInState"];
//     // console.log("logInState : " + logInStateObj);

//     // // logInState 객체의 점포아이디 값을 가져옵니다
//     // const storeId = logInStateObj["store_id"]
//     // console.log("storeId : " + storeId);

//     try {
//       // const response = await axios.get(`http://localhost:8080/cart/cartlist/${storeId}`);
//       const response = await axios.get(`http://localhost:8080/cart/cartlist/${logInData.store_id}`);
//       // const response = await axios.get(`http://43.202.9.215:8080/cart/cartlist/${storeId}`);
//       // console.log("response : " + JSON.stringify(response));
//       const data = response["data"];
//       console.log("[GET] cartList/data: ", data);
//       setCartData(data);
//       // console.log("cart product: ", data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // useEffect(( ) => {

//   //   const handleDeleteCart = async (id) => {
//   //     try {
//   //       await fetch(`http://localhost:8080/cart/delete/${id}`, {
//   //         // await fetch(`http://43.202.9.215:8080/cart/delete/${id}`, {
//   //         method: 'DELETE',
//   //       });
//   //       // message.success('상품이 삭제되었습니다.');
//   //       fetchData();
//   //     } catch (error) {
//   //       console.error(error);
//   //       // message.error('상품 삭제에 실패하였습니다.');
//   //     }
//   //   };

//   //   handleDeleteCart();
//   // }, []) 

//   const handleDeleteCart = async (id) => {
//     try {
//       await fetch(`http://localhost:8080/cart/delete/${id}`, {
//         // await fetch(`http://43.202.9.215:8080/cart/delete/${id}`, {
//         method: 'DELETE',
//       });
//       // message.success('상품이 삭제되었습니다.');
//       fetchData();
//     } catch (error) {
//       console.error(error);
//       // message.error('상품 삭제에 실패하였습니다.');
//     }
//   };

//   const [quantity, setQuantity] = useState(1);

//   const decreaseQuantity = (item) => {
//     if (cartData.qnt > 1) {
//       setQuantity(prevQuantity => cartData.qnt - 1);
//     }
//   };

//   const increaseQuantity = (item) => {
//     setQuantity(prevQuantity => cartData.qnt + 1);
//   };

//   const handleQuantityChange = (item, newQuantity) => {
//     // 아이템의 수량이 변경될 때 수행할 로직을 작성합니다.
//     // 예를 들어, 아이템의 수량을 업데이트하는 함수를 호출하거나 상태를 업데이트할 수 있습니다.

//     // 아이템의 수량을 업데이트하는 함수를 호출하는 예시:
//     // updateItemQuantity(item.id, newQuantity);

//     // 상태를 업데이트하는 예시:
//     const updatedCartData = cartData.map((cartItem) => {
//       if (cartItem.id === item.id) {
//         return { ...cartItem, qnt: newQuantity };
//       }
//       return cartItem;
//     });

//     setCartData(updatedCartData);
//   };


//   console.log("props.cartList", props.cartList);

//   return (
//     <>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>SKU</th>
//             <th>상품 이름</th>
//             <th>수량</th>
//             {/* <th>판매가</th> */}
//             <th>   <Popconfirm
//               title="구매하시겠습니까?"
//               // onConfirm={() => handleDeleteCart(item.id)}
//               okText="네"
//               cancelText="아니오"
//             >
//               <Button>
//                 구매
//               </Button>
//             </Popconfirm></th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* {sortedProducts.map((item) => ( */}
//           {cartData && cartData.map((item) => (

//             <tr key={item.id}>
//               <td style={{ width: "10px" }}>{item.product_code}</td>
//               <td>({item.brand}){item.name}</td>
//               <td>
//                 <div className={styles.pmBtn}>
//                   {/* <button onClick={increaseQuantity(item)}>+</button> */}
//                   {/* <input type="number" value={quantity} style={{ width: '40px' }} /> */}
//                   {/* <input type="number" value={item.qnt} style={{ width: '40px' }} /> */}
//                   {/* <button onClick={decreaseQuantity(item)}>-</button> */}
//                   <button onClick={() => increaseQuantity(item)}>+</button>
//                   <input type="number" value={item.qnt} style={{ width: '40px' }} onChange={(e) => handleQuantityChange(item, e.target.value)} />
//                   <button onClick={() => decreaseQuantity(item)}>-</button>
//                 </div>
//               </td>
//               {/* // 여기에 <input></input> 넣을 수 있게 */}
//               {/* <td>{item.price}</td> */}
//               <td>
//                 <Popconfirm
//                   title="삭제시겠습니까??"
//                   onConfirm={() => handleDeleteCart(item.id)}
//                   okText="네"
//                   cancelText="아니오"
//                 >
//                   <Button>
//                     <a>삭제</a>
//                   </Button>
//                 </Popconfirm>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// }

// export default Cart;

import React, { useState, useEffect } from 'react';
import { Popconfirm, Button } from 'antd';
import axios from 'axios';
import styles from './Cart.module.css';
import { logInState } from "../../state/loginState";
import { useRecoilState } from 'recoil';

function Cart(props) {
  const [cartData, setCartData] = useState([]);
  const [logInData, setLogInData] = useRecoilState(logInState);

  useEffect(() => {
    console.log("props.cartData: ", cartData);
    setCartData(props.cartList);
    console.log("props.test: ", props.test);
  }, [props.cartList]);

  async function fetchData() {
    try {
      const response = await axios.get(`http://localhost:8080/cart/cartlist/${logInData.store_id}`);
      const data = response.data;
      console.log("[GET] cartList/data: ", data);
      setCartData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCart = async (id) => {
    try {
      await fetch(`http://localhost:8080/cart/delete/${id}`, {
        method: 'DELETE',
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const increaseQuantity = (item) => {
    const updatedCartData = cartData.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, qnt: cartItem.qnt + 1 };
      }
      return cartItem;
    });
    setCartData(updatedCartData);
  };

  const decreaseQuantity = (item) => {
    const updatedCartData = cartData.map((cartItem) => {
      if (cartItem.id === item.id) {

        // return { ...cartItem, qnt: cartItem.qnt - 1 };
        const newQuantity = cartItem.qnt - 1;
        // cartItem.qnt가 0보다 작으면 0으로 설정
        const updatedQuantity = newQuantity < 1 ? 1 : newQuantity;
        return { ...cartItem, qnt: updatedQuantity };
      }
      return cartItem;
    });
    setCartData(updatedCartData);
  };

  console.log("props.cartList", props.cartList);

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
              >
                <Button>구매</Button>
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
                  <button onClick={() => increaseQuantity(item)}>+</button>
                  <input
                    type="number"
                    value={item.qnt}
                    style={{ width: '40px' }}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      if (!isNaN(newQuantity)) {
                        const updatedCartData = cartData.map((cartItem) => {
                          if (cartItem.id === item.id) {
                            return { ...cartItem, qnt: newQuantity };
                          }
                          return cartItem;
                        });
                        setCartData(updatedCartData);
                      }
                    }}
                  />
                  <button onClick={() => decreaseQuantity(item)}>-</button>
                </div>
              </td>
              <td>
                <Popconfirm
                  title="삭제시겠습니까??"
                  onConfirm={() => handleDeleteCart(item.id)}
                  okText="네"
                  cancelText="아니오"
                >
                  <Button>
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
