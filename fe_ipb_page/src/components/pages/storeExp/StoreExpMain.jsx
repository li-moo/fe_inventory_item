import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { logInState } from '../../state/loginState';
import styles from './StoreExp.module.css';
import axios from 'axios';
import { Divider, Input, Modal, Popconfirm, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import StoreExp from './StoreExp';
import StoreExpZero from './StoreExpZero';
import StoreExpThree from './StoreExpThree';
import StoreExpFive from './StoreExpFive';
import StoreExpSeven from './StoreExpSeven';

const { Search } = Input;

function StoreExpMain() {
  const [storeProductData, setStoreProductData] = useState([]);
  const [logInData, setLogInData] = useRecoilState(logInState);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isClick, setIsClick] = useState(false);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayDate = `${year}-${month}-${day}`;

  // ... rest of the code ...
  // 모달창
  const info = () => {
    Modal.info({
      title: '유통기한 관리 Tip!',
      content: (
        <div>
          <p>오늘 날짜는 {todayDate} 입니다. </p>
          <p>매일매일 확인해서 제품들을 관리 해주세요 </p>
          <div className={styles.policyStatement}>
            <div>
              <p className={styles.redExp}></p>
              <p>: 유통기한 지남</p>
            </div>
            <div>
              <p className={styles.yellowExp}></p>
              <p>: D-3</p>
            </div>
            <div>
              <p className={styles.greenExp}></p>
              <p>: D-5</p>
            </div>
            <div>
              <p className={styles.blueExp}></p>
              <p>: D-7</p>
            </div>
          </div>
        </div>
      ),
      onOk() { },
    });
  };


  useEffect(() => {
    fetchData();
  }, [activeTab]);



  const url_be = `${process.env.REACT_APP_BE_API}/storeproduct/listexp/${logInData.store_id}`;

  const fetchData = () => {
    axios(url_be, {
      method: 'get'
    })
      .then((res) => {
        console.log("MAIN: storeExp->res.data::", res.data);
        const addData = res.data.map((item) => ({
          ...item,
          addData: subtractDates(todayDate, item.exp),
        }));
        setStoreProductData(addData)
      })
      .catch((err) => console.log("storeexp/err", err))
  }

  const subtractDates = (date1, date2) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round((new Date(date2) - new Date(date1)) / oneDay);
    return diffDays;
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredProducts = storeProductData.filter((item) =>
    item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.product_code.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 유통기한별로 테이블 정렬
  const sortedProducts = filteredProducts.sort((a, b) => {
    return new Date(a.exp) - new Date(b.exp);
  });


  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className={styles.mainHeader}>
        <div className={styles.headerContent}>
          <h4>
            유통기한 관리{' '}
          </h4>
          <button className={styles.qBtn} onClick={info}>
            ?
          </button>
        </div>
        <div className={styles.tabContainer}>

          <div>

          </div>

          <button
            type={activeTab === 'all' ? 'primary' : 'default'}
            onClick={() => handleTabChange('all')}
            style={{ border: 'none', borderBottom: '1px' }}

          >
            <div className={styles.expFlexBtn}>
              <div className={styles.whiteExpBtn}></div>
              <div>전체</div>
            </div>
          </button>
          <button
            type={activeTab === 'zero' ? 'primary' : 'default'}
            onClick={() => handleTabChange('zero')}
            style={{ border: 'none' }}
            className={styles.tabBtnFor}
          >
            <div className={styles.expFlexBtn}>
              <div className={styles.redExpBtn}></div>
              <div>D-0</div>
            </div>
          </button>
          <button
            type={activeTab === 'three' ? 'primary' : 'default'}
            onClick={() => handleTabChange('three')}
            style={{
              border: 'none',
              // backgroundColor: '#FFFFFF'

            }}
            className={styles.tabBtnFor}
          >
            <div className={styles.expFlexBtn}>
              <div className={styles.yellowExpBtn}></div>
              <div>D-3</div>
            </div>
          </button>
          <button
            type={activeTab === 'five' ? 'primary' : 'default'}
            onClick={() => handleTabChange('five')}
            style={{ border: 'none' }}
            className={styles.tabBtnFor}
          >
            <div className={styles.expFlexBtn}>
              <div className={styles.greenExpBtn}></div>
              <div>D-5</div>
            </div>
          </button>
          <button
            type={activeTab === 'seven' ? 'primary' : 'default'}
            onClick={() => handleTabChange('seven')}
            style={{ border: 'none' }}
            className={styles.tabBtnFor}
          >
            <div className={styles.expFlexBtn}>
              <div className={styles.blueExpBtn}></div>
              <div>D-7</div>
            </div>
          </button>

        </div>

      </div>

      {activeTab === 'all' &&
        <StoreExp
          isClick={isClick}
          setIsClick={setIsClick}
          test="안녕 props"
        />
      }
      {activeTab === 'zero' &&
        <StoreExpZero
          isClick={isClick}
          setIsClick={setIsClick}
        />
      }
      {activeTab === 'three' &&
        <StoreExpThree
        />
      }
      {activeTab === 'five' &&
        <StoreExpFive
        />
      }
      {activeTab === 'seven' &&
        <StoreExpSeven
        />
      }

    </>
  );
}

export default StoreExpMain;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useRecoilState } from 'recoil';
// import { logInState } from '../../state/loginState';
// import styles from './StoreExp.module.css';
// import axios from 'axios';
// import { Divider, Input, Modal, Popconfirm, Button, Tabs } from 'antd';
// import { SearchOutlined } from '@ant-design/icons';
// import StoreExp from './StoreExp';
// import StoreExpZero from './StoreExpZero';
// import StoreExpThree from './StoreExpThree';
// import StoreExpFive from './StoreExpFive';
// import StoreExpSeven from './StoreExpSeven';

// const { Search } = Input;
// const { TabPane } = Tabs;

// function StoreExpMain() {
//   const [storeProductData, setStoreProductData] = useState([]);
//   const [logInData, setLogInData] = useRecoilState(logInState);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeTab, setActiveTab] = useState('all');
//   const [isClick, setIsClick] = useState(false);

//     const today = new Date();
//   const year = today.getFullYear();
//   const month = String(today.getMonth() + 1).padStart(2, '0');
//   const day = String(today.getDate()).padStart(2, '0');
//   const todayDate = `${year}-${month}-${day}`;

//   // ... rest of the code ...
//     // 모달창
//   const info = () => {
//     Modal.info({
//       title: '유통기한 관리 Tip!',
//       content: (
//         <div>
//           <p>오늘 날짜는 {todayDate} 입니다. </p>
//           <p>매일매일 확인해서 신선식품들을 관리 해주세요 </p>
//           <div className={styles.policyStatement}>
//             <div>
//               <p className={styles.redExp}></p>
//               <p>: 유통기한 지남</p>
//             </div>
//             <div>
//               <p className={styles.yellowExp}></p>
//               <p>: D-3</p>
//             </div>
//             <div>
//               <p className={styles.greenExp}></p>
//               <p>: D-5</p>
//             </div>
//             <div>
//               <p className={styles.blueExp}></p>
//               <p>: D-7</p>
//             </div>
//           </div>
//         </div>
//       ),
//       onOk() { },
//     });
//   };


//   useEffect(() => {
//     fetchData();
//   }, [activeTab]);



//   const url_be = `http://localhost:8080/storeproduct/listexp/${logInData.store_id}`;
//   // const url_be = `http://43.202.9.215:8080/storeproduct/list/${logInData.store_id}`;

//   const fetchData = () => {
//     axios(url_be, {
//       method: 'get'
//     })
//       .then((res) => {
//         console.log("MAIN: storeExp->res.data::", res.data);
//         const addData = res.data.map((item) => ({
//           ...item,
//           addData: subtractDates(todayDate, item.exp),
//         }));
//         setStoreProductData(addData)
//       })
//       .catch((err) => console.log("storeexp/err", err))
//   }

//   const subtractDates = (date1, date2) => {
//     const oneDay = 24 * 60 * 60 * 1000;
//     const diffDays = Math.round((new Date(date2) - new Date(date1)) / oneDay);
//     return diffDays;
//   };

//   const handleSearch = (value) => {
//     setSearchTerm(value);
//   };

//   const filteredProducts = storeProductData.filter((item) =>
//     item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.product_code.toString().toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // 유통기한별로 테이블 정렬
//   const sortedProducts = filteredProducts.sort((a, b) => {
//     return new Date(a.exp) - new Date(b.exp);
//   });


//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <>
//       <div className={styles.mainHeader}>
//         <div className={styles.headerContent}>
//           <h4>
//             유통기한 관리{' '}
//             <button className={styles.qBtn} onClick={info}>
//               ?
//             </button>
//           </h4>
//           </div>
//           <Tabs onChange={handleTabChange}>
//           <TabPane tab="전체" key="1">
//           <StoreExp
//               isClick={isClick}
//               setIsClick={setIsClick}
//               test="안녕 props"
//             />
//           </TabPane>
//           <TabPane tab="d-0" key="2">
//             <StoreExpZero
//               isClick={isClick}
//               setIsClick={setIsClick}
//             />
//           </TabPane>
//           <TabPane tab="d-3" key="3">
//             <StoreExpThree />
//           </TabPane>
//           <TabPane tab="d-5" key="4">
//             <StoreExpFive />
//           </TabPane>
//           <TabPane tab="d-7" key="5">
//             <StoreExpSeven />
//           </TabPane>
//         </Tabs>

//       </div>

//     </>
//   );
// }

// export default StoreExpMain;