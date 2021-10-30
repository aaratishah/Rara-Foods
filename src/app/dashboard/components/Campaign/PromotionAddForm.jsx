import React, { Fragment, useState, useRef, useEffect } from "react";
import routeURL from "config/routeURL";
import api from "app/dashboard/api";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Typography,
} from "antd";
import AddPageLayout from "../ListTable/AddPageLayout";
import { handleError, riderRequestStatus } from "services/util";
import { notificationSuccess } from "app/web/components/notification";
import { Link } from "react-router-dom";

const slug = "promotion";
const backUrl = routeURL.cms[slug]();

const ItemAddForm = ({
  ItemId,
  history,
  pageTitle = "Add Promotion",
  rowStyle,
}) => {
  var formRef = useRef();
  const [spinning, setSpinning] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const campaignName = pageTitle.split(" ")[1];

  const fillForm = (data) => {
    formRef.current.setFieldsValue({
      restaurant: data,
    });
  };

  useEffect(() => {
    if (ItemId) {
      setSpinning(true);
      api[slug]
        .readPromotion(ItemId)
        .then(({ data }) => fillForm(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
    api.restaurant.readAll().then(({ data }) => {
      setRestaurants(data)
      console.log("Restaurants", restaurants);
    });
  }, [ItemId, spinning]);

  const onSaveForm = (value) => {
    // validate here
    if (true) {
      var jsonData = {
        restaurant: value.restaurantSelector,
      };
      // if (ItemId) jsonData._id = ItemId;
      setSpinning(true);

      api.promotion
        .sendPromotion(jsonData)
        .then((data) => {
          console.log(data);
          notificationSuccess(data.message);
          history.push(backUrl);
        })
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  };

  const [formDataa, setFormDataa] = useState({});
  const onFormChange = (id) => (value) =>
    setFormDataa((formDataa) => ({
      ...formDataa,
      [id]: value,
    }));

  return (
    <Fragment>
      <AddPageLayout
        title={ItemId ? `${pageTitle}` : `${pageTitle}`}
        breadCrumb={[
          {
            title: "Home",
            url: routeURL.cms.home(),
          },
          {
            title: pageTitle,
            url: backUrl,
          },
          {
            title: ItemId ? "Update" : "Add",
            url: false,
          },
        ]}
        showActions={false}
        backUrl={backUrl}
      >
        <Row
          style={{
            ...rowStyle,
            marginTop: 40,
          }}
          justify="center"
        >
          <Col
            xs={24}
            md={24}
            lg={22}
            style={{
              backgroundColor: "#fff",
              borderRadius: 8,
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
              padding: 30,
            }}
          >
            <Form
              ref={formRef}
              layout="vertical"
              name="control-ref"
              onFinish={onSaveForm}
              requiredMark={true}
              scrollToFirstError
              autoComplete="off"
            >
              <Row style={rowStyle} gutter={24} align="middle">
                <Col xs={24} lg={16}>
                  <Col xs={24}>
                    <Form.Item
                      name="restaurantSelector"
                      label="Select Restaurant"
                    >
                      <Select
                        defaultValue="Select Your Restaurant"
                        value={formDataa?.restaurantSelector || "none"}
                        onChange={onFormChange}
                      >
                        {restaurants && restaurants.map((restaurant, idx) => {
                          return <Select.Option value = {restaurant._id}>{restaurant.name}</Select.Option>
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                </Col>
              </Row>

              <Divider></Divider>
              <Row
                style={{
                  ...rowStyle,
                  marginTop: 30,
                }}
                gutter={16}
                justify="end"
              >
                <Col>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={spinning}>
                      {ItemId ? "Update" : "Create"}
                    </Button>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item>
                    <Link to={backUrl}>
                      <Button>Cancel</Button>
                    </Link>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </AddPageLayout>
    </Fragment>
  );
};

export default ItemAddForm;
