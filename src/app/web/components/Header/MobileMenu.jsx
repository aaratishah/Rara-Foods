import React, { useContext, useEffect } from "react";
import { Dropdown, Menu, Row, Button } from "antd";
import Cart from "app/web/components/Header/Cart";
import { Link, useHistory } from "react-router-dom";
import routeURL from "config/routeURL";
import {
  CaretDownOutlined,
  LoginOutlined,
  LogoutOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { UserLoginContext } from "context/";
import $ from "jquery";

const MobileMenu = ({ isAuth, onLogout }) => {
  const [isVisible, setVisible, tab, setTab] = useContext(UserLoginContext);
  const history = useHistory();
  const handleSignInClick = () => {
    // return history.push("/login");
    return history.push(routeURL.web.client_login());
  };

  useEffect(() => {
    if ($) {
      // search toggle open and close
      $('.search-toggle')
        .on('click', function () {
          $('.search-wrapper')
            .addClass('open');
        });

      $('.search-close')
        .on('click', function () {
          $('.search-wrapper')
            .removeClass('open');
        });
    }
  });

  return isAuth ? (
    <Dropdown
      placement="bottomRight"
      overlay={
        <Menu
          style={{
            minWidth: 150,
            top: 10,
          }}
        >
          <>
            <Menu.Item className="mobile-nav-link" key="4">
              <Cart
                isMobile={true}
                style={{
                  marginLeft: 20,
                }}
              />
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item className="mobile-nav-link" key="search">
              <a
                style={{
                  fontWeight: 600,
                }}
                className="search-toggle"
                href="javascript:void(0)"
              >
                <SearchOutlined /> Search
              </a>
            </Menu.Item>
          </>
        </Menu>
      }
      trigger={["click"]}
    >
      <Row
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          padding: 10,
          backgroundColor: "white",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      >
        <CaretDownOutlined
          style={{
            fontSize: 22,
          }}
        />
      </Row>
    </Dropdown>
  ) : (
    <Button
      size="large"
      shape="round"
      className="signin-btn"
      style={{
        backgroundColor: "#fff",
        color: "#000",
        marginRight: 8,
        cursor: "pointer",
        border: "none",
        boxShadow: "2px 5px 4px #888888",
      }}
      onClick={handleSignInClick}
    >
      Sign In
    </Button>
  );
};

export default MobileMenu;
