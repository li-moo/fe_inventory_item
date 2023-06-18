import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Divider, Select, DatePicker, ConfigProvider } from 'antd';
import axios from 'axios';
import koKR from 'antd/lib/locale/ko_KR'; // 한국어 언어 설정을 가져옵니다.
import moment from 'moment';
import 'moment/locale/ko';

moment.locale("ko");

const { Option } = Select;

function ProductAdd() {

  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [expDate, setExpDate] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BE_API}/productInfo/list`);
        setOptions(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOptions();
  }, []);

  const onFinish = (values) => {
    const url_be = `${process.env.REACT_APP_BE_API}/product/add`;

    // 선택한 날짜에서 시간을 잘라냅니다.
    const dateWithoutTime = moment(expDate).startOf('day');

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
          exp: dateWithoutTime.format('YYYY-MM-DD'),
        }
      }
    ).catch(function (error) {
      if (error.response) {
        console.log(error.response);
      }
    })
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleDateChange = (date, dateString) => {
    setExpDate(dateString);
  };


  return (
    <ConfigProvider locale={koKR}>
      <>
        <h2>상품등록</h2>
        <Divider />

        <Form
          className='w-1/2'
          onFinish={onFinish}
        >
          <Form.Item label="상품 기본정보" name="product_info_id" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
            <Select
              showSearch
              onSearch={handleSearch}
              filterOption={false}
              style={{ width: '50%' }}
            >
              {filteredOptions.map((option) => (
                <Option key={option.product_code} value={option.product_code}>
                  {option.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="수량" name="qnt" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
            <Input style={{ width: '50%' }} />
          </Form.Item>

          <Form.Item label="판매가" name="price" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
            <Input style={{ width: '50%' }} />
          </Form.Item>

          <Form.Item label="원가" name="cost" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
            <Input style={{ width: '50%' }} />
          </Form.Item>

          <Form.Item label="유통기한" name="exp" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
            <DatePicker onChange={handleDateChange} locale={moment.locale('ko')} format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 7, span: 18 }}>
            <Button type="primary" htmlType="submit">
              저장
            </Button>
          </Form.Item>

        </Form>

      </>
    </ConfigProvider>
  );
}

export default ProductAdd;