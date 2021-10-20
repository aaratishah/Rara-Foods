import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Switch,
} from "antd";
import api from "app/dashboard/api";
import AddPageLayout from "app/dashboard/components/ListTable/AddPageLayout";
import routeURL from "config/routeURL";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { handleError } from "services/util";
import TimeSlab from "./TimeSlab";
import { notificationSuccess } from "../../../components/notification";
import moment from "moment";
import Spinner from "../../../components/Spinner";

const rowStyle = {
  width: "100%",
};

const backUrl = routeURL.cms.fare();
const pageTitle = "Fare";

export default function ItemAdd(props) {
  const {
    match: {
      params: { itemId },
    },
  } = props;
  const formRef = useRef();
  const [spinning, setSpinning] = useState(false);
  const [hasTimeSlab, setHasTimeSlab] = useState(false);

  const onSaveForm = (value) => {
    console.log("saved data", value);

    // validate here
    if (true) {
      const jsonData = {
        ...value,
      };
      if (itemId) jsonData._id = itemId;
      // setSpinning(true);
      api.systemData.fare
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
    formRef.current.setFieldsValue({
      activeStatus: data.activeStatus,
      description: data.description,
      name: data.name,
      base: data.base,
      hasTimeSlab: data.hasTimeSlab,
      charge: data.charge,
      minimumFare: data.minimumFare,
      slab: data.slab.map((each) => ({
        startTime: moment(each.startTime),
        endTime: moment(each.endTime),
        charge: each.charge,
      })),
    });
    setHasTimeSlab(data.hasTimeSlab);
  };

  useEffect(() => {
    if (itemId) {
      setSpinning(true);
      api.systemData.fare
        .read(itemId)
        .then(({ data }) => fillForm(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  }, [itemId]);
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
                    required={true}
                    name="name"
                    label="Fare Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input the name!",
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
                <Col xs={24} lg={12}>
                  <Form.Item
                    name="minimumFare"
                    label={`Minimum Fare`}
                    rules={[
                      {
                        required: true,
                        message: "Please input the minimum Fare!",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      max={100}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                  <Form.Item
                    name="base"
                    label={`Base Fare `}
                    rules={[
                      {
                        required: true,
                        message: "Please input the base fare!",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      max={100}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row style={rowStyle} gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item
                    initialValue={hasTimeSlab}
                    name="hasTimeSlab"
                    label="Has Time Slab?"
                  >
                    <Switch checked={hasTimeSlab} onChange={setHasTimeSlab} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <div
                    style={{
                      marginBottom: 8,
                    }}
                  >
                          <span
                            style={{
                              display: "block",
                            }}
                          >
                            9am-11am -> Rs 10 K.M{" "}
                          </span>
                    <span
                      style={{
                        display: "block",
                      }}
                    >
                            11am-4pm -> Rs 7 K.M{" "}
                          </span>
                    <span
                      style={{
                        display: "block",
                      }}
                    >
                            4pm-5pm -> Rs 10 K.M{" "}
                          </span>
                    <span
                      style={{
                        display: "block",
                      }}
                    >
                            4pm-5pm -> Rs 7 K.M{" "}
                          </span>
                  </div>
                </Col>
              </Row>
              {hasTimeSlab && <TimeSlab />}
              <Row style={rowStyle} gutter={24}>
                <Col xs={24}>
                  <Form.Item
                    name="charge"
                    label={`Charge ( ${process.env.REACT_APP_CURRENCY_SYMBOL} per K.M )`}
                    rules={[
                      {
                        required: true,
                        message: "Please input the fare charge!!",
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


