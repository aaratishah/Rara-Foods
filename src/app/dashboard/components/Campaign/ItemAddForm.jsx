import React, { Fragment, useState, useRef, useEffect } from "react";
import routeURL from "config/routeURL";
import api from 'app/dashboard/api';
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
import { handleError, riderRequestStatus } from 'services/util';
import { notificationSuccess } from 'app/web/components/notification';
import { Link } from "react-router-dom";

const slug = 'food_speciality';
const backUrl = routeURL.cms[slug]();

const ItemAddForm = ({ ItemId, history, pageTitle="Send SMS", rowStyle }) => {
  var formRef = useRef();
  const [spinning, setSpinning] = useState(false);
  const campaignName = pageTitle.split(" ")[1];

  const fillForm = (data) => {
    formRef.current.setFieldsValue({
      activeStatus: data.activeStatus,
      name: data.name,
      extra: data.extra,
    });
  };

  useEffect(() => {
    if (ItemId) {
      setSpinning(true);
      api[slug]
        .read(ItemId)
        .then(({ data }) => fillForm(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  }, [ItemId]);

  const onSaveForm = (value) => {
    // validate here
    if (true) {
      var jsonData = {
        ...value,
        ...formDataa,
      };
      // if (ItemId) jsonData._id = ItemId;
      setSpinning(true);
      if(campaignName.toLowerCase() !== "Email".toLowerCase()) {
        return api.settings.sendSMS(jsonData)
        .then((data) => {
          notificationSuccess(data.message);
          history.push(backUrl);
        })
        .catch(handleError)
        .finally(() => setSpinning(false));
      }

      api.settings.sendEmail(jsonData)
        .then((data) => {
          notificationSuccess(data.message);
          history.push(backUrl);
        })
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  };

  const [regions, setRegions] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  useEffect(() => {
    api.region.readAll()
      .then(({ data }) => setRegions(data))
      .catch(handleError)
      .finally(() => setSpinning(false));
    api.systemData.vehicle_type.readAll()
      .then(({ data }) => setVehicleTypes(data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, []);  

  const [formDataa, setFormDataa] = useState({});
  const onFormChange = (name) => (value) =>
    setFormDataa((formDataa) => ({
      ...formDataa,
      [name]: value,
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
                      name="campaignName"
                      label="Campaign Name"
                      rules={[
                        {
                          required: true,
                          message: "Please input the campaign title!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item
                      name="message"
                      label="Message Body (60 character per page)"
                      rules={[
                        {
                          required: true,
                          message: "Please input the message body!",
                        },
                      ]}
                    >
                      <Input.TextArea />
                    </Form.Item>
                  </Col>
                </Col>
                <Col xs={24} lg={8}>
                  {/*	*/}
                  <Typography.Text>
                    {`You can use {{name}} to use the name and {{phone}} to use phone number.`}
                  </Typography.Text>
                </Col>
              </Row>

              <Divider>Restaurant</Divider>
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                  <Form.Item
                    name="restaurantSelector"
                    label={`Send ${campaignName} To Restaurant `}
                  >
                    <Select
                      defaultValue="none"
                      value={formDataa?.restaurantSelector || "none"}
                      onChange={onFormChange("restaurantSelector")}
                    >
                      <Select.Option value="none">No Restaurant</Select.Option>
                      <Select.Option value="All">All Restaurants</Select.Option>
                      <Select.Option value="few">
                        Some Restaurants
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} lg={12}>
                  <Form.Item
                    name="restaurantConditional"
                    label={`Send ${campaignName} to some restaurant of `}
                  >
                    <Select
                      mode="multiple"
                      disabled={formDataa?.restaurantSelector !== "few"}
                      value={formDataa?.restaurantConditional || []}
                      onChange={onFormChange("restaurantConditional")}
                    >
                      <Select.Option value="region">Region</Select.Option>
                      <Select.Option value="status">
                        Approve Status
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                {formDataa?.restaurantConditional &&
                  formDataa?.restaurantConditional?.includes("region") && (
                    <Col xs={24} lg={12}>
                      <Form.Item
                        name="restaurantRegion"
                        label="Select restaurant region "
                      >
                        <Select
                          mode="multiple"
                          value={formDataa?.restaurantRegion || []}
                          onChange={onFormChange("restaurantRegion")}
                        >
                          {regions.map((each) => (
                            <Select.Option value={each?._id?.toString()}>
                              {each?.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  )}
                {formDataa?.restaurantConditional &&
                  formDataa?.restaurantConditional?.includes("status") && (
                    <Col xs={24} lg={12}>
                      <Form.Item
                        name="restaurantStatus"
                        label="Select restaurant status "
                      >
                        <Select
                          mode="multiple"
                          value={formDataa?.restaurantStatus || []}
                          onChange={onFormChange("restaurantStatus")}
                        >
                          {riderRequestStatus.map((each) => (
                            <Select.Option value={each?.value.toString()}>
                              {each?.label}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  )}
              </Row>

              <Divider>Rider</Divider>
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                  <Form.Item name="riderSelector" label={`Send ${campaignName} To Rider`}>
                    <Select
                      defaultValue="none"
                      value={formDataa?.riderSelector || "none"}
                      onChange={onFormChange("riderSelector")}
                    >
                      <Select.Option value="none">No Rider</Select.Option>
                      <Select.Option value="All">All Rider</Select.Option>
                      <Select.Option value="few">Some Rider</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} lg={12}>
                  <Form.Item
                    name="riderConditional"
                    label={`Send ${campaignName} to some restaurant of `}
                  >
                    <Select
                      mode="multiple"
                      disabled={formDataa?.riderSelector !== "few"}
                      value={formDataa?.riderConditional || []}
                      onChange={onFormChange("riderConditional")}
                    >
                      <Select.Option value="vehicle">
                        Vehicle Type
                      </Select.Option>
                      <Select.Option value="status">
                        Approve Status
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                {formDataa?.riderConditional &&
                  formDataa?.riderConditional?.includes("vehicle") && (
                    <Col xs={24} lg={12}>
                      <Form.Item
                        name="riderVehicle"
                        label="Select rider Vehicle "
                      >
                        <Select
                          mode="multiple"
                          value={formDataa?.riderVehicle || []}
                          onChange={onFormChange("riderVehicle")}
                        >
                          {vehicleTypes.map((each) => (
                            <Select.Option value={each?._id?.toString()}>
                              {each?.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  )}
                {formDataa?.riderConditional &&
                  formDataa?.riderConditional?.includes("status") && (
                    <Col xs={24} lg={12}>
                      <Form.Item
                        name="riderStatus"
                        label="Select rider status "
                      >
                        <Select
                          mode="multiple"
                          value={formDataa?.riderStatus || []}
                          onChange={onFormChange("riderStatus")}
                        >
                          {riderRequestStatus.map((each) => (
                            <Select.Option value={each?.value.toString()}>
                              {each?.label}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  )}
              </Row>

              <Divider>Customer</Divider>
              <Row gutter={[16, 16]}>
                <Col xs={24}>
                  <Form.Item
                    name="customerSelector"
                    label={`Send ${campaignName} To Customer`}
                  >
                    <Select
                      defaultValue="none"
                      value={formDataa?.customerSelector || "none"}
                      onChange={onFormChange("customerSelector")}
                    >
                      <Select.Option value="none">No Customer</Select.Option>
                      <Select.Option value="All">All Customers</Select.Option>
                      <Select.Option value="ordered">
                        Customers who ordered once
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

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
