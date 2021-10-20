import { Button, Col, Divider, Form, Popconfirm, Row } from "antd";
import api from "app/dashboard/api";
import AddPageLayout from "app/dashboard/components/ListTable/AddPageLayout";
import routeURL from "config/routeURL";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { handleError } from "services/util";
import { notificationSuccess } from "../../../components/notification";
import { ImagePreview } from "../../../components/previewImage/ImagePreview";
import HtmlRender from "../../../components/HtmlRender";

const format = "HH:mm";

const rowStyle = {
  width: "100%",
};

const backUrl = routeURL.cms.rider_notification();
const pageTitle = "Rider Notification";

export default function ItemAdd(props) {
  const {
    match: {
      params: { itemId },
    },
  } = props;
  const [spinning, setSpinning] = useState(false);
  const [data, setData] = useState(null);
  const title = data ? data.campaignName : "N/A";

  useEffect(() => {
    if (itemId) {
      setSpinning(true);
      api.notification.rider
        .read(itemId)
        .then(({ data }) => setData(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  }, [itemId]);

  const onDeleteRow = () => {
    setSpinning(true);
    api.notification.rider
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
                  <Form.Item label="Campaign Name">
                    {data?.campaignName || "N/A"}
                  </Form.Item>
                </Col>
              </Row>

              <Row style={rowStyle} gutter={24}>
                <Col xs={24}>
                  <Form.Item label="Notification Title">
                    {data?.title || "N/A"}
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Notification Body">
                    {data?.body || "N/A"}
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Content">
                    {data?.content ? <HtmlRender html={data?.content} /> : "N/A"}
                  </Form.Item>
                </Col>
              </Row>

              <Row style={rowStyle} gutter={24}>
                {data?.photo && (
                  <Col xs={24} md={18}>
                    <Form.Item label="Included Photo">
                      <ImagePreview src={data?.photo} width={64} />
                    </Form.Item>
                  </Col>
                )}
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
                      title={`Are you sure delete this Notification?`}
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
                    <Link to={routeURL.cms.rider_notification_edit(itemId)}>
                      <Button type="primary" htmlType="submit" loading={false}>
                        Duplicate
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
