import { Link } from 'react-router-dom';
import { Button, Divider } from "antd";

import React from 'react';
import StoreList from './StoreList';
function Store() {
  return ( 
    <div>
      <h2>점포 목록</h2>
      <Divider/>
      <StoreList/>
    </div>
  );
}

export default Store;