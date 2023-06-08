import React from 'react';
import { Button, Divider } from "antd";
import StaffList from './StaffList';
import { Link } from "react-router-dom";

function Staff() {
  return (
    <>
    <h2>직원 목록</h2>
      <Divider />
    <StaffList />
    </>
  );
}

export default Staff;