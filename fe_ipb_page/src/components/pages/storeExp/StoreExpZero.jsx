import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { logInState } from '../../state/loginState';
import styles from './StoreExp.module.css';
import axios from 'axios';
import { Divider, Input, Modal, Popconfirm, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

function StoreExpZero() {
  const [storeProductData, setStoreProductData] = useState([]);
  const [logInData, setLogInData] = useRecoilState(logInState);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProductData, setFilteredProductData] = useState([]);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayDate = `${year}-${month}-${day}`;

  useEffect(() => {
    fetchData();
  }, []);

  const url_be = `http://localhost:8080/storeproduct/list/${logInData.store_id}`;
  // const url_be = `http://43.202.9.215:8080/storeproduct/list/${logInData.store_id}`;

  const fetchData = () => {
    axios(url_be, {
      method: 'get'
    })
      .then((res) => {
        console.log("storeExp->res.data::", res.data);
        const addData = res.data.map((item) => ({
          ...item,
          addData: subtractDates(todayDate, item.exp),
        }));
        setStoreProductData(addData)
      })
      .catch((err) => console.log("storeexp/err", err))
  }

  const subtractDates = (date1, date2) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round((new Date(date2) - new Date(date1)) / oneDay);
    return diffDays;
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredProducts = storeProductData.filter((item) =>
    item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.product_code.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 유통기한별로 테이블 정렬
  const sortedProducts = filteredProducts.sort((a, b) => {
    return new Date(a.exp) - new Date(b.exp);
  });

  // console.log("sortedProductssortedProducts>>",sortedProducts);
    // 셀렉트 박스
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
    // 셀렉트 박스

  return (
    <>
    <div>
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
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>SKU Code</th>
            <th>상품 이름</th>
            <th>재고</th>
            <th>판매가</th>
            <th>유통기한</th>
            <th>--</th>
            <th>폐기 버튼</th>
            {/* <th>유통기한연산</th>
            <th>유통기한연산CSS</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((item) => {
            if (item.addData <= -1 ) {
              return (
                <tr key={item.id}>
                  <td>{item.product_code}</td>
                  <td>
                    <Link to={`/product/detail/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                      ({item.brand})
                      {item.product_name}
                    </Link>
                  </td>
                  <td>{item.qnt}</td>
                  <td>{item.price}</td>
                  <td>
                    {/* <div className={styles.expTd}>
                      {item.addData <= -1 && <p className={styles.redExp}></p>}
                      {item.addData > -1 && item.addData <= 3 && <p className={styles.yellowExp}></p>}
                      {item.addData > 3 && item.addData <= 5 && <p className={styles.greenExp}></p>}
                      {item.addData > 5 && item.addData <= 7 && <p className={styles.blueExp}></p>}
                      {item.addData > 7 && <span>{item.addData}</span>}
                      {item.exp}
                    </div> */}
                    <div className={styles.expTd}>
                      {item.addData <= -1  && (
                        <>
                          <p className={styles.redExp}></p>
                          {item.exp}
                        </>
                      )}
                    </div>
                  </td>
                  <td style={{ color: 'gray' }}>{item.addData}</td>
                  <td>
                    <Popconfirm
                      title="이 상품을 폐기를 하시겠습니까??"
                      // onConfirm={() => handleAddCart(item.id)}
                      okText="네"
                      cancelText="아니오"
                    >
                      <Button >
                        폐기
                      </Button>
                    </Popconfirm>
                  </td>
                  {/* <td>{item.addData}</td> 
                   <td>
                    {item.addData <= -1 && <p className={styles.redExp}></p>}
                    {item.addData > -1 && item.addData <= 3 && <p className={styles.yellowExp}></p>}
                    {item.addData > 3 && item.addData <= 5 && <p className={styles.greenExp}></p>}
                    {item.addData > 5 && item.addData <= 7 && <p className={styles.blueExp}></p>}
                    {item.addData > 7 && <span>{item.addData}</span>}
                  </td>  */}

                </tr>
              );
            } else {
              return null;
            }

          })}
        </tbody>
      </table>
    </>
  );
}

export default StoreExpZero