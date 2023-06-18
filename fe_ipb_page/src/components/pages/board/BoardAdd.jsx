import React from 'react';
import { Form, Input, Button, Divider } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BoardAdd() {
  const navigate = useNavigate();
  const [form] = Form.useForm();


  const onFinish = (values) => {
    const url_be = `${process.env.REACT_APP_BE_API}/board/add`;

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

        }
      });
  };

  return (
    <>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>게시글 작성</h2>
      <Divider />
      <Form form={form} onFinish={onFinish}>

        <Form.Item
          name="title" label="제목"
          rules={[{ required: true, message: '제목을 입력해주세요.' }]}
          labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="body_text" label="내용"
          rules={[{ required: true, message: '내용을 입력해주세요.' }]}
          labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="staff_id" label="스태프 아이디"
          rules={[{ required: true, message: '제목을 입력해주세요.' }]}
          labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="imgname" label="이미지"
          rules={[{ required: true, message: '제목을 입력해주세요.' }]}
          labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 7, span: 18 }}>
          <Button type="primary" htmlType="submit">작성완료</Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default BoardAdd;
