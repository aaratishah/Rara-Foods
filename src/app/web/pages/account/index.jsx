/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect, useState } from "react";
import bannerImage from "image/background.png";
import { Col, Row, Tabs } from "antd";
import Order from "./Order";
import ShippingAddress from "./ShippingAddress";
import Dashboard from "./Dashboard";
import AccountDetail from "./AccountDetail";
import "./index.css";
import UnAuthorized from "app/web/components/Error/UnAuthorized";
import { UserContext } from "context";
import Wishlist from "./Wishlist";
import api from "app/web/api";
import { notificationError } from "app/web/components/notification";
import { handleError } from "services/util";
import { Link } from "react-router-dom";
import routeURL from "config/routeURL";
import { Helmet } from "react-helmet";
import LinkSocialMedia from "app/web/pages/account/LinkSocialMedia";
import BannerContainer from "app/web/components/Banner/Banner";

const pageTitle = "Account Details";

const Banner = () => (
  <BannerContainer bannerText="My Account">
    <ol
      className="breadcrumb justify-content-center"
      style={{ marginTop: "150px" }}
    >
      <li className="breadcrumb-item">
        <Link to={routeURL.web.home()}>Home</Link>
      </li>
      <li className="breadcrumb-item active">My Account</li>
    </ol>
  </BannerContainer>
);

export default function Account(props) {
  const {
    match: {
      params: { tabValue },
    },
  } = props;

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

  const tabs = [
    {
      title: "Order",
      key: "order",
      content: <Order />,
    },
    {
      title: "Wishlist",
      key: "wishlist",
      content: <Wishlist />,
      // content: <Dashboard profile={profile} />,
    },
    {
      title: "Address",
      key: "shippingAddress",
      content: <ShippingAddress />,
    },
    {
      title: "Account Details",
      key: "accountDetail",
      content: (
        <AccountDetail profile={profile} refreshProfile={refreshProfile} />
      ),
    },
  ];

  return isAuth === undefined ? null : isAuth ? (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {process.env.REACT_APP_CMS_TITLE} | {pageTitle}
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
                width: "100%",
                marginTop: 30,
              }}
            >
              {tabs.map(
                (tab, idx) =>
                  tab.key === tabValue && (
                    <Col xs={16} offset={4} key={idx}>
                      {tab.content}
                    </Col>
                  )
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    <UnAuthorized />
  );
}
