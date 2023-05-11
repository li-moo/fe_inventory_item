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
            <img src={product.imgname} alt={product.name}/>
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