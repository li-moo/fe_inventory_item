import React from 'react';
import { Button, Divider } from "antd";
import { Link } from "react-router-dom";
import StoreSalesList from './StoreSalesList';
import StoreSalesListCategory from './StoreSalesListCategory';
import StoreSalesDay from './StoreSalesDay';
import { Tabs } from 'antd';

const { TabPane } = Tabs;


function StoreSales() {

  const handleTabChange = (key) => {
    console.log('Selected Tab:', key);
  };


  return (
    <>
    <h2>점포 매출 조회</h2>
    <Tabs onChange={handleTabChange}>
      <TabPane tab="전체" key="1">
      <StoreSalesList />
      </TabPane>
      <TabPane tab="일 별" key="2">
      <StoreSalesDay />
      </TabPane>
      {/* <TabPane tab="카테고리별" key="2">
      <StoreSalesListCategory />
      </TabPane> */}
      {/* <TabPane tab="일 별" key="3">
      <StoreSalesDay />
      </TabPane> */}
    </Tabs>
    </>
  );
}

export default StoreSales;