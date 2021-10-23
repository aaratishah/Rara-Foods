import { Button, Col, Form, Input, Row } from "antd";
import GalleryUpload from "app/dashboard/components/GalleryUpload";
import api from "app/web/api";
import {
  notificationError,
  notificationSuccess,
} from "app/web/components/notification";
import { useEffect, useState } from "react";
import { handleError } from "services/util";
import UpdatePhoneNumber from "app/web/pages/account/component/UpdatePhone";
import routeURL from "config/routeURL";
import { useHistory, useLocation } from "react-router-dom";
import LinkSocialMedia from "app/web/pages/account/LinkSocialMedia";
import ShippingAddress from "./ShippingAddress";

const imageTitle = "user_profile";

export default function AccountDetail({ profile, refreshProfile }) {
  const [photo, setPhoto] = useState([]);
  const [form] = Form.useForm();
  const [accountSpinning, setAccountSpinning] = useState(false);
  const [passwordSpinning, setPasswordSpinning] = useState(false);

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        name: profile.name,
        email: profile.email,
        username: profile.username,
        about: profile.about,
        phone: profile.phone,
      });
      if (profile.photo) setPhoto([profile.photo]);
    }
  }, [profile]);

  const onFinish = (values) => {
    const jsonData = {
      ...values,
      photo: photo.length > 0 ? photo[0] : null,
    };
    // client side validation here
    if (true) {
      setAccountSpinning(true);
      api.client
        .editProfile(jsonData)
        .then((tokenInfo) => {
          refreshProfile();
          notificationSuccess("Account Updated");
        })
        .catch(handleError)
        .finally(() => setAccountSpinning(false));
    }
  };
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    if (profile && !profile?.name) {
      if (location.pathname !== routeURL.web.my_account("accountDetail"))
        history.push(routeURL.web.my_account("accountDetail"));
    }
  }, [location.pathname, profile]);

  return (
    <div>
      <div className="my-account-details account-wrapper">
        <LinkSocialMedia profile={profile} refreshProfile={refreshProfile} />
        <div
          className="account-details"
          style={{
            marginTop: 48,
          }}
        >
          {profile && !profile?.name ? (
            <Row
              style={{
                backgroundColor: "#ffc9d5",
                padding: "8px 16px",
                borderRadius: 8,
                marginBottom: 16,
              }}
            >
              Please complete your profile first
            </Row>
          ) : (
            <></>
          )}
          <Row
            style={{
              width: "100%",
            }}
            gutter={48}
          >
            <Col xs={24} lg={12}>
              <h4 className="account-title">Account Details</h4>

              <Row
                style={{
                  width: "100%",
                  marginTop: 20,
                }}
                justify="center"
              >
                <Col>
                  <GalleryUpload
                    maxFile={1}
                    fileNames={photo}
                    imageTitle={`${imageTitle}`}
                    setFileNames={setPhoto}
                  />
                </Col>
              </Row>
              <Form
                style={{
                  width: "100%",
                }}
                // wrapperCol={{
                // 	offset: 1,
                // }}
                // {...layout}
                form={form}
                // form={form}
                layout="vertical"
                name="control-ref"
                onFinish={onFinish}
                requiredMark={true}
                scrollToFirstError
              >
                <Row>
                  <Form.Item
                    style={{
                      width: "100%",
                    }}
                    name="name"
                    label="Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Name",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>

                  <Form.Item name="address" label="Address">
                    <ShippingAddress />
                  </Form.Item>
                  </Row>

                {/*<Form.Item*/}
                {/*  style={{*/}
                {/*    width: '100%',*/}
                {/*  }}*/}
                {/*  name="phone"*/}
                {/*  label="Phone Number *"*/}
                {/*  rules={[*/}
                {/*    {*/}
                {/*      required: true,*/}
                {/*      message: 'Please input your phone number',*/}
                {/*    },*/}
                {/*  ]}*/}
                {/*>*/}
                {/*  <Input size="large" type="tel" />*/}
                {/*</Form.Item>*/}

                <Form.Item
                  style={{
                    width: "100%",
                  }}
                >
                  <div className="single-form">
                    <Button
                      // onClick={() => form.submit()}
                      loading={accountSpinning}
                      htmlType="submit"
                      className="main-btn btn-block"
                    >
                      Save Change
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </Col>

            <Col xs={24} lg={12}>
              <UpdatePhoneNumber />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
