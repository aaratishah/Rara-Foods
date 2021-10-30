import React from 'react';
import addAsBusiness from 'image/pizza_maker.jpg';
import addAsRestaurant from 'image/add_as_restaurant.jpg';
import addAsRider from 'image/add_as_rider.jpg';
import { Col, Row, Typography } from 'antd';
import routeURL from 'config/routeURL';
import './post_business.css';
import { Link } from 'react-router-dom';

const items = [
  {
    title: 'Feed your employees',
    subTitle: 'Create a business account',
    image: addAsRestaurant,
    link: routeURL.web.restaurant_request()
  },
  {
    title: 'Your restaurant, delivered',
    subTitle: 'Add your restaurant',
    image: addAsBusiness,
    link: routeURL.web.restaurant_request()
  },
  {
    title: 'Deliver the Eats',
    subTitle: 'Sign up to deliver',
    image: addAsRider,
    link: routeURL.web.rider_request()
  },
];
const PromoteBusiness = () => {

  return <Row className="container-fluid" >
    <Row style={{
      marginTop: 40,
      width: '100%',
    }} justify="space-between" align="stretch" gutter={32}>
      {items?.map(item =>
        <Col xs={20} md={7}>
          <Row>
            <Col xs={20}>
              <Link style={{ width: '100%',}} to={item.link}>
                <img src={item.image} alt={`rara ${item.title}`} style={{
                  width: '100%',
                  // height: 250
                }}/></Link>
            </Col>
          </Row>
        </Col>
      )}
    </Row>
    <Row justify="space-between" align="middle" style={{
      width: '100%',
      margin: '18px 0px 0px 0px'
    }} gutter={32}>
      {items?.map(item => <Col xs={20} md={7}>
        <Typography.Title level={3}>
          {item.title}
        </Typography.Title>
      </Col>)}
    </Row>
    <Row justify="space-between" align="middle" style={{
      width: '100%',
      margin: 0
    }} gutter={32}>
      {items?.map(item => <Col xs={24} md={7}>
        <Link style={{ width: '100%' }} to={item.link}>
          <Typography.Title level={5} underline>
            {item.subTitle}
          </Typography.Title></Link>
      </Col>)}
    </Row>
  </Row>;

  return <Row justify="center" align="middle" className="container-fluid" style={{
    width: '100%'
  }
  } gutter={[32, 16]}>
    {items.map(item => <Col style={{
      backgroundColor: 'red',
    }} xs={24} md={8}>
      <Row>
        <img src={item.image} alt={`rara ${item.title}`} style={{
          width: '100%',
          // maxHeight: 200
        }}/>
      </Row>
      <Row style={{ marginTop: 16 }}>
        <Typography.Title level={3}>
          {item.title}
        </Typography.Title>
      </Row>
      <Row tyle={{ marginTop: 8 }}>
        <Typography.Title level={5}>
          {item.subTitle}
        </Typography.Title>
      </Row>
    </Col>)}
  </Row>;
};

export default PromoteBusiness;
