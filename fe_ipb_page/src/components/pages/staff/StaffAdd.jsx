import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Divider, Select, message } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const { Option } = Select;

function StaffAdd() {

  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BE_API}/storelist`);
        setOptions(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOptions();
  }, []);

  const onFinish = (values) => {
    const url_be = `${process.env.REACT_APP_BE_API}/staff/add`;
    // const url_be = "http://43.202.9.215:8080/staff/add";

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
    ).then(() => {
      navigate("/staff");
    })
    .catch(function (error) {
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

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchValue.toLowerCase())
  );



  return (
    <>
      <h2>직원 등록</h2>
      <Divider />

      <Form
        className='w-1/2'
        onFinish={onFinish}
      >
        <Form.Item label="점포" name="store_id" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
          <Select
            showSearch
            onSearch={handleSearch}
            filterOption={false}
            style={{ width: '50%' }}
          >
            {filteredOptions.map((option) => (
              <Option key={option.id} value={option.id}>
                {option.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="이름" name="name" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
          <Input style={{ width: '50%' }}/>
        </Form.Item>

        <Form.Item label="아이디" name="login_id" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
          <Input style={{ width: '50%' }}/>
        </Form.Item>

        <Form.Item label="패스워드" name="pwd" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
          <Input style={{ width: '50%' }}/>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 7, span: 18 }}>
          <Button type="primary" htmlType="submit" onClick={handleSave}>
            저장
          </Button>
        </Form.Item>

        {/* <Link to="/staff" className="min-w-[8rem] link-with-icon">
          <Button> 직원 목록 페이지로 </Button>
        </Link> */}
        
      </Form>

    </>
  );
}

export default StaffAdd;