import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
} from "antd";
import api from "app/dashboard/api";
import AddPageLayout from "app/dashboard/components/ListTable/AddPageLayout";
import routeURL from "config/routeURL";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { handleError } from "services/util";
import { notificationSuccess } from "../../../components/notification";
import moment from "moment";

const rowStyle = {
  width: "100%",
};

const backUrl = routeURL.cms.coupon_code();
const pageTitle = "Coupon Code";

export default function ItemAdd(props) {
  const {
    match: {
      params: { itemId },
    },
  } = props;
  const formRef = useRef();
  const [spinning, setSpinning] = useState(false);
  const [iconImage, setIconImage] = useState([]);
  const [isUnique, setIsUnique] = useState(null);
  const [uniqueValidating, setUniqueValidating] = useState(false);
  const [constants, setConstants] = useState({
    vehicleType: [],
  });

  const validateUnique = (value) => {
    if (!value) return setIsUnique(null);
    setUniqueValidating(true);
    api.coupon.coupon_code
      .isUnique(value, itemId)
      .then(({ data }) => setIsUnique(data))
      .finally(() => setUniqueValidating(false));
  };

  const onSaveForm = (value) => {
    // validate here
    if (true) {
      const jsonData = {
        ...value,
      };
      if (itemId) jsonData._id = itemId;
      setSpinning(true);
      api.coupon.coupon_code
        .save(jsonData)
        .then((data) => {
          notificationSuccess(data.message);
          props.history.push(backUrl);
        })
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  };

  const fillForm = (data) => {
    validateUnique(data.couponCode);
    formRef.current.setFieldsValue({
      activeStatus: data.activeStatus,
      description: data.description,
      name: data.name,
      couponCode: data.couponCode,
      vehicleType: data.vehicleType,
      discountHyreCash: data.discountHyreCash,
      usage: data.usage,
      perCustomer: data.perCustomer,
      startDate: data.startDate ? moment(data.startDate) : null,
      expiredAt: data.expiredAt ? moment(data.expiredAt) : null,
    });
  };

  useEffect(() => {
    if (itemId) {
      setSpinning(true);
      api.coupon.coupon_code
        .read(itemId)
        .then(({ data }) => fillForm(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  }, [itemId]);

  useEffect(() => {
    setSpinning(true);
    api.systemData.vehicle_type
      .readAll()
      .then(({ data }) =>
        setConstants((value) => ({
          ...value,
          vehicleType: data,
        }))
      )
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, []);

  return (
    <Row style={{ ...rowStyle, padding: "24px 40px" }}>
      <AddPageLayout
        spinning={spinning}
        title={itemId ? `Update ${pageTitle}` : `Add ${pageTitle}`}
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
            title: itemId ? "Update" : "Add",
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
            lg={16}
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
              <Row style={rowStyle} gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="name"
                    label="Coupon Title *"
                    rules={[
                      {
                        required: true,
                        message: "Please input the title!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="couponCode"
                    label="Coupon Code *"
                    rules={[
                      {
                        required: true,
                        message: "Please input the title!",
                      },
                      {
                        min: 4,
                        message: "Must be 4 or greater in length",
                      },
                      {
                        max: 15,
                        message: "Must be 15 or less in length",
                      },
                    ]}
                    hasFeedback
                    validateStatus={
                      uniqueValidating
                        ? "validating"
                        : isUnique
                        ? "success"
                        : "error"
                    }
                    help={!isUnique && "Coupon code must be unique"}
                  >
                    <Input
                      onChange={({ target: { value } }) =>
                        validateUnique(value)
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={rowStyle} gutter={24}>
                <Col xs={24}>
                  <Form.Item name="description" label="Description">
                    <Input.TextArea autoSize={{ minRows: 4 }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row style={rowStyle} gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="vehicleType"
                    label="Coupon apply to (Vehicle Type) *"
                    rules={[
                      {
                        required: true,
                        message: "Please select a vehicle type",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Select a Vehicle Type"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {constants?.vehicleType.map((vehicle) => (
                        <Select.Option value={vehicle._id}>
                          {vehicle.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="discountHyreCash"
                    label="Discount on using coupon *"
                    rules={[
                      {
                        required: true,
                        message: "Please input the discounted amount!",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="usage"
                    label="Coupon Max Usage *"
                    rules={[
                      {
                        required: true,
                        message: "Please input the Max usage!",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="perCustomer"
                    label="Usage per customer *"
                    initialValue={1}
                    rules={[
                      {
                        required: true,
                        message: "Please input the Usage per Customer!",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="startDate"
                    label="Coupon valid from *"
                    initialValue={moment()}
                    rules={[
                      {
                        required: true,
                        message: "Please input the start date!",
                      },
                    ]}
                  >
                    <DatePicker
                      style={{
                        width: "100%",
                      }}
                      format="DD/MM/YYYY"
                      disabledDate={(current) =>
                        current && current < moment().startOf("day")
                      }
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="expiredAt"
                    label="Coupon expire at *"
                    rules={[
                      {
                        required: true,
                        message: "Please input the expiry date of Coupon!",
                      },
                    ]}
                  >
                    <DatePicker
                      style={{
                        width: "100%",
                      }}
                      format="DD/MM/YYYY"
                      disabledDate={(current) =>
                        current && current < moment().startOf("day")
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={rowStyle} gutter={24}>
                <Col xs={24} md={6}>
                  <Form.Item
                    name="activeStatus"
                    initialValue={true}
                    label="Active Status"
                  >
                    <Switch defaultChecked />
                  </Form.Item>
                </Col>
              </Row>

              {!!itemId ||
                <Row style={rowStyle}>
                  <Divider orientation="left">Notification Broadcast</Divider>
                  <Col xs={24}>
                    <Form.Item
                      name={["notification", "title"]}
                      label="Notification Title *"
                      rules={[
                        {
                          required: true,
                          message: "Please input the Notification Title!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item
                      name={["notification", "body"]}
                      label="Notification Body *"
                      rules={[
                        {
                          required: true,
                          message: "Please input the Notification Body!",
                        },
                      ]}
                    >
                      <Input.TextArea autoSize={{ minRows: 3 }} />
                    </Form.Item>
                  </Col>
                </Row>
              }

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
                    <Button type="primary" htmlType="submit" loading={false}>
                      {itemId ? "Update" : "Create"}
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
    </Row>
  );
}
