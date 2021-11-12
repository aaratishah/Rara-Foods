import React, { Fragment, useContext } from "react";
import { Typography, Row, Col } from "antd";
import { OrderTypeContext } from "context/";
import "./index.css";

const { Text } = Typography;

const OrderTypes = () => {
  const { activeOrderType, setActiveOrderType } = useContext(OrderTypeContext);

  const { isDinning, hasOwnDelivery, userPickup } = activeOrderType;

  const changeOrderType = (typeText) => {
    setActiveOrderType({
      isDinning: false,
      hasOwnDelivery: false,
      userPickup: false,
      [typeText]: true,
    });
  };

  return (
    <Fragment>
      <Row className="pickup-option-container">
        <Col
          className="pickup-option-items"
          style={{
            backgroundColor: hasOwnDelivery ? "#ffffff" : "#eeeeee",
          }}
          onClick={() => changeOrderType("hasOwnDelivery")}
        >
          <Text strong>Delivery</Text>
        </Col>
        <Col
          className="pickup-option-items"
          style={{
            backgroundColor: userPickup ? "#ffffff" : "#eeeeee",
          }}
          onClick={() => changeOrderType("userPickup")}
        >
          <Text strong>Pickup</Text>
        </Col>
        <Col
          className="pickup-option-items"
          style={{
            backgroundColor: isDinning ? "#ffffff" : "#eeeeee",
          }}
          onClick={() => changeOrderType("isDinning")}
        >
          <Text strong>Dine-in</Text>
        </Col>
      </Row>
    </Fragment>
  );
};

export default OrderTypes;
