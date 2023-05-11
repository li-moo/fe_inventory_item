import React from 'react';
import { Button, Divider } from "antd";
import StaffList from './StaffList';
import { Link } from "react-router-dom";

function Staff() {
  return (
    <>
    <h2>직원 리스트</h2>
    <Button>
      <Link to='/staff/add'>직원 등록하러가기</Link>
    </Button>

      <Divider />
    <StaffList />
    </>
  );
}

export default Staff;