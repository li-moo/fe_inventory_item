import React from 'react';
import { Divider } from "antd";
import StaffList from './StaffList';
function Staff() {
  return (
    <>
    <h2>직원 리스트</h2>
      <Divider />
    <StaffList />
    </>
  );
}

export default Staff;