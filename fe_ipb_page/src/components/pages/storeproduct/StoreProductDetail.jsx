// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { Typography, Grid, Button, Modal } from 'antd';
// import styles from './StoreProductDetail.module.css';

// const { Title, Text } = Typography;
// const { Row, Col } = Grid;

// function StoreProductDetail() {

//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState();


//   useEffect(() => {
//     console.log(id);
//     fetch(`http://localhost:8080/product/detail?id=${id}`)
//       // fetch(`http://43.202.9.215:8080/product/detail?id=${id}`)
//       .then(res => res.json())
//       .then(data => {
//         console.log("product-detail data:", data);
//         setProduct(data)
//       })
//       .catch(err => console.log(err))
//   }, [id]);

//   console.log("product: ", product);

//   function addComma(num) {
//     var regexp = /\B(?=(\d{3})+(?!\d))/g;
//     return num.toString().replace(regexp, ',');
//   }

//   const info = () => {
//     // 모달이 켜질때마다 상품의 상세 데이터를 받아온다
//     fetch(`http://localhost:8080/product/detail?id=${id}`)
//       .then(res => res.json())
//       .then(data => {
//         console.log("product-detail data modal:", data);
//         setProduct(data)
//       })
//       .catch(err => console.log(err))
//     Modal.info({
//       // 모달 제목
//       title: '해당 상품을 자동발주 리스트에 추가하시겠습니까?',
//       // 모달 본문
//       content: (
//           <div>
//             {product.name}
//             <div>
//             <input type="number" id="minQnt" placeholder="최소 수량" />
//             <input type="number" id="qnt" placeholder="기준 수량" />
//             </div>
//           </div>
//       ),
//       onOk(){
//         // 54,55 라인에서 사용자가 인풋박스에 입력한 값을 각각 변수에 담습니다
//         const minQnt = document.getElementById('minQnt').value;
//         const qnt = document.getElementById('qnt').value;

//         fetch('http://localhost:8080/storeproduct/auto-order', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             product_code: product.product_code,
//             store_product_id: product.id,
//             min_qnt: minQnt,
//             qnt: qnt,
//           }),
//         })
//         .then(res => res.json())
//         .then(data => {
//           console.log('Auto-order response:', data);
//           // 추가로 필요한 작업 수행
//         })
//         .catch(err => console.log(err));
//       },
//     });
//   };

//   return (
//     <>
//       <div>
//         {
//           product && (
//             <div className={styles.productWrap}>
//               <ul>
//                 <li>
//                   <div className={styles.left}>
//                     {/* <img src={product.imgname} alt={product.detail} /> */}
//                     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlpfr_r51S_nvNI9JSggADR78muK6decmUDA&usqp=CAU" alt={product.detail} />
//                     <p>SKU - QR code</p>
//                     <Button onClick={info}>
//                       자동발주
//                     </Button>
//                   </div>
//                 </li>
//                 <li>
//                   <div className={styles.right}>
//                     <p>{product.category_name}</p>
//                     <h4>{product.name}</h4>
//                     <p>SKU: {product.product_code}</p>
//                     <p>제조사: {product.brand}</p>
//                     <p>보관방법: {product.storage}</p>
//                     <p>매입가: {addComma(product.cost)}</p>
//                     <p>판매가: {addComma(product.price)}</p>
//                     <p>유통기한: {product.exp}</p>
//                     <p>점포 재고량: {product.store_qnt}</p>
//                   </div>
//                 </li>
//               </ul>

//               <div className={styles.ProductDetail}>
//                 <h4>상품 상세 정보</h4>
//                 <p>{product.detail}</p>
//                 <p>{product.detail}</p>
//                 <p>{product.detail}</p>
//                 <p>{product.detail}</p>
//                 <p>{product.detail}</p>
//                 <p>{product.detail}</p>
//                 <p>{product.detail}</p>
//                 <p>{product.detail}</p>
//               </div>
//             </div>
//           )
//         }
//       </div>
//     </>
//   );
// }

// export default StoreProductDetail;

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


  useEffect(() => {
    console.log(id);
    fetch(`http://localhost:8080/storeproduct/detail?id=${id}`)
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

  const info = () => {
    // 모달이 켜질때마다 상품의 상세 데이터를 받아온다
    fetch(`http://localhost:8080/product/detail?id=${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("product-detail data modal:", data);
        setProduct(data)
      })
      .catch(err => console.log(err))
    Modal.info({
      // 모달 제목
      title: '해당 상품을 자동발주 리스트에 추가하시겠습니까?',
      // 모달 본문
      content: (
          <div>
            {product.name}
            <div>
            <input type="number" id="minQnt" placeholder="최소 수량" />
            <input type="number" id="qnt" placeholder="기준 수량" />
            </div>
          </div>
      ),
      onOk(){
        // 54,55 라인에서 사용자가 인풋박스에 입력한 값을 각각 변수에 담습니다
        const minQnt = document.getElementById('minQnt').value;
        const qnt = document.getElementById('qnt').value;

        fetch('http://localhost:8080/storeproduct/auto-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product_code: product.product_code,
            store_product_id: product.id,
            min_qnt: minQnt,
            qnt: qnt,
          }),
        })
        .then(res => res.json())
        .then(data => {
          console.log('Auto-order response:', data);
          // 추가로 필요한 작업 수행
        })
        .catch(err => console.log(err));
      },
    });
  };

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
                    {/* <p>SKU: {product.product_code}</p>
                    <p>제조사: {product.brand}</p>
                    <p>보관방법: {product.storage}</p>
                    <p>매입가: {addComma(product.cost)}</p>
                    <p>판매가: {addComma(product.price)}</p>
                    <p>유통기한: {product.exp}</p>
                    <p>점포 재고량: {product.store_qnt}</p> */}
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