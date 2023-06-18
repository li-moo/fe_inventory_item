import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Input, message } from 'antd';
import style from './ProductDetail.module.css';
import axios from 'axios';

function ProductInfoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BE_API}/productInfo/detail?product_code=${id}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BE_API}/productInfo/update?product_code=${product.product_code}`, product);
      message.success('상품 정보가 성공적으로 업데이트되었습니다.');
      setIsEditing(false);
      fetchProductDetails(); // 페이지 새로고침
    } catch (error) {
      console.log(error);
      message.error('상품 정보 업데이트에 실패했습니다.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const toggleEditing = () => {
    setIsEditing((prevState) => !prevState);
  };

  return (
    <>
      <div>
        {product && (
          <div className={style.productWrap}>
            <ul>
              <li>
                <div className={style.left}>
                  <img src={product.imgname} alt={product.detail} />
                </div>
                <div className={style.right}>
                  <div>{product.category_name}</div>
                  <h2>{product.name}</h2>
                  <p>SKU: {product.product_code}</p>
                  <p>제조사: {product.brand}</p>
                  <p>보관방법: {product.storage}</p>
                  <p>입수: {product.box_qnt}</p>
                  <p>안전재고: {product.safe_qnt}</p>
                </div>
              </li>
            </ul>

            <div className={style.ProductDetail}>
              <h4>상품 상세 설명</h4>
              <p>{product.detail}</p>
            </div>

            <div className={style.formContainer}>
              {!isEditing ? (
                <Button type="primary" onClick={toggleEditing}>
                  수정
                </Button>
              ) : (
                <>
                  <h4>상품 정보 수정</h4>
                  <form>
                    <div className={style.formItem}>
                      <label>이미지</label>
                      <Input name="imgname" value={product.imgname} onChange={handleInputChange} disabled />
                    </div>

                    <div className={style.formItem}>
                      <label>SKU</label>
                      <Input name="product_code" value={product.product_code} onChange={handleInputChange} disabled />
                    </div>

                    <div className={style.formItem}>
                      <label>이름</label>
                      <Input name="name" value={product.name} onChange={handleInputChange} />
                    </div>

                    <div className={style.formItem}>
                      <label>제조사</label>
                      <Input name="brand" value={product.brand} onChange={handleInputChange} />
                    </div>

                    <div className={style.formItem}>
                      <label>보관방법</label>
                      <Input name="storage" value={product.storage} onChange={handleInputChange} disabled />
                    </div>

                    <div className={style.formItem}>
                      <label>입수</label>
                      <Input name="box_qnt" value={product.box_qnt} onChange={handleInputChange} disabled />
                    </div>

                    <div className={style.formItem}>
                      <label>상세설명</label>
                      <Input.TextArea
                        name="detail"
                        value={product.detail}
                        onChange={handleInputChange}
                        autoSize={{ minRows: 3, maxRows: 5 }}
                      />
                    </div>

                    <div className={style.formItem}>
                      <Button type="primary" onClick={updateProduct}>
                        저장
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductInfoDetail;
