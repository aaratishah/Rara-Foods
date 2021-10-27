import React from "react";
import { Row, Col } from "antd";
import { FacebookLogin, GoogleLogin } from "../socialLogin/";
import AppleLogin from "../socialLogin/AppleLogin";

const SocialLoginFooter = () => {
  return (
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
  );
};

export default SocialLoginFooter;
