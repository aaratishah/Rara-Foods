import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Divider, Drawer, Form, Input, Result, Row } from "antd";
import { notificationSuccess } from "../notification";
import config from "config";
import api from "app/dashboard/api";
import { handleError } from "../../../../services/util";

const RiderNotify = ({ children, rider, subject }) => {
  const formRef = useRef();
  const [spinning, setSpinning] = useState(false);
  const [open, setOpen] = useState(false);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    //   fetch rider Detail
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const onNotify = (value) => {
    if (true) {
      setSpinning(true);
      api.query
        .rider_respond(rider?._id, value)
        .then((data) => {
          setSubmit(true);
          notificationSuccess(data.message);
        })
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  };

  return (
    <>
      <Drawer
        title={`Send Notification to ${rider?.name}`}
        width={720}
        onClose={handleClickClose}
        visible={open}
        bodyStyle={{ paddingBottom: 80 }}
        footer={false}
      >
        {submit ? (
          <Result
            status="success"
            title="Email Successfully sent"
            subTitle=""
            extra={[
              <Button
                type="primary"
                onClick={() => {
                  setSubmit(false);
                  handleClickClose();
                }}
              >
                Okay
              </Button>,
              <Button onClick={() => setSubmit(false)}>Send Again</Button>,
            ]}
          />
        ) : (
          <Form
            ref={formRef}
            onFinish={onNotify}
            requiredMark={true}
            scrollToFirstError
            name="control-ref"
            layout="vertical"
            hideRequiredMark={false}
          >
            <Row gutter={16}>
              {rider?.photo && (
                <Col span={24}>
                  <Form.Item
                    label="Rider's Photo"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Receipt's email",
                      },
                      { type: "email", message: "Please enter valid email" },
                    ]}
                  >
                    <img width={100} src={config.getImageHost(rider?.photo)} />
                  </Form.Item>
                </Col>
              )}
              <Col span={24}>
                <Form.Item
                  initialValue={subject}
                  name="subject"
                  label="Subject"
                  rules={[{ required: true, message: "Please enter Subject" }]}
                >
                  <Input
                    style={{ width: "100%" }}
                    placeholder="Please enter Subject"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="message"
                  label="Message Body"
                  rules={[
                    {
                      required: true,
                      message: "please input email body",
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={7}
                    placeholder="please input email body"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row
              style={{ width: "100%", marginTop: 20 }}
              gutter={16}
              justify="end"
            >
              <div
                style={{
                  textAlign: "right",
                }}
              >
                <Button onClick={handleClickClose} style={{ marginRight: 8 }}>
                  Discard
                </Button>
                <Button
                  htmlType="submit"
                  loading={spinning}
                  onClick={onNotify}
                  type="primary"
                >
                  Send
                </Button>
              </div>
            </Row>
          </Form>
        )}
      </Drawer>
      <span
        onClick={handleClickOpen}
        style={{
          color: "#2196f3",
          cursor: "pointer",
        }}
      >
        {children ? (
          typeof children === "function" ? (
            children(spinning)
          ) : (
            children
          )
        ) : (
          <Button type="primary" htmlType="submit" loading={false}>
            Reply
          </Button>
        )}
      </span>
    </>
  );
};

export default RiderNotify;
