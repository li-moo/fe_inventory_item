import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { logInState } from '../../state/loginState';
import axios from 'axios';
import { Divider, Input, Modal, Popconfirm, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './StoreAutoOrdersList.module.css';

const { Search } = Input;

function StoreAutoOrdersList() {
  const [storeAutoOrdersData, setStoreAutoOrdersData] = useState([]);
  const [logInData, setLogInData] = useRecoilState(logInState);

  useEffect(() => {
    fetchData();
    updateQnt();
  }, []);

  const url_be = `http://localhost:8080/auto/getList/${logInData.store_id}`;

  const fetchData = () => {
    axios
      .get(url_be)
      .then((res) => {
        console.log("res:", res);
        setStoreAutoOrdersData(res.data);
      })
      .catch((err) => console.log("storeProdutList/err", err));
  };

  const updateQnt = (tarId, tarQnt, tarMinQnt) => {
    const url_be_updateQnt = "http://localhost:8080//auto/qnt-change";

    axios(url_be_updateQnt,
      {
        method: 'put',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        data: {
          id: tarId,
          qnt: tarQnt,
          min_qnt: tarMinQnt,
        }
      }
    ).catch(function (error) {
      console.log("error: ", error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    })
  }

  const updateMinQnt = (tarId, tarQnt, tarMinQnt) => {
    const url_be_updateMinQnt = "http://localhost:8080//auto/qnt-change";

    axios(url_be_updateMinQnt,
      {
        method: 'put',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        data: {
          id: tarId,
          qnt: tarQnt,
          min_qnt: tarMinQnt
        },
      }
    ).catch(function (error) {
      console.log("error: ", error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    })
    console.log(tarId);
  }

  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
  }

  const removeBtn = (id) => {
    const url_be_disposeBtn = `http://localhost:8080//auto/delete/${id}`;

    console.log("폐기버튼안>id:", id);

    axios(url_be_disposeBtn,
      {
        method: 'delete',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        data: {
          id: id,
        }
      })
      .then(() => {
        fetchData();
      }).catch(function (error) {
        console.log("error: ", error);
      })
  }

  return (
    <>
      <h4>사용자설정 자동발주</h4>
      <Divider/>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>SKU</th>
            <th>상품이름</th>
            <th>매입가</th>
            <th>판매가</th>
            <th>최소재고수량</th>
            <th>기준재고수량</th>
            <th>{''}</th>
          </tr>
        </thead>
        <tbody>
          {storeAutoOrdersData.map((item) => (

            <tr key={item.id}>
              <td>{item.product_code}</td>
              <td>{item.product_name}</td>
              <td>{addComma(item.product_cost)}</td>
              <td>{addComma(item.product_price)}</td>
              <td className="fifth">
                <input
                    type="number"
                    value={item.min_qnt}
                    onChange={(em) => {
                      const newMinQuantity = parseInt(em.target.value) || item.min_qnt - 1;
                      console.log("e.target.value", em.target.value);
                      if (!isNaN(newMinQuantity) && newMinQuantity > 0) {
                        const updatedListData = storeAutoOrdersData.map((storeAutoItem) => {
                          if (storeAutoItem.id === item.id) {
                            return { ...storeAutoItem, min_qnt: newMinQuantity };
                          }
                          return storeAutoItem;
                        });

                        setStoreAutoOrdersData(updatedListData);
                      }
                      const tarId = item.id;
                      const tarQnt = item.qnt;
                      const tarMinQnt = newMinQuantity;
                      updateMinQnt(tarId, tarQnt, tarMinQnt);
                    }
                    }
                  />
              </td>
              <td>
                <input
                  type="number"
                  value={item.qnt}
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value) || item.qnt - 1;
                    console.log("e.target.value", e.target.value);
                    if (!isNaN(newQuantity) && newQuantity > 0) {
                      const updatedListData = storeAutoOrdersData.map((storeAutoItem) => {
                        if (storeAutoItem.id === item.id) {
                          return { ...storeAutoItem, qnt: newQuantity };
                        }
                        return storeAutoItem;
                      });

                      setStoreAutoOrdersData(updatedListData);
                    }
                    const tarId = item.id;
                    const tarQnt = newQuantity;
                    const tarMinQnt = item.min_qnt;
                    updateQnt(tarId, tarQnt, tarMinQnt);
                  }
                  }
                />
              </td>
              <td>
                <Popconfirm
                  title="리스트에서 삭제 하시겠습니까??"
                  onConfirm={() => removeBtn(item.id)}
                  okText="네"
                  cancelText="아니오"
                >
                  <Button>삭제</Button>
                </Popconfirm>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default StoreAutoOrdersList;


