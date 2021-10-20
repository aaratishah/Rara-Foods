import { Button, Col, Divider, Form, Row } from "antd";
import api from "app/dashboard/api";
import AddPageLayout from "app/dashboard/components/ListTable/AddPageLayout";
import routeURL from "config/routeURL";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { handleError } from "services/util";

const rowStyle = {
  width: "100%",
};

const backUrl = routeURL.cms.home();
const pageTitle = "Settings";

export default function ItemAdd() {
  const [spinning, setSpinning] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
      setSpinning(true);
      api.settings
        .read()
        .then(({ data }) => setData(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
  }, []);


  useEffect(() => {
    // setSpinning(true);
    // api.systemData.fare
    //   .readAll()
    //   .then(({ data }) => setFares(data))
    //   .catch(handleError);
    //
    // api.systemData.commission
    //   .readAll()
    //   .then(({ data }) => setCommissions(data))
    //   .catch(handleError);
  }, []);

  return (
    <Row style={{ ...rowStyle, padding: "24px 40px" }}>
      <AddPageLayout
        spinning={spinning}
        title={pageTitle}
        breadCrumb={[
          {
            title: "Home",
            url: routeURL.cms.home(),
          },
          {
            title: pageTitle,
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
                  <Form.Item label="Refer Value for Riders (in Sweat Coins)">{data?.riderReferValue || 'N/A'}</Form.Item>
                </Col>
              </Row>

              <Row style={rowStyle} gutter={24}>
                <Col xs={24}>
                  <Form.Item label="Refer Value for Customers">{data?.customerReferValue || 'N/A'}</Form.Item>
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
                    <Link to={routeURL.cms.settings_edit()}>
                      <Button type="primary" htmlType="submit" loading={false}>
                        Update
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
