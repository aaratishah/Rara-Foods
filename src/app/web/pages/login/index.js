import { Layout, Col } from "antd";
import { UserLoginContextProvider, UserProvider } from "context/";
import AccountModal from "../../components/Account/";

import "./index.css";

const { Content } = Layout;

const ClientLogin = (props) => {
  return (
    <UserLoginContextProvider>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Content style={{ overflow: "hidden" }}>
          <div className="client-login-main">
            <AccountModal history={props.history} />
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
