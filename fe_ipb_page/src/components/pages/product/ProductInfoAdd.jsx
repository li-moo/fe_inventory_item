import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Divider, message, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

function ProductInfoAdd() {

  const navigate = useNavigate();
  const [categoryOptions, setCategoryOptions] = useState([]); // 카테고리 옵션 목록

  useEffect(() => {
    // 카테고리 옵션 목록을 초기화하는 함수
    const initializeCategoryOptions = () => {
      // 카테고리 데이터를 직접 작성하여 초기화
      const categories = [
        { id: 1, name: '과자' },
        { id: 2, name: '신선식품' },
        { id: 3, name: '주류' },
        { id: 4, name: '과일' },
        { id: 5, name: '생선' },
        { id: 6, name: '냉장식품' },
        { id: 7, name: '냉동식품' },
        { id: 8, name: '빵' },
        { id: 9, name: '의약품' },
        { id: 10, name: '가구' },
        { id: 11, name: '식물' },
        { id: 12, name: '음료' },
        { id: 13, name: '김밥' },
      ];
      const options = categories.map((category) => (
        <Option key={category.id} value={category.id}>
          {category.name}
        </Option>
      ));
      setCategoryOptions(options);
    };
    initializeCategoryOptions(); // 카테고리 옵션 목록 초기화
  }, []);

  const onFinish = (values) => {
    const url_be = `${process.env.REACT_APP_BE_API}/productInfo/add`;

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
          product_code: values.product_code,
          name: values.name,
          brand: values.brand,
          category_id: values.category_id,
          storage: values.storage,
          box_qnt: values.box_qnt,
          safe_qnt: values.safe_qnt,
          detail: values.detail,
          imgname: values.imgname,
        }
      }
    ).then(() => {
        navigate('/productinfolist');
      }
    ).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      message.error('상품정보 등록에 실패했습니다');
    })
  };




  return (
    <>
      <h3>상품 기본정보 등록</h3>
      <Divider />

      <Form
        className='w-1/3'
        onFinish={onFinish}
      >
        <Form.Item label="이미지" name="imgname" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
          <Input style={{ width: '50%' }}/>
        </Form.Item>

        <Form.Item label="SKU" name="product_code" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
          <Input style={{ width: '50%' }}/>
        </Form.Item>

        <Form.Item label="상품이름" name="name" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
          <Input style={{ width: '50%' }}/>
        </Form.Item>

        <Form.Item label="제조사" name="brand" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
          <Input style={{ width: '50%' }}/>
        </Form.Item>
        
        <Form.Item label="카테고리" name="category_id" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
          <Select style={{ width: '50%' }}>
            {categoryOptions}
          </Select>
        </Form.Item>

        <Form.Item label="보관방법" name="storage" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
          <Input style={{ width: '50%' }}/>
        </Form.Item>

        <Form.Item label="입수" name="box_qnt" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
          <Input style={{ width: '50%' }}/>
        </Form.Item>

        <Form.Item label="안전재고" name="safe_qnt" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
          <Input style={{ width: '50%' }}/>
        </Form.Item>

        <Form.Item label="상세설명" name="detail" labelCol={{ span: 2 }} wrapperCol={{ span: 12 }}>
          <Input style={{ width: '50%' }}/>
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

export default ProductInfoAdd;