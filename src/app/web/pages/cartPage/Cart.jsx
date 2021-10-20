/* eslint-disable jsx-a11y/anchor-is-valid */
import { DeleteOutlined, LoadingOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Avatar, Popconfirm, Typography } from 'antd';
import api from 'app/web/api';
import { notificationError } from 'app/web/components/notification';
import config from 'config';
import routeURL from 'config/routeURL';
import { ShopContext } from 'context';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { handleError } from 'services/util';
const getSubtotal = (actualProductPrice, quantity) => {
  return actualProductPrice * quantity;
};
export default function Cart({ isAuth, cart, increaseDecreaseSubtotal }) {
  const [spinning, setSpinning] = useState(false);
  const [quantityLoading, setQuantityLoading] = useState(false);
  const [quantity, setQuantity] = useState(cart.cartFood.quantity);

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

  const decreaseQuantity = () => {
    if (quantity > (cart.orginalFood.minQuantity || 1))
      onChangeQuantity(quantity - 1, () => {
        increaseDecreaseSubtotal(-1, cart.cartFood.unitPriceWithAddon);
      });
  };

  const increaseQuantity = () => {
    onChangeQuantity(quantity + 1, () => {
      increaseDecreaseSubtotal(1, cart.cartFood.unitPriceWithAddon);
    });
  };

  const onChangeQuantity = (quantityToBe, callback) => {
    if (!cart || !cart.cartFood._id) {
      return;
    }
    if (true) {
      setQuantityLoading(true);
      api[isAuth ? "cart" : "cartGuest"]
        .changeQuantity(cart.cartFood._id, quantityToBe)
        .then(({ message }) => {
          setQuantity(quantityToBe);
          if(typeof callback === "function") callback()
        })
        .catch((error) => {
          if (error && error.data) {
            if (typeof error.data.message === 'string')
              return notificationError(error.data.message);
            let errors = error.data;
            Object.keys(errors).map((key) =>
              notificationError(errors[key], 'Registration Failed')
            );
          }
        })
        .finally(() => setQuantityLoading(false));
    }
  };

  return (
    <tr>
      <td className="delete">
        <a
          style={{
            cursor: spinning ? 'not-allowed' : 'pointer',
            color: 'black',
          }}
          classname="product-delete"
        >
          {spinning ? (
            <LoadingOutlined />
          ) : (
            <Popconfirm
              title="Are you sure to delete this cart?"
              onConfirm={!spinning && onDelete}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined
                style={{
                  color: 'red',
                }}
              />{' '}
            </Popconfirm>
          )}
        </a>
      </td>
      <td className="product" style={{
        boxShadow: "none",
      }}>
        <div className="cart-product">
          <div className="product-image" style={{
            display:"unset",
            paddingTop: 0,
            marginBottom: 0,
          }}>
            <img
            style={{
              position: "unset",
            }}
              src={config.getImageHost(cart.orginalFood.activeImage)}
              alt={`${cart.orginalFood && cart.orginalFood.name} cart`}
            />
          </div>
          <div className="product-content">
            <h5
              className="title"
              style={{
                marginBottom: 0,
              }}
            >
              <Typography>
                {cart.orginalFood && cart.orginalFood.name}
              </Typography>
            </h5>
          </div>
        </div>
      </td>
      <td className="price">
        <p
          className="cart-price"
          style={{
            marginBottom: 0,
          }}
        >
          {process.env.REACT_APP_CURRENCY_SYMBOL}{cart.cartFood && cart.cartFood.unitPriceWithAddon}
        </p>
      </td>
      <td className="quantity">
        <div
          className="product-quantity align-content-center"
          style={{
            margin: 0,
            border: "none"
          }}
        >
          <button
            disabled={quantityLoading}
            type="button"
            className="add"
            onClick={decreaseQuantity}
          >
            <MinusCircleOutlined/>
          </button>
          {quantity}
          <button
            disabled={quantityLoading}
            type="button"
            className="sub"
            onClick={increaseQuantity}
          >
            <PlusCircleOutlined />
          </button>
        </div>
      </td>
      <td className="Total">
        <p
          className="cart-price"
          style={{
            marginBottom: 0,
          }}
        >
          {process.env.REACT_APP_CURRENCY_SYMBOL}{parseFloat(cart.cartFood.unitPriceWithAddon * quantity).toFixed(2)}
        </p>
      </td>
    </tr>
  );
}
