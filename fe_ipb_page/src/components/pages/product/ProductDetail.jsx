import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Typography, Grid } from 'antd';
import style from './ProductDetail.module.css';

const { Title, Text } = Typography;
const { Row, Col } = Grid;

function ProductDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState();


  useEffect(() => {
    fetch(`${process.env.REACT_APP_BE_API}/product/detail?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
      })
      .catch(err => console.log(err))
  }, [id]);

  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  }

  return (
    <>
      <div>
        {
          product && (
            <div className={style.productWrap}>
              <ul>
                <li>
                  <div className={style.left}>
                    <p>🔻카테고리: {product.category_name}</p>
                    <img src={product.imgname} alt={product.detail} />
                  </div>
                  <div className={style.right}>
                    <h2>{product.name}</h2>
                    <p>가격: {addComma(product.price)}</p>
                    <p>원가: {addComma(product.cost)}</p>
                    <p>유통기한: {product.exp}</p>
                    <p>상품 코드: {product.product_code}</p>
                    <p>재고량: {product.qnt}</p>
                  </div>
                </li>
              </ul>

              <div className={style.ProductDetail}>
                <h4>상품 상세 정보</h4>
                <p>{product.detail}</p>
                <p>{product.detail}</p>
                <p>{product.detail}</p>
                <p>{product.detail}</p>
                <p>{product.detail}</p>
                <p>{product.detail}</p>
                <p>{product.detail}</p>
                <p>{product.detail}</p>
              </div>
            </div>

          )
        }
      </div>
    </>
  );
}

export default ProductDetail;