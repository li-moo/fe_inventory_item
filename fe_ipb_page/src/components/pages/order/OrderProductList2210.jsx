// import React, { useState, useEffect } from 'react';
// import { Popconfirm, Button, Pagination, Input } from 'antd';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { logInState } from "../../state/loginState";
// import { useRecoilState } from 'recoil';
// import styles from './OrderProductList.module.css';
// import { SearchOutlined } from '@ant-design/icons';

// const { Search } = Input;

// function OrderProductList(props) {
//   const [productData, setProductData] = useState([]);
//   const [logInData, setLogInData] = useRecoilState(logInState);
//   const [storeProductData, setStoreProductData] = useState([]);
//   const [qntStoreProductData, setQntStoreProductData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredProductData, setFilteredProductData] = useState([]);

//   // let dataList = [];

//   console.log("-->> storeProductData.map.qnt", storeProductData.map.qnt);

//   // const url_be = "http://43.202.9.215:8080/product/list";
//   // const url_be = "http://localhost:8080/product/list";
//   // const url_be = `http://localhost:8080/product/list?page=${currentPage}&pageSize=${pageSize}`;
//   const url_be = `http://localhost:8080/product/list`;

//   useEffect(() => {
//     fetchData()
//   }, []);

//   const fetchData = () => {
//     // const retProductList = [];
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
//         setFilteredProductData(res.data);


//       })
//       .catch((err) => console.log("orderproductlist/err", err));
//     // return retProductList;
//   }

//   // 현재고를 뽑기 위한 fetch -> qnt
//   // const url_be_stp = `http://localhost:8080/storeproduct/list/${logInData.store_id}`;

//   // useEffect(() => {
//   //   let productDataList = fetchData();
//   //   const getStoreProduct = async () => {
//   //     console.log("[logInData.store_id]: ", logInData.store_id);
//   //     try {
//   //       const res = await axios
//   //         .get(url_be_stp);
//   //       console.log("getStoreProduct/res:", res);
//   //       console.log("getStoreProduct/storeProdutList=>res.data:", res.data);
//   //       console.log("productData: ", productData);
//   //       setStoreProductData(res.data);

//   //       console.log("productDataList: ", productDataList);

//   //       const dataList = res.data.map((item, index) => ({
//   //         // 받아온 res.data를 item이라는 매개변수로 받음
//   //         // index = 0, 1, 2, 3, 4 . . .
//   //         ...productData[index],
//   //         // ...item,
//   //         currentQnt: item.qnt,

//   //       }));
//   //       // setQntStoreProductData(dataList);
//   //       setProductData(dataList)


//   //       console.log("---->dataList:", dataList);
//   //       console.log("---->qntStoreProductData:", qntStoreProductData);

//   //       const storeProductQntColumn = res.data.map(item => item.qnt);
//   //       console.log("storeProductQntColumn:", storeProductQntColumn);
//   //       // return storeProductQntColumn;
//   //       return storeProductQntColumn;
//   //     } catch (err) {
//   //       return console.log("storeProdutList/err", err);
//   //     }
//   //     // axios()
//   //     //   .then((res) => {
//   //     //     return res.data
//   //     //   })
//   //     //   .then((res) => {
//   //     //     console.log("storeProdutList", res);
//   //     //   })
//   //   };
//   //   getStoreProduct();
//   // }, []);
//   //
//   // ??? 재귀호출 ???
//   // getStoreProduct()
//   // .then(storeProductQntColumn => {
//   //   // 반환된 storeProductQntColumn 값을 사용합니다.
//   //   console.log("받아온 storeProductQntColumn:", storeProductQntColumn);
//   //   // ... 추가적인 작업 수행
//   // })
//   // .catch(error => {
//   //   console.error("getStoreProduct 에러:", error);
//   // });
//   // console.log("fetch 밖 storeProductQntColumn", storeProductQntColumn);

//   // Local Storage에서 logInState 객체 가져오기, 키 값을 입력해줘야 함
//   // localStorageString는 String 타입입니다
//   // const localStorageString = localStorage.getItem('recoil-persist');
//   // console.log(localStorageString);

//   // // localStorageString 문자열을 JavaScript 객체로 변환
//   // const localStorageobj = JSON.parse(localStorageString);
//   // console.log("localStorage : " + localStorageobj);

//   // // localStorageobj 객체에서 logInState 객체를 꺼냅니다
//   // const logInStateObj = localStorageobj["logInState"];
//   // console.log("logInState : " + logInStateObj);

//   // // logInState 객체의 점포아이디 값을 가져옵니다
//   // const storeId = logInStateObj["store_id"]
//   // console.log("storeId : " + storeId);

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
//           store_id: logInData.store_id,
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

//   // const handleSearch = (value) => {
//   //   setSearchTerm(value);
//   // };
//   const handleSearch = (value) => {
//     setSearchTerm(value);
//     const filteredData = productData.filter((item) =>
//       item.name.toLowerCase().includes(value.toLowerCase()) ||
//       item.product_code.toString().toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredProductData(filteredData);
//   };

//   const filteredProducts = productData.filter((item) =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.product_code.toString().toLowerCase().includes(searchTerm.toLowerCase())
//   );
//    //셀렉트 박스
//    const handleCategoryChange = (e) => {
//     const selectedCategory = e.target.value;
//     if (selectedCategory === "") {
//       setFilteredProductData(filteredProducts);
//     } else {
//       const filteredData = filteredProducts.filter(
//         (item) => item.category_name === selectedCategory
//       );
//       setFilteredProductData(filteredData);
//     }
//   };
//   const handleStorageChange = (e) => {
//     const selectedStorage = e.target.value;
//     if (selectedStorage === "") {
//       setFilteredProductData(filteredProducts);
//     } else {
//       const filteredData = filteredProducts.filter(
//         (item) => item.storage === selectedStorage
//       );
//       setFilteredProductData(filteredData);
//     }
//   };
// //  // 셀렉트 박스

//   function addComma(num) {
//     var regexp = /\B(?=(\d{3})+(?!\d))/g;
//     return num.toString().replace(regexp, ',');
//   }

//   return (
//     <>
//     <div className={styles.schSel}>
//       <select name="productCategory" onChange={handleCategoryChange} className={styles.selectBox}>
//         <option value="">카테고리</option>
//         {productData
//           .reduce((uniqueCategories, product) => {
//             if (!uniqueCategories.includes(product.category_name)) {
//               uniqueCategories.push(product.category_name);
//             }
//             return uniqueCategories;
//           }, [])
//           .map((category, index) => (
//             <option key={index} value={category}>
//               {category}
//             </option>
//           ))}
//       </select>
//       <select name="productStorage" onChange={handleStorageChange} className={styles.selectBox}>
//         <option value="">보관방법</option>
//         {productData
//           .reduce((uniqueCategories, product) => {
//             if (!uniqueCategories.includes(product.storage)) {
//               uniqueCategories.push(product.storage);
//             }
//             return uniqueCategories;
//           }, [])
//           .map((storage, index) => (
//             <option key={index} value={storage}>
//               {storage}
//             </option>
//           ))}
//       </select>
//         <Search
//           value={searchTerm}
//           onChange={(e) => handleSearch(e.target.value)}
//           placeholder="상품 이름, SKU 검색"
//           // enterButton={<SearchOutlined />}
//           className={styles.searchInput}
//           style={{position: 'static', zIndex: 1 }}
//         />
//       </div>

//     {/* <div>
//       <Search
//         value={searchTerm}
//         onChange={(e) => handleSearch(e.target.value)}
//         placeholder="상품 이름, SKU 검색"
//         // enterButton={<SearchOutlined />}
//         className={styles.searchInput}
//       />
//     </div> */}
//       <>
//       <div style={{ overflowX: 'auto', maxHeight: '469px'}}>
//       <table className={styles.table}>
//           <thead>
//             <tr>
//             <th>SKU</th>
//               <th>상품 이름</th>
//               <th>본사재고</th>
//               <th>현재고</th>
//               <th>매입가</th>
//               <th>판매가</th>
//               <th>카트담기버튼</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* {qntStoreProductData && qntStoreProductData.map((item) => ( */}
//             {/* {productData && productData.map((item, index) => ( */}
//             {/* {filteredProducts.map((item, index) => ( */}
//             {filteredProductData.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.product_code}</td>
//                 <td>
//                   <Link to={`/product/detail/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
//                     ({item.brand})
//                     {item.name}
//                   </Link>
//                 </td>
//                 <td>{addComma(item.qnt)}</td>
//                 {/* <td>{item.currentQnt}</td> */}
//                 <td>{addComma(item.store_qnt)}</td>
//                 <td>{addComma(item.cost)}</td>
//                 <td>{addComma(item.price)}</td>

//                 {/* <td>{item.qnt}</td>
//                 <td>{item.store_qnt}</td>
//                 <td>{item.cost}</td>
//                 <td>{item.price}</td> */}

//                 <td>
//                   <Popconfirm
//                     title="장바구니에 상품을 담으시겠습니까??"
//                     onConfirm={() => handleAddCart(item.id)}
//                     okText="네"
//                     cancelText="아니오"
//                   >
//                     <Button
//                     style={{position: 'static', zIndex: 1 }}
//                     >
//                       상품담기
//                     </Button>
//                   </Popconfirm>
//                 </td>
//               </tr>
//             ))
//             }
//           </tbody>
//         </table>
//       </div>
// {/*        
//         <Pagination
//           current={currentPage}
//           pageSize={pageSize}
//           total={productData.length}
//           onChange={handlePageChange}
//         /> */}
//       </>
//     </>
//   );
// }

// export default OrderProductList;

import React, { useState, useEffect } from 'react';
import { Popconfirm, Button, Pagination, Input } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { logInState } from "../../state/loginState";
import { useRecoilState } from 'recoil';
import styles from './OrderProductList2210.module.css';
import { SearchOutlined } from '@ant-design/icons';
import { BsCart4 } from "react-icons/bs";

const { Search } = Input;

function OrderProductList2210(props) {
  const [productData, setProductData] = useState([]);
  const [logInData, setLogInData] = useRecoilState(logInState);
  const [storeProductData, setStoreProductData] = useState([]);
  const [qntStoreProductData, setQntStoreProductData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProductData, setFilteredProductData] = useState([]);

  // let dataList = [];

  console.log("-->> storeProductData.map.qnt", storeProductData.map.qnt);

  // const url_be = "http://43.202.9.215:8080/product/list";
  // const url_be = "http://localhost:8080/product/list";
  // const url_be = `http://localhost:8080/product/list?page=${currentPage}&pageSize=${pageSize}`;
  const url_be = `${process.env.REACT_APP_BE_API}/product/list/${logInData.store_id}`;

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = () => {
    // const retProductList = [];
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
        setFilteredProductData(res.data);


      })
      .catch((err) => console.log("orderproductlist/err", err));
    // return retProductList;
  }

  // 현재고를 뽑기 위한 fetch -> qnt
  // const url_be_stp = `http://localhost:8080/storeproduct/list/${logInData.store_id}`;

  // useEffect(() => {
  //   let productDataList = fetchData();
  //   const getStoreProduct = async () => {
  //     console.log("[logInData.store_id]: ", logInData.store_id);
  //     try {
  //       const res = await axios
  //         .get(url_be_stp);
  //       console.log("getStoreProduct/res:", res);
  //       console.log("getStoreProduct/storeProdutList=>res.data:", res.data);
  //       console.log("productData: ", productData);
  //       setStoreProductData(res.data);

  //       console.log("productDataList: ", productDataList);

  //       const dataList = res.data.map((item, index) => ({
  //         // 받아온 res.data를 item이라는 매개변수로 받음
  //         // index = 0, 1, 2, 3, 4 . . .
  //         ...productData[index],
  //         // ...item,
  //         currentQnt: item.qnt,

  //       }));
  //       // setQntStoreProductData(dataList);
  //       setProductData(dataList)


  //       console.log("---->dataList:", dataList);
  //       console.log("---->qntStoreProductData:", qntStoreProductData);

  //       const storeProductQntColumn = res.data.map(item => item.qnt);
  //       console.log("storeProductQntColumn:", storeProductQntColumn);
  //       // return storeProductQntColumn;
  //       return storeProductQntColumn;
  //     } catch (err) {
  //       return console.log("storeProdutList/err", err);
  //     }
  //     // axios()
  //     //   .then((res) => {
  //     //     return res.data
  //     //   })
  //     //   .then((res) => {
  //     //     console.log("storeProdutList", res);
  //     //   })
  //   };
  //   getStoreProduct();
  // }, []);
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
  // const localStorageString = localStorage.getItem('recoil-persist');
  // console.log(localStorageString);

  // // localStorageString 문자열을 JavaScript 객체로 변환
  // const localStorageobj = JSON.parse(localStorageString);
  // console.log("localStorage : " + localStorageobj);

  // // localStorageobj 객체에서 logInState 객체를 꺼냅니다
  // const logInStateObj = localStorageobj["logInState"];
  // console.log("logInState : " + logInStateObj);

  // // logInState 객체의 점포아이디 값을 가져옵니다
  // const storeId = logInStateObj["store_id"]
  // console.log("storeId : " + storeId);

  const handleAddCart = (id) => {
    const url_be = `${process.env.REACT_APP_BE_API}/cart/add`;

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

  // const handleSearch = (value) => {
  //   setSearchTerm(value);
  // };
  const handleSearch = (value) => {
    setSearchTerm(value);
    const filteredData = productData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.product_code.toString().toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProductData(filteredData);
  };

  const filteredProducts = productData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.product_code.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );
   //셀렉트 박스
   const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === "") {
      setFilteredProductData(filteredProducts);
    } else {
      const filteredData = filteredProducts.filter(
        (item) => item.category_name === selectedCategory
      );
      setFilteredProductData(filteredData);
    }
  };
  const handleStorageChange = (e) => {
    const selectedStorage = e.target.value;
    if (selectedStorage === "") {
      setFilteredProductData(filteredProducts);
    } else {
      const filteredData = filteredProducts.filter(
        (item) => item.storage === selectedStorage
      );
      setFilteredProductData(filteredData);
    }
  };
//  // 셀렉트 박스

  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  }

  return (
    <>
    <div className={styles.schSel}>
      <select name="productCategory" onChange={handleCategoryChange} className={styles.selectBox}>
        <option value="">카테고리</option>
        {productData
          .reduce((uniqueCategories, product) => {
            if (!uniqueCategories.includes(product.category_name)) {
              uniqueCategories.push(product.category_name);
            }
            return uniqueCategories;
          }, [])
          .map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
      </select>
      <select name="productStorage" onChange={handleStorageChange} className={styles.selectBox}>
        <option value="">보관방법</option>
        {productData
          .reduce((uniqueCategories, product) => {
            if (!uniqueCategories.includes(product.storage)) {
              uniqueCategories.push(product.storage);
            }
            return uniqueCategories;
          }, [])
          .map((storage, index) => (
            <option key={index} value={storage}>
              {storage}
            </option>
          ))}
      </select>
        <Search
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="상품 이름, SKU 검색"
          // enterButton={<SearchOutlined />}
          className={styles.searchInput}
          style={{position: 'static', zIndex: 1 }}
        />
      </div>

    {/* <div>
      <Search
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="상품 이름, SKU 검색"
        // enterButton={<SearchOutlined />}
        className={styles.searchInput}
      />
    </div> */}
      <>
      <div style={{ overflowX: 'auto', maxHeight: '469px'}}>
      <table className={styles.table}>
          <thead>
            <tr>
              <th>SKU</th>
              <th>상품 이름</th>
              <th>본사재고</th>
              <th>현재고</th>
              <th>매입가</th>
              <th>판매가</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* {qntStoreProductData && qntStoreProductData.map((item) => ( */}
            {/* {productData && productData.map((item, index) => ( */}
            {/* {filteredProducts.map((item, index) => ( */}
            {filteredProductData.map((item, index) => (
              <tr key={index}>
                <td>{item.product_code}</td>
                <td>
                  <Link to={`/product/detail/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    [{item.brand}]
                    {item.name}
                  </Link>
                </td>
                <td>{addComma(item.qnt)}</td>
                {/* <td>{item.currentQnt}</td> */}
                <td>{addComma(item.total_qnt)}</td>
                <td>{addComma(item.cost)}</td>
                <td>{addComma(item.price)}</td>

                {/* <td>{item.qnt}</td>
                <td>{item.store_qnt}</td>
                <td>{item.cost}</td>
                <td>{item.price}</td> */}

                <td>
                  <Popconfirm
                    title="장바구니에 상품을 담으시겠습니까??"
                    onConfirm={() => handleAddCart(item.id)}
                    okText="네"
                    cancelText="아니오"
                  >
                    <Button
                    style={{position: 'static', zIndex: 1 }}
                    >
                      <BsCart4 size={{ width: '4px'}} />
                    </Button>
                  </Popconfirm>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
{/*        
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={productData.length}
          onChange={handlePageChange}
        /> */}
      </>
    </>
  );
}

export default OrderProductList2210;