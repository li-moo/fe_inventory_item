import React from 'react';
import { Divider } from "antd";
import StaffList from './StaffList';
function Staff() {
  return (
    <>
    <h2>직원 관리</h2>
      <Divider />
    <StaffList />
    </>
  );
}

export default Staff;