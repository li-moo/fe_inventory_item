// import { Col, Row } from "reactstrap";
// import SalesChart from "../components/dashboard/SalesChart";
// import Feeds from "../components/dashboard/Feeds";
// import ProjectTables from "../components/dashboard/ProjectTable";
// import TopCards from "../components/dashboard/TopCards";
// import Blog from "../components/dashboard/Blog";
// import bg1 from "../assets/images/bg/bg1.jpg";
// import bg2 from "../assets/images/bg/bg2.jpg";
// import bg3 from "../assets/images/bg/bg3.jpg";
// import bg4 from "../assets/images/bg/bg4.jpg";
import React, { useState, useEffect } from 'react';
import { logInState } from "../components/state/loginState";
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { Table, Modal } from 'antd';
import axios from 'axios';


// 네모 카드로 그림이 나오고 
// const BlogData = [
//   {
//     image: bg1,
//     title: "This is simple blog",
//     subtitle: "2 comments, 1 Like",
//     description:
//       "This is a wider card with supporting text below as a natural lead-in to additional content.",
//     btnbg: "primary",
//   },
//   {
//     image: bg2,
//     title: "Lets be simple blog",
//     subtitle: "2 comments, 1 Like",
//     description:
//       "This is a wider card with supporting text below as a natural lead-in to additional content.",
//     btnbg: "primary",
//   },
//   {
//     image: bg3,
//     title: "Don't Lamp blog",
//     subtitle: "2 comments, 1 Like",
//     description:
//       "This is a wider card with supporting text below as a natural lead-in to additional content.",
//     btnbg: "primary",
//   },
//   {
//     image: bg4,
//     title: "Simple is beautiful",
//     subtitle: "2 comments, 1 Like",
//     description:
//       "This is a wider card with supporting text below as a natural lead-in to additional content.",
//     btnbg: "primary",
//   },
// ];

const Starter = () => {


  const navigate = useNavigate();
  const loginCheck = useRecoilValue(logInState);
  const [logInData, setLogInData] = useRecoilState(logInState);
  const [storeProductData, setStoreProductData] = useState([]);

  useEffect(() => {
    console.log("useEffect/logInData", logInData);
    console.log("useEffect/logInData.isLogin === false", logInData.isLogIn === false);
    if (logInData.isLogIn === false) {
      navigate(`/login`);
    }
    // qntInfo();
    expInfo();
  },[]);

  const url_be = `http://localhost:8080/storeproduct/list/${logInData.store_id}`

  const expColumns = [
    {
      title: 'SKU',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '이름',
      dataIndex: 'product_name',
    },
    {
      title: '유통기한',
      dataIndex: 'exp',
    },
    {
      title: '재고',
      dataIndex: 'qnt',
    },
  ];

  // const expInfo = () => {
  //   let storeProductExpData = [];
  //   // 모달이 켜질때마다 상품의 상세 데이터를 받아온다
  //   const fetchData = () => {
  //     axios
  //       .get(url_be)
  //       .then((res) => {
  //         console.log("res:", res.data);
  //         return res.data;
  //       })
  //       .catch((err) => {
  //         console.log("storeProdutList/err", err);
  //         return [];
  //       });
  //   };
  //   fetchData();
  //   console.log(storeProductExpData);
  //   Modal.info({
  //     // 모달 제목
  //     title: '유통기한 알림',
  //     // 모달 본문
  //     content: (
  //         <div>
  //           <Table dataSource={storeProductData.map((item) => ({ ...item, key: item.id }))} columns={expColumns} />
  //         </div>
  //     ),
  //     onOk(){},
  //   });
  // };

  const expInfo = () => {
    // 모달이 켜질때마다 상품의 리스트를 받아온다
    const fetchData = async () => {
      try {
        const res = await axios
          .get(url_be);
        console.log("res:", res.data);
        return res.data;
      } catch (err) {
        console.log("storeProductList/err", err);
        return [];
      }
    };
  
    fetchData().then((storeProductExpData) => {
      console.log(storeProductExpData);
      const filteredData = storeProductExpData.filter(item => item.qnt !== 0); // qnt가 0인 상품 제외
      Modal.info({
        // 모달 제목
        title: '유통기한 알림',
        // 모달 본문
        content: (
          <div>
            <Table
              dataSource={filteredData.map((item) => ({ ...item, key: item.id }))}
              columns={expColumns}
              pagination={false} // 한 페이지에 보여줄 데이터 수, false는 페이지네이션 삭제
              scroll={{ y: 500, }} // 스크롤 높이
            />
          </div>
        ),
        style: { top: '5%' }, // 모달 위치 설정
        width: '50%', // 모달 넓이 설정
        okText: '확인', // 확인버튼 텍스트
        onOk() {},
      });
    });
  };

  const qntColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '이름',
      dataIndex: 'name',
    },
    {
      title: '재고',
      dataIndex: 'qnt',
    },
    {
      title: '유통기한',
      dataIndex: 'exp',
    },
  ];

  const qntInfo = () => {
    // 모달이 켜질때마다 점포 보유 상품의 재고 데이터를 받아온다
    // fetch(`http://localhost:8080/product/detail?id=${id}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log("product-detail data modal:", data);
    //     setProduct(data)
    //   })
    //   .catch(err => console.log(err))
    Modal.info({
      // 모달 제목
      title: '재고 알림',
      // 모달 본문
      content: (
          <div>
            테스트
            {/* {product.name}
            <div>
            <input type="number" id="minQnt" placeholder="최소 수량" />
            <input type="number" id="qnt" placeholder="기준 수량" />
            </div> */}
          </div>
      ),
      onOk(){},
    });
  };


  return (
    <div>
    </div>
  );
};

export default Starter;
