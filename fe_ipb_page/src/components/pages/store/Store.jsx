import { Link } from 'react-router-dom';
import { Button, Divider } from "antd";

import React from 'react';
import StoreList from './StoreList';
function Store() {
  return ( 
    <div>
      점포관련페이지입니다.
      <Button>
        <Link to="/store/add">점포 등록</Link>
      </Button>
      <Divider/>
      <StoreList/>
    </div>
  );
}

export default Store;