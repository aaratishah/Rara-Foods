import { Button, Col, Divider, Form, Row, Tag } from "antd";
import api from "app/dashboard/api";
import AddPageLayout from "app/dashboard/components/ListTable/AddPageLayout";
import routeURL from "config/routeURL";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { handleError } from "services/util";
import Spinner from "../../../components/Spinner";
import RiderName from "../../../components/user/rider/RiderName";

const rowStyle = {
  width: "100%",
};

const backUrl = routeURL.cms.withdraw_request();
const pageTitle = "Withdraw Detail";

export default function ItemAdd(props) {
  const {
    match: {
      params: { itemId },
    },
  } = props;
  const formRef = useRef();
  const [spinning, setSpinning] = useState(false);
  const [data, setData] = useState(null);
  const title = "Withdraw Detail";

  useEffect(() => {
    if (itemId) {
      setSpinning(true);
      api.withdraw.request
        .read(itemId)
        .then(({ data }) => setData(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  }, [itemId]);

  return (
    <Row style={{ ...rowStyle, padding: "24px 40px" }}>
      <AddPageLayout
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
          // {
          //   title: title,
          //   url: false,
          // },
        ]}
        showActions={false}
        backUrl={backUrl}
      >
        {spinning ? (
          <Spinner />
        ) : (
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
                    <Form.Item label="Requested Rider's Name">
                      <RiderName rider={data?.rider} />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item label="Withdrawal Amount Requested (Sweat Coins)">
                      {data?.amount?.toString()}
                    </Form.Item>
                  </Col>
                </Row>

                <Divider orientation={"left"}>
                  Payment Detail to withdraw{" "}
                </Divider>

                <Row style={rowStyle} gutter={24}>
                  <Col xs={12}>
                    <Form.Item label="Payment Name">
                      {data?.paymentDetail?.name || "N/A"}
                    </Form.Item>
                  </Col>
                  <Col xs={12}>
                    <Form.Item label="Withdraw to Bank">
                      {data?.isBank ? "Yes" : "No" || "N/A"}
                    </Form.Item>
                  </Col>
                </Row>
                {data?.isBank ? (
                  <Row style={rowStyle} gutter={24}>
                    <Col xs={12}>
                      <Form.Item label="Bank Name">
                        {data?.paymentDetail?.bank?.name || "N/A"}
                      </Form.Item>
                    </Col>
                    <Col xs={12}>
                      <Form.Item label="Branch">
                        {data?.paymentDetail?.bank?.branch || "N/A"}
                      </Form.Item>
                    </Col>
                    <Col xs={12}>
                      <Form.Item label="Account Name">
                        {data?.paymentDetail?.bank?.accountName || "N/A"}
                      </Form.Item>
                    </Col>
                    <Col xs={12}>
                      <Form.Item label="Account Number">
                        {data?.paymentDetail?.bank?.accountNumber || "N/A"}
                      </Form.Item>
                    </Col>
                  </Row>
                ) : (
                  <Row style={rowStyle} gutter={24}>
                    <Col xs={12}>
                      <Form.Item label="Phone Number">
                        {data?.paymentDetail?.phone || "N/A"}
                      </Form.Item>
                    </Col>
                  </Row>
                )}
                <Row style={rowStyle} gutter={24}>
                  <Col xs={24}>
                    <Form.Item label="transactionStatus">
                      {data &&
                        data.transactionStatus &&
                        (data.transactionStatus === "PENDING" ? (
                          <Tag color={"orange"}>Pending</Tag>
                        ) : data.transactionStatus === "DONE" ? (
                          <Tag color={"success"}>Accepted</Tag>
                        ) : (
                          <Tag color={"error"}>Cancelled</Tag>
                        ))}
                    </Form.Item>
                  </Col>
                    {data &&
                    data.transactionStatus &&
                    data.transactionStatus === "DONE" && (
                        <Col xs={24} md={6}>
                            <Form.Item
                                label="Accepted By"
                            >
                                {data?.transactionBy?.name}
                            </Form.Item>
                        </Col>
                    )}
                </Row>
              </Form>
            </Col>
          </Row>
        )}
      </AddPageLayout>
    </Row>
  );
}
