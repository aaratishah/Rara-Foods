import Icon, { HeartFilled, HeartOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  Divider,
  Menu,
  Modal,
  Row,
  Space,
  Tabs,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import api from "app/web/api";
import Container from "app/web/components/Container";
import Loader from "app/web/components/Loader";
import { notificationError } from "app/web/components/notification";
import config from "config";
import HeroImage from "image/demo/hero-002.jpg";
import { useContext, useEffect, useRef, useState } from "react";
import "./index.css";
import NoRestaurantFound from "./NoRestaurantFound";
import MapViewer from "app/dashboard/components/MapViewer";
import { MarkerAlt, EmailOpenIcon } from "image/icon-svg";
import moment from "moment";
import FoodDetailModal from "./FoodDetailModal";
import { UserContext, UserLoginContext } from "context";
import { handleError, isRestaurantOpenNow } from "services/util";
import { HEADER_HEIGHT } from "app/web/components/Header";
import DOMPurify from "dompurify";
import ReviewList from "./ReviewList";
import clsx from "clsx";
import RestaurantRating from "./RestaurantRating";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
var headerPosition = null;
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const getPrice = (food) => {
  let { price, discountType, discountAmount, discountPercent } = food;
  switch (discountType) {
    case "percent":
      if (discountPercent > 0 && discountPercent <= 100) {
        price = price - (price * discountPercent) / 100;
      }
      break;
    case "amount":
      if (discountAmount > 0 && discountAmount <= price) {
        price = price - discountAmount;
      }
      break;

    default:
      break;
  }
  return price;
};

const RestaurantDetailModal = ({ data, detailPreview, setDetailPreview }) => {
  const timeFormat = "hh:mm a";
  const getOpeningTimeUI = (openingTime) => {
    if (openingTime.isSameTimeEveryDay) {
      const opentimeDay = openingTime?.everyday;
      return (
        <Row
          style={{
            width: "100%",
            marginTop: 8,
          }}
          gutter={16}
        >
          <Col>EveryDay</Col>
          <Col>
            {`${moment(opentimeDay?.startTime).format(timeFormat)}-${moment(
              opentimeDay?.endTime
            ).format(timeFormat)}`}
          </Col>
        </Row>
      );
    } else
      return (
        <Row
          style={{
            paddingLeft: 8,
          }}
        >
          {days.map((day) => {
            const opentimeDay = openingTime[day];
            const isClosed = opentimeDay.isClosed;
            return (
              <Row
                style={{
                  width: "100%",
                  marginTop: 8,
                }}
                gutter={16}
              >
                <Col>{capitalizeFirstLetter(day)}</Col>
                <Col>
                  {isClosed
                    ? "Closed"
                    : `${moment(opentimeDay.startTime).format(
                        timeFormat
                      )}-${moment(opentimeDay.endTime).format(timeFormat)}`}
                </Col>
              </Row>
            );
          })}
        </Row>
      );
  };
  let restaurantGeo = null;
  if (
    Array.isArray(data?.geo?.coordinates) &&
    data?.geo?.coordinates[1] &&
    data?.geo?.coordinates[0]
  ) {
    restaurantGeo = {
      latitude: data?.geo?.coordinates[1],
      longitude: data?.geo?.coordinates[0],
    };
  }
  return (
    <Modal
      className="restaurant-detail-modal"
      title={data.name}
      style={{ top: 20 }}
      visible={detailPreview}
      cancelButtonProps={null}
      onCancel={() => setDetailPreview(false)}
      onOk={() => setDetailPreview(false)}
    >
      <div
        style={{
          height: 250,
          marginBottom: 10,
        }}
      >
        {restaurantGeo && (
          <MapViewer
            activeMarker={{
              ...restaurantGeo,
              name: data.name,
            }}
            height={400}
            options={{
              zoom: 12,
              disableDefaultUI: true,
            }}
          />
        )}
      </div>
      <div
        style={{
          padding: "5px 20px 10px",
        }}
      >
        <Typography.Text
          style={{
            fontSize: 22,
          }}
        >
          Location and Opening Time
        </Typography.Text>
        <Row
          align="middle"
          gutter={8}
          style={{
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          <Col>
            <Icon component={MarkerAlt} />{" "}
          </Col>
          <Col>
            <Typography.Text>
              {data.address && data.address.street}
            </Typography.Text>
          </Col>
        </Row>
        <Collapse
          defaultActiveKey={[data?.openTime?.isSameTimeEveryDay ? "1" : "0"]}
          // onChange={callback}
          expandIconPosition={"right"}
        >
          <Collapse.Panel
            key="1"
            header={
              <Row align="middle" gutter={8}>
                <Col>
                  <Icon component={EmailOpenIcon} />{" "}
                </Col>
                <Col>
                  <Typography.Text
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    Hours
                  </Typography.Text>
                </Col>
              </Row>
            }
          >
            {getOpeningTimeUI(data.openTime)}
          </Collapse.Panel>
        </Collapse>
      </div>
    </Modal>
  );
};

const HeroSection = ({
  data,
  wishlistStatus,
  addToWishlist,
  isOpen,
  reviewDetail,
  onReviewClick,
}) => {
  const [detailPreview, setDetailPreview] = useState(false);

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <div
      className="hero-section page-banner"
      style={{
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      <div className="hero-content-wrapper">
        <RestaurantDetailModal
          data={data}
          detailPreview={detailPreview}
          setDetailPreview={setDetailPreview}
        />
        <img
          src={
            data.image.length > 0
              ? config.getImageHost(data.image[0])
              : HeroImage
          }
          alt
        />
        <Container
          outerStyle={{
            position: "absolute",
            top: 40,
          }}
        >
          <div className="page-header">
            {isOpen || (
              <span
                style={{
                  marginBottom: 16,
                }}
              >
                <Tag
                  style={{
                    color: "#fff",
                    // transform: 'rotate(20deg)',
                  }}
                  color="#cd201f"
                >
                  Restaurant is Closed Now, Visit later.
                </Tag>
              </span>
            )}
            <h1>
              {data.name}® ({data.address && data.address.street}){" "}
              <Tooltip
                title={
                  wishlistStatus ? "Remove from Favorites" : "Make it Favorite"
                }
              >
                <span onClick={addToWishlist}>
                  {wishlistStatus ? (
                    <HeartFilled
                      style={{
                        fontSize: 18,
                        color: "#f50057",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <HeartOutlined
                      style={{
                        color: "#f50057",
                        fontSize: 18,
                        cursor: "pointer",
                      }}
                    />
                  )}
                </span>
              </Tooltip>
            </h1>
            <RestaurantRating
              onClick={onReviewClick}
              rating={reviewDetail && Math.ceil(reviewDetail.rating)}
              count={
                reviewDetail &&
                reviewDetail.reviews &&
                reviewDetail.reviews.length
              }
            />
            {data.famousFor && data.famousFor.length > 0 && (
              <p>
                <small>{data.famousFor.map((each) => `• ${each} `)}</small>
              </p>
            )}
            <p>4.5 (200+) • View delivery time and booking fee.</p>
            <p>
              {data.category}
              <Button type="link" onClick={() => setDetailPreview(true)}>
                More info
              </Button>
            </p>
            <p
              style = {{margin: 0}}
              dangerouslySetInnerHTML={createMarkup(
                data.description
              )}
            />
          </div>
          {/* <div className="button-group">
					<button className="button btn btn-light">
						<i className="fas fa-users" /> Start Group Order
					</button>
					<button className="love-button btn text-light">
						<i className="far fa-heart" />
					</button>
				</div> */}
        </Container>
      </div>
    </div>
  );
};

const Food = ({ data, restaurantDetail, isOpen }) => {
  const [foodDetail, setFoodDetail] = useState(false);
  return (
    <li className="col-md-4 col-sm-6">
      <FoodDetailModal
        restaurantDetail={restaurantDetail}
        data={data}
        preview={foodDetail}
        setPreview={setFoodDetail}
      />
      <div className="product">
        <img
          style={{
            width: 150,
            borderRadius: 10,
            cursor: isOpen && "pointer",
            // filter: isOpen || 'grayscale(50%)',
          }}
          onClick={() =>
            isOpen
              ? setFoodDetail(true)
              : notificationError(
                  "Restaurant is currently closed. Please visit later.",
                  "Closed",
                  "bottomRight"
                )
          }
          src={config.getImageHost(data.activeImage)}
          alt
        />
        <div className="product-container">
          <span
            style={{}}
            onClick={() =>
              isOpen
                ? setFoodDetail(true)
                : notificationError(
                    "Restaurant is currently closed. Please visit later.",
                    "Closed",
                    "bottomRight"
                  )
            }
            style={{
              cursor: isOpen && "pointer",
            }}
            className="product-title"
          >
            {data.name}
          </span>
          <div
            className="product-meta"
            style={{
              transform: "unset",
            }}
          >
            <span className="shipping">
              <span className="currency">$</span>
              {getPrice(data)}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};
const FoodGroup = ({ data, restaurantDetail, isOpen }) => {
  return (
    <div name={data._id} id={data._id}>
      <header
        className="section-header"
        style={{
          paddingTop: 32,
        }}
      >
        <h2 className="section-title">{data.name}</h2>
      </header>
      <Row
        className="product-list"
        style={{
          width: "100%",
        }}
      >
        {data.foods.length > 0 ? (
          data.foods.map((food) => (
            <Food
              isOpen={isOpen}
              restaurantDetail={restaurantDetail}
              data={food}
            />
          ))
        ) : (
          <div
            className="product product-container"
            style={{
              backgroundColor: "#e2e2e2",
            }}
          >
            <h3
              style={{
                cursor: isOpen && "pointer",
              }}
              className="product-title"
            >
              Coming soon..
            </h3>
          </div>
        )}
      </Row>
    </div>
  );
};

const FoodListing = ({ data, restaurantDetail, isOpen }) => {
  const [menuActive, setMenuActive] = useState(null);

  const getVisibleGroup = (height) => {
    data.forEach((each) => {
      const offsetY =
        document &&
        document.getElementById(each._id)?.getBoundingClientRect().top;
      if (offsetY > 0 && offsetY <= height) setMenuActive(each._id);
    });
  };

  let onScroll = (event) => {
    var header = document.getElementById("spy-nav");
    var sticky = header && header.getBoundingClientRect();
    if (!sticky) return;
    const { top, height } = sticky;
    if (!headerPosition) headerPosition = top;
    const pageYOffset = event.srcElement.scrollTop;
    getVisibleGroup(height);
    if (top <= 0 && pageYOffset > headerPosition) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  };
  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", onScroll, true);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [data]);

  return (
    <section className="product-list-section section">
      <Container>
        <div id="spy-nav" className="spy-bar">
          <Menu
            mode="horizontal"
            inlineCollapse={true}
            className="navbar-nav"
            selectedKeys={[menuActive]}
          >
            {data.map((foodGroup, idx) => (
              <Menu.Item className="nav-item" key={foodGroup._id}>
                <a
                  style={{
                    padding: "unset",
                  }}
                  href={`#${foodGroup._id}`}
                >
                  {foodGroup.name}
                </a>
              </Menu.Item>
            ))}
          </Menu>
        </div>

        <div className="product-sections" id="food-group-container">
          {data.map((foodGroup) => (
            <FoodGroup
              isOpen={isOpen}
              restaurantDetail={restaurantDetail}
              data={foodGroup}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default function RestaurantDetail(props) {
  const reviewRef = useRef(null);

  const [wishlistStatus, setWishlistStatus] = useState(null);
  const { clientStore } = useContext(UserContext);
  const [isVisible, setVisible, tab, setTab] = useContext(UserLoginContext);
  const isAuth = clientStore.isAuthenticated;
  const {
    match: {
      params: { itemId },
    },
  } = props;

  const [restaurantDetail, setRestaurantDetail] = useState(null);
  const [reviewDetail, setReviewDetail] = useState(null);
  const [reviewSpinning, setReviewSpinning] = useState(false);
  const [foodGroups, setFoodGroups] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [tabValue, setTabValue] = useState("description");

  useEffect(() => {
    if (isAuth) {
      api.config
        .wishlistStatus(itemId)
        .then(({ data }) => setWishlistStatus(data))
        .catch(handleError);
    } else {
      setWishlistStatus(false);
    }
  }, [itemId, isAuth]);

  const showLoginModal = () => {
    setTab("1");
    setVisible(true);
  };

  const addToWishlist = () => {
    if (!isAuth) {
      showLoginModal();
    } else {
      // add to wishlist
      if (itemId) {
        api.config
          .saveWishlist(itemId)
          .then(({ data }) => setWishlistStatus(data))
          .catch(handleError);
      } else {
        notificationError("Invalid Product");
      }
    }
  };

  useEffect(() => {
    if (itemId) {
      setSpinning(true);
      api.restaurant
        .read(itemId)
        .then(({ data }) => setRestaurantDetail(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
      api.restaurant
        .foodWithGroup(itemId)
        .then(({ data }) => setFoodGroups(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
      api.review
        .read(itemId)
        .then(({ data }) => {
          setReviewDetail(data);
        })
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  }, [itemId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const refreshReviews = () => {
    setReviewSpinning(true);
    api.review
      .read(itemId)
      .then(({ data }) => {
        setReviewDetail(data);
      })
      .catch(handleError)
      .finally(() => setReviewSpinning(false));
  };
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  const isOpen = isRestaurantOpenNow(restaurantDetail?.openTime);
  const scrollToBottom = () => {
    reviewRef.current.scrollIntoView({ behavior: "smooth" });
    setTabValue("review");
  };

  return spinning ? (
    <Loader />
  ) : !restaurantDetail ? (
    <NoRestaurantFound />
  ) : (
    <div
      // style={{
      //   paddingTop: HEADER_HEIGHT,
      // }}
      data-offset={100}
    >
      <HeroSection
        onReviewClick={scrollToBottom}
        reviewDetail={reviewDetail}
        isOpen={isOpen}
        data={restaurantDetail || {}}
        wishlistStatus={wishlistStatus}
        addToWishlist={addToWishlist}
      />
      <FoodListing
        restaurantDetail={restaurantDetail}
        data={foodGroups}
        isOpen={isOpen}
      />
      <section className="product-description-review pt-150">
        <div className="container">
          <div className="product-simple-tab-menu">
            <ul className="nav" ref={reviewRef}>
              <Tabs
                centered
                style={{
                  width: "100%",
                }}
                activeKey={tabValue}
                onChange={(activeKey) => setTabValue(activeKey)}
                defaultActiveKey="description"
              >
                <Tabs.TabPane
                  tab={
                    <span
                      className={clsx(
                        "nav-item nav-link pr-4 pl-4"
                        // active === tab.title && 'active'
                      )}
                      role="tab"
                    >
                      <i className={clsx("pr-2")} />
                      Description
                    </span>
                  }
                  key="description"
                >
                  <div className="">
                    <div
                      className="preview"
                      dangerouslySetInnerHTML={createMarkup(
                        restaurantDetail.description
                      )}
                    />
                  </div>
                </Tabs.TabPane>
                <Tabs.TabPane
                  key="review"
                  tab={
                    <span
                      className={clsx(
                        "nav-item nav-link pr-4 pl-4"
                        // active === tab.title && 'active'
                      )}
                      role="tab"
                    >
                      Reviews (
                      {reviewDetail && reviewDetail.reviews
                        ? reviewDetail.reviews.filter((each) => !!each.review)
                            .length
                        : 0}
                      )
                    </span>
                  }
                >
                  <ReviewList
                    setReviewSpinning={setReviewSpinning}
                    reviewSpinning={reviewSpinning}
                    refreshReview={refreshReviews}
                    reviewDetail={reviewDetail}
                    restaurantId={restaurantDetail && restaurantDetail._id}
                  />
                </Tabs.TabPane>
              </Tabs>
            </ul>
          </div>
          {/* <div className="tab-content pt-30">
            <div className="tab-pane fade show active" id="description">
              <div
                className="preview"
                dangerouslySetInnerHTML={createMarkup(
                  productDetail.description
                )}
              ></div>
            </div>
            <div className="tab-pane fade" id="review">
              <ReviewList reviews={reviewDetail} />
            </div>
          </div> */}
        </div>
      </section>
      {/* <Container>
        <Divider orientation="left">Description</Divider>
        <Typography.Paragraph>
          {restaurantDetail.description}
        </Typography.Paragraph>
      </Container> */}
    </div>
  );
}
