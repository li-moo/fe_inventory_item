import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Typography, Image, Grid, Button, Divider, Card, Descriptions, Radio } from 'antd';
import style from './ProductDetail.module.css';

function ProductInfoDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState();


  useEffect(() => {
    console.log(id);
    fetch(`http://localhost:8080/productInfo/detail?product_code=${id}`)
      // fetch(`http://43.202.9.215:8080/product/detail?id=${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("product-info-detail data:", data);
        setProduct(data)
      })
      .catch(err => console.log(err))
  }, [id]);

  // function addComma(num) {
  //   var regexp = /\B(?=(\d{3})+(?!\d))/g;
  //   return num.toString().replace(regexp, ',');
  // }

  return (
    <>
      <div>
        {
          product && (
            <div className={style.productWrap}>
              <ul>
                <li>
                  <div className={style.left}>
                    <img src={product.imgname} alt={product.detail} />
                  </div>
                  <div className={style.right}>
                    <p>{product.category_name}</p>
                    <h2>{product.name}</h2>
                    <p>SKU: {product.product_code}</p>
                    <p>제조사: {product.brand}</p>
                    <p>보관방법: {product.storage}</p>
                    <p>입수: {product.box_qnt}</p>
                  </div>
                </li>
              </ul>

              <div className={style.ProductDetail}>
                <h4>상품 상세 정보</h4>
                <p>{product.detail}</p>
              </div>
            </div>

          )
        }
      </div>
    </>
  );
}

export default ProductInfoDetail;