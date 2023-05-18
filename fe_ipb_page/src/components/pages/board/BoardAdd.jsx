import React from 'react';
import { Form, Input, Button, Divider } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BoardAdd() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // const url_be = "http://localhost:8080/board/add";
    const url_be = "http://43.202.9.215:8080/board/add";

    axios(url_be, {
      method: 'post',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        withCredentials: true,
        mode: 'no-cors'
      },
      data: {
        title: values.title,
        body_text: values.body_text,
        staff_id: values.staff_id,
        imgname: values.imgname,
      }
    })
      .then(() => {
        // Redirect to the Board page after successful form submission
        navigate("/board");
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  return (
    <>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>게시글 작성</h2>
      <Divider />
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="title" label="제목" rules={[{ required: true, message: '제목을 입력해주세요.' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="body_text" label="내용" rules={[{ required: true, message: '내용을 입력해주세요.' }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="staff_id" label="스태프 아이디" rules={[{ required: true, message: '제목을 입력해주세요.' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="imgname" label="이미지 네임" rules={[{ required: true, message: '제목을 입력해주세요.' }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">게시글 작성</Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default BoardAdd;
