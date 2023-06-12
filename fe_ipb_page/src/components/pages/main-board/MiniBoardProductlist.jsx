import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { logInState } from '../../state/loginState';
import axios from 'axios';
import { Table, Select, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import "../main-board/MiniBoardProductlist.css"; // CSS import

const { Option } = Select;
const { Search } = Input;

function MiniBoardProductlist() {
  const [storeProductData, setStoreProductData] = useState([]);
  const [filteredProductData, setFilteredProductData] = useState([]);
  const [logInData, setLogInData] = useRecoilState(logInState);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredProducts = filteredProductData.filter((item) =>
    item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.product_code.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchData = () => {
    const url_be = `${process.env.REACT_APP_BE_API}/storeproduct/list/${logInData.store_id}`;

    axios
      .get(url_be)
      .then((res) => {
        setStoreProductData(res.data);
        setFilteredProductData(res.data);
      })
      .catch((err) => console.log("storeProductList/err", err));
  };

  const handleCategoryChange = (value) => {
    if (value === "") {
      setFilteredProductData(storeProductData);
    } else {
      const filteredData = storeProductData.filter((item) => item.category_name === value);
      setFilteredProductData(filteredData);
    }
  };

  const handleStorageChange = (value) => {
    if (value === "") {
      setFilteredProductData(storeProductData);
    } else {
      const filteredData = storeProductData.filter((item) => item.storage === value);
      setFilteredProductData(filteredData);
    }
  };

  const columns = [
    {
      title: 'SKU',
      dataIndex: 'product_code',
      width: 100,
    },
    {
      title: '상품 이름',
      dataIndex: 'product_name',
      render: (text, record) => (
        <Link to={`/storeproduct/detail/${record.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          [{record.brand}]
          {text}
        </Link>
      ),
      width: 500,
      sorter: (a, b) => a.product_name.localeCompare(b.product_name),
    },
    {
      title: '재고',
      dataIndex: 'qnt',
      width: 350,
      sorter: (a, b) => a.qnt - b.qnt,
    },
    {
      title: '판매가',
      dataIndex: 'price',
      width: 500,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: '보관방법',
      dataIndex: 'storage',
      width: 350,
      sorter: (a, b) => a.storage.localeCompare(b.storage),
    },
  ];

  const tableStyle = {
    maxHeight: '400px',
    width: '400px',
    overflowY: 'scroll',
    fontSize: '10px', // Decreased the font size
  };

  return (
    <>
      {/* <div>
      </div>
      <div>
        <Select
          value=""
          onChange={handleCategoryChange}
          placeholder="카테고리"
          style={{ width: 100, marginRight: 10 }}
        >
          {storeProductData
            .reduce((uniqueCategories, product) => {
              if (!uniqueCategories.includes(product.category_name)) {
                uniqueCategories.push(product.category_name);
              }
              return uniqueCategories;
            }, [])
            .map((category, index) => (
              <Option key={index} value={category}>
                {category}
              </Option>
            ))}
        </Select>
        <Select
          value=""
          onChange={handleStorageChange}
          placeholder="보관방법"
          style={{ width: 100, marginRight: 10 }}
        >
          {storeProductData
            .reduce((uniqueCategories, product) => {
              if (!uniqueCategories.includes(product.storage)) {
                uniqueCategories.push(product.storage);
              }
              return uniqueCategories;
            }, [])
            .map((storage, index) => (
              <Option key={index} value={storage}>
                {storage}
              </Option>
            ))}
        </Select>
        <Search
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="상품 이름, SKU 검색"
          enterButton={<SearchOutlined />}
          style={{ width: 200 }}
        />
      </div> */}

      <div style={tableStyle} className="scrollbar custom-scroll">
        <Table
          dataSource={filteredProducts}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </div>
    </>
  );
}

export default MiniBoardProductlist;
