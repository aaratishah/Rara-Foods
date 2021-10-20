import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Switch,
} from "antd";
import api from "app/dashboard/api";
import AddPageLayout from "app/dashboard/components/ListTable/AddPageLayout";
import routeURL from "config/routeURL";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { handleError } from "services/util";
import { notificationSuccess } from "../../../components/notification";
import Spinner from "../../../components/Spinner";

const rowStyle = {
  width: "100%",
};

const backUrl = routeURL.cms.commission();
const pageTitle = "Commission";

export default function ItemAdd(props) {
  const {
    match: {
      params: { itemId },
    },
  } = props;
  const formRef = useRef();
  const [spinning, setSpinning] = useState(false);

  const onSaveForm = (value) => {
    // validate here
    if (true) {
      const jsonData = {
        ...value,
      };
      if (itemId) jsonData._id = itemId;
      setSpinning(true);
      api.systemData.commission
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
      charge: data.charge,
    });
    setSpinning(false);
  };

  useEffect(() => {
    if (itemId) {
      setSpinning(true);
      api.systemData.commission
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
                    name="name"
                    label="Commission Name"
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
                <Col xs={24} md={18}>
                  <Form.Item
                    name="charge"
                    label="Charge (in %)"
                    rules={[
                      {
                        required: true,
                        message: "Please input the charge!",
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
