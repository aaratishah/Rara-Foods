import { Button, Col, Divider, Form, InputNumber, Row } from "antd";
import api from "app/dashboard/api";
import AddPageLayout from "app/dashboard/components/ListTable/AddPageLayout";
import routeURL from "config/routeURL";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { handleError } from "services/util";
import { notificationSuccess } from "../../../components/notification";

const rowStyle = {
  width: "100%",
};

const backUrl = routeURL.cms.settings();
const pageTitle = "Settings";
const imageTitle = "settings";

export default function EditSettings(props) {
  const formRef = useRef();
  const [spinning, setSpinning] = useState(false);

  const onSaveForm = (value) => {
    // validate here
    if (true) {
      const jsonData = {
        ...value,
      };
      setSpinning(true);
      api.settings
        .update(jsonData)
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
      riderReferValue: data.riderReferValue,
      customerReferValue: data.customerReferValue,
    });
  };

  useEffect(() => {
    setSpinning(true);
    api.settings
      .read()
      .then(({ data }) => fillForm(data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, []);

  useEffect(() => {
    // setSpinning(true);
    // api.systemData.fare
    //     .readAll()
    //     .then(({ data }) => setFares(data))
    //     .catch(handleError);
    //
    // api.systemData.commission
    //     .readAll()
    //     .then(({ data }) => setCommissions(data))
    //     .catch(handleError);
  }, []);

  return (
    <Row style={{ ...rowStyle, padding: "24px 40px" }}>
      <AddPageLayout
        spinning={spinning}
        title="Update Settings"
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
            title: "Update",
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
                <Col xs={24} md={12}>
                  <Form.Item
                    name="riderReferValue"
                    label="Refer Value for Riders (in Sweat Coins)"
                    rules={[
                      {
                        required: true,
                        message: "Please input the rider refer value!",
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
                    name="customerReferValue"
                    label="Refer Value for Customers"
                    rules={[
                      {
                        required: true,
                        message: "Please input the customer refer value!",
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
                      Update
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
