import React from "react";
import { Col, Row, Spin } from "antd";

const Spinner = () => {
  return (
    <Row
      style={{
        width: "100%",
        height: 200,
      }}
      justify="center"
      align="middle"
    >
      <Col>
        <Spin />
      </Col>
    </Row>
  );
};

export default Spinner;
