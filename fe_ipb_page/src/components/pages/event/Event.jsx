import React from 'react';
import { Divider } from "antd";
import EventList from './EventList';

function Event() {
  return (
    <>
    <h2>이벤트 리스트</h2>
      <Divider />
      <EventList />
    </>
  );
}

export default Event;