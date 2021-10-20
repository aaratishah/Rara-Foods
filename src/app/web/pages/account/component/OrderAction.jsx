import React, { useContext, useState } from 'react';
import { Button, Col, Modal, Row, Tooltip } from 'antd';
import { BookOutlined, EyeFilled, ShoppingFilled } from '@ant-design/icons';
import api from 'app/web/api';
import routeURL from 'config/routeURL';
import { handleError } from 'services/util';
import { ShopContext } from 'context';
import { useHistory } from 'react-router-dom';
import './receipt.css';
import { Receipt } from 'app/web/pages/checkoutPage/OrderSuccess';

const ReceiptModal = ({preview, setPreview, order}) => {
  return <Modal
    width={370}
    closable={false}
    maskClosable={true}
    mask={true}
    className="order-receipt"
    title={false}
    style={{ top: 20 }}
    visible={preview}
    onCancel={() => setPreview(false)}
    footer={null}>
    <Receipt orderDetail={order} />
  </Modal>
}
const OrderAction = ({onPreview, order}) => {
  const [showReceipt, setShowReceipt] = useState(false);
  let history = useHistory();

  const {
    cart: { fetchCart },
  } = useContext(ShopContext);

  const onReOrder = () => {
    Modal.confirm({
      title: 'Are you sure want to re order the foods?',
      content: 'This will replace your currently active cart!',
      okText: 'Order',
      onOk: () => {
        return new Promise((resolve, reject) => {
          api.cart
            .reOrder({
              orderId: order?._id
            })
            .then(() => {
              // fetch the cart
              fetchCart();
              //  Redirect to the cart page
              history.push(routeURL.web.cart());
            })
            .catch(handleError)
            .finally(() => {
              resolve(1);
            });
        });
      },
    });
  };

  return (
    <>
      <ReceiptModal order={order}  preview={showReceipt} setPreview={setShowReceipt}/>
      <Row gutter={8} align="middle">
        <Col>
          <Tooltip title="View order detail.">
            <EyeFilled
              onClick={onPreview}
            />
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Re Order the Food.">
            <Button onClick={onReOrder} style={{
              borderRadius: 8,
            }} icon={<ShoppingFilled/>} type="primary">

            </Button>
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Receipt">
            <Button onClick={()=>setShowReceipt(true)} style={{
              borderRadius: 8,
            }} icon={<BookOutlined />} type="primary">

            </Button>
          </Tooltip>
        </Col>
      </Row>
    </>
  );
};

export default OrderAction;
