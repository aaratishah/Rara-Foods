import clsx from "clsx";
import routeURL from "config/routeURL";
import {
  ADDRESS,
  CONTACT,
  EMAIL,
  FACEBOOK_LINK,
  INSTAGRAM_LINK,
  TWITTER_LINK,
  YOUTUBE_LINK,
} from "config/string";
// import footerBg from 'image/footer_bg.jpg';
import logoImage from "image/logo.png";
import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
// import { Button, Col, Row, Icon, Layout, Menu, Breadcrumb } from "antd";
import { AppleFilled, AndroidFilled } from "@ant-design/icons";
import apple from "image/appstore.png";
import google from "image/google.png";
import { AndroidLink, AppleLink } from "../Header/SideMenu";
import { default as useBreakpoint } from "services/Breakpoint";

// const { Header, Content, Footer } = Layout;

const socialLinks = [
  {
    title: "FB",
    icon: "fa-facebook-f",
    link: FACEBOOK_LINK,
    category: "github", // fixed by css
  },
  {
    title: "TW",
    icon: "fa-twitter",
    link: TWITTER_LINK,
    category: "twitter", // fixed by css
  },
  {
    title: "IG",
    icon: "fa-instagram",
    link: INSTAGRAM_LINK,
    category: "linkedin", // fixed by css
  },
  {
    title: "YT",
    icon: "fa-youtube",
    link: YOUTUBE_LINK,
    category: "youtube", // fixed by css
  },
];

const listStyle = {
  listStyleType: "none",
};

const getStartedLink = [
  {
    title: "Be a Rider",
    link: routeURL.web.rider_request(),
  },
  {
    title: "Add your restaurant",
    link: routeURL.web.restaurant_request(),
  },
];

const legalLink = [
  {
    title: "Privacy Notice",
    link: routeURL.web.privacy_policy(),
  },
  {
    title: "Terms of Use",
    link: routeURL.web.terms_and_condition(),
  },
];

const pageLinks = [
  {
    title: "Home",
    link: routeURL.web.home(),
  },
  {
    title: "Terms and Condition",
    link: routeURL.web.terms_and_condition(),
  },
  {
    title: "Contact Us",
    link: routeURL.web.contactUs(),
  },
];

const links = [
  {
    title: "Quick Links",
    list: [
      {
        title: "Home",
        link: routeURL.web.home(),
      },
      {
        title: "Terms and Condition",
        link: routeURL.web.terms_and_condition(),
      },
      {
        title: "Contact Us",
        link: routeURL.web.contactUs(),
      },
      // {
      //   title: 'Blog',
      //   link: '',
      // },
    ],
  },
  {
    title: "COMPANY",
    list: [
      {
        title: "My Account",
        link: routeURL.web.my_account(),
      },
      {
        title: "Checkout",
        link: routeURL.web.checkout(),
      },
      {
        title: "Forget Password",
        link: routeURL.web.forget_password(),
      },
      // {
      //   title: 'Order Tracking',
      //   link: '',
      // },
    ],
  },
];

export default function Footer() {
  const point = useBreakpoint();
  const isMobileDevice = () => ["xs", "sm"].includes(point);
  return (
    <footer style={{ backgroundColor: "#000", margin: '0 !important',}}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          marginLeft: 40,
          marginRight: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobileDevice() ? "column" : "row",
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              marginBottom: isMobileDevice() ? "20px" : 0,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              felx: 1,
              flexDirection: "column",
            }}
          >
            {/* <div style={{ borderLeft: "2px solid #fff", marginBottom: 10 }}>
              <div style={{ marginLeft: 4, fontWeight: "bold" }}>
                Payment Methods
              </div>
            </div>
            <div> All Credit Cards</div> */}
            <div>
              <a
                href="https://play.google.com/store/apps/details?id=np.com.silicontechnepal.rara_foods"
                target="_blank"
              >
                <img src={google} alt={"logo google play store"} width={120} />
              </a>
            </div>
            <div>
              <img src={apple} alt={"logo google play store"} width={102} />
            </div>
          </div>
          <div style={{ marginBottom: isMobileDevice() ? "20px" : 0 }}>
            <div style={{ borderLeft: "2px solid #fff", marginBottom: 10 }}>
              <div style={{ marginLeft: 4, fontWeight: "bold" }}>
                Our Services
              </div>
            </div>
            <div>Food Delivery</div>
            <div>Service 2</div>
            <div>Service 3</div>
          </div>
          <div style={{ marginBottom: isMobileDevice() ? "20px" : 0 }}>
            <div style={{ borderLeft: "2px solid #fff", marginBottom: 10 }}>
              <div style={{ marginLeft: 4, fontWeight: "bold" }}>
                Quick Link
              </div>
            </div>
            {legalLink.map((link, index) => {
              return (
                <div key={index}>
                  <Link to={link.link}>{link.title}</Link>
                </div>
              );
            })}
          </div>
          <div style={{ marginBottom: isMobileDevice() ? "20px" : 0, justifyContent: 'center', alignItems: 'center' }}>
            <img src={logoImage} alt={"logo RaraFoods rara foods"} width={96} style = {{alignSelf: 'center'}} />
            {/* <div className="footer-call-to-action">
              <p className="footer-call-to-action-description">
                {" "}
                Have a support question?
              </p>
              <Link
                className="footer-call-to-action-button button"
                to={routeURL.web.contactUs()}
                target="_self"
              >
                {" "}
                Get in Touch{" "}
              </Link>
            </div> */}
            {/* <div className="footer-call-to-action">
              <h2 className="footer-call-to-action-title"> You Call Us</h2>
              <p className="footer-call-to-action-link-wrapper">
                <a
                  className="footer-call-to-action-link"
                  href={`tel:${CONTACT}`}
                  target="_self"
                >
                  {CONTACT}
                </a>
              </p>
            </div> */}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: isMobileDevice() ? "column" : "row",
            justifyContent: "space-between",
            marginTop: 30,
          }}
        >
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-around",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                flex: 1,
                gap: "10px",
              }}
            >
              {socialLinks.map((link, index) => {
                return (
                  <a
                    // className={`footer-social-link ${link.category}`}
                    href={link.link}
                    target="_blank"
                  >
                    <span className="hidden-link-text">{link.title}</span>
                    <i
                      style={{
                        marginLeft: 5,
                      }}
                      className={`fab ${link.icon} footer-social-icon-svg`}
                    />
                  </a>
                );
              })}
            </div>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                felx: 1,
                gap: "10px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>
                <a
                  href="https://play.google.com/store/apps/details?id=np.com.silicontechnepal.rara_foods"
                  target="_blank"
                >
                  <img
                    src={google}
                    alt={"logo google play store"}
                    width={120}
                  />
                </a>
              </div>
              <div>
                <img src={apple} alt={"logo google play store"} width={100} />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            felx: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          Copyright © {new Date().getFullYear()}. |&nbsp;
          <b>{process.env.REACT_APP_CMS_TITLE}</b>&nbsp;|&nbsp;All rights
          reserved.{" "}
        </div>
      </div>
    </footer>
  );
}
