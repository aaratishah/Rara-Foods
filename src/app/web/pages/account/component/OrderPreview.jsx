import { CloseOutlined } from '@ant-design/icons';
import { Col, Modal, Row, Spin, Typography } from 'antd';
import api from 'app/web/api';
import { notificationError } from 'app/dashboard/components/notification';
import { useEffect, useState } from 'react';
import './index.css';
import OrderDetail from './OrderDetail';
import Cart from './ProductDetails';
import RestaurantDetail from './RestaurantDetail';

const rowStyle = {
  width: '100%',
};
const tableColumn = [
  {
    text: 'Food',
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
  orderId,
  previewVisible,
  setPreviewVisible,
}) {
  const [detail, setDetail] = useState(null);
  const [spinning, setSpinning] = useState(false);

  // check wishlist
  useEffect(() => {
    if (orderId) {
      setSpinning(true);
      api.checkout
        .orderDetail(orderId)
        .then(({ data }) => setDetail(data))
        .catch((error) => {
          if (error && error.response && error.response.data) {
            if (typeof error.response.data.message === 'string')
              return notificationError(error.response.data.message);
            let errors = error.response.data;
            if (errors && errors.errors) errors = errors.errors;
            Object.keys(errors).map((key) => notificationError(errors[key]));
          }
        })
        .finally(() => setSpinning(false));
    }
    return () => {
      setDetail(null);
    };
  }, [orderId]);

  return (
    <Modal
      width={750}
      closable={false}
      title={false}
      footer={false}
      onCancel={() => setPreviewVisible(false)}
      visible={previewVisible}
    >
      {spinning ? (
        <Row
          justify="center"
          align="middle"
          style={{
            width: '100%',
            height: 300,
          }}
        >
          <Spin spinning={spinning} />
        </Row>
      ) : (
        detail && (
          <Row style={{ ...rowStyle }}>
            <Row style={rowStyle} justify="space-between">
              <Typography.Title level={4}>
                Order ID: {detail.orderId}
              </Typography.Title>
              <Col>
                <CloseOutlined onClick={() => setPreviewVisible(false)} />
              </Col>
            </Row>
            <Row style={{ ...rowStyle }}>
              <OrderDetail detail={detail} />
            </Row>
            <Row style={{ ...rowStyle }}>
              <RestaurantDetail detail={detail.restaurant} />
            </Row>
            <Row style={{ ...rowStyle }}>
              <Row style={{ width: '100%' }} gutter={[16, 16]}>
                <Row style={{ width: '100%' }}>
                  <Typography.Title level={5}>Product Detail</Typography.Title>
                </Row>
                <div className="container">
                  <div className="cart-table table-responsive">
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
                          detail.foods.map((eachCart, index) => (
                            <Cart cart={eachCart} />
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Row>
            </Row>
          </Row>
        )
      )}
    </Modal>
  );
}
