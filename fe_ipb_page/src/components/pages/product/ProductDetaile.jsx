// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';


// function ProductDetail() {
//   const productId = props.match.params.id;
//   // 상세 페이지 조회를 위한 코드

//   const [productData, setProducData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       // const response = await fetch('http://localhost:8080/product/list?product_info_id:');
//       const response = await fetch(`http://localhost:8080/product/detail/${id}`);
//       const data = await response.json();
//       setProducData(data);
//       console.log(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const { id } = useParams();
//   const [product, setProduct] = useState();
//   const navigate = useNavigate();

//   console.log(id);
//   useEffect( () => {
//     fetch(`http://localhost:8080/product/detail/${id}`)
//     .then(res => res.json())
//     .then(data => {
//       //console.log(data);
//       setProduct(data);
//     })
//     .catch(err => console.log(err))
//   },[id]);


//   return (
//     <>
//      // 상세 페이지 렌더링
//      <h2>1</h2>
//      <h2>1</h2>
//      <h2>2</h2>
//      <h2>1</h2>
//      <h2>1</h2>
//      <h2>2</h2>
//     </>
   
//   );
// }

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState();


  useEffect(() => {
    console.log(id);
    fetch(`http://localhost:8080/product/detail?id=${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("product-detail data:", data);
        setProduct(data)
      })
      .catch(err => console.log(err))
  }, [id]);

  console.log("product:: ", product);

  return (
    <div>
      {
        product && (
          <div >
            <p>category_name: {product.category_name}</p> 
            <h2 >{product.name}</h2>
            {/* // 이미지 없음 //  */}
            <img src={product.imgname}/>
            <div >        
              <p>cost: {product.cost}</p>
              <p>exp: {product.exp}</p>
              <p>name: {product.name}</p>
              <p>price: {product.price}</p>
              <p>product_code: {product.product_code}</p>
              <p>qnt: {product.qnt}</p>
              <p>detail: {product.detail}</p>
            </div> 
          </div>
        )
      }
    
    </div>
  );
}

export default ProductDetail;