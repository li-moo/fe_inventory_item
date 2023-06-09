import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { logInState } from '../../state/loginState';
import axios from 'axios';
import styles from './StoreProductList2110.module.css';
import { Divider, Input, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

function StoreProductList2110() {
  const [storeProductData, setStoreProductData] = useState([]);
  const [sortedProductData, setSortedProductData] = useState([]);
  const [logInData, setLogInData] = useRecoilState(logInState);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortingOrder, setSortingOrder] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = () => {
    const url_be = `${process.env.REACT_APP_BE_API}/storeproduct/list/${logInData.store_id}`;

    axios
      .get(url_be)
      .then((res) => {
        setStoreProductData(res.data);
        setSortedProductData(res.data);
      })
      .catch((err) => {

      });
  };

  const handleSort = () => {
    if (sortingOrder === null || sortingOrder === "desc") {
      const sortedData = [...sortedProductData].sort((a, b) => a.qnt - b.qnt);
      setSortedProductData(sortedData);
      setSortingOrder("asc");
    } else {
      const sortedData = [...sortedProductData].sort((a, b) => b.qnt - a.qnt);
      setSortedProductData(sortedData);
      setSortingOrder("desc");
    }
  };


  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === "") {
      setSortedProductData(storeProductData);
    } else {
      const filteredData = storeProductData.filter(
        (item) => item.category_name === selectedCategory
      );
      setSortedProductData(filteredData);
    }
  };

  const handleStorageChange = (e) => {
    const selectedStorage = e.target.value;
    if (selectedStorage === "") {
      setSortedProductData(storeProductData);
    } else {
      const filteredData = storeProductData.filter(
        (item) => item.storage === selectedStorage
      );
      setSortedProductData(filteredData);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredProducts = sortedProductData.filter(
    (item) =>
      item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.product_code.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  }


  return (
    <>
      <div>
        <h4>재고 관리</h4>
      </div>
      <div className={styles.schSel}>
        <select
          name="productCategory"
          onChange={handleCategoryChange}
          className={styles.selectBox}
        >
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
        <select
          name="productStorage"
          onChange={handleStorageChange}
          className={styles.selectBox}
        >
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
        <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <Search
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="상품 이름, SKU 검색"
            // enterButton={<SearchOutlined />}
            className={styles.searchInput}
            style={{ position: 'static', zIndex: 1 }}
          />
        </div>

      </div>
      <div className={styles.scrollContainer} style={{ overflowX: 'auto', maxHeight: '469px' }}>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>자동발주</th>
              <th>SKU</th>
              <th>상품 이름</th>
              <th>보관방법</th>
              <th onClick={handleSort}>재고</th>
              <th>원가</th>
              <th>판매가</th>
              <th>유통기한</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((item) => (
              <tr key={item.id}>
                <td>{item._auto ? '●' : ''}</td>
                <td>
                  <Link
                    to={`/storeproduct/detail/${item.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {item.product_code}
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/storeproduct/detail/${item.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    [{item.brand}]{' '}
                    {item.product_name}
                  </Link>
                </td>
                <td>{item.storage}</td>
                {/* <td>{addComma(item.qnt)}</td> */}
                <td>{addComma(item.sp_qnt)}</td>
                <td>{addComma(item.cost)}</td>
                <td>{addComma(item.price)}</td>
                <td>{item.exp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default StoreProductList2110;




