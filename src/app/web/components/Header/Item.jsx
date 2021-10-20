/* eslint-disable jsx-a11y/anchor-is-valid */
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { Col, Popconfirm, Row, Typography } from 'antd';
import api from 'app/web/api';
import config from 'config';
import routeURL from 'config/routeURL';
import { ShopContext } from 'context';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { handleError } from 'services/util';
import { notificationError } from '../notification';

export default function Item({ cart, setCartVisible, isAuth}) {
  const [spinning, setSpinning] = useState(false);

  const {
    cart: { fetchCart },
  } = useContext(ShopContext);
  const onDelete = () => {
    if (!cart || !cart.cartFood._id) {
      return;
    }
    if (true) {
      setSpinning(true);
      api[isAuth ? 'cart' : "cartGuest"]
        .delete(cart.cartFood._id)
        .then(({ message }) => {
          fetchCart();
        })
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  };
  return (
    <Row
      align="middle"
      justify="space-between"
      style={{
        width: '100%',
        padding: 8
      }}
    >
      <Col xs={4}>
        {cart.orginalFood.activeImage && (
          <img
            src={config.getImageHost(cart.orginalFood.activeImage)}
            alt={cart.orginalFood && cart.orginalFood.name}
            style={{
              height: 40,
              width: '100%',
            }}
          />
        )}
      </Col>
      <Col xs={15}>
        <Link
          onClick={() => setCartVisible(false)}
          // to={routeURL.web.cart_edit_item(idx.toString())}
        >
          <Typography.Text
            style={{
              marginLeft: 4,
              marginRight: 4,
              fontWeight: 500,
              textDecoration: 'underline',
            }}
          >
            {cart.orginalFood && cart.orginalFood.name}
          </Typography.Text>
        </Link>
      </Col>
      <Col xs={3}>{process.env.REACT_APP_CURRENCY_SYMBOL}{cart.cartFood && cart.cartFood.subTotalPrice}</Col>
      <Col xs={1}>
        <Popconfirm title="Delete Item?" onConfirm={!spinning && onDelete}>
          {spinning ? <LoadingOutlined /> :<CloseOutlined
            style={{
              cursor: spinning ? 'not-allowed' : 'pointer',
            }}
          />}
        </Popconfirm>
      </Col>
    </Row>
  );
}
