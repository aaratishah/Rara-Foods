import React, { Fragment } from "react";
import { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Layout, Row } from "antd";
import {
  LOGIN_USER_CLIENT,
  LOGOUT_USER_CLIENT,
  UserLoginContextProvider,
  UserContext,
  UserProvider
} from "context/";
import AccountModal from "../../components/Account/";
import { JwtService } from "services";

import bgImg from "image/background.png";
import logoImg from "image/logo.png";

import "./index.css";

const { Content } = Layout;

const ClientLogin = (props) => {
  const { clientStore, clientDispatch } = useContext(UserContext);
  const isAuth = clientStore.isAuthenticated;
  useEffect(() => {
    if (isAuth === undefined) {
      const token = JwtService.getAccessToken();
      if (JwtService.isAuthTokenValid(token)) {
        clientDispatch({ type: LOGIN_USER_CLIENT });
      } else {
        JwtService.logout();
        clientDispatch({ type: LOGOUT_USER_CLIENT });
      }
    }
    if (isAuth !== undefined && isAuth === false) {
    }
  }, [isAuth]);

  return (
    <UserLoginContextProvider>
      <Layout>
        <Content>
          <div className="login-main">
            <div className="login-header">
              <Row justify="center">
                <img
                  alt="logo"
                  width="100px"
                  src={logoImg}
                  style={{ marginBottom: "20px" }}
                />
              </Row>
            </div>

            {!clientStore.isAuthenticated && (
              <AccountModal history={props.history} />
            )}
          </div>
        </Content>
      </Layout>
    </UserLoginContextProvider>
  );
};

const Application = (props) => (
  <UserProvider>
    <ClientLogin {...props} />
  </UserProvider>
)

export default Application;
