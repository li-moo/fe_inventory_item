import { Link } from 'react-router-dom';
import { Button } from "antd";

import React from 'react';
function Store() {
  return ( 
    <div>
      점포관련페이지입니다.
      <Button>
        <Link to="/store/add">점포 등록</Link>
      </Button>
    </div>
  );
}

export default Store;