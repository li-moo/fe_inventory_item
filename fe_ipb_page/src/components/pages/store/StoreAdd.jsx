import React from 'react';
import { Form, Input, Button, Divider } from 'antd';
import axios from 'axios';
import { Link } from "react-router-dom";

function StoreAdd() {

  const onFinish = (values) => {
    const url_be = `${process.env.REACT_APP_BE_API}/store/add`;
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
      <h3>점포 등록</h3>
      <Divider />

      <Form
        className='w-1/2'
        onFinish={onFinish}
      >
        <Form.Item label="점포 이름" name="name" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
          <Input style={{ width: '50%' }} />
        </Form.Item>

        <Form.Item label="주소" name="location" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
          <Input style={{ width: '50%' }} />
        </Form.Item>

        <Form.Item label="전화번호" name="number" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
          <Input style={{ width: '50%' }} placeholder='예) 02-1234-5678' />
        </Form.Item>

        <Form.Item label="지역" name="area" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
          <Input style={{ width: '50%' }} />
        </Form.Item>

        <Form.Item label="점포 사진" name="imgname" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
          <Input style={{ width: '50%' }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 7, span: 18 }}>
          <Button type="primary" htmlType="submit">
            저장
          </Button>
        </Form.Item>

      </Form>

    </>
  );
}

export default StoreAdd;