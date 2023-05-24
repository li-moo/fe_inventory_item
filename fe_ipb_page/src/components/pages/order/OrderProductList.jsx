// import React, { useState, useEffect } from 'react';
// import { Table, Popconfirm, message, Divider, Button } from 'antd';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// function OrderProductList(props) {
//   const [productData, setProductData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // const url_be = "http://43.202.9.215:8080/product/list";
//   const url_be = "http://localhost:8080/product/list";

//   const fetchData = () => {
//     axios(
//       url_be,
//       {
//         method: 'get'
//       }
//     )
//       .then((res) => {
//         console.log("res:", res);
//         console.log("orderProdutList=>res.data:", res.data);
//         setProductData(res.data)
//       })
//       .catch((err) => console.log("orderproductlist/err", err));
//   }

//   // const handleAddCart = async (id) => {
//   //   try {
//   //     await fetch(`http://localhost:8080/cart/add`, {
//   //       method: 'post',
//   //     });
//   //     message.success('상품을 담았습니다.');
//   //     console.log(id);
//   //     fetchData();
//   //   } catch (error) {
//   //     console.error(error);
//   //     message.error('상품 담기에 실패하였습니다.');
//   //   }
//   // };

//   // Local Storage에서 logInState 객체 가져오기, 키 값을 입력해줘야 함
//   // localStorageString는 String 타입입니다
//   const localStorageString = localStorage.getItem('recoil-persist');
//   console.log(localStorageString);

//   // localStorageString 문자열을 JavaScript 객체로 변환
//   const localStorageobj = JSON.parse(localStorageString);
//   console.log("localStorage : " + localStorageobj);

//   // localStorageobj 객체에서 logInState 객체를 꺼냅니다
//   const logInStateObj = localStorageobj["logInState"];
//   console.log("logInState : " + logInStateObj);

//   // logInState 객체의 점포아이디 값을 가져옵니다
//   const storeId = logInStateObj["store_id"]
//   console.log("storeId : " + storeId);

//   const handleAddCart = (id) => {
//     const url_be = "http://localhost:8080/cart/add";
//     // const url_be = "http://43.202.9.215:8080/cart/add";

//     axios(url_be,
//       {
//         method: 'post',
//         headers: {
//           'Access-Control-Allow-Origin': '*',
//           'Content-Type': 'application/json',
//           withCredentials: true,
//           mode: 'no-cors'
//         },
//         data: { //post 라면 . . .
//           qnt: 1,
//           product_id: id,
//           store_id: storeId,
//         }
//       }
//     ).catch(function (error) {
//       if (error.response) {
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//       }
//     })

//     // true 상관없이 바뀌면 Orders에 useEffect가 실행 
//     props.setIsAdd(!props.isAdd);
//   };



//   const columns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id',
//       width: 50,
//     },
//     {
//       title: '이름',
//       dataIndex: 'name',
//       render: (text, record) => (
//         <Link to={`/product/detail/${record.id}`} key={record.id}>{text}</Link>
//       ),
//       // 모달 창으로 리펙토링 해야함
//       sorter: (a, b) => a.name.localeCompare(b.name),
//     },
//     {
//       title: '발주가능수량',
//       dataIndex: 'qnt',
//     },
//     {
//       title: '가격',
//       dataIndex: 'price',
//     },
//     {
//       title: '원가',
//       dataIndex: 'cost',
//     },
//     {
//       title: '유통기한',
//       dataIndex: 'exp',
//     },
//     {
//       title: '',
//       dataIndex: 'id',
//       render: (id) => (
//         <Popconfirm
//           title="장바구니에 상품을 담으시겠습니까??"
//           onConfirm={() => handleAddCart(id)}
//           okText="네"
//           cancelText="아니오"
//         >
//           <Button>
//             <a>상품담기</a>
//           </Button>
//         </Popconfirm>
//       ),
//     },
//   ];


//   return (
//     <>
//       {/* 실제 사용시 <h2></h2> 는 주석 처리나 삭제 해주세요 */}
//       {/* <h2>점포에서 상품을 담기위해 product에서 장바구니를 담을 때 사용하는 페이지 입니다</h2> */}
//       {/* <Divider /> */}
//       <>
//         <Table
//           dataSource={productData.map((item) => ({ ...item, key: item.id }))}
//           columns={columns}
//           scroll={{ y: 370, }}
//           pagination={{ pageSize: 5000, }}
//         />
//       </>
//     </>
//   );
// }

// export default OrderProductList;

import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, message, Divider, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { logInState } from "../../state/loginState";
import { useRecoilState } from 'recoil';
import styles from './OrderProductList.module.css';

function OrderProductList(props) {
  const [productData, setProductData] = useState([]);
  const [logInData, setLogInData] = useRecoilState(logInState);
  const [storeProductData, setStoreProductData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  console.log("-->> storeProductData.map.qnt", storeProductData.map.qnt);

  // const url_be = "http://43.202.9.215:8080/product/list";
  const url_be = "http://localhost:8080/product/list";

  const fetchData = () => {
    axios(
      url_be,
      {
        method: 'get'
      }
    )
      .then((res) => {
        console.log("res:", res);
        console.log("orderProdutList=>res.data:", res.data);
        setProductData(res.data)

        // const addData = res.data.map((item) => ({
        //   ...item,
        //   addData: productData.qnt
        // }));
        // setStoreProductData(addData)

      })
      .catch((err) => console.log("orderproductlist/err", err));
  }

  // 현재고를 뽑기 위한 fetch -> qnt
  const url_be_stp = `http://localhost:8080/storeproduct/list/${logInData.store_id}`;

  useEffect(() => {

    const getStoreProduct = async () => {
      console.log("[logInData.store_id]: ", logInData.store_id);
      try {
        const res = await axios
          .get(url_be_stp);
        console.log("getStoreProduct/res:", res);
        console.log("getStoreProduct/storeProdutList=>res.data:", res.data);
        console.log("set전 getStoreProduct/storeProductData:", storeProductData);
        setStoreProductData(res.data);
        console.log("set후 getStoreProduct/storeProductData:", storeProductData);
        console.log("set후 getStoreProduct/storeProductData.qnt:", storeProductData.qnt);
        const storeProductQntColumn = res.data.map(item => item.qnt);
        console.log("storeProductQntColumn:", storeProductQntColumn);
        // return storeProductQntColumn;
        return Promise.resolve(storeProductQntColumn);
      } catch (err) {
        return console.log("storeProdutList/err", err);
      }
    };
    getStoreProduct();
  }, []);
  //
  // ??? 재귀호출 ???
  // getStoreProduct()
  // .then(storeProductQntColumn => {
  //   // 반환된 storeProductQntColumn 값을 사용합니다.
  //   console.log("받아온 storeProductQntColumn:", storeProductQntColumn);
  //   // ... 추가적인 작업 수행
  // })
  // .catch(error => {
  //   console.error("getStoreProduct 에러:", error);
  // });
  // console.log("fetch 밖 storeProductQntColumn", storeProductQntColumn);

  // Local Storage에서 logInState 객체 가져오기, 키 값을 입력해줘야 함
  // localStorageString는 String 타입입니다
  const localStorageString = localStorage.getItem('recoil-persist');
  console.log(localStorageString);

  // localStorageString 문자열을 JavaScript 객체로 변환
  const localStorageobj = JSON.parse(localStorageString);
  console.log("localStorage : " + localStorageobj);

  // localStorageobj 객체에서 logInState 객체를 꺼냅니다
  const logInStateObj = localStorageobj["logInState"];
  console.log("logInState : " + logInStateObj);

  // logInState 객체의 점포아이디 값을 가져옵니다
  const storeId = logInStateObj["store_id"]
  console.log("storeId : " + storeId);

  const handleAddCart = (id) => {
    const url_be = "http://localhost:8080/cart/add";
    // const url_be = "http://43.202.9.215:8080/cart/add";

    axios(url_be,
      {
        method: 'post',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          withCredentials: true,
          mode: 'no-cors'
        },
        data: { //post 라면 . . .
          qnt: 1,
          product_id: id,
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

    // true 상관없이 바뀌면 Orders에 useEffect가 실행 
    props.setIsAdd(!props.isAdd);
  };



  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: '이름',
      dataIndex: 'name',
      render: (text, record) => (
        <Link to={`/product/detail/${record.id}`} key={record.id}>{text}</Link>
      ),
      // 모달 창으로 리펙토링 해야함
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: '발주가능수량',
      dataIndex: 'qnt',
    },
    {
      title: '가격',
      dataIndex: 'price',
    },
    {
      title: '원가',
      dataIndex: 'cost',
    },
    {
      title: '유통기한',
      dataIndex: 'exp',
    },
    {
      title: '',
      dataIndex: 'id',
      render: (id) => (
        <Popconfirm
          title="장바구니에 상품을 담으시겠습니까??"
          onConfirm={() => handleAddCart(id)}
          okText="네"
          cancelText="아니오"
        >
          <Button>
            <a>상품담기</a>
          </Button>
        </Popconfirm>
      ),
    },
  ];
  //


  return (
    <>
      {/* 실제 사용시 <h2></h2> 는 주석 처리나 삭제 해주세요 */}
      {/* <h2>점포에서 상품을 담기위해 product에서 장바구니를 담을 때 사용하는 페이지 입니다</h2> */}
      {/* <Divider /> */}
      <>
        {/* <Table
          dataSource={productData.map((item) => ({ ...item, key: item.id }))}
          columns={columns}
          scroll={{ y: 370, }}
          pagination={{ pageSize: 5000, }}
        /> */}

        
      <table className={styles.table}>
        <thead>
          <tr>
            <th>SKU</th>
            <th>상품 이름</th>
            <th>본사재고</th>
            <th>현재고</th>
            <th>매입가</th>
            <th>판매가</th>
            <th>카트담기버튼</th>
          </tr>
        </thead>
        <tbody>
          {/* {sortedProducts.map((item) => ( */}
          { productData && productData.map((item) => (
   
            <tr key={item.id}>
              <td>{item.product_code}</td>
              <td>
                <Link to={`/product/detail/${item.id}`}>
                  ({item.brand})
                  {item.name}
                </Link>
              </td>
              <td>{item.qnt}</td>
              <td>현재고 넣기</td>
              <td>{item.cost}</td>
              <td>{item.price}</td>
              <td>
              <Popconfirm
                title="장바구니에 상품을 담으시겠습니까??"
                onConfirm={() => handleAddCart(item.id)}
                okText="네"
                cancelText="아니오"
              >
                <Button>
                  <a>상품담기</a>
                </Button>
              </Popconfirm>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
    </>
  );
}

export default OrderProductList;