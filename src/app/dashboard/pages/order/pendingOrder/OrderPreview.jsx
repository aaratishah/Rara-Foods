import { CloseOutlined, DeleteFilled } from '@ant-design/icons';
import { Button, Col, Modal, Popconfirm, Row, Spin, Tabs, Tag, Typography } from 'antd';
import api from 'app/dashboard/api';
import React, { useEffect, useState } from 'react';
import { handleError } from 'services/util';
import './index.css';
import OrderDetail from './OrderDetail';
import config from 'config';
import RemarksInput from './RemarksInput';
import ShippingAddress from './ShippingAddress';
import UserDetail from './UserDetail';
import FullScreen from 'app/dashboard/components/user/FullScreenDialog';
import AddOrder from './AddOrder';
import RestaurantDetail from 'app/web/pages/account/component/RestaurantDetail';

const rowStyle = {
  width: '100%',
};
const tableColumn = [
  {
    text: 'Action',
    class: '',
  },
  {
    text: 'Image',
    class: 'image',
  },
  {
    text: 'Product',
    class: 'product',
  },
  {
    text: 'Addons',
    class: 'product',
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
export default function OrderPreview({
  noAction,
  isGuest,
  orderId,
  previewVisible,
  setPreviewVisible,
  refresh,
}) {
  const [detail, setDetail] = useState(null);
  const [spinning, setSpinning] = useState(false);

  // check wishlist
  useEffect(() => {
    if (orderId || (previewVisible && !detail)) {
      setSpinning(true);
      api[isGuest ? 'orderGuest' : 'order']
        .read(orderId)
        .then(({ data }) => setDetail(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
    return () => {
      setDetail(null);
    };
  }, [orderId, previewVisible]);

  const fetchOrder = () => {
    setSpinning(true);
    api[isGuest ? 'orderGuest' : 'order']
      .read(orderId)
      .then(({ data }) => setDetail(data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  }

  const [addOrder, setAddOrder] = useState(false);

  const UserBasket = () => <Row style={{
    ...rowStyle,
    padding: 16
  }}>
    <Row style={{ width: '100%' }} gutter={[16, 16]}>
      <Row style={{ width: '100%' }}>
        <Typography.Title level={5}>User's Basket</Typography.Title>
      </Row>
      <div className="container">
        <div className="cart-table table-responsive">
          {detail.status === 'checkedOut'  && <Row justify="end">
            <Button type="primary" onClick={() => setAddOrder(true)}>
              Add Food
            </Button>
          </Row>}
          <table className="table">
            <thead>
            <tr>
              {tableColumn.map((column) => (
                <th className={column.class}>{column.text}</th>
              ))}
            </tr>
            </thead>
            <tbody>
            {detail.foods &&
            detail.foods.map((eachOrder, index) => (
              <OrderRowDetail
                fetchOrder={fetchOrder}
                order={eachOrder}
                orderId={detail?._id}
              />
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </Row>
  </Row>;

  const orderDetail = spinning ? (
      <Spin spinning={spinning}/>
    ) : (
      detail && (
        <Row style={{
          ...rowStyle,
          padding: 16
        }} gutter={[0, 16]}>
          <Row style={rowStyle} justify="space-between">
            <Typography.Title level={5}>
              Order ID: {detail.orderId}
            </Typography.Title>
            <Col>
              <CloseOutlined
                onClick={() => {
                  if (typeof refresh === 'function') refresh();
                  setPreviewVisible(false);
                }}
              />
            </Col>
          </Row>
          <Row style={{
            ...rowStyle,
            padding: 16
          }}>
            <OrderDetail noAction={noAction} fetchOrder={fetchOrder} detail={detail} isGuest={isGuest}/>
          </Row>
          <Row style={{
            ...rowStyle,
            padding: 16
          }}>
            <RemarksInput remarks={detail.remarks} orderId={orderId}/>
          </Row>
          <Row style={{ ...rowStyle }}>
            <RestaurantDetail detail={detail.restaurant} />
          </Row>
          <Row style={{
            ...rowStyle,
            padding: 16
          }}>
            <UserDetail user={detail.clientId} orderId={orderId}/>
          </Row>
          <Row style={{
            ...rowStyle,
            padding: 16
          }}>
            <ShippingAddress deliveryType={detail.deliveryType} location={detail.location}
                             orderId={orderId}/>
          </Row>

          <Row style={{width: '100%'}}>
            <UserBasket />
            {/*<Tabs style={{width: '100%'}}  defaultActiveKey="1" centered >*/}
            {/*  <Tabs.TabPane  tab="User Basket" key="1">*/}
            {/*    <UserBasket />*/}
            {/*  </Tabs.TabPane>*/}
            {/*  <Tabs.TabPane  tab="Edit Basket" key="2">*/}
            {/*    <EditCustomerBasket />*/}
            {/*  </Tabs.TabPane>*/}
            {/*</Tabs>*/}
          </Row>

        </Row>
      )
    );

  return (
    <FullScreen
      className='order-preview-dashboard'
      style={{
        width: '100%',
        zIndex: 9
      }}
      closable={false}
      title={"Order Detail"}
      footer={false}
      handleClose={() => {
        if (typeof refresh === 'function') refresh();
        setPreviewVisible(false);
      }}
      open={previewVisible}
    >
      {addOrder ? <AddOrder fetchOrder={fetchOrder} isGuest={isGuest} setAddOrder={setAddOrder} restaurant={detail?.restaurant?._id} orderId={detail?._id} /> : orderDetail}
    </FullScreen>
  );


}

const OrderRowDetail = ({order, orderId, setSpinning, fetchOrder}) => {
  const onDeleteFoodFromOrder = () => {
    api.order
      .removeFood(orderId, order?._id)
      .then(({ data }) => fetchOrder())
      .catch(handleError);
  }
  return <tr>
    <td>
      <Popconfirm
        title={`Are you sure delete this Food from the order?`}
        onConfirm={onDeleteFoodFromOrder}
        >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          cursor: "pointer",
          color: "red",
        }}
      >
        <DeleteFilled style={{ marginRight: 5 }} />

      </div>
    </Popconfirm>
    </td>
    <td>
      <img src={config.getImageHost(order?.activeImage)} width={100}/>
    </td>
    <td>
      {order?.name}
    </td>
    <td>
      {order?.addon ? order?.addon.map(eachAddon => <Tag>{eachAddon?.name}: {eachAddon?.value}</Tag>) : "No Addon"}
    </td>
    <td>
      {process.env.REACT_APP_CURRENCY_SYMBOL}{order?.unitPriceWithAddon}
    </td>
    <td>
      {order?.quantity}
    </td>
    <td>
      {process.env.REACT_APP_CURRENCY_SYMBOL}{order?.subTotal}
    </td>

  </tr>
}
