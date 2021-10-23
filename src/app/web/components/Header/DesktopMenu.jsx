import React, { useContext } from 'react';
import { Avatar, Button, Col, Dropdown, Menu, Row } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import routeURL from 'config/routeURL';
import config from 'config';
import defaultProfile from 'image/user.png';
import Cart from 'app/web/components/Header/Cart';
import { UserLoginContext } from 'context/';

const DesktopMenu = ({
  isAuth,
  onLogout,
  profile
}) => {
  const [isVisible, setVisible, tab, setTab] = useContext(UserLoginContext);
  const history = useHistory();

  const handleSignInClick = () => {
    return history.push(routeURL.web.client_login());
  }
  
  return (
    <Row align="middle" gutter={16}>
      {isAuth ? <Col>
          <Dropdown
            overlay={<Menu>
              <Menu.Item>
                <Link
                  style={{
                    backgroundColor: 'unset',
                    fontSize: 16,
                  }}
                  className="dropdown-item"
                  to={routeURL.web.my_account('accountDetail')}
                >
                  {' '}
                  <i className="fas fa-user-circle pr-2"/>
                  Account
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  style={{
                    backgroundColor: 'unset',
                    fontSize: 16,

                  }}
                  className="dropdown-item"
                  to={routeURL.web.my_account('wishlist')}
                >
                  <i className="far fa-bookmark  pr-2"/>
                  Saved
                </Link>
              </Menu.Item>
              <Menu.Item onClick={onLogout}>
                <a
                  style={{
                    backgroundColor: 'unset',
                    fontSize: 16,

                  }}
                  className="dropdown-item"

                ><i className="fas fa-sign-out-alt pr-2"/>
                  Logout
                </a>
              </Menu.Item>
            </Menu>}
            placement="bottomCenter" arrow>
            <Avatar style={{
              cursor: 'pointer',
            }} src={profile && profile.photo && config.getImageHost(profile.photo) ||
            defaultProfile}/>
          </Dropdown>
        </Col> :
        // <Button style={{
        //   backgroundColor: '#000',
        //   color: '#fff',
        //   marginRight: 8,
        //   cursor: 'pointer'
        // }} onClick={() => setVisible(true)}>
        //   Sign In
        // </Button>
        <Button style={{
          backgroundColor: '#000',
          color: '#fff',
          marginRight: 8,
          cursor: 'pointer'
        }} onClick={handleSignInClick}>
          Sign In
        </Button>
      }

      <Col>
        <a className="search-toggle" href="javascript:void(0)">
          <Button icon={<SearchOutlined />}>
            Search Foods
          </Button>
        </a>
      </Col>

      <Col>
        <Link to={routeURL.web.restaurant_list('near-me=1')}>
          <Button type="primary" style={{
            backgroundColor: '#000',
            color: '#fff',
          }}>
            Near by
          </Button>
        </Link>
      </Col>

      <Cart
        isMobile={false}
        style={{
          marginLeft: 32,
        }}
      />

    </Row>
  );
};

export default DesktopMenu;
