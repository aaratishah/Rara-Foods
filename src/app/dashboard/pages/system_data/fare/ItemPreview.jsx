import { Button, Col, Divider, Form, Popconfirm, Row } from "antd";
import api from "app/dashboard/api";
import AddPageLayout from "app/dashboard/components/ListTable/AddPageLayout";
import routeURL from "config/routeURL";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { handleError } from "services/util";
import { notificationSuccess } from "../../../components/notification";
import moment from "moment";

const format = "HH:mm";

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
  const [spinning, setSpinning] = useState(false);
  const [data, setData] = useState(null);
  const title = data ? data.name : "N/A";

  useEffect(() => {
    if (itemId) {
      setSpinning(true);
      api.systemData.fare
        .read(itemId)
        .then(({ data }) => setData(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  }, [itemId]);

  const onDeleteRow = () => {
    setSpinning(true);
    api.systemData.fare
      .delete(itemId)
      .then((res) => {
        props.history.push(backUrl);
        notificationSuccess(res.message);
      })
      .catch(handleError)
      .finally(() => setSpinning(false));
  };

  return (
    <Row style={{ ...rowStyle, padding: "24px 40px" }}>
      <AddPageLayout
        spinning={spinning}
        title={title}
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
            title: title,
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
              // form={form}
              layout="vertical"
              name="control-ref"
            >
              <Row style={rowStyle} gutter={24}>
                <Col xs={24}>
                  <Form.Item label="Fare Name">{data?.name}</Form.Item>
                </Col>
              </Row>

              <Row style={rowStyle} gutter={24}>
                <Col xs={24}>
                  <Form.Item label="Description">{data?.description}</Form.Item>
                </Col>
              </Row>
              <Row style={rowStyle} gutter={24}>
                <Col xs={24} md={18}>
                  <Form.Item
                    label={`Base Fare (in ${process.env.REACT_APP_CURRENCY_SYMBOL})`}
                  >
                    {process.env.REACT_APP_CURRENCY_SYMBOL} {data?.base}
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item label="Active Status">
                    {data?.activeStatus ? "Active" : "Inactive"}
                  </Form.Item>
                </Col>
              </Row>
              <Row style={rowStyle} gutter={24}>
                <Col xs={24} md={18}>
                  <Form.Item label="Has Time Slab?">
                    {data?.hasTimeSlab ? "Yes" : "No"}
                  </Form.Item>
                </Col>
                {data?.hasTimeSlab || (
                  <Col xs={24} md={6}>
                    <Form.Item
                      label={`Charge ( ${process.env.REACT_APP_CURRENCY_SYMBOL} per K.M )`}
                    >
                      {process.env.REACT_APP_CURRENCY_SYMBOL} {data?.charge} per
                      K.M
                    </Form.Item>
                  </Col>
                )}
              </Row>
              <Row style={rowStyle}>
                {data?.slab?.map((slab) => (
                  <Row style={rowStyle} gutter={24}>
                    <Col xs={24} md={8}>
                      <Form.Item label="Time From">
                        {moment(slab?.startTime).format(format)}
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                      <Form.Item label="Time until">
                        {moment(slab?.endTime).format(format)}
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                      <Form.Item
                        label={`Charge ( ${process.env.REACT_APP_CURRENCY_SYMBOL} per K.M )`}
                      >
                        {process.env.REACT_APP_CURRENCY_SYMBOL} {slab?.charge}{" "}
                        per K.M{" "}
                      </Form.Item>
                    </Col>
                  </Row>
                ))}
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
                    <Popconfirm
                      title={`Are you sure delete this ${title}?`}
                      onConfirm={onDeleteRow}
                    >
                      <Button
                        danger
                        type="primary"
                        htmlType="submit"
                        loading={false}
                      >
                        Delete
                      </Button>
                    </Popconfirm>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item>
                    <Link to={routeURL.cms.fare_edit(itemId)}>
                      <Button type="primary" htmlType="submit" loading={false}>
                        Edit
                      </Button>
                    </Link>
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
