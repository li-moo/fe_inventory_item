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
import ApexChart from 'react-apexcharts';
import style from "./Starter2020.module.css"

const Starter2020 = () => {
  const navigate = useNavigate();
  const [logInData, setLogInData] = useRecoilState(logInState);
  const [visible, setVisible] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const [activeChart, setActiveChart] = useState('Sales 1');

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

  const url_be = `${process.env.REACT_APP_BE_API}/storeproduct/list/${logInData.store_id}`;

  const expColumns = [
    {
      title: 'SKU',
      dataIndex: 'product_code',
      key: 'id',
      width: 150,
    },
    {
      title: '상품이름',
      dataIndex: 'product_name',
      width: 300,
      // render: (row, text) => {
      //   return (
      //             <p>
      //               {row.product_name}
      //             </p>
      //           );
      // }
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
    { image: require('../assets/images/bg/1.jpg'), link: 'http://localhost:3000/#/event/detail/1' },
    { image: require('../assets/images/bg/2.jpg'), link: 'http://localhost:3000/#/event/detail/57' },
    { image: require('../assets/images/bg/3.jpg'), link: 'http://localhost:3000/#/event/detail/3' },
    { image: require('../assets/images/bg/4.jpg'), link: 'http://localhost:3000/#/event/detail/4' },
    { image: require('../assets/images/bg/5.jpg'), link: 'http://localhost:3000/#/event/detail/4' },
    { image: require('../assets/images/bg/6.jpg'), link: 'http://localhost:3000/#/event/detail/61' },
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

  const chartOptions = {
    labels: ['[광동]삼다수2L', '[하이트 진로]테라', '[롯데]통밀식빵', '[삼양]불닭볶음면', '[제스프리]썬골드키위'],
    colors: ['#FF4560', '#008FFB', '#00E396', '#FEB019', '#775DD0'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
            height: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    chart: {
      width: 200,
      height: 200,
      type: 'donut',
    },
  };

  const chartSeries = [12, 45, 25, 36, 23];

  const splineChartOptions = {
    chart: {
      id: 'spline-chart',
    },
    xaxis: {
      categories:
        activeChart === 'Sales 1'
          ? ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월']
          : ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
    },
    yaxis: {
      title: {
        text: activeChart === 'Sales 1' ? 'Sales' : 'Monthly Sales',
      },
    },
    colors: ['#FF4560', '#008FFB'],
    stroke: {
      curve: 'smooth',
    },
  };

  const splineChartSeries = [
    {
      name: '이번 주',
      data: activeChart === 'Sales 1'
        ? [45, 50, 40, 55, 60, 35, 50, 55, 40, 75, 80, 85]
        : [70, 75, 80, 85, 90, 80, 75],
    },
    {
      name: '지난 주',
      data: activeChart === 'Sales 1'
        ? [30, 40, 35, 50, 49, 12, 48, 44, 21, 65, 65, 72]
        : [60, 80, 75, 90, 60, 75, 80],
    },
  ];

  return (
    <>
      <div className="body-bg">
        <Row>
          <Col sm={4} className="bg-gray-300">
            <div className="mb-5">
              {/* <h6>공지사항</h6> */}
              <MiniBoard />
            </div>
            <Col sm={12} className="mt-5">
              <div className="chart-header" style={{ fontWeight: 'bold' }}>
                제품 매출 근황
              </div>
              <ApexChart options={chartOptions} series={chartSeries} type="donut" width={400} height={300} />
            </Col>
            <Col sm={12} className="mt-5">
              <div className="chart-header" style={{ fontWeight: 'bold' }}>
                점포 매출 근황
              </div>
              <ApexChart options={splineChartOptions} series={splineChartSeries} type="line" width={300} height={300} />
            </Col>
          </Col>
          <Col sm={8} className="bg-gray-600">
            <div className={style.slider} style={{ width: '905px', height: '360px' }}>
              <Slider {...settings}>
                {bannerImages.map((banner, index) => (
                  <div key={index} >
                    <a href={banner.link}>
                      <img
                        src={banner.image.default}
                        alt={`배너 이미지 ${index + 1}`}
                        style={{ width: '905px', height: '360px' }}
                      />
                    </a>
                  </div>
                ))}
              </Slider>
            </div>
            <Row>
              {activeChart === 'Sales 1' ? (
                <>
                  <MiniBoardExp />
                </>
              ) : (
                <MiniBoardExp />
              )}
            </Row>
          </Col>
        </Row>
        {showButton && visible && (
          <Button onClick={handleButtonClick} style={{ fontSize: '12px' }}>
            하루 동안 보지 않기
          </Button>
        )}
        <div className="chart-selection">
  <Button
    onClick={() => setActiveChart('Sales 1')}
    className={activeChart === 'Sales 1' ? 'active' : ''}
    style={{ fontSize: '12px', backgroundColor: 'white', color: 'black', marginRight: '10px' }}
  >
    일 별로
  </Button>
  <Button
    onClick={() => setActiveChart('Sales 2')}
    className={activeChart === 'Sales 2' ? 'active' : ''}
    style={{ fontSize: '12px', backgroundColor: 'white', color: 'black' }}
  >
    월 별로
  </Button>
</div>

      </div>
    </>
  );
};

export default Starter2020;
