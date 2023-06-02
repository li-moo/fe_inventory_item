import React from 'react';
import { Button, Divider } from "antd";
import ProductList from './ProductList';
import { Link } from 'react-router-dom';


function Product() {
  return (
    <>
    <h2>상품조회</h2>
      <Divider />
    <ProductList />
    </>
  );
}

export default Product;