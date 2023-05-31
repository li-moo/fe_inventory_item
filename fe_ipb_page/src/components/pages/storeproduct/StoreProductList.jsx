import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { logInState } from '../../state/loginState';
import axios from 'axios';
import styles from './StoreProductList.module.css';
import { Divider, Input, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

function StoreProductList() {
  const [storeProductData, setStoreProductData] = useState([]);
  const [filteredProductData, setFilteredProductData] = useState([]);
  const [logInData, setLogInData] = useRecoilState(logInState);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  //검색
  const handleSearch = (value) => {
    console.log(value);
    setSearchTerm(value);
  };


  // const filteredProducts = storeProductData.filter((item) =>
  // item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  // const filteredProductData = storeProductData.filter((item) =>
  // item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  //

  const filteredProducts = filteredProductData.filter((item) =>
    item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.product_code.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("filteredProductData>>>", filteredProductData);
  console.log("filteredProducts>>>", filteredProducts);

  const url_be = `http://localhost:8080/storeproduct/list/${logInData.store_id}`;

  const fetchData = () => {
    axios
      .get(url_be)
      .then((res) => {
        console.log("res:", res);
        console.log("storeProdutList=>res.data:", res.data);
        console.log("storeProdutList의 길이=>res.data.length:", res.data.length);
        setStoreProductData(res.data);
        setFilteredProductData(res.data);
      })
      .catch((err) => console.log("storeProdutList/err", err));
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === "") {
      setFilteredProductData(storeProductData);
    } else {
      const filteredData = storeProductData.filter(
        (item) => item.category_name === selectedCategory
      );
      setFilteredProductData(filteredData);
    }
  };
  const handleStorageChange = (e) => {
    const selectedStorage = e.target.value;
    if (selectedStorage === "") {
      setFilteredProductData(storeProductData);
    } else {
      const filteredData = storeProductData.filter(
        (item) => item.storage === selectedStorage
      );
      setFilteredProductData(filteredData);
    }
  };

  return (
    <>
      <div>
        <h4>재고 관리</h4>
      </div>
      <div className={styles.schSel}>
        <select name="productCategory" onChange={handleCategoryChange} className={styles.selectBox}>
          <option value="">카테고리</option>
          {storeProductData
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
          {storeProductData
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
          enterButton={<SearchOutlined />}
          className={styles.searchInput}
        />
        {/* <select name="productCategory" onChange={handleCategoryChange}>
          <option value="">전체</option>
          {storeProductData
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
        <select name="productStorage" onChange={handleStorageChange}>
          <option value="">전체</option>
          {storeProductData
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
        </select> */}
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>자동발주</th>
            <th>SKU</th>
            <th>상품 이름</th>
            <th>재고</th>
            <th>판매가</th>
            <th>유통기한</th>
            <th>보관방법</th>
          </tr>
        </thead>
        <tbody>
          {/* {sortedProducts.map((item) => ( */}
          {filteredProductData && filteredProducts.map((item) => (

            <tr key={item.id}>
              <td>-</td>
              <td>{item.product_code}</td>
              <td>
                <Link to={`/storeproduct/detail/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  ({item.brand})
                  {item.product_name}
                </Link>
              </td>
              <td>{item.qnt}</td>
              <td>{item.price}</td>
              <td>{item.exp}</td>
              <td>{item.storage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default StoreProductList;


