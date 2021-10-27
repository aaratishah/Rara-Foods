import React, { useEffect, useState, Fragment } from "react";
import ClientLoginLayout from "app/web/layout/ClientLoginLayout";
import { Form, Input, Row, Col } from "antd";
import DarkBlueRedButton from "app/web/components/Button/DarkBlueRedButton";
import SocialLoginFooter from "app/web/components/Account/SocialLoginFooter";
import { notificationSuccess } from "app/web/components/notification";
import { UserProvider } from "context";
import api from "app/web/api";
import { Redirect } from "react-router";
import routeURL from "config/routeURL";

const NewUser = () => {
  const [isNew, setIsNew] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleError = () => {
    console.log("Something went wrong");
  };

  useEffect(() => {
    api.client
      .me()
      .then(({ data }) => {
        if (data.hasProfileSave && data.name) {
          setIsNew(false);
        } else {
          setIsNew(true);
        }
      })
      .catch(handleError)
      .finally(() => setIsSpinning(false));
  }, []);

  const onSaveForm = (values) => {
    const jsonData = {
      name: `${values.firstName.trim()} ${values.lastName.trim()}`,
    };
    // client side validation here
    if (true) {
      setIsSpinning(true);
      api.client
        .editProfile(jsonData)
        .then((tokenInfo) => {
          notificationSuccess("Account Updated");
        })
        .then(() => {
          setIsNew(false);
        })
        .catch(handleError)
        .finally(() => setIsSpinning(false));
    }
  };

  const getNewUserUI = (spinning) => (
    <>
      <Row>
        <Col md={10}>
          <Form.Item
            name="firstName"
            rules={[
              {
                required: true,
                message: "First Name is required",
              },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col md={10} style={{ marginLeft: "15px" }}>
          <Form.Item
            name="lastName"
            rules={[
              {
                required: true,
                message: "Last Name is required",
              },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <DarkBlueRedButton
          shape="default"
          loading={spinning}
          className="login-form-button"
          htmlType="submit"
          style={{ marginBottom: "20px" }}
        >
          Save
        </DarkBlueRedButton>
      </Row>
    </>
  );

  return (
    <ClientLoginLayout>
      {isNew ? (
        <Fragment>
          <h3>New User | Login</h3>
          <Form onFinish={onSaveForm}>{getNewUserUI(isSpinning)}</Form>
          <UserProvider>
            <SocialLoginFooter />
          </UserProvider>
        </Fragment>
      ) : (
        <Redirect to={routeURL.web.home()} />
      )}
    </ClientLoginLayout>
  );
};

export default NewUser;
