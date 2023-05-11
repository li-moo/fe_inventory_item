import React from 'react';
import { Button, Divider } from "antd";
import ProductList from './ProductList';
import { Link } from 'react-router-dom';


function Product() {
  return (
    <>
    <h2>제목: 상품 리스트 </h2>
    <Button>
      <Link to="product/add">상품 등록하러가기</Link>
    </Button>
      <Divider />
    <ProductList />
    </>
  );
}

export default Product;