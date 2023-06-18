import React, { useState, useEffect } from 'react';
import { Popconfirm, Button, Pagination, Input } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { logInState } from "../../state/loginState";
import { useRecoilState } from 'recoil';
import styles from './OrderProductList2210.module.css';
import { SearchOutlined } from '@ant-design/icons';
import { BsCart4 } from "react-icons/bs";
import { CiShoppingCart } from "react-icons/ci";

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
          style={{ position: 'static', zIndex: 1 }}
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
        <div style={{ overflowX: 'auto', maxHeight: '469px' }}>
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
                  {/* <td>{addComma(item.qnt)}</td> */}
                  <td>{addComma(item.all_qnt)}</td>
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
                      title="발주 예정 목록에 상품을 담으시겠습니까?"
                      onConfirm={() => handleAddCart(item.id)}
                      okText="네"
                      cancelText="아니요"
                    >
                      <Button
                        style={{ position: 'static', zIndex: 1 }}
                      >
                        <CiShoppingCart size={{ width: '4px' }} />
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

