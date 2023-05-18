import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Divider } from 'antd';
import axios from 'axios';
import { Link } from "react-router-dom";

function StoreAdd() {

  const onFinish = (values) => {
    // const url_be = "http://localhost:8080/store/add";
    const url_be = "http://43.202.9.215:8080/store/add";

    axios(url_be,
      {
        method: 'post',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          withCredentials: true,
          mode: 'no-cors'
        },
        data: { //넣어야 하는 값 (NULL, #{name}, #{location}, #{number}, #{imgname}, #{area})
          name: values.name,
          location: values.location,
          number: values.number,
          imgname: values.imgname,
          area: values.area,
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
      <h1>Store Add</h1>
      <Divider />

      <Form
        className='w-1/2'
        onFinish={onFinish}
      >
        <Form.Item label="점포 이름" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="주소" name="location">
          <Input />
        </Form.Item>

        <Form.Item label="전화번호" name="number">
          <Input placeholder='예) 02-1234-5678'/>
        </Form.Item>

        <Form.Item label="지역" name="area">
          <Input />
        </Form.Item>
        
        <Form.Item label="점포 사진" name="imgname">
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

export default StoreAdd;