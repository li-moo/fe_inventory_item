import React from 'react';
import { Divider } from "antd";
import EventList from './EventList';

function Event() {
  return (
    <>
    <h2>EVENT</h2>
      <Divider />
      <EventList />
    </>
  );
}

export default Event;