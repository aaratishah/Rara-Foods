import { Button, Col, Form, Radio, Result, Row, Spin } from 'antd';
import api from 'app/web/api';
import { notificationError } from 'app/web/components/notification';
import { mapCenterDefault } from 'config';
import routeURL from 'config/routeURL';
import { ShopContext, UserContext, UserLoginContext } from 'context';
import bannerImage from 'image/background.png';
import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { handleError } from 'services/util';
import Cart from './Cart';
import ShippingAddress from './ShippingAddress';
import GuestShippingAddress from './ShippingAddressGuest';
import TotalCheckout from './TotalCheckout';

const Banner = () => (
  <section
    className="page-banner bg_cover"
    style={{ backgroundImage: `url(${bannerImage})` }}
  >
    <div className="container">
      <div className="page-banner-content text-center">
        <h2 className="title">Cart</h2>
        <ol className="breadcrumb justify-content-center">
          <li className="breadcrumb-item">
            <Link to={routeURL.web.home()}>Home</Link>
          </li>
          <li className="breadcrumb-item active">Cart</li>
        </ol>
      </div>
    </div>
  </section>
);

const tableColumn = [
  {
    text: '',
    class: 'delete',
  },
  {
    text: 'Product',
    class: 'delete',
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

export default function CartPage() {
  const [isVisible, setVisible, tab, setTab, setSyncCart] = useContext(
    UserLoginContext
  );
  const showLoginModal = () => {
    setSyncCart(true);
    setTab('1');
    setVisible(true);
  };
  const [locationForm] = Form.useForm();
  const [location, setLocation] = useState(mapCenterDefault);

  const [deliveryType, setDeliveryType] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [shippingCharge, setShippingCharge] = useState(0);
  const { clientStore } = useContext(UserContext);
  const isAuth = clientStore.isAuthenticated;
  const [subTotal, setSubTotal] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  let history = useHistory();
  const {
    cart: { items: carts, resetItems, cartRestaurant, cartDetail, spinning },
  } = useContext(ShopContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (cartDetail) {
      setSubTotal(cartDetail.totalPrice);
    }
  }, [cartDetail]);

  // value mai neg ra positive number send gare pani hunxa, just in case, if we had to know if value is being
  // deducted or added,
  const increaseDecreaseSubtotal = (operator, value) => {
    console.log('operator', operator, value);
    switch (operator) {
      case +1:
        setSubTotal(subTotal + parseFloat(value));
        break;
      case -1:
        if (value <= subTotal) setSubTotal(subTotal - parseFloat(value));
        break;

      default:
        return subTotal;
    }
  };

  const onCheckout = () => {
    if (isAuth) {
      if (!deliveryType) {
        return notificationError('Choose Shipping option');
      }
      if (deliveryType === 'homedelivery' && (!shippingAddress || !location.latitude)) {
        return notificationError('Please select shipping address');
      }
      const jsonData = {
        location: shippingAddress,
        deliveryType,
      };
      setSubmitting(true);
      api.cart
        .checkout(jsonData)
        .then(({ data }) => {
          // on success
          resetItems();
          history.push(routeURL.web.checkout());
        })
        .catch(handleError)
        .finally(() => setSubmitting(false));
    } else {
      locationForm.validateFields().then((values) => {
        // if no error then here
        if (!deliveryType) {
          return notificationError('Choose Shipping option');
        }
        const jsonData = {
          location: {
            ...values,
            ...location,
          },
          deliveryType,
        };
        api.cartGuest
          .checkout(jsonData)
          .then(({ data }) => {
            // on success
            resetItems();
            history.push(routeURL.web.checkout());
          })
          .catch(handleError)
          .finally(() => setSubmitting(false));
      });
    }
  };

  const onDeliveryTypeChange = (deliveryType) => {
    setDeliveryType(deliveryType);
  };
  return isAuth === undefined ? null : (
    <>
      <Banner />
      {spinning ? (
        <Row
          justify="center"
          align="middle"
          style={{
            width: '100%',
            minHeight: 400,
          }}
        >
          {' '}
          <Spin />
        </Row>
      ) : carts && carts.length === 0 ? (
        <Result
          status="404"
          title="You do not have any item on Cart!"
          subTitle="Please visit the homepage to buy more items"
          extra={[
            <Link to={routeURL.web.home()}>
              <Button>Continue Shopping</Button>
            </Link>,
          ]}
        />
      ) : (
        <section className="cart-page pt-80 pb-80">
          <div className="container">
            <div
              className="cart-table table-responsive"
              style={{
                marginBottom: 30,
              }}
            >
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
                  {carts &&
                    carts.map((eachCart) => (
                      <Cart
                        isAuth={isAuth}
                        increaseDecreaseSubtotal={increaseDecreaseSubtotal}
                        cart={eachCart}
                      />
                    ))}
                </tbody>
              </table>
            </div>
            <div
              className="cart-btn"
              style={{
                width: '100%',
              }}
            >
              <div
                className="cart-btn-right"
                style={{
                  float: 'right',
                }}
              >
                <Link to={routeURL.web.home('arrival')} className="main-btn" style = {{
                  borderRadius: '500px', backgroundColor: '#000'
                }}>
                  Continue Shopping
                </Link>
              </div>
              {/* <div className="cart-btn-right">
              <a href="#" className="main-btn main-btn-2">
                Clear Cart
              </a>
              <a href="#" className="main-btn main-btn-2">
                Update Cart
              </a>
            </div> */}
            </div>
            <Row
              gutter={[16, 16]}
              style={{
                width: '100%',
                margin: "30px 0px",
              }}
            >
              {!isAuth && (
                <Radio.Group
                  value="guest"
                  buttonStyle="solid"
                  style={{
                    width: '100%',
                    margin: '10px 0px',
                  }}
                >
                  <Radio.Button value="guest">Guest Checkout</Radio.Button>
                  <Radio.Button value="login" onClick={showLoginModal}>
                    Login/Register
                  </Radio.Button>
                </Radio.Group>
              )}
              <Col xs={24} lg={18}>
                {isAuth ? (
                  <ShippingAddress isDisabled={deliveryType=="pickup"}
                                   setShippingAddress={setShippingAddress}
                  />
                ) : (
                  <GuestShippingAddress
                    isDisabled={deliveryType=="pickup"}
                    location={location}
                    setLocation={setLocation}
                    locationForm={locationForm}
                  />
                )}
              </Col>
              <Col xs={24} lg={6}>
                <TotalCheckout
                  onDeliveryTypeChange={onDeliveryTypeChange}
                  submitting={submitting}
                  onCheckout={onCheckout}
                  subtotal={subTotal}
                  shippingCharge={shippingCharge}
                  // currency={carts && carts[0] && carts[0].currency}
                />
              </Col>
            </Row>
          </div>
        </section>
      )}
    </>
  );
}
