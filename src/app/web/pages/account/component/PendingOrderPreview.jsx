import React from 'react';
import { Col, Popconfirm, Row, Steps, Typography } from 'antd';
import { Link } from 'react-router-dom';
import routeURL from 'config/routeURL';
import Cart from 'app/web/pages/cartPage/Cart';
import {
  CheckOutlined,
  DeleteOutlined, ForkOutlined, HomeOutlined,
  LoadingOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined, TeamOutlined
} from '@ant-design/icons';
import config from 'config';
import './index.css';
const rowStyle = {
  width: '100%'
}


const tableColumn = [
  {
    text: '',
    class: 'image',
  },
  {
    text: 'Product',
    class: 'product-overview',
  },
  {
    text: 'Price',
    class: 'price',
  },
  {
    text: 'Quantity',
    class: 'quantity',
  },
  {
    text: 'Total',
    class: 'total',
  },
];

const OrderProgress = ({order}) => {
  let current = 0;
  if(order?.status === "acknowledged") current = 1;
  else if(order?.status === "preparing") current = 2;
  else if(order?.status === "pickup") current = 3;
  else if(order?.status === "delivered") current = 4;

  return (
    <Steps current={current}>
      <Steps.Step title="Checked out" />
      <Steps.Step title="Acknowledged" />
      <Steps.Step title="preparing" />
      <Steps.Step title="Pickup" icon={(order?.deliveryType === "pickup" && order?.status === "pickup") && <CheckOutlined /> }/>
      {order?.deliveryType === "homedelivery" && <Steps.Step title="Delivered" icon={<CheckOutlined />}/>}
    </Steps>
  );
};

export const PendingOrderPreview = ({order}) => {
  console.log('orderrrr', order);
  return (
    <Row
      style={{
      backgroundColor: "#fff",
      borderRadius: 8,
      boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
      padding: 30,
        margin: 20,
       ...rowStyle
    }}>
      <Row style={rowStyle} justify="space-between" align="middle">
        <Col>
         <Typography.Title level={4}>#{order?.orderId}</Typography.Title>
          <small>{order?.deliveryType === "pickup" ? "Self Pickup" : "Home Delivery"}</small>
        </Col>
        <Col>
         <Link to={routeURL.web.restaurant_detail(order?.restaurantId?._id)}>
           <Typography.Title level={4}> {order?.restaurantId?.name}</Typography.Title>
         </Link>
        </Col>
      </Row>
      <Row style={{
        ...rowStyle,
        marginTop: 20,
        marginBottom: 20,
      }} >
        <OrderProgress order={order} />
      </Row>
      <table className="table">
        <thead>
        <tr>
          {tableColumn.map((column) => (
            <th style={{
              boxShadow: "none"
            }} className={column.class}>{column.text}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {(order?.cartId?.foods || []).map((eachCart) => {
          const food = order?.food?.find(eachFood => eachFood?._id?.toString() === eachCart?.foodId);
          if(!food) return <></>;
          return <tr>
            <td style={{
              boxShadow: "none",
              width: 55,
              borderTop: 'none',
            }}>
              <div className="product-image" style={{
                display: "unset",
                paddingTop: 0,
                marginBottom: 0,
                width: 55,
              }}>
                <img
                  style={{
                    position: "unset",
                    width: 50,
                  }}
                  src={config.getImageHost(food?.activeImage)}
                  alt={`cart`}
                />
              </div>
            </td>

            <td className="pending-order-preview product" style={{
              borderTop: 'none',
            }}>
              <div className="cart-product">
                <div className="product-content">
                    <Typography>
                      {food?.name}
                    </Typography>
                </div>
              </div>
            </td>
            <td className="price" style={{
              borderTop: 'none',
            }}>
              <p
                className="cart-price"
                style={{
                  marginBottom: 0,
                }}
              >
                {process.env.REACT_APP_CURRENCY_SYMBOL} {eachCart?.unitPriceWithAddon || 0}
              </p>
            </td>
            <td className="quantity" style={{
              borderTop: 'none',
            }}>
              <p
                className="cart-price"
                style={{
                  marginBottom: 0,
                }}
              > {eachCart?.quantity}</p>

            </td>
            <td className="Total" style={{
              borderTop: 'none',
            }}>
              <p
                className="cart-price"
                style={{
                  marginBottom: 0,
                }}
              >
                {process.env.REACT_APP_CURRENCY_SYMBOL} {eachCart?.subTotal || 0}
              </p>
            </td>
          </tr>
        })}
        <tr>
          <td />
          <td>
            <p
              className="cart-price"
              style={{
                marginBottom: 0,
              }}
            >
             Total
            </p>
          </td>
          <td />
          <td />
          <td className="Total">
            <p
              className="cart-price"
              style={{
                marginBottom: 0,
              }}
            >
              {process.env.REACT_APP_CURRENCY_SYMBOL} {order?.totalPrice}
            </p>
          </td>
        </tr>
        </tbody>
      </table>
    </Row>
  );
};


const PendingOrders = ({orders}) => {
  return (
    <Row style={rowStyle}>
      <Typography.Title level={3}>
        Upcoming orders
      </Typography.Title>
      {orders?.map((order)=>{
        const isPendingOrder = ['checkedOut',
          'acknowledged',
          'preparing'];
          if(isPendingOrder.includes(order?.status) || (order.deliveryType === 'pickup' && order.status === 'pickup')) {
            return <PendingOrderPreview order={order} />
          }
          return <></>;
      })}
    </Row>
  );
};

export default PendingOrders;
