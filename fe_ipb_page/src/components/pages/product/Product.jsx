import React from 'react';
import { Divider } from "antd";
import ProductList from './ProductList';


function Product() {
  return (
    <>
    <h2>제목: 상품 리스트 </h2>
      <Divider />
    <ProductList />
    </>
  );
}

export default Product;