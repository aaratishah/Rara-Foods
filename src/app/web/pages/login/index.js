import { useContext, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { Button, Form, Input, Layout, Row, Col } from "antd";
import {
  LOGIN_USER_CLIENT,
  LOGOUT_USER_CLIENT,
  UserLoginContextProvider,
  UserContext,
  UserProvider,
} from "context/";
import AccountModal from "../../components/Account/";
import { JwtService } from "services";

import "./index.css";
import Footer from "app/web/components/Footer";

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
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Content style={{ overflow: "hidden" }}>
          <div className="client-login-main">
            {!clientStore.isAuthenticated && (
              <AccountModal history={props.history} />
            )}
          </div>
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
    </UserLoginContextProvider>
  );
};

const Application = (props) => (
  <UserProvider>
    <ClientLogin {...props} />
  </UserProvider>
);

export default Application;
