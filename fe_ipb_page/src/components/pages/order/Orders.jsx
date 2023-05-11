import React from 'react';
import { Divider } from "antd";
import { Container, Row, Col } from 'react-bootstrap';
import ProductList from '../product/ProductList';
import Event from '../event/EventList';
import StoreProductList from '../storeproduct/StoreProductList';


function Order() {
  return (
    <>
    <h2>오다 리스트</h2>
      <Divider />
      <Container>
      <Row>
        <Col sm={8} className="bg-gray-300">
          <StoreProductList />
        </Col>
        <Col sm={4} className="bg-gray-600">
          <Event />
        </Col>
      </Row>
</Container>
    </>
  );
}

export default Order;