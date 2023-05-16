import React from 'react';
import { Divider } from "antd";
import { Container, Row, Col } from 'react-bootstrap';
import OrderProductList from './OrderProductList';
import Cart from '../cart/Cart';


function Order() {

  return (
    <>
    <h2>오다 리스트</h2>
      <Divider />
      <Container>
      <Row>
        <Col sm={8} className="bg-gray-300">
          <OrderProductList />
        </Col>
        <Col sm={4} className="bg-gray-600">
          <Cart />
        </Col>
      </Row>
</Container>
    </>
  );
}

export default Order;