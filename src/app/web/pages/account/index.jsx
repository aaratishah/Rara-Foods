/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect, useState } from 'react';
import bannerImage from 'image/background.png';
import { Col, Row, Tabs } from 'antd';
import Order from './Order';
import ShippingAddress from './ShippingAddress';
import Dashboard from './Dashboard';
import AccountDetail from './AccountDetail';
import './index.css';
import UnAuthorized from 'app/web/components/Error/UnAuthorized';
import { UserContext } from 'context';
import Wishlist from './Wishlist';
import api from 'app/web/api';
import { notificationError } from 'app/web/components/notification';
import { handleError } from 'services/util';
import { Link } from 'react-router-dom';
import routeURL from 'config/routeURL';
import { Helmet } from 'react-helmet';
import LinkSocialMedia from 'app/web/pages/account/LinkSocialMedia';

const Banner = () => (
  <section
    className="page-banner bg_cover"
    style={{ backgroundImage: `url(${bannerImage})` }}
  >
    <div className="container">
      <div className="page-banner-content text-center">
        <h2 className="title">My Account</h2>
        <ol className="breadcrumb justify-content-center">
          <li className="breadcrumb-item">
            <a href="index.html">Home</a>
          </li>
          <li className="breadcrumb-item active">My Account</li>
        </ol>
      </div>
    </div>
  </section>
);

export default function Account(props) {
  const {
    match: {
      params: { tabValue },
    },
  } = props;

  useEffect(() => {
    if (tabs.map((each) => each.key).includes(tabValue)) setActiveKey(tabValue);
    else setActiveKey(tabs[0].key);
  }, [tabValue]);

  const { clientStore } = useContext(UserContext);
  const isAuth = clientStore.isAuthenticated;

  const [spinningProfile, setSpinningProfile] = useState(false);
  const [profile, setProfile] = useState(null);
  const refreshProfile = () => {
    setSpinningProfile(true);
    api.client
      .me()
      .then(({ data }) => setProfile(data))
      .catch(handleError)
      .finally(() => setSpinningProfile(false));
  };

  const tabs = [
    // {
    //   icon: 'fas fa-tachometer-alt',
    //   title: 'Dashboard',
    //   key: 'home',
    //   content: <Dashboard profile={profile} />,
    // },
    {
      icon: 'fas fa-shopping-cart',
      title: 'Order',
      key: 'order',
      content: <Order />,
    },
    {
      icon: 'fas fa-heart',
      title: 'Wishlist',
      key: 'wishlist',
      content: <Wishlist />,
      // content: <Dashboard profile={profile} />,
    },
    {
      icon: 'fas fa-location-arrow',
      title: 'Address',
      key: 'shippingAddress',
      content: <ShippingAddress />,
    },
    // {
    //   icon: 'fas fa-users',
    //   title: 'Link Social Media',
    //   key: 'social_media',
    //   content: (
    //     <LinkSocialMedia profile={profile}  refreshProfile={refreshProfile}/>
    //   ),
    // },
    {
      icon: 'fas fa-user',
      title: 'Account Details',
      key: 'accountDetail',
      content: (
        <AccountDetail profile={profile} refreshProfile={refreshProfile} />
      ),
    },
  ];
  const [activeKey, setActiveKey] = useState(tabs[0].key);
  const getTabName = (key) => tabs.find((tab) => tab.key === key).title;

  useEffect(() => {
    if (isAuth) {
      setSpinningProfile(true);
      api.client
        .me()
        .then(({ data }) => setProfile(data))
        .catch(handleError)
        .finally(() => setSpinningProfile(false));
    }
  }, [isAuth]);

  return isAuth === undefined ? null : isAuth ? (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {process.env.REACT_APP_CMS_TITLE} | {getTabName(activeKey)}
        </title>
        <meta
          name="description"
          content={`${process.env.REACT_APP_CMS_TITLE} user account page`}
        />
      </Helmet>
      <Banner />
      <section
        className="my-account-page"
        style={{
          paddingTop: 50,
          paddingBottom: 80,
        }}
      >
        <div className="container">
          <div className="row">
            <div
              className="my-account-menu"
              style={{
                width: '100%',
                marginTop: 30,
              }}
            >
              <ul
                className="nav account-menu-list flex-column"
                style={{
                  backgroundColor: 'unset',
                }}
              >
                <Col xs={0} sm={24}>
                  <Tabs
                    // onChange={setActiveKey}
                    activeKey={activeKey}
                    tabPosition={'left'}
                    // style={{ height: 220 }}
                  >
                    {tabs.map((tab, idx) => (
                      <Tabs.TabPane
                        tab={
                          <li style={{ width: '100%' }}>
                            <Link
                              to={routeURL.web.my_account(tab.key)}
                              className={tab.key === activeKey && 'active'}
                            >
                              <i className={`${tab.icon}`} /> {tab.title}
                            </Link>
                          </li>
                        }
                        key={tab.key}
                      >
                        {tab.content}
                      </Tabs.TabPane>
                    ))}
                  </Tabs>
                </Col>
                <Col sm={0} xs={24}>
                  <Tabs
                    onChange={setActiveKey}
                    activeKey={activeKey}
                    tabPosition={'top'}
                    // style={{ height: 220 }}
                  >
                    {tabs.map((tab, idx) => (
                      <Tabs.TabPane
                        tab={
                          <li style={{ width: '100%' }}>
                            <a className={tab.key === activeKey && 'active'}>
                              <i className={`${tab.icon}`} /> {tab.title}
                            </a>
                          </li>
                        }
                        key={tab.key}
                      >
                        <Row justify="center">
                          <Col xs={23}>{tab.content}</Col>
                        </Row>
                      </Tabs.TabPane>
                    ))}
                  </Tabs>
                </Col>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    <UnAuthorized />
  );
}
