import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Col, Dropdown, Menu, Row } from "antd";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import routeURL from "config/routeURL";
import config from "config";
import defaultProfile from "image/user.png";
import Cart from "app/web/components/Header/Cart";
import { UserLoginContext } from "context/";
import "./index.css";
// import { useWindowScroll } from "react-use";
import { default as useBreakpoint } from "services/Breakpoint";

const DesktopMenu = ({ isAuth, onLogout, profile, visibleSearch }) => {
  const [isVisible, setVisible, tab, setTab] = useContext(UserLoginContext);
  const [searchText, setSearchText] = useState("");
  const history = useHistory();
  const point = useBreakpoint();
  const isMobileDevice = () => ["xs", "sm"].includes(point);

  const handleSignInClick = () => {
    // return history.push("/login");
    return history.push(routeURL.web.client_login());
  };

  return (
    <Row align="middle" gutter={20}>
      {!isAuth && !isMobileDevice() ? (
        <button
          // size="large"
          // shape="round"
          className="signin-btn"
          // type = 'primary'
          style={{
            backgroundColor: "#eeeeee",
            color: "#000",
            marginRight: 8,
            cursor: "pointer",
            border: "none",
            // fontSize: '18px',
            // boxShadow: "2px 5px 4px #888888",
          }}
          onClick={handleSignInClick}
        >
          Sign in
        </button>
      ) : null}

      {/* <Col>
        <Link to={routeURL.web.restaurant_list("near-me=1")}>
          <Button
            size="large"
            shape="round"
            type="primary"
            style={{
              backgroundColor: "#000",
              color: "#fff",
            }}
          >
            Near by
          </Button>
        </Link>
      </Col> */}

      <Cart
        isMobile={isMobileDevice() ? true : false}
        style={{
          marginLeft: 32,
        }}
      />
    </Row>
  );
};

export default DesktopMenu;
