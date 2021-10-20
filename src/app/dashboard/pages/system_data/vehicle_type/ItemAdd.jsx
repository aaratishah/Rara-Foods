import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Tooltip,
} from "antd";
import api from "app/dashboard/api";
import AddPageLayout from "app/dashboard/components/ListTable/AddPageLayout";
import routeURL from "config/routeURL";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { handleError } from "services/util";
import { notificationSuccess } from "../../../components/notification";
import { QuestionCircleFilled } from "@ant-design/icons";
import GalleryUpload from "../../../components/GalleryUpload";
import Spinner from "../../../components/Spinner";

const rowStyle = {
  width: "100%",
};

const backUrl = routeURL.cms.vehicle_type();
const pageTitle = "Vehicle Type";
const imageTitle = "vehicle_type";

export default function ItemAdd(props) {
  const {
    match: {
      params: { itemId },
    },
  } = props;
  const formRef = useRef();
  const [spinning, setSpinning] = useState(false);
  const [iconImage, setIconImage] = useState([]);

  const [fares, setFares] = useState([]);
  const [commissions, setCommissions] = useState([]);

  const onSaveForm = (value) => {
    // validate here
    if (true) {
      const jsonData = {
        ...value,
        icon: iconImage.length > null ? iconImage[0] : "",
      };
      if (itemId) jsonData._id = itemId;
      setSpinning(true);
      api.systemData.vehicle_type
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
    if (data.icon) setIconImage([data.icon] || []);

    formRef.current.setFieldsValue({
      activeStatus: data.activeStatus,
      description: data.description,
      name: data.name,
      commission: data.commission,
      fare: data.fare,
    });
  };

  useEffect(() => {
    if (itemId) {
      setSpinning(true);
      api.systemData.vehicle_type
        .read(itemId)
        .then(({ data }) => fillForm(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  }, [itemId]);

  useEffect(() => {
    setSpinning(true);
    api.systemData.fare
      .readAll()
      .then(({ data }) => setFares(data))
      .catch(handleError);

    api.systemData.commission
      .readAll()
      .then(({ data }) => setCommissions(data))
      .catch(handleError);
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
              // wrapperCol={{
              // 	offset: 1,
              // }}
              // {...layout}
              ref={formRef}
              // form={form}
              layout="vertical"
              name="control-ref"
              onFinish={onSaveForm}
              requiredMark={true}
              scrollToFirstError
              autoComplete="off"
            >
              <Row style={rowStyle} gutter={24}>
                <Col xs={24}>
                  <Form.Item
                    name="name"
                    label="Vehicle Type *"
                    rules={[
                      {
                        required: true,
                        message: "Please input the type!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={rowStyle} gutter={24}>
                <Col xs={24}>
                  <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                      {
                        required: true,
                        message: "Please input the description!",
                      },
                    ]}
                  >
                    <Input.TextArea autoSize={{ minRows: 4 }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row style={rowStyle} gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="commission"
                    label="Select a Commission *"
                    rules={[
                      {
                        required: true,
                        message: "Please select a Commission",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Select a Commission"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {commissions.map((eachItem) => (
                        <Select.Option value={eachItem._id}>
                          {eachItem.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="fare"
                    label="Select a Fare *"
                    rules={[
                      {
                        required: true,
                        message: "Please select a Fare",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Select a Fare"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {fares.map((fare) => (
                        <Select.Option value={fare._id}>
                          {fare.name}
                        </Select.Option>
                      ))}
                    </Select>
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

              <Divider orientation="left">
                <span
                  style={{
                    display: "flex",
                    fexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  Icon for Mobile Device * (PNG only, 128x128 )
                  <Tooltip title={`Required Image size: 128x128`}>
                    <QuestionCircleFilled
                      style={{
                        marginLeft: 8,
                      }}
                    />
                  </Tooltip>{" "}
                </span>
              </Divider>
              <Row style={{ ...rowStyle, marginTop: 20 }}>
                <GalleryUpload
                  maxFile={1}
                  fileNames={iconImage}
                  imageTitle={`${imageTitle}_icon`}
                  setFileNames={setIconImage}
                />
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
