import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Divider } from 'antd';
import axios from 'axios';

function ProductAdd() {

  const onFinish = (values) => {
    // const url_be = "http://localhost:8080/product/add";
    const url_be = "http://43.202.9.215:8080/product/add";

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
          product_info_id: values.product_info_id,
          qnt: values.qnt,
          price: values.price,
          cost: values.cost,
          exp: values.exp,
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
      <h1>Product Add</h1>
      <Divider />

      <Form
        className='w-1/2'
        onFinish={onFinish}
      >
        <Form.Item label="프로덕트 인포 아이디" name="product_info_id">
          <Input />
        </Form.Item>

        <Form.Item label="수량" name="qnt">
          <Input />
        </Form.Item>

        <Form.Item label="판매가" name="price">
          <Input />
        </Form.Item>

        <Form.Item label="원가" name="cost">
          <Input />
        </Form.Item>
        
        <Form.Item label="유통기한" name="exp">
          <Input placeholder='예) 2023-12-20' />
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