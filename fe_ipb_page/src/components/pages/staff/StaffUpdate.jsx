import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';


const StaffUpdate = () => {
  const { id } = useParams();
  const [stateId, setStateId] = useState(id);

  // useEffect (() => {
  //   // setStateId(id);
  //   console.log(">>>>>>id", id)
    // console.log(">>>>>>stateid", stateId)
  // }, [id]);

  const handleChange = (e) => {
    console.log(">>>>>>stateid", e.target.value)
    console.log(">>>>>>stateid", id)
    // e.target.value = id;
    setStateId(id);
  };

  const initialValues = {
    id: stateId,
  };


  const onFinish = async (values) => {

    try {
      await fetch(`http://localhost:8080/staff/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      console.log('업데이트 성공!');
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Form 
      initialValues={initialValues}
      onFinish={onFinish}>
      <Form.Item label="아이디" name="id">
        <Input value={id} onChange={handleChange} readOnly/>
      </Form.Item>
      <Form.Item label="비밀번호" name="pwd">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          수정하기
        </Button>
      </Form.Item>
    </Form>
  );
};

export default StaffUpdate;