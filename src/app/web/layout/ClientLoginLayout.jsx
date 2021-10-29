import React from "react";
import { Layout, Col } from "antd";
import api from "app/web/api";
import { JwtService } from "services/jwtServiceClient";

const { Content } = Layout;

const ClientLoginLayout = (props) => {
  api.baseAxios.interceptors.request.use(
    (request) => {
      const token = JwtService.getAccessToken();
      if (token) {
        request.headers.Authorization = token;
      } else {
        // console.log(token, "Token error!");
      }
      return request;
    },

    (err) => {
      return Promise.reject(err);
    }
  );

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Content style={{ overflow: "hidden" }}>
        <div className="client-login-main">{props.children}</div>
      </Content>
      <Col xs={24} className="login-footer-copyright">
        <p className="login-footer-text">
          <span className="">
            Copyright © {new Date().getFullYear()}. |&nbsp;
            {process.env.REACT_APP_CMS_TITLE}&nbsp;|&nbsp;All rights reserved.{" "}
          </span>
        </p>
      </Col>
    </Layout>
  );
};

export default ClientLoginLayout;
