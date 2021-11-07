import {
  ArrowLeftOutlined,
  DeleteFilled,
  FieldTimeOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Collapse,
  DatePicker,
  Divider,
  Radio,
  Result,
  Row,
  Spin,
  Tabs,
  Tag
} from 'antd';
import api from 'app/web/api';
import { notificationError } from 'app/web/components/notification';
import routeURL from 'config/routeURL';
import { UserContext } from 'context';
import bannerImage from 'image/background.png';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { handleError } from 'services/util';
import moment from 'moment';
import './index.css';
import StripeContainer from './stripe/StripeContainer';
import OrderSuccess from 'app/web/pages/checkoutPage/OrderSuccess';

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px'
};

const paymentMethods = [
  // {
  //   value: 'DIRECT_BANK_TRANSFER',
  //   label: 'Direct Bank Transfer',
  //   description:
  //     'Please send a Check to Store name with Store Street, Store Town, Store State, Store Postcode, Store Country.',
  // },
  // {
  //   value: 'CHECK_PAYMENT',
  //   label: 'Check Payment',
  //   description:
  //     'Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.',
  // },
  // {
  //   value: 'CASH_ON_DELIVERY',
  //   label: 'Cash on Delivery',
  //   description: 'Pay with cash upon delivery.',
  // },
  {
    value: 'STRIPE',
    label: 'Stripe',
    description: 'Pay via Stripe; you can pay with your credit card or Visa.'
  }
];

const Banner = () => (
  <section
    className="page-banner bg_cover"
    style={{ backgroundImage: `url(${bannerImage})` }}
  >
    <div className="container">
      <div className="page-banner-content text-center">
        <h2 className="title">Checkout</h2>
        {/*<ol className="breadcrumb justify-content-center">*/}
        {/*  <li className="breadcrumb-item">*/}
        {/*    <Link to={routeURL.web.home()}>Home</Link>*/}
        {/*  </li>*/}
        {/*  <li className="breadcrumb-item active">Checkout</li>*/}
        {/*</ol>*/}
      </div>
    </div>
  </section>
);

function disabledDate(current) {
  // Can not select days before today and today
  return (
    (current && current < moment().startOf('day')) ||
    current > moment().add(2, 'days')
  );
}

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDateTime() {
  let current = moment();
  return {
    disabledHours: () => range(0, (moment().hour() + 1) % 23),
    disabledMinutes: () => range(0, moment().minute())
  };
}

export default function Checkout() {
  const [scheduleType, setScheduleType] = useState({}); //now
  const [scheduleTime, setScheduleLater] = useState({}); //moment().add(1, 'hour')
  const [specialNote, setSpecialNote] = useState();
  const [grandTotalPrice, setTotalPrice] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [totalShipCharge, setTotalShipCharge] = useState(0);
  const { clientStore } = useContext(UserContext);
  const isAuth = clientStore.isAuthenticated;
  const [restaurantDetail, setRestaurantDetail] = useState({});
  const [orderDetail, setOrderDetail] = useState({});
  const [items, setItems] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('STRIPE');
  const [shippingCharge, setShippingCharge] = useState({});
  const [location, setLocationId] = useState([]);

  const onShippingVehicleChange = (orderId, shipDetail) => {
    setShippingCharge((shipCharge) => ({
      ...shipCharge,
      [orderId?.toString()]: shipDetail
      // {
      //   _id: shipId,
      //     fare: shipFare
      // }
    }));
  };
  useEffect(() => {
    let totalShipCharge = 0;
    Object.keys(shippingCharge)?.map((eachOrderId) => {
      let shipCharge = shippingCharge[eachOrderId];
      if (shipCharge) shipCharge = JSON.parse(shipCharge);
      if (shipCharge) shipCharge = shipCharge?.fare;
      if (shipCharge) totalShipCharge += parseFloat(shipCharge || 0);
    });
    setTotalShipCharge(totalShipCharge);
  }, [shippingCharge]);
  const [successData, setSuccessData] = useState({});
  const onPlaceOrder = (paymentToken) => {
    if (!paymentMethod) {
      return notificationError('Please Select Payment Method');
    }
    if (paymentMethod === 'STRIPE' && !paymentMethod) {
      return notificationError('Please complete payment first');
    }
    if (isAuth === undefined) {
      return false;
    } else {
      setSubmitting(true);
      const jsonData = {
        paymentMode: paymentMethod,
        specialNote,
        scheduleTime,
        scheduleType,
        shippingCharge,
        location
      };
      console.log("submitting", jsonData);
      if (paymentMethod === 'STRIPE' && paymentToken) {
        jsonData.paymentToken = paymentToken;
      }
      api[isAuth ? 'checkout' : 'checkoutGuest']
        .placeOrder(jsonData)
        .then(({ data }) => {
          setSuccessData(data);
          setSubmitted(true);
          window.scrollTo(0, 0);
        })
        .catch(handleError)
        .finally(() => setSubmitting(false));
    }
  };

  const onHandleStripe = (isSuccess, response) => {
    if (isSuccess) {
      const { id } = response;
      if (id) {
        onPlaceOrder(id);
      } else {
        notificationError('Cannot initialize Payment');
      }
    } else {
      notificationError(response, 'Payment Failed');
    }
  };

  const onDeleteOrder = (orderId) => {
    if (!orderId) return notificationError('Please select order to delete');
    if (isAuth === undefined) {
      return notificationError('Authentication error');
    }
    setSubmitting(true);
    api[isAuth ? 'checkout' : 'checkoutGuest']
      .delete(orderId)
      .then(({ data }) => {
        fetchItems();
      })
      .catch(handleError)
      .finally(() => setSubmitting(false));
  };
  const fetchItems = () => {
    setSpinning(true);
    api[isAuth ? 'checkout' : 'checkoutGuest']
      .get()
      .then(({ data }) => {
        if (Array.isArray(data)) {
          console.log('data', data);
          const shippingCharge = {};
          const scheduleTypeTemp = {};
          const scheduleTimeTemp = {};
          const locationIds = [];
          setTotalTax(data.reduce((acc, cur) => acc + cur.tax, 0));
          setTotalPrice(
            data.reduce((acc, curr) => {
              if (curr?.deliveryType === 'homedelivery') {
                let ship = curr?.deliveryCharges;
                if (ship) ship = ship[0];
                if (ship) {
                  shippingCharge[curr?._id?.toString()] = JSON.stringify({
                    _id: ship?._id,
                    fare: ship?.fare
                  });
                }
              }
              scheduleTypeTemp[curr._id?.toString()] = 'now';
              scheduleTimeTemp[curr._id?.toString()] = moment().add(1, 'hour');
              if (curr.location) {
                locationIds.push(curr.location._id);
              }
              return acc + curr.totalPrice;
            }, 0)
          );
          setScheduleType(scheduleTypeTemp);
          setScheduleLater(scheduleTimeTemp);
          setShippingCharge(shippingCharge);
          setLocationId(locationIds);
          setItems(data);
        }
      })
      .catch(handleError)
      .finally(() => setSpinning(false));
  };
  useEffect(() => {
    if (isAuth === undefined) return;
    fetchItems();
  }, [isAuth]);

  const buildOrderDetail = () => {
    return (
      <>
        <Collapse defaultActiveKey={['order-0']}>
          {items && items.map((item, index) => {
            let subTotalPrice = item.totalPrice;
            let tax = item.tax;
            let shipCharge = 0;
            if (shippingCharge[item?._id]?.toString()) {
              shipCharge = parseFloat(
                JSON.parse(shippingCharge[item?._id])?.fare || 0
              );
            }
            let totalPrice = parseFloat(
              subTotalPrice  + tax
            ).toFixed(2);
            // item is eachOrder
            return (
              <Collapse.Panel
                showArrow={false}
                header={
                  <Row
                    style={{
                      width: '100%'
                    }}
                    justify="space-between"
                    align="middle"
                    gutter={4}
                  >
                    <Col>
                      <ArrowLeftOutlined />
                    </Col>
                    <Col>
                      <i className="fas fa-exclamation-circle" /> Order:{' '}
                      <span>{item.orderId}</span>
                    </Col>
                    <Col>
                      <DeleteFilled
                        className="delete-order-icon"
                        onClick={() => onDeleteOrder(item._id)}
                      />
                    </Col>
                  </Row>
                }
                key={`order-${index}`}
              >
                <div>
                  <tbody>
                    <tr>
                      <td
                        className="Product-name"
                        style={{
                          fontWeight: 'bold'
                        }}
                      >
                        Food
                      </td>
                      <td
                        className="Product-price"
                        style={{
                          fontWeight: 'bold'
                        }}
                      >
                        Total
                      </td>
                    </tr>
                    {item.foods &&
                      item.foods.map((food, index) => {
                        return (
                          <tr>
                            <td className="Product-name">
                              <p>
                                {food.orginalFood.name} ×{' '}
                                {food.cartFood.quantity}
                                <span
                                  style={{
                                    width: '100%',
                                    fontSize: 10
                                  }}
                                >
                                  {food.cartFood.addon.map((eachAddon) => {
                                    return eachAddon.value ? (
                                      <Tag>
                                        {eachAddon.name}: {eachAddon.value}
                                      </Tag>
                                    ) : null;
                                  })}
                                </span>
                              </p>
                            </td>
                            <td className="Product-price">
                              <p>
                                {process.env.REACT_APP_CURRENCY_SYMBOL}
                                {food.cartFood.subTotalPrice}
                              </p>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="Product-name">
                        <p>Sub total</p>
                      </td>
                      <td className="Product-price">
                        <p>
                          {process.env.REACT_APP_CURRENCY_SYMBOL}
                          {subTotalPrice}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="Product-name">
                        <p>TAX</p>
                      </td>
                      <td className="Product-price">
                        <p>
                          {process.env.REACT_APP_CURRENCY_SYMBOL}
                          {tax?.toFixed(2)}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="Product-name">
                        <p>Shipping</p>
                      </td>
                      {item.deliveryType === 'pickup' ? (
                        <td className="Product-price">
                          <p>Pickup by User</p>
                          <span
                            className="Product-price"
                            style={{
                              width: 100,
                              maxWidth: '100%'
                            }}
                          >
                            <p>
                              {process.env.REACT_APP_CURRENCY_SYMBOL}
                              {item.deliveryCharge}
                            </p>
                          </span>
                        </td>
                      ) : (
                        <td className="Product-price">
                          <ul className="shipping-list">
                            <li className="radio">
                              <label>
                                <span />{' '}
                                {item.location &&
                                  item.location.address &&
                                  item.location.address.street}
                              </label>
                              <br />
                              <label>
                                <span />{' '}
                                {item.location &&
                                  item.location.address &&
                                  item.location.address.city}{' '}
                                {item.location &&
                                  item.location.address &&
                                  item.location.address.state}
                              </label>
                              {/*{item.location && (*/}
                              {/*  <label>*/}
                              {/*    <span />*/}
                              {/*   {item.location.nearbyLocation}*/}
                              {/*  </label>*/}
                              {/*)}*/}
                              {/*<span*/}
                              {/*  className="Product-price"*/}
                              {/*  style={{*/}
                              {/*    width: 100,*/}
                              {/*    maxWidth: "100%",*/}
                              {/*  }}*/}
                              {/*>*/}
                              {/*    <p>*/}
                              {/*      {process.env.REACT_APP_CURRENCY_SYMBOL}*/}
                              {/*      {item.deliveryCharge}*/}
                              {/*    </p>*/}
                              {/*  </span>*/}
                            </li>
                          </ul>
                        </td>
                      )}
                    </tr>
                    {/* {item.deliveryType === 'pickup' || (
                      <tr>
                        <td
                          className="Product-name"
                          style={{
                            width: 300,
                            maxWidth: '100%'
                          }}
                        >
                          <p>Shipping Through</p>
                        </td>
                        <td
                          className="Product-price"
                          style={{
                            width: 100,
                            maxWidth: '100%'
                          }}
                        >
                          <Radio.Group
                            value={shippingCharge&& shippingCharge[item?._id]}
                            onChange={(e) =>
                              onShippingVehicleChange(item?._id, e.target.value)
                            }
                          >
                            {item &&item?.deliveryCharges.map((eachDelivery) => {
                              return (
                                <Radio
                                  value={JSON.stringify({
                                    _id: eachDelivery._id?.toString(),
                                    fare: eachDelivery?.fare
                                  })}
                                  style={{
                                    ...radioStyle,
                                    textTransform: 'uppercase',
                                    width: '90%'
                                  }}
                                >
                                  {eachDelivery?.vehicleName} (
                                  {process.env.REACT_APP_CURRENCY_SYMBOL}{' '}
                                  {eachDelivery?.fare})
                                </Radio>
                              );
                            })}
                          </Radio.Group>
                        </td>
                      </tr>
                    )} */}
                    <tr>
                      <td
                        className="Product-name"
                        style={{
                          width: 300,
                          maxWidth: '100%'
                        }}
                      >
                        <p>Total</p>
                      </td>
                      <td
                        className="Product-price"
                        style={{
                          width: 100,
                          maxWidth: '100%'
                        }}
                      >
                        <p>
                          {process.env.REACT_APP_CURRENCY_SYMBOL}
                          {totalPrice}
                        </p>
                      </td>
                    </tr>
                  </tfoot>
                </div>
              </Collapse.Panel>
            );
          })}
          <Collapse collapsible bordered={false} activeKey={'grand-total'}>
            <Collapse.Panel
              className="collapse-grand-total"
              key={'grand-total'}
              showArrow={false}
              header={
                <Row justify="space-between" align="middle">
                  <Col>
                    <p
                      style={{
                        marginBottom: 0
                      }}
                    >
                      Grand Total
                    </p>
                  </Col>
                  <Col>
                    <p
                      style={{
                        marginBottom: 0
                      }}
                    >
                      {process.env.REACT_APP_CURRENCY_SYMBOL}
                      {parseFloat(
                        grandTotalPrice + totalShipCharge + totalTax
                      ).toFixed(2)}
                    </p>
                  </Col>
                </Row>
              }
              collapsible="disabled"
            />
          </Collapse>
        </Collapse>
      </>
    );
  };

  const buildTimePreferences = (index, eachOrder) => {
    return (
      <Row
        stye={{
          width: '100%'
        }}
        gutter={[16, 32]}
      >
        <label
          class="mt-4"
          style={{
            width: '100%'
          }}
        >
          Time Preference
        </label>

        <Col xs={24} key={index + '-order-time'}>
          <Card
            style={{
              transition: 'height .3s ease-in-out',
              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
            }}
            bordered={false}
          >
            <label class="mt-4">
              Order:{' '}
              <Tag
                style={{
                  marginLeft: 8
                }}
              >
                {eachOrder.orderId}
              </Tag>{' '}
            </label>
            <Tabs
              defaultActiveKey="now"
              onChange={(activekey) =>
                setScheduleType({
                  ...scheduleType,
                  [eachOrder._id.toString()]: activekey
                })
              }
              activeKey={scheduleType[eachOrder._id]}
            >
              <Tabs.TabPane
                tab={
                  <span>
                    <HistoryOutlined />
                    Now
                  </span>
                }
                key="now"
              >
                Your order will be ready/delivered as fast as possible
              </Tabs.TabPane>
              <Tabs.TabPane
                style={{ transition: 'height .3s ease-in-out' }}
                tab={
                  <span>
                    <FieldTimeOutlined />
                    Schedule For Later
                  </span>
                }
                key="schedule"
              >
                <DatePicker
                  format="YYYY-MM-DD HH:mm"
                  disabledDate={disabledDate}
                  // disabledTime={disabledDateTime}
                  value={scheduleTime[eachOrder._id]}
                  showTime={{
                    format: 'HH:mm',
                    defaultValue: moment('00:00', 'HH:mm')
                  }}
                  onChange={(scheduleTime) => {
                    if (moment().diff(scheduleTime, 'days') > 2) {
                      notificationError(
                        'Please select time before 2 days and after 1 hour'
                      );
                    } else {
                      setScheduleLater({
                        ...scheduleTime,
                        [eachOrder._id.toString()]: scheduleTime
                      });
                    }
                  }}
                />
                <span
                  style={{
                    marginTop: 8,
                    width: '100%'
                  }}
                >
                  Select time atleast 1 hour later from Now
                </span>
              </Tabs.TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    );
  };

  const buildOrderAddOns = () => {
    return (
      <div className="checkout-form">
        <div className="single-form checkout-note">
          {Array.isArray(items) &&
            items.length > 0 &&
            items.map((eachOrder, index) => {
              return (
                <>
                  <label className="mt-4">
                    Order Notes for Order ID:{' '}
                    <Tag
                      style={{
                        marginLeft: 8
                      }}
                    >
                      {eachOrder.orderId}
                    </Tag>{' '}
                  </label>
                  <textarea
                    onBlur={({ target: { value } }) => {
                      setSpecialNote(value);
                    }}
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    defaultValue={''}
                  />
                  {isAuth && buildTimePreferences(index, eachOrder)}
                  <Divider />
                </>
              );
            })}
        </div>
      </div>
    );
  };

  return isAuth === undefined ? null : (
    <>
      <Banner />
      {spinning ? (
        <Row
          style={{
            width: '100%',
            minHeight: 300,
            marginBottom: 100
          }}
          justify="center"
          align="middle"
        >
          <Spin />
        </Row>
      ) : items.length === 0 ? (
        <Result
          status="404"
          title="You do not have any item to check out!"
          subTitle="Please visit the homepage to buy more items"
          extra={[
            <Link to={routeURL.web.home()} style = {{
              borderRadius: '500px', backgroundColor: '#000'
            }}>
              <Button>Continue Shopping</Button>
            </Link>
          ]}
        />
      ) : submitted ? (
        <OrderSuccess orderDetail={successData} />
      ) : (
        <section className="checkout-page pt-50 pb-80">
          <div className="container">
            <div className="row mt-4">
              <div className="col-lg-7">{buildOrderAddOns()}</div>
              <div className="col-lg-5">
                <div className="checkout-review-order mt-30">
                  <div className="checkout-title">
                    <h4 className="title">Your Order</h4>
                  </div>
                  <div className="checkout-review-order-table table-responsive mt-15">
                    <table className="table">
                      {buildOrderDetail()}
                      <div className="checkout-payment">
                        <Radio.Group
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          value={paymentMethod}
                        >
                          {/*{paymentMethods.map((pm) => (*/}
                          {/*  <Radio*/}
                          {/*    style={radioStyle}*/}
                          {/*    value={pm.value}*/}
                          {/*    style={{*/}
                          {/*      textTransform: "uppercase",*/}
                          {/*      width: "90%",*/}
                          {/*    }}*/}
                          {/*  >*/}
                          {/*    {pm.label}*/}
                          {/*  </Radio>*/}
                          {/*))}*/}
                        </Radio.Group>
                        <div
                          class="payment-details"
                          style={{
                            marginTop: 10,
                            marginBottom: 20
                          }}
                        >
                          <p>
                            {(() => {
                              let item = paymentMethods.find(
                                (pm) => pm.value === paymentMethod
                              );
                              if (item) return item.description;
                            })()}
                          </p>
                        </div>
                      </div>

                      <div className="checkout-btn">
                        {paymentMethod === 'STRIPE' ? (
                          <StripeContainer onHandleSubmit={onHandleStripe} />
                        ) : (
                          <Button
                            style={{
                              backgroundColor: '#556cd6',
                              height: 'unset'
                            }}
                            loading={submitting}
                            onClick={onPlaceOrder}
                          >
                            Place Order
                          </Button>
                        )}
                      </div>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
