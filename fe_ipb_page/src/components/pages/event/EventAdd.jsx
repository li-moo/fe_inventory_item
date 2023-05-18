import React from 'react';
import { Form, Input, Button, Divider, DatePicker } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EventAdd() {
  const onFinish = (values) => {
    // const url_be = 'http://localhost:8080/event/add';
    const url_be = 'http://43.202.9.215:8080/event/add';

    //  #{name}, #{event_type_id}, #{imgname}, #{start_date}, #{end_date})

    axios.post(url_be, {
      name: values.name,
      event_type_id: values.event_type_id,
      start_date: values.start_date.format('YYYY-MM-DD'),
      end_date: values.end_date.format('YYYY-MM-DD'),
      imgname: values.imgname,
    })
      .then(function (response) {
        console.log(response.data);
        console.log(response.status);
        console.log(response.headers);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <>
      <h1>Event Add</h1>
      <Divider />

      <Form className="w-1/2" onFinish={onFinish}>
        <Form.Item label="이벤트 이름" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="이벤트 타입 아이디" name="event_type_id">
          <Input placeholder="예) 1, 2, 3" />
        </Form.Item>

        <Form.Item label="시작 날짜" name="start_date">
          <DatePicker />
        </Form.Item>

        <Form.Item label="마지막 날짜" name="end_date">
          <DatePicker />
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

export default EventAdd;
