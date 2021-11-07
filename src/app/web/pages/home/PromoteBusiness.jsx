import React from "react";
import addAsBusiness from "image/pizza_maker.jpg";
import addAsRestaurant from "image/add_as_restaurant.jpg";
import addAsRider from "image/add_as_rider.jpg";
import { Col, Row, Typography } from "antd";
import routeURL from "config/routeURL";
import "./post_business.css";
import { Link } from "react-router-dom";

const items = [
  {
    title: "Feed your employees",
    subTitle: "Create a business account",
    image: addAsRestaurant,
    link: routeURL.web.restaurant_request(),
  },
  {
    title: "Your restaurant, delivered",
    subTitle: "Add your restaurant",
    image: addAsBusiness,
    link: routeURL.web.restaurant_request(),
  },
  {
    title: "Deliver the Eats",
    subTitle: "Sign up to deliver",
    image: addAsRider,
    link: routeURL.web.rider_request(),
  },
];
const PromoteBusiness = () => {
  return (
    <Row
      className="container-fluid"
      align="middle"
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <Row
        style={{
          marginTop: 40,
          width: "100%",
        }}
        justify="space-between"
        align="center"
        gutter={32}
      >
        {items?.map((item) => (
          <Col
            xs={20}
            md={7}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Row style={{ justifyContent: "center", alignItems: "center" }}>
              <Col
                xs={20}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Link style={{ width: "100%" }} to={item.link}>
                  <img
                    src={item.image}
                    alt={`rara ${item.title}`}
                    style={{
                      width: "100%",
                      height: 250,
                      objectFit: "cover",
                    }}
                  />
                </Link>
                <div style = {{display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}>
                  <Typography.Title
                    level={3}
                    style={{ margin: "18px 0px 0px 0px", alignSelf: 'center' }}
                  >
                    {item.title}
                  </Typography.Title>
                  <Link style={{ width: "100%" }} to={item.link} style={{ alignSelf: 'center' }}>
                    <Typography.Title level={5} underline>
                      {item.subTitle}
                    </Typography.Title>
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
      {/* <Row
        justify="space-between"
        align="middle"
        style={{
          width: "100%",
          margin: "18px 0px 0px 0px",
        }}
        gutter={32}
      >
        {items?.map((item) => (
          <Col xs={20} md={7}>
            <Typography.Title level={3}>{item.title}</Typography.Title>
          </Col>
        ))}
      </Row>
      <Row
        justify="space-between"
        align="middle"
        style={{
          width: "100%",
          margin: 0,
        }}
        gutter={32}
      >
        {items?.map((item) => (
          <Col xs={24} md={7}>
            <Link style={{ width: "100%" }} to={item.link}>
              <Typography.Title level={5} underline>
                {item.subTitle}
              </Typography.Title>
            </Link>
          </Col>
        ))}
      </Row> */}
    </Row>
  );

  return (
    <Row
      justify="center"
      align="middle"
      className="container-fluid"
      style={{
        width: "100%",
      }}
      gutter={[32, 16]}
    >
      {items.map((item) => (
        <Col
          style={{
            backgroundColor: "red",
          }}
          xs={24}
          md={8}
        >
          <Row>
            <img
              src={item.image}
              alt={`rara ${item.title}`}
              style={{
                width: "100%",
                // maxHeight: 200
              }}
            />
          </Row>
          <Row style={{ marginTop: 16 }}>
            <Typography.Title level={3}>{item.title}</Typography.Title>
          </Row>
          <Row tyle={{ marginTop: 8 }}>
            <Typography.Title level={5}>{item.subTitle}</Typography.Title>
          </Row>
        </Col>
      ))}
    </Row>
  );
};

export default PromoteBusiness;
