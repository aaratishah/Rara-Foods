import React, { useRef, useState } from 'react';
import { Button, Col, Result, Row } from 'antd';
import { Link } from 'react-router-dom';
import routeURL from 'config/routeURL';
import "./receipt.css";
import logoImage from "image/_logo.png";
import moment from 'moment';
import { DownloadOutlined } from '@ant-design/icons';
import {
  exportComponentAsPNG,
  exportComponentAsJPEG
} from 'react-component-export-image';

export const Receipt = ({orderDetail, style ={}}) => {
  const [hideDownloadIcon, setHideDownloadIcon] = useState(false);
  const componentRef = useRef();
  return <div className="receipt" ref={componentRef} style={style}>
    <Row style={{width: '100%', margin: 10}} gutter={8} justify="space-between" align="middle">
      <Col>
        <Row align="middle" gutter={8}>
          <Col onClick={() => {
            setHideDownloadIcon(true);
            setTimeout(()=>exportComponentAsJPEG(componentRef,
              { html2CanvasOptions: {backgroundColor: "#FFF"} }
            ),500);
          }}>
            {hideDownloadIcon || <DownloadOutlined style={{
              cursor: 'pointer',
              fontSize: 23,
            }}/>}
          </Col>
          <Col>
            <h2 className="name">RARA Foods</h2>
          </Col>
        </Row>
      </Col>
      <Col>
        <img src={logoImage} width={48} />
      </Col>
    </Row>

    <p className="greeting"> Thank you for your order! </p>
    {/* Order info */}
    <div className="order">
      <p> Order No : {orderDetail?.orderId} </p>
      <p> Date : {moment()
        .format('DD/MM/YYYY h:mm:ss A')} </p>
      <p> Shipping Type : {
        orderDetail?.deliveryType === "pickup" ? "Pick Up From Restaurant" : "Home Delivery"
      } </p>
    </div>
    <hr />
    {/* Details */}
    <div className="">
      <h3 className="detail-title"> Details </h3>
      {(orderDetail?.cartId?.foods || []).map(eachFood => {
        return <>
          <Row className="details" justify="space-between" align="top">
            <Col className="product" style={{
              boxShadow: 'none'
            }}>
              <div className="info">
                <span className="food-name"> {eachFood?.atm?.name} </span>
                {/*<p> Color: Mercine </p>*/}
                <p style={{marginBottom: 4}}> Qty: {eachFood?.quantity} </p>
              </div>
            </Col>
            <Col>
              <p> {eachFood?.subTotal} {process.env.REACT_APP_CURRENCY_SYMBOL} </p>
            </Col>
          </Row>
        </>
      })}
    </div>
    {/* Sub and total price */}
    <div className="totalprice">
      <Row className="sub" justify="space-between" align="top">
        <Col>
          Subtotal
        </Col>

        <Col>
          <span> {orderDetail?.totalPrice} {process.env.REACT_APP_CURRENCY_SYMBOL} </span>
        </Col>
      </Row>
      <Row className="sub" justify="space-between" align="top">
        <Col>
          Delivery
        </Col>

        <Col>
          <span> {orderDetail?.deliveryCharge} {process.env.REACT_APP_CURRENCY_SYMBOL} </span>
        </Col>
      </Row>
      <hr />
      <Row className="tot" justify="space-between" align="top">
        <Col>
          Total
        </Col>

        <Col>
          <span> {parseFloat((orderDetail?.deliveryCharge || 0) + (orderDetail?.totalPrice || 0)).toFixed(2)} {process.env.REACT_APP_CURRENCY_SYMBOL} </span>
        </Col>
      </Row>
    </div>
  </div>

}

const MergeOrderReceipt = ({orderDetail}) => {

  if(orderDetail?.orders?.length < 1) return <></>
  const tempOrder = {
    orderId: orderDetail?.orders && orderDetail?.orders[0] && orderDetail?.orders[0]?.orderId,
    deliveryType: orderDetail?.orders && orderDetail?.orders[0] && orderDetail?.orders[0]?.deliveryType,
    totalPrice: orderDetail?.totalPrice,
    deliveryCharge: orderDetail?.totalShippingCharge,
    cartId: {},
  };
  tempOrder.cartId.foods = orderDetail.orders.reduce((accum,order)=>{
    if(Array.isArray(order?.cartId?.foods)) {
      accum.push(...order?.cartId?.foods)
    }
    return accum;

  }, []);
  return <Receipt orderDetail={tempOrder} style={{
  marginTop: -200,

  }} />
}
const OrderSuccess = ({orderDetail}) => {
  return (
    <Row justify="center" style={{width: '100%'}} gutter={[16,200]}>
      <Col xs={24} lg={15}>
        <Result
          status="success"
          title="Successfully Placed the Order!"
          // subTitle=""
          extra={[
            <Link to={routeURL.web.home()} style = {{
              borderRadius: '500px', backgroundColor: '#000'
            }}>
              <Button>Continue Shopping</Button>
            </Link>,
          ]}
        />
      </Col>
      <Col xs={24} lg={9}>
        <Row style={{width: '100%'}} justify="center">
          <Col>
            <MergeOrderReceipt orderDetail={orderDetail} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default OrderSuccess;
