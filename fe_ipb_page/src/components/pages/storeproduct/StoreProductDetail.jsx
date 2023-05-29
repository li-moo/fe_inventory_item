import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Typography, Grid, Button, Modal } from 'antd';
import styles from './StoreProductDetail.module.css';

const { Title, Text } = Typography;
const { Row, Col } = Grid;

function StoreProductDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState();

  const info = () => {
    Modal.info({
      title: '유통기한 관리 Tip!',
      content: (
        <div>
        </div>
      ),
      onOk() { },
    });
  };


  useEffect(() => {
    console.log(id);
    fetch(`http://localhost:8080/product/detail?id=${id}`)
      // fetch(`http://43.202.9.215:8080/product/detail?id=${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("product-detail data:", data);
        setProduct(data)
      })
      .catch(err => console.log(err))
  }, [id]);

  console.log("product: ", product);

  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  }

  return (
    <>
      <div>
        {
          product && (
            <div className={styles.productWrap}>
              <ul>
                <li>
                  <div className={styles.left}>
                    {/* <img src={product.imgname} alt={product.detail} /> */}
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlpfr_r51S_nvNI9JSggADR78muK6decmUDA&usqp=CAU" alt={product.detail} />
                    <p>SKU - QR code</p>
                    <Button onClick={info}>
                      자동발주
                    </Button>
                  </div>
                </li>
                <li>
                  <div className={styles.right}>
                    <p>{product.category_name}</p>
                    <h4>{product.name}</h4>
                    <p>SKU: {product.product_code}</p>
                    <p>제조사: {product.brand}</p>
                    <p>보관방법: {product.storage}</p>
                    <p>매입가: {addComma(product.cost)}</p>
                    <p>판매가: {addComma(product.price)}</p>
                    <p>유통기한: {product.exp}</p>
                    <p>점포 재고량: {product.store_qnt}</p>
                  </div>
                </li>
              </ul>

              <div className={styles.ProductDetail}>
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

export default StoreProductDetail;