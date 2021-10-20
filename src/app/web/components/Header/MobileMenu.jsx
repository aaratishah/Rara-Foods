import React, { useContext } from 'react';
import { Dropdown, Menu, Row } from 'antd';
import Cart from 'app/web/components/Header/Cart';
import { Link } from 'react-router-dom';
import routeURL from 'config/routeURL';
import {
  CaretDownOutlined,
  LoginOutlined,
  LogoutOutlined,
  SearchOutlined,
  UserOutlined
} from '@ant-design/icons';
import { UserLoginContext } from 'context/';

const MobileMenu = ({
  isAuth,
  onLogout
}) => {
  const [isVisible, setVisible, tab, setTab] = useContext(UserLoginContext);

  return (
    <>
      <Dropdown
        placement="bottomRight"
        overlay={
          <Menu
            style={{
              minWidth: 150,
              top: 10,
            }}
          >
            {isAuth ? (
              <>
                <Menu.Item className="mobile-nav-link" key="4">
                  <Cart
                    isMobile={true}
                    style={{
                      marginLeft: 20,
                    }}
                  />
                </Menu.Item>
                <Menu.Item
                  className="mobile-nav-link"
                  key="my_account"
                >
                  <Link to={routeURL.web.my_account()}>
                    <UserOutlined/> My Account
                  </Link>
                </Menu.Item>
                <Menu.Item className="mobile-nav-link" key="search">
                  <a style={{
                    fontWeight: 600,
                  }} className="search-toggle" href="javascript:void(0)">
                    <SearchOutlined/> Search
                  </a>
                </Menu.Item>
                <Menu.Item
                  onClick={onLogout}
                  key="logout"
                  style={{
                    fontWeight: 600,
                  }}
                >
                  <LogoutOutlined/> Logout
                </Menu.Item>
                <Menu.Divider/>
              </>
            ) : (
              <>
                <Menu.Item
                  className="mobile-nav-link"
                  key="4"
                  style={{
                    fontWeight: 600,
                  }}
                >
                  <Cart
                    isMobile={true}
                    style={{
                      marginLeft: 20,
                    }}
                  />
                </Menu.Item>
                <Menu.Item className="mobile-nav-link" key="login">
                  <span style={{
                    marginRight: 8,
                    cursor: 'pointer'
                  }} onClick={() => setVisible(true)}>
          <LoginOutlined/> Login
        </span>


                </Menu.Item>
                <Menu.Item
                  className="mobile-nav-link"
                  key="search_logout"
                  style={{
                    fontWeight: 600,
                  }}
                >
                  <a className="search-toggle" href="javascript:void(0)">
                    <SearchOutlined/> Search
                  </a>
                </Menu.Item>
                <Menu.Divider/>
              </>
            )}
          </Menu>
        }
        trigger={['click']}
      >
        <Row
          style={{
            boxShadow:
              'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
            padding: 10,
            backgroundColor: 'white',
            borderRadius: '50%',
            cursor: 'pointer',
          }}
        >
          <CaretDownOutlined
            style={{
              fontSize: 22,
            }}
          />
        </Row>
      </Dropdown>
    </>
  );
};

export default MobileMenu;
