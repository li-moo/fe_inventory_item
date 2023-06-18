import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { logInState } from '../../state/loginState';
import styles from './StoreExp2120.module.css';
import axios from 'axios';
import { Input, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import StoreExp from './StoreExp2120';
import StoreExpZero2120 from './StoreExpZero2120';
import StoreExpThree2120 from './StoreExpThree2120';
import StoreExpFive2120 from './StoreExpFive2120';
import StoreExpSeven2120 from './StoreExpSeven2120';
import { CiTrash } from "react-icons/ci";

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
          <div>오늘 날짜는 {todayDate} 입니다. </div>
          <div >매일매일 확인해서 제품들을 관리 해주세요. </div>
          <div className={styles.policyStatement}>
            <div className={styles.line}>
              설명
            </div>
            <div className={styles.infoFlex}>
              <p style={{ width: '30px' }}><CiTrash size={{ width: '4px' }} /> </p>
              <div>: 버튼을 누르면 폐기됩니다.</div>
            </div>
            <div>
              <p>전체: 유통기한이 31일 이하인 상품입니다. </p>
            </div>
            <div>
              <p className={styles.redExp}></p>
              <p>: 유통기한 지남</p>
            </div>
            <div>
              <p className={styles.yellowExp}></p>
              <p>: D- 0~3</p>
            </div>
            <div>
              <p className={styles.greenExp}></p>
              <p>: D- 4~5</p>
            </div>
            <div>
              <p className={styles.blueExp}></p>
              <p>: D- 6~7</p>
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
        const addData = res.data.map((item) => ({
          ...item,
          addData: subtractDates(todayDate, item.exp),
        }));
        setStoreProductData(addData)
      })
      .catch((err) => {

      });
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
          <div className={styles.whiteExpDi}>
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
          </div>

          <div className={styles.redExpDi}>
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
          </div>

          <div className={styles.yellowExpDi}>
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
          </div>

          <div className={styles.greenExpDi}>
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
          </div>


          <div className={styles.blueExpDi}>
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

      </div>

      {activeTab === 'all' &&
        <StoreExp
          isClick={isClick}
          setIsClick={setIsClick}
          test="안녕 props"
        />
      }
      {activeTab === 'zero' &&
        <StoreExpZero2120
          isClick={isClick}
          setIsClick={setIsClick}
        />
      }
      {activeTab === 'three' &&
        <StoreExpThree2120
        />
      }
      {activeTab === 'five' &&
        <StoreExpFive2120
        />
      }
      {activeTab === 'seven' &&
        <StoreExpSeven2120
        />
      }

    </>
  );
}

export default StoreExpMain;