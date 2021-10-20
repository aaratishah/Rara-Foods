import { Button, Col, Divider, Form, Popconfirm, Row } from "antd";
import api from "app/dashboard/api";
import AddPageLayout from "app/dashboard/components/ListTable/AddPageLayout";
import routeURL from "config/routeURL";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { handleError } from "services/util";
import { notificationSuccess } from "../../../components/notification";
import { ImagePreview } from "../../../components/previewImage/ImagePreview";

const format = "HH:mm";

const rowStyle = {
  width: "100%",
};

const backUrl = routeURL.cms.vehicle_type();
const pageTitle = "Vehicle Type";

export default function ItemAdd(props) {
  const {
    match: {
      params: { itemId },
    },
  } = props;
  const [spinning, setSpinning] = useState(false);
  const [data, setData] = useState(null);
  const [fares, setFares] = useState([]);
  const [commissions, setCommissions] = useState([]);
  const title = data ? data.name : "N/A";

  useEffect(() => {
    if (itemId) {
      setSpinning(true);
      api.systemData.vehicle_type
        .read(itemId)
        .then(({ data }) => setData(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  }, [itemId]);

  const onDeleteRow = () => {
    setSpinning(true);
    api.systemData.vehicle_type
      .delete(itemId)
      .then((res) => {
        props.history.push(backUrl);
        notificationSuccess(res.message);
      })
      .catch(handleError)
      .finally(() => setSpinning(false));
  };

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
                  <Form.Item label="Vehicle Type">{data?.name}</Form.Item>
                </Col>
              </Row>

              <Row style={rowStyle} gutter={24}>
                <Col xs={24}>
                  <Form.Item label="Description">{data?.description}</Form.Item>
                </Col>
              </Row>
              <Row style={rowStyle} gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item label="Commission">
                    {(() => {
                      const col = commissions.find(
                        (e) => e._id.toString() === data?.commission?.toString()
                      );
                      if (col)
                        return (
                          <Link
                            to={routeURL.cms.commission_view(data?.commission)}
                          >
                            {col.name}
                          </Link>
                        );
                      else return "Not found";
                    })()}
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item label="Fare">
                    {(() => {
                      const col = fares.find(
                        (e) => e._id.toString() === data?.fare?.toString()
                      );
                      if (col)
                        return (
                          <Link to={routeURL.cms.commission_view(data?.fare)}>
                            {col.name}
                          </Link>
                        );
                      else return "Not found";
                    })()}
                  </Form.Item>
                </Col>
              </Row>
              <Row style={rowStyle} gutter={24}>
                {data?.icon && (
                  <Col xs={24} md={18}>
                    <Form.Item label="Icon">
                      <ImagePreview src={data?.icon} width={64} />
                    </Form.Item>
                  </Col>
                )}
                <Col xs={24} md={6}>
                  <Form.Item label="Active Status">
                    {data?.activeStatus ? "Active" : "Inactive"}
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
                    <Link to={routeURL.cms.vehicle_type_edit(itemId)}>
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
