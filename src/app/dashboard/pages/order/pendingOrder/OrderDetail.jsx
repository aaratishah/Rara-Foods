import { Card, Col, Radio, Row, Select, Typography } from "antd";
import api from "app/dashboard/api";
import { getOrderStatus, getPaymentStatus, handleError } from "services/util";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "context/socketContext";
import { notificationError } from "app/web/components/notification";

export default function OrderDetail({ detail, isGuest, fetchOrder, noAction }) {
  const [orderState, setOrderState] = useState({
    checkedOut: [
      {
        label: "Order Acknowledged",
        value: "acknowledged",
        type: "default",
      },
      {
        label: "Cancel Order",
        value: "rejectedByAdmin",
        type: "danger",
      },
    ],
    acknowledged: [
      {
        label: "Preparing Food",
        value: "preparing",
        type: "default",
      },
      {
        label: "Cancel Order",
        value: "rejectedByAdmin",
        type: "danger",
      },
    ],
    preparing: [
      {
        label: "Rider Food Pickup",
        value: "delivered",
        type: "primary",
      },
      {
        label: "Customer Pickup",
        value: "pickup",
        type: "default",
      },
      {
        label: "Cancel Order",
        value: "rejectedByAdmin",
        type: "danger",
      },
    ],
    pickup: [
      {
        label: "Delivered",
        value: "delivered",
        type: "default",
      },
      {
        label: "Cancel Order",
        value: "rejectedByAdmin",
        type: "danger",
      },
    ],
    delivered: [],
    outOfStock: [],
    rejectedByAdmin: [],
    cancelByUser: [],
  });
  const { socket } = useContext(SocketContext);
  const onPaymentStatusChange = (value) => {
    api[isGuest ? "orderGuest" : "order"]
      .paymentStatus(detail._id, value)
      .then(({ data }) => {
        fetchOrder();
      })
      .catch(handleError);
  };

  useEffect(() => {
    if (socket) {
      socket.on("RIDE_STATUS", ({ data, success, message, status }) => {
        if (success) {
          fetchOrder();
        } else {
          notificationError(message);
        }
        // setTempData((rows) => {
        //   let tempOnlineData = [...rows];
        //   const index = tempOnlineData.findIndex(
        //     (each) => each?._id?.toString() === riderId?.toString()
        //   );
        //   if (index >= 0) {
        //     //  update the rider
        //     let updateRide = tempOnlineData[index];
        //     updateRide = {
        //       ...updateRide,
        //       isOnline: online
        //     }
        //     tempOnlineData.splice(index, 1, updateRide);
        //   }
        //   return tempOnlineData;
        // });
      });
    }
  }, [socket]);

  const onOrderStatusChange = (value) => {
    console.log("valueeee", value, detail._id);
    if (value === "delivered") {
      socket.emit("FOOD_READY_TO_DELIVER", {
        orderId: detail._id,
      });
      return;
    }
    api[isGuest ? "orderGuest" : "order"]
      .orderStatus(detail._id, value)
      .then(({ data }) => {
        fetchOrder();
      })
      .catch(handleError);
  };

  return (
    <Row style={{ width: "100%" }} gutter={[16, 16]}>
      {noAction ||
        (orderState[detail.status]?.length > 0 && (
          <>
            <Row style={{ width: "100%" }}>
              <Typography.Title level={5}>Order Status</Typography.Title>
            </Row>
            <Row style={{ marginBottom: 16 }}>
              <Radio.Group>
                {orderState[detail.status].map((currentState) => {
                  return (
                    <Radio.Button
                      danger={currentState?.type === "danger"}
                      type={currentState?.type}
                      onClick={() => onOrderStatusChange(currentState.value)}
                    >
                      {currentState.label}
                    </Radio.Button>
                  );
                })}
              </Radio.Group>
            </Row>
          </>
        ))}

      <Row style={{ width: "100%" }}>
        <Typography.Title level={5}>Order Detail</Typography.Title>
      </Row>
      {detail?.scheduledDate && (
        <Col xs={24} sm={12} md={8}>
          <Card style={{ width: "100%" }}>
            <Card.Meta
              title="Scheduled At"
              description={(() => {
                const isBefore = moment(detail?.scheduledDate).isBefore(
                  moment()
                );
                return isBefore
                  ? moment(detail?.scheduledDate).toNow()
                  : moment(detail?.scheduledDate).fromNow();
              })()}
            />
          </Card>
        </Col>
      )}
      {[
        {
          title: "Order ID",
          value: detail.orderId,
        },
        {
          title: "Total Payment",
          value: detail.totalPrice,
        },
        {
          title: "Payment Mode",
          value: detail.paymentMode,
        },
        // {
        //   title: 'Payment Status',
        //   value: detail.paymentStatus,
        // },
        {
          title: "Delivery Type",
          value: detail.deliveryType,
        },
        // {
        //   title: 'Order Status',
        //   value: detail.status,
        // },
      ].map((each) => (
        <Col xs={24} sm={12} md={8}>
          <Card style={{ width: "100%" }}>
            <Card.Meta title={each.value} description={each.title} />
          </Card>
        </Col>
      ))}
      <Col xs={24} sm={12} md={8}>
        <Card style={{ width: "100%" }}>
          <Card.Meta
            title={
              <Select
                disabled={noAction}
                onChange={onPaymentStatusChange}
                defaultValue={detail.paymentStatus}
                style={{ width: "100%" }}
              >
                {getPaymentStatus().map((mode) => (
                  <Select.Option value={mode}>{mode}</Select.Option>
                ))}
              </Select>
            }
            description="Payment Status"
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card style={{ width: "100%" }}>
          <Card.Meta
            title={
              <Select
                disabled={noAction}
                onChange={onOrderStatusChange}
                defaultValue={detail.status}
                style={{ width: "100%" }}
              >
                {getOrderStatus().map((orderStatus) => (
                  <Select.Option value={orderStatus}>
                    {orderStatus}
                  </Select.Option>
                ))}
              </Select>
            }
            description="Order Status"
          />
        </Card>
      </Col>
    </Row>
  );
}
