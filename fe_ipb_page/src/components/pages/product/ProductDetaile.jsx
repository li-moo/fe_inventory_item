import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Typography, Image, Grid, Button, Divider, Card, Descriptions, Radio } from 'antd';
import style from "./ProductDetail.module.css";

const { Title, Text } = Typography;
const { Row, Col } = Grid;

function ProductDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState();


  useEffect(() => {
    console.log(id);
    fetch(`${process.env.REACT_APP_BE_API}/product/detail?id=${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("product-detail data:", data);
        setProduct(data)
      })
      .catch(err => console.log(err))
  }, [id]);

  console.log("product: ", product);

  // return (
  //   <>
  //     <div>
  //       {
  //         product && (
  //           <div >
  //             <p>category_name: {product.category_name}</p> 
  //             <h2 >{product.name}</h2>
  //             {/* // 이미지 없음 //  */}
  //             <img src={product.imgname} alt={product.name}/>
  //             <div >        
  //               <p>cost: {product.cost}</p>
  //               <p>exp: {product.exp}</p>
  //               <p>name: {product.name}</p>
  //               <p>price: {product.price}</p>
  //               <p>product_code: {product.product_code}</p>
  //               <p>qnt: {product.qnt}</p>
  //               <p>detail: {product.detail}</p>
  //             </div> 
  //           </div>
  //         )
  //       }
  //   </div>
  //   </>
  // );

  return (
    <>
      {/* <div>
        {
          product && (
            <div className={style.productWrap}>
              <ul>
                <li>
                  <div className={style.left}>
                    <p>🔻카테고리: {product.category}</p>
                    <img src={product.thumbnail} alt={product.description} />
                  </div>
                  <div className={style.right}>
                    <h2>{product.name}</h2>
                    <p>가격: {addComma(product.price)}</p>
                    <p>할인된 가격: {addComma(product.price - (product.price * product.discount))}</p>
                    <p>평점: {product.rating}</p>
                    <p>브랜드: {product.brand}</p>
                    <div className={style.cartBtn}>
                      <button
                        className={style.payBtn}
                        onClick={handleAddCart}
                      >
                        장바구니
                      </button>
                      <button
                        className={style.Btn}
                      >
                        바로구매
                      </button>
                      <button
                        style={{
                          backgroundColor: "#ffb718",
                          color: "white",
                        }}
                        onClick={handlePlusQty}
                      >
                        +
                      </button>
                      <h6 className={style.qty}> {countQty} </h6>
                      <button
                        style={{
                          backgroundColor: "#ffb718",
                          color: "white",

                        }}
                        onClick={handleMinusQty}
                      >
                        -
                      </button>

                    </div>
                  </div>
                </li>
              </ul>

              <div className={style.ProductDetail}>
                <h4>상품 상세 정보</h4>
                <p>{product.description}</p>
                <p>{product.description}</p>
                <p>{product.description}</p>
                <p>{product.description}</p>
                <p>{product.description}</p>
                <p>{product.description}</p>
                <p>{product.description}</p>
              </div>
            </div>

          )
        }
      </div> */}
    </>
  );
}

export default ProductDetail;