import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Divider, DatePicker, Select } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

function EventAdd() {

  const [eventTypeOptions, setEventTypeOptions] = useState([]); // 이벤트타입 옵션 목록
  const navigate = useNavigate();
  
  useEffect(() => {
    // 카테고리 옵션 목록을 초기화하는 함수
    const initializeEventTypeOptions = () => {
      // 카테고리 데이터를 직접 작성하여 초기화
      const eventType = [
        { id: 1, name: '1+1 이벤트' },
        { id: 2, name: '2+1 이벤트' },
        { id: 3, name: '3+1 이벤트' },
        { id: 4, name: '반값할인' },
      ];
      const options = eventType.map((eventType) => (
        <Option key={eventType.id} value={eventType.id}>
          {eventType.name}
        </Option>
      ));
      setEventTypeOptions(options);
    };
    initializeEventTypeOptions(); // 카테고리 옵션 목록 초기화
  }, []);

  const onFinish = (values) => {
    const url_be = `${process.env.REACT_APP_BE_API}/event/add`;
    //  #{name}, #{event_type_id}, #{imgname}, #{start_date}, #{end_date})

    axios.post(url_be, {
      name: values.name,
      event_type_id: values.event_type_id,
      start_date: values.start_date.format('YYYY-MM-DD'),
      end_date: values.end_date.format('YYYY-MM-DD'),
      imgname: values.imgname,
    })
      .then(function (response) {
        navigate("/event");
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
      <h1>이벤트 추가</h1>
      <Divider />

      <Form className="w-1/2" onFinish={onFinish}>
        <Form.Item label="이벤트 이름" name="name" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
          <Input style={{ width: '50%' }}/>
        </Form.Item>

        <Form.Item label="이벤트 타입" name="event_type_id" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
          <Select style={{ width: '50%' }}>
            {eventTypeOptions}
          </Select>
        </Form.Item>

        <Form.Item label="이벤트 배너" name="imgname" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
          <Input style={{ width: '50%' }}/>
        </Form.Item>

        <Form.Item label="시작 날짜" name="start_date" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
          <DatePicker />
        </Form.Item>

        <Form.Item label="마지막 날짜" name="end_date" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
          <DatePicker />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 7, span: 18 }}>
          <Button type="primary" htmlType="submit" >
            저장
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default EventAdd;
