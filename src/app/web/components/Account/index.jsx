import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import {
  LOGIN_USER_CLIENT,
  UserContext,
  UserLoginContext,
  LOGOUT_USER_CLIENT,
} from "context";
import { Fragment, useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { JwtService } from "services/jwtServiceClient";
import DarkBlueRedButton from "../Button/DarkBlueRedButton";
import { FacebookLogin, GoogleLogin } from "../socialLogin/";
import "./index.css";
import { handleError } from "services/util";
import { LeftOutlined, UndoOutlined } from "@ant-design/icons";
import { notificationSuccess } from "../notification";
import "flag-icon-css/css/flag-icon.min.css";
import { countryCode } from "./country";
import routeURL from "config/routeURL";
import AppleLogin from "../socialLogin/AppleLogin";
import api from "app/web/api";
const loginStep = {
  PHONE_NUMBER: "PHONE_NUMBER",
  OTP_PIN: "OTP_PIN",
  NEW_USER: "NEW_USER",
};

const LoginForm = ({ history }) => {
  const [step, setStep] = useState(loginStep.PHONE_NUMBER);
  const [apiResponse, setApiResponse] = useState({
    OTPLength: 4,
  });
  const { clientStore, clientDispatch } = useContext(UserContext);

  const [loginRef] = Form.useForm();
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    if (clientStore.isAuthenticated === undefined) {
      const token = JwtService.getAccessToken();
      if (JwtService.isAuthTokenValid(token)) {
        clientDispatch({ type: LOGIN_USER_CLIENT });
      } else {
        clientDispatch({ type: LOGOUT_USER_CLIENT });
      }
    }
  }, [clientStore.isAuthenticated, clientDispatch]);

  const verifyOTP = (values) => {
    JwtService.verifyOTP({
      phone: apiResponse.phone,
      otp: values.otp,
      hash: apiResponse.hash,
    })
      .then((response) => {
        // return api.client.me();
        // api.client
        //   .me()
        //   .then(({ data }) => setIsNew(data.hasProfileSave))
        //   .catch(handleError)
        //   .finally(() => setSpinningProfile(false));
        clientDispatch({ type: LOGIN_USER_CLIENT });
        notificationSuccess("Logged in successfully! ");
      })
      // .then(({ data }) => {
      //   if (!data.hasProfileSave) {
      //     setStep(loginStep.NEW_USER);
      //   }
      // })
      .catch(handleError)
      .finally(() => setSpinning(false));
  };

  const onSaveForm = (value) => {
    console.log("onSaveForm", value);
    // client side validation here
    if (step === loginStep.PHONE_NUMBER) {
      setSpinning(true);
      registerPhoneNumber(value);
    } else if (step === loginStep.OTP_PIN) {
      setSpinning(true);
      verifyOTP(value);
    }
  };

  const registerPhoneNumber = (values) => {
    let countryDial =
      countryCode.find(
        (country) =>
          country?.name?.toLowerCase() === values.countryCode?.toLowerCase()
      )?.dial || "";
    countryDial = countryDial ? `${countryDial}` : "";
    JwtService.signInWithPhone({
      phone: `${countryDial}${values.phone}`,
    })
      .then((data) => {
        setApiResponse({
          ...apiResponse,
          hash: data.hash,
          phone: data.phone,
          OTPLength: data.length,
        });
        setStep(loginStep.OTP_PIN);
      })
      .catch(handleError)
      .finally(() => setSpinning(false));
  };

  const resendOTP = () => {
    JwtService.resendOTP({
      phone: apiResponse.phone,
      isForgetPassword: false,
    })
      .then((data) => {
        setApiResponse({
          ...apiResponse,
          hash: data.hash,
          phone: data.phone,
          OTPLength: data.length,
        });
        setStep(loginStep.OTP_PIN);
      })
      .catch(handleError)
      .finally(() => setSpinning(false));
  };

  const getPhoneNumberUI = () => (
    <>
      <label>
        Add your phone number. We'll send you a verification code so we know
        you're real.
      </label>

      <Row>
        <Col xs={8}>
          <Form.Item
            initialValue={"AUSTRALIA"?.toLowerCase()}
            name="countryCode"
            rules={[
              {
                required: true,
                message: "Please input valid Country Code!",
              },
            ]}
          >
            <Select
              filterOption={(input, option) => {
                return option?.value
                  ?.toLowerCase()
                  .startsWith(input?.toLowerCase());
                // || option?.dial?.toLowerCase().includes(input?.toLowerCase())
              }}
              showSearch={true}
              placeholder="Country Name"
              style={{}}
              size="large"
            >
              {countryCode.map((each) => (
                <Select.Option
                  style={{
                    width: 200,
                  }}
                  value={each.name?.toLowerCase()}
                >
                  <Row>
                    <span
                      className={`flag-icon flag-icon-${each.code?.toLowerCase()}`}
                    ></span>
                    <span className="ml-2 title">{each.dial}</span>
                  </Row>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={16}>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input valid phone number !",
              },
            ]}
          >
            <Input
              style={{
                flex: 1,
              }}
              size="large"
              className="site-form-item-icon"
              placeholder="Mobile Number"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <DarkBlueRedButton
          loading={spinning}
          className="login-form-button"
          htmlType="submit"
        >
          Send OTP
        </DarkBlueRedButton>
      </Form.Item>
      <Form.Item>
        <span>
          By providing my phone number, I hereby agree and accept the{" "}
          <Link>Terms of Service</Link> and <Link>Privacy Policy</Link> in use
          of the {process.env.REACT_APP_CMS_TITLE}.
        </span>
      </Form.Item>
    </>
  );

  // const getNewUserUI = () => (
  //   <>
  //     <Row>
  //       <Col md={10}>
  //         <Form.Item
  //           name="firstName"
  //           rules={[
  //             {
  //               required: true,
  //               message: "First Name is required",
  //             },
  //           ]}
  //         >
  //           <Input placeholder="First Name" />
  //         </Form.Item>
  //       </Col>
  //       <Col md={10} style={{ marginLeft: "15px" }}>
  //         <Form.Item
  //           name="lastName"
  //           rules={[
  //             {
  //               required: true,
  //               message: "Last Name is required",
  //             },
  //           ]}
  //         >
  //           <Input placeholder="Last Name" />
  //         </Form.Item>
  //       </Col>
  //     </Row>
  //     <Row>
  //       <DarkBlueRedButton
  //         shape="default"
  //         loading={spinning}
  //         className="login-form-button"
  //         htmlType="submit"
  //       >
  //         Save
  //       </DarkBlueRedButton>
  //     </Row>
  //   </>
  // );

  const getOTPUI = () => (
    <>
      <label>
        We have sent {apiResponse.OTPLength} digit OTP code to your phone
        number: {apiResponse.phone}.
      </label>
      <Form.Item
        name="otp"
        rules={[
          {
            required: true,
            message: `OTP cannot be empty. `,
          },
          {
            min: apiResponse.OTPLength,
            message: `Please input ${apiResponse.OTPLength} digit valid code. `,
          },
        ]}
      >
        <Input
          style={{
            borderRadius: 5,
          }}
          size="large"
          className="site-form-item-icon"
          placeholder={`${apiResponse.OTPLength} digit OTP`}
        />
      </Form.Item>
      <Form.Item>
        <Row align={"middle"}>
          <Col xs={18}>
            <DarkBlueRedButton
              // onClick={loginRef.submit}
              loading={spinning}
              className="login-form-button"
              htmlType="submit"
            >
              Verify OTP
            </DarkBlueRedButton>
          </Col>
          <Col xs={6}>
            <Button
              onClick={resendOTP}
              loading={false}
              type={"text"}
              icon={<UndoOutlined />}
            >
              Resend
            </Button>
          </Col>
          <Col
            xs={24}
            style={{
              marginTop: 16,
            }}
          >
            <span
              style={{
                cursor: "pointer",
              }}
              onClick={() => setStep(loginStep.PHONE_NUMBER)}
            >
              <LeftOutlined /> Edit Phone number
            </span>
          </Col>
        </Row>
      </Form.Item>
    </>
  );

  return (
    <Form
      form={loginRef}
      layout="vertical"
      className="center"
      name="control-ref"
      onFinish={onSaveForm}
      requiredMark={true}
      scrollToFirstError
      style={{
        paddingTop: 15,
        paddingBottom: 15,
      }}
    >
      {step === loginStep.PHONE_NUMBER && getPhoneNumberUI()}
      {step === loginStep.OTP_PIN && getOTPUI()}
      {/* {step === loginStep.NEW_USER && getNewUserUI()} */}
    </Form>
  );
};

export default function Account({ history }) {
  const { clientStore } = useContext(UserContext);

  return (
    <Fragment>
      {!clientStore.isAuthenticated ? (
        <>
          <div
            style={{
              width: "100%",
            }}
          >
            <h4 className="text-center theme1">
              {process.env.REACT_APP_CMS_TITLE} | Log In
            </h4>
            <LoginForm history={history} />
          </div>
          <div className="tab-content">
            <div className="social-icon origin-color si-square">
              <div className="font-size-md text-dark "> Log In With</div>
              <Row
                gutter={16}
                style={{
                  width: "100%",
                  marginTop: 20,
                }}
              >
                <Col>
                  <FacebookLogin />
                </Col>
                <Col>
                  <GoogleLogin />
                </Col>
                <Col>
                  <AppleLogin />
                </Col>
              </Row>
            </div>
          </div>
        </>
      ) : (
        <Redirect to={routeURL.web.home()} />
      )}
    </Fragment>
  );
}
