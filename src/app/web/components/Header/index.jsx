import { Col, Drawer, Row, Button, Layout } from "antd";
import routeURL from "config/routeURL";
import { LOGOUT_USER_CLIENT, UserContext, UserLoginContext } from "context/";
import $ from "jquery";
import { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { default as useBreakpoint } from "services/Breakpoint";
import { JwtService } from "services/jwtServiceClient";
import Container from "../Container";
import "./index.css";
import api from "app/web/api";
import { handleError } from "services/util";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import logoImage from "image/logo.png";
import SideMenu, { AndroidLink, AppleLink } from "./SideMenu";
import { NOT_INSTALL_APP } from "config";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
const { Header } = Layout;

let navbarStyles = {
  position: "fixed",
  // height: '60px',
  width: "100%",
  backgroundColor: "white",
  zIndex: 3,
  // transition: 'top 0.3s linear',
  boxShadow: "none",
  top: 0,
};
let prevScrollPos = 0;

const HeaderHome = ({ isHomePage }) => {
  const history = useHistory();
  const location = useLocation();
  const point = useBreakpoint();
  const isMobileDevice = () => ["xs", "sm"].includes(point);

  const { clientStore, clientDispatch } = useContext(UserContext);
  const isAuth = clientStore.isAuthenticated;
  const [visible, setHeaderVisible] = useState(true);
  const [headerStyle, setHeaderStyle] = useState({});
  // const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [spinningProfile, setSpinningProfile] = useState(false);
  const [profile, setProfile] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [visibleSearch, setVisibleSearch] = useState(false);

  useEffect(() => {
    console.log("here before ");
    if (isAuth === undefined) return;
    if (isAuth) {
      setSpinningProfile(true);
      console.log("here after ");
      api.client
        .me()
        .then(({ data }) => {
          setProfile(data);
          // redirect to the profile
          console.log("profileee", profile.name);
          if (profile && !profile?.name) {
            if (location.pathname !== routeURL.web.my_account("accountDetail"))
              history.push(routeURL.web.my_account("accountDetail"));
          }
        })
        .catch(handleError)
        .finally(() => {
          setSpinningProfile(false);
        });
    } else {
      setProfile(null);
    }
  }, [isAuth]);

  const onLogout = () => {
    JwtService.logout();
    clientDispatch({ type: LOGOUT_USER_CLIENT });
  };
  const saveHeaderStyle = (shadow, bg) => {
    if (
      shadow !== headerStyle.boxShadow ||
      bg !== headerStyle.backgroundColor
    ) {
      const obj = {};
      if (shadow) {
        obj.boxShadow = shadow;
      }
      if (bg) {
        obj.backgroundColor = bg;
      }
      setHeaderStyle(obj);
    }
  };

  useEffect(() => {
    saveHeaderStyle(false, isHomePage ? "unset" : "#fff");

    const handleScroll = (_) => {
      const header = document.getElementById("navbar-header");
      const sticky = header && header.getBoundingClientRect();
      if (!sticky) return;
      const { height } = sticky;
      // find current scroll position
      // var currentScrollPos = event.srcElement.scrollTop;
      const currentScrollPos = document.body.scrollTop;

      if (currentScrollPos > 150) {
        setVisibleSearch(true);
      } else {
        setVisibleSearch(false);
      }

      // set state based on location info
      // let isVisible =
      //   prevScrollPos > currentScrollPos || currentScrollPos < height + 100;
      // setHeaderVisible(true);

      if (currentScrollPos < height + 100) {
        saveHeaderStyle("none", isHomePage ? "unset" : "#fff");
      } else {
        saveHeaderStyle("0 .5rem 1rem rgba(0,0,0,.15)", "#fff");
      }
      // set state to new scroll position
      prevScrollPos = currentScrollPos;
      // setPrevScrollPos(currentScrollPos);
    };

    if (window) window.addEventListener("scroll", handleScroll, true);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    if ($) {
      // search toggle open and close
      $(".search-toggle").on("click", function () {
        $(".search-wrapper").addClass("open");
      });

      $(".search-close").on("click", function () {
        $(".search-wrapper").removeClass("open");
      });
    }
  });
  const [appInstall, setAppInstall] = useState(false);
  useEffect(() => {
    const decision = window.localStorage.getItem(NOT_INSTALL_APP);
    if (!decision) setAppInstall(isMobileDevice());
  }, [isMobileDevice()]);

  return (
    <header
      id="navbar-header"
      className="side-header"
      style={{
        ...navbarStyles,
        ...headerStyle,
        top: visible ? 0 : -120,
      }}
    >
      <Drawer
        title={
          <Row style={{ width: "100%" }} justify="space-between" align="middle">
            <Col>Continue in app?</Col>
            <Col>
              <CloseOutlined
                onClick={() => {
                  window.localStorage.setItem(NOT_INSTALL_APP, "yes");
                  setAppInstall(false);
                }}
              />
            </Col>
          </Row>
        }
        placement="bottom"
        closable={false}
        onClose={() => setAppInstall(false)}
        visible={appInstall}
        key="bottom"
      >
        <Row
          style={
            {
              // position: 'absolute',
              // bottom: 32,
            }
          }
        >
          <Row align="middle">
            <Col xs={6}>
              <img
                style={{
                  marginRight: 8,
                  marginLeft: 8,
                  width: "100%",
                  maxWidth: 150,
                }}
                src={logoImage}
                alt={"logo RaraFoods rara foods"}
              />
            </Col>

            <Col offset={2} xs={24 - 8}>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                  paddingRight: 16,
                }}
              >
                There's more to love in the app.
              </span>
            </Col>
          </Row>
          <Row
            justify="center"
            gutter={8}
            style={{
              marginTop: 16,
              width: "100%",
            }}
          >
            <Col>
              <AppleLink />
            </Col>
            <Col>
              <AndroidLink />
            </Col>
          </Row>
        </Row>
      </Drawer>

      {/* Popup modal if region has not been selected */}
      <div style={{ marginLeft: 30, marginRight: 40 }}>
        <nav
          className="navbar navbar-light"
          style={{
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <Row className="navbar-left-area" align="left">
            <Col>
              <SideMenu isAuth={isAuth} onLogout={onLogout} profile={profile} />
            </Col>
            {!isMobileDevice() && (
              <Col>
                <Link to={routeURL.web.home()} className="navbar-brand">
                  <img
                    height={48}
                    style={{
                      marginRight: isMobileDevice() ? 8 : 16,
                      marginLeft: isMobileDevice() ? 8 : 24,
                    }}
                    src={logoImage}
                    alt={"logo RaraFoods rara foods"}
                  />
                  {process.env.REACT_APP_CMS_TITLE}
                </Link>
              </Col>
            )}

            {visibleSearch ? (
              <Col>
                <Button
                  shape="round"
                  icon={<SearchOutlined />}
                  size="large"
                  style={{
                    width: "100%",
                    marginRight: isMobileDevice() ? 8 : 0,
                    marginLeft: isMobileDevice() ? 12 : 0,
                    zIndex: 3
                  }}
                >
                  <input
                    style={{
                      borderWidth: 0,
                      marginLeft: 5,
                      marginRight: 10,
                      width: isMobileDevice() ? "80%" : "90%",
                    }}
                    value={searchText}
                    onKeyDown={({ key }) => {
                      if (searchText && key === "Enter") {
                        history.push(
                          routeURL.params(
                            routeURL.web.search(),
                            `q=${searchText}`
                          )
                        );
                        setSearchText("");
                      }
                    }}
                    type="text"
                    placeholder="Search foods/restaurants"
                    onChange={({ target: { value } }) => setSearchText(value)}
                  />
                </Button>
              </Col>
            ) : null}
          </Row>
          <Row className="navbar-right-area">
            {/* {isMobileDevice() ? (
              <MobileMenu
                isAuth={isAuth}
                onLogout={onLogout}
                profile={profile}
              />
            ) : ( */}
            <DesktopMenu
              isAuth={isAuth}
              onLogout={onLogout}
              profile={profile}
              visibleSearch={visibleSearch}
            />
            {/* // )} */}
          </Row>
        </nav>
      </div>
    </header>
  );
};

const isHomePage = (path) => {
  return path === routeURL.web.home();
};

export default function NavigationHeader(props) {
  const path = props.location.pathname; //pathname from the url

  return <HeaderHome isHomePage={isHomePage(path)} />;
  // return isHomePage() ? <HeaderHome /> : <DefaultHeader />;
}

export const HEADER_HEIGHT = 80;
