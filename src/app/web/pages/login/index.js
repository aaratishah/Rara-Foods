import { useContext, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { Button, Form, Input, Layout, Row } from "antd";
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
        <Content style={{ height: "1px", overflow: "hidden" }}>
          <div className="client-login-main">
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
);

export default Application;
