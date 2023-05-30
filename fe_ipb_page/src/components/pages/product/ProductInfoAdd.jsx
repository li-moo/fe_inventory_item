import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Divider } from 'antd';
import axios from 'axios';

function ProductAdd() {

  const onFinish = (values) => {
    const url_be = "http://localhost:8080/productInfo/add";
    // const url_be = "http://43.202.9.215:8080/product/add";

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
          product_code: values.product_code,
          name: values.name,
          brand: values.brand,
          category_id: values.category_id,
          storage: values.storage,
          box_qnt: values.box_qnt,
          detail: values.detail,
          imgname: values.imgname,
        }
      }
    ).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    })
  };




  return (
    <>
      <h1>상품 기본정보 등록</h1>
      <Divider />

      <Form
        className='w-1/2'
        onFinish={onFinish}
      >
        <Form.Item label="이미지" name="imgname">
          <Input />
        </Form.Item>

        <Form.Item label="SKU" name="product_code">
          <Input />
        </Form.Item>

        <Form.Item label="이름" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="제조사" name="brand">
          <Input />
        </Form.Item>
        
        <Form.Item label="카테고리" name="category_id">
          <Input />
        </Form.Item>

        <Form.Item label="보관방법" name="storage">
          <Input />
        </Form.Item>

        <Form.Item label="입수" name="box_qnt">
          <Input />
        </Form.Item>

        <Form.Item label="상세설명" name="detail">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            저장
          </Button>
        </Form.Item>
        
      </Form>

    </>
  );
}

export default ProductAdd;