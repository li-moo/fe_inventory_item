import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Divider, message } from 'antd';
import axios from 'axios';
import { Link } from "react-router-dom";



function StaffAdd() {

  const onFinish = (values) => {
    // const url_be = "http://localhost:8080/staff/add";
    const url_be = "http://43.202.9.215:8080/staff/add";

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
          store_id: values.store_id,
          name: values.name,
          login_id: values.login_id,
          pwd: values.pwd,
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
  
  function handleSave() {
    // 알림 메시지 표시
    message.success('저장되었습니다.');
  }



  return (
    <>
      <h1>스태프 에드</h1>
      <Divider />

      <Form
        className='w-1/2'
        onFinish={onFinish}
      >
        <Form.Item label="점포 아이디" name="store_id">
          <Input />
        </Form.Item>

        <Form.Item label="이름" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="로그인 아이디" name="login_id">
          <Input />
        </Form.Item>

        <Form.Item label="패스워드" name="pwd">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={handleSave}>
            저장
          </Button>
        </Form.Item>

        <Link to="/staff" className="min-w-[8rem] link-with-icon">
          <Button> 직원 목록 페이지로 </Button>
        </Link>
        
      </Form>

    </>
  );
}

export default StaffAdd;