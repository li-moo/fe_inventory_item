// 

import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { Table, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { logInState } from '../components/state/loginState';
import MiniBoard from '../components/pages/main-board/MiniBoard';
import MiniBoardExp from '../components/pages/main-board/MiniBoardExp';
import MiniBoardProductlist from '../components/pages/main-board/MiniBoardProductlist';

const Starter = () => {
  const navigate = useNavigate();
  const [logInData, setLogInData] = useRecoilState(logInState);
  const [visible, setVisible] = useState(true);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    console.log("useEffect/logInData", logInData);
    console.log("useEffect/logInData.isLogin === false", logInData.isLogIn === false);
    if (logInData.isLogIn === false) {
      navigate(`/login`);
    }
    if (logInData.isLogIn) {
      expInfo();
    }
  }, [logInData.isLogIn]);

  const url_be = `http://localhost:8080/storeproduct/list/${logInData.store_id}`;

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

  const expInfo = () => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url_be);
        console.log("res:", res.data);
        return res.data;
      } catch (err) {
        console.log("storeProductList/err", err);
        return [];
      }
    };

    fetchData().then((storeProductExpData) => {
      console.log(storeProductExpData);
      const filteredData = storeProductExpData.filter((item) => item.qnt !== 0);
      if (visible) {
        Modal.confirm({
          title: '유통기한 알림',
          content: (
            <div>
              <Table
                dataSource={filteredData.map((item) => ({ ...item, key: item.id }))}
                columns={expColumns}
                pagination={false}
                scroll={{ y: 500 }}
              />
            </div>
          ),
          style: { top: '5%' },
          width: '50%',
          okText: '확인',
          cancelText: '하루 동안 보지 않기',
          onOk() {
            setVisible(false);
          },
          onCancel() {
            setVisible(false);
            setShowButton(false);
            setTimeout(() => {
              setVisible(true);
              setShowButton(true);
            }, 86400000); // 24시간(86400초)
          },
        });
      }
    });
  };

  const handleButtonClick = () => {
    setVisible(false);
    setShowButton(false);
    setTimeout(() => {
      setVisible(true);
      setShowButton(true);
    }, 86400000); // 24시간(86400초)
  };

  const bannerImages = [
    require('../assets/images/bg/1.jpg'),
    require('../assets/images/bg/2.jpg'),
    require('../assets/images/bg/3.jpg'),
    require('../assets/images/bg/4.jpg'),
    require('../assets/images/bg/5.jpg'),
    require('../assets/images/bg/6.jpg'),
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  return (
    <>
    <div className="body-bg" >
    <Row>
        <Col sm={4} className="bg-gray-300">
          <div className="mb-5">
            <MiniBoard />
          </div>
          <div>
            <MiniBoardProductlist />
          </div>
          <div>
          </div>
        </Col>
        <Col sm={8} className="bg-gray-600">
          <div className="mb-5">
            <Slider {...settings}>
              {bannerImages.map((image, index) => (
                <div key={index} style={{ width: '756px', height: '322px' }}>
                  <img src={image.default} alt={`배너 이미지 ${index + 1}`} style={{ width: '756px', height: '322px' }} />
                </div>
              ))}
            </Slider>
          </div>
          <Row>
            <MiniBoardExp />
          </Row>
        </Col>
      </Row>
      {showButton && visible && (
        <Button onClick={handleButtonClick}>하루 동안 보지 않기</Button>
      )}
    </div>
    </>
  );
};

export default Starter;
