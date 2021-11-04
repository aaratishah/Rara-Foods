import {
  Select,
  Row,
  Col,
  Typography,
  Spin,
  message,
  Button,
  Carousel,
  Divider,
  Card,
} from "antd";
import api from "app/web/api";
import { Link, useHistory, useLocation } from "react-router-dom";
import routeURL from "config/routeURL";
import Container from "app/web/components/Container";
import { notificationError } from "app/web/components/notification";
import HeroImg from "image/banner/home_bg.png";
import { useEffect, useState } from "react";
import { geolocated } from "react-geolocated";
import { JwtService } from "services/jwtServiceClient";
import { handleError } from "services/util";
import "../../layout/style.css";
import Category from "./Category";
import FoodCategoryCarousel from "./FoodCategoryCarousel";
import FoodCategoryItem from "./FoodCategoryItem";
import FoodProduct from "./FoodProduct";
import { getSVGImage, svgImage } from "./hero_image";
import "./index.css";
import "./dummy.css";
import AllRestaurant from "./AllRestaurant";
import RestaurantByLocation from "./RestaurantByLocation";
import SelectRegion from "app/web/pages/home/SelectRegion";
import HeroImage from "image/demo/hero-002.jpg";
import PromoteBusiness from "app/web/pages/home/PromoteBusiness";
import HomeImg from "image/banner/food_bg.jpg";
import HomeImg2 from "image/banner/hotels_banner.jpg";
import { Content } from "antd/lib/layout/layout";
import { default as useBreakpoint } from "services/Breakpoint";
import logoImage from "image/logo.png";
import { AndroidLink, AppleLink } from "app/web/components/Header/SideMenu";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

function randomRange(myMin, myMax) {
  return Math.floor(
    Math.random() * (Math.ceil(myMax) - Math.floor(myMin) + 1) + myMin
  );
}
const heroImageIndex = randomRange(0, svgImage.length - 1);

const HeroSection = ({ fetchPackage }) => {
  const history = useHistory();
  const point = useBreakpoint();
  const isMobileDevice = () => ["xs", "sm"].includes(point);
  // const isCustomDevice = () => ["sm".includes(point)]
  const isTabletDevice = () => ["md"].includes(point);
  const [regions, setRegions] = useState([]);
  const [regionSpinning, setRegionSpinning] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setRegionSpinning(true);
    api.region
      .readAll()
      .then(({ data }) => {
        if (Array.isArray(data) && data.length > 0) {
          const selected = JwtService.getRegion();
          const isSelectedExist = data?.find(
            (each) => each._id?.toString() === selected?.toString()
          );
          if (!isSelectedExist) {
            const rndInt = Math.floor(Math.random() * data.length);
            JwtService.assignRegion(data[rndInt]?._id);
          }
        }
        setRegions(data);
      })
      .catch(handleError)
      .finally(() => setRegionSpinning(false));
  }, []);

  return (
    <Content style={{ position: "relative" }}>
      <div>
        <Carousel autoplay dotPosition="bottom">
          <div>
            <div
              style={{
                height: "90vh",
                backgroundImage: `url(${HomeImg})`,
                backgroundSize: "cover",
                marginTop: 80,
                opacity: 0.5,
              }}
            ></div>
          </div>
          <div>
            <div
              style={{
                height: "90vh",
                backgroundImage: `url(${HomeImg2})`,
                backgroundSize: "cover",
                marginTop: 80,
                opacity: 0.5,
              }}
            ></div>
          </div>
          <div>
            <div
              style={{
                height: "90vh",
                backgroundImage: `url(${HeroImg})`,
                backgroundSize: "cover",
                marginTop: 80,
                opacity: 0.7,
                backgroundColor: "#000",
              }}
            ></div>
          </div>
        </Carousel>
      </div>
      {!!JwtService.getRegion() || <SelectRegion fetchPackage={fetchPackage} />}
      <h1
        style={{
          color: "#424242",
          fontSize: isMobileDevice() ? "25px" : "min(6vw, 48px)",
          margin: 0,
          position: "absolute",
          bottom: isMobileDevice() ? "315px" : "350px",
          marginLeft: isMobileDevice() ? "100px" : "280px",
          marginRight: isMobileDevice() ? "100px" : "280px",
        }}
      >
        Your favorite food, delivered with RARA
      </h1>
      {/* {isMobileDevice() ? (
        <Col
          style={{
            position: "absolute",
            bottom: isMobileDevice() ? "120px" : "250px",
            marginLeft: isMobileDevice() ? "100px" : "280px",
            marginRight: isMobileDevice() ? "100px" : "280px",
          }}
        >
          <Row>
            <input
              style={{
                borderWidth: 0,
                // marginLeft: 5,
                // marginRight: 10,
                width: isMobileDevice() ? "100%" : "100%",
                backgroundColor: "#eeeeee",
                height: "55px",
                padding: "10px",
              }}
              value={searchText}
              onKeyDown={({ key }) => {
                if (searchText && key === "Enter") {
                  history.push(
                    routeURL.params(routeURL.web.search(), `q=${searchText}`)
                  );
                  setSearchText("");
                }
              }}
              type="text"
              placeholder="Search foods/restaurants"
              onChange={({ target: { value } }) => setSearchText(value)}
            ></input>
          </Row>
          <Row>
            <Select
              style={{
                backgroundColor: "#000",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                color: "#fff",
                border: "#000",
                height: "55px",
                // marginRight: "3px",
                // marginLeft: "10px",
                width: "100%",
                marginTop: "10px",
              }}
              // size="large"
              // onClick={() => {
              //   history.push(
              //     routeURL.params(routeURL.web.search(), `q=${searchText}`)
              //   );
              //   setSearchText("");
              // }}
            >
              <Option value="lucy">Lucy</Option>
              <Option value="lucy">Lucy</Option>
            </Select>
          </Row>
          <Row>
            <Button
              style={{
                backgroundColor: "#000",
                // borderRadius: "5px",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                color: "#fff",
                border: "#000",
                height: "55px",
                width: "100%",
                marginTop: "10px",
              }}
              size="large"
              onClick={() => {
                history.push(
                  routeURL.params(routeURL.web.search(), `q=${searchText}`)
                );
                setSearchText("");
              }}
            >
              Find Food
            </Button>
          </Row>
        </Col>
      ) : ( */}
        <Row
          style={{
            position: "absolute",
            bottom: isMobileDevice() ? "240px" : "250px",
            width: isMobileDevice() ? "55%" : "55%",
            marginLeft: isMobileDevice() ? "100px" : "280px",
            marginRight: isMobileDevice() ? "100px" : "280px",
          }}
        >
          <Col flex="1 1 100px">
            <input
              style={{
                borderWidth: 0,
                marginLeft: 5,
                // marginRight: 10,
                width: isMobileDevice() ? "100%" : "100%",
                backgroundColor: "#eeeeee",
                height: "55px",
                padding: "10px",
              }}
              value={searchText}
              onKeyDown={({ key }) => {
                if (searchText && key === "Enter") {
                  history.push(
                    routeURL.params(routeURL.web.search(), `q=${searchText}`)
                  );
                  setSearchText("");
                }
              }}
              type="text"
              placeholder="Search foods/restaurants"
              onChange={({ target: { value } }) => setSearchText(value)}
            ></input>
          </Col>
          <Col flex="0 1 75px">
            <Button
              style={{
                backgroundColor: "#000",
                // borderRadius: "5px",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                color: "#fff",
                border: "#000",
                height: "55px",
              }}
              size="large"
              onClick={() => {
                history.push(
                  routeURL.params(routeURL.web.search(), `q=${searchText}`)
                );
                setSearchText("");
              }}
            >
              Find Food
            </Button>
          </Col>
        </Row>
      {/* )} */}
    </Content>
  );
};
let promoIndex = 0;

function HomePage({ isGeolocationAvailable, coords, location }) {
  const [packages, setPackages] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [foodCategory, setFoodCategory] = useState([]);

  const point = useBreakpoint();
  const isMobileDevice = () => ["xs", "sm"].includes(point);
  const isTabletDevice = () => ["md"].includes(point);

  useEffect(() => {
    setSpinning(true);
    api.restaurant_package
      .readAll()
      .then(({ data }) => {
        console.log("restaurant data", data);
        // promoIndex = data?.length >= 2 ? Math.floor(data?.length/2) :
        if (data.length > 1) {
          const tempData = [...data];
          tempData.splice(1, 0, 1);
          setPackages(tempData);
        } else {
          setPackages([0]);
        }
      })
      .catch(handleError);
    api.food_category
      .readAll()
      .then(({ data }) => setFoodCategory(data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, []);

  const fetchPackage = () => {
    setSpinning(true);
    api.restaurant_package
      .readAll()
      .then(({ data }) => setPackages(data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  };
  console.log("promoo ", packages);
  return (
    <>
      <HeroSection fetchPackage={fetchPackage} />
      <Row
        align="middle"
        style={{
          marginTop: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card style={{ borderRadius: "10px", border: "none", width: "500px" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <img
                style={{
                  marginRight: 8,
                  marginLeft: 8,
                  width: "80px",
                }}
                src={logoImage}
                alt={"logo RaraFoods rara foods"}
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    paddingRight: 8,
                  }}
                >
                  There's more to love in the app.
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AppleLink />
                <AndroidLink />
              </div>
            </div>
          </div>
        </Card>
      </Row>
      {/* <Divider /> */}
      {spinning ? (
        <Row
          style={{
            height: 300,
          }}
          justify="center"
          align="middle"
        >
          <Col>
            <Spin />
          </Col>
        </Row>
      ) : (
        packages?.map((each, index) => {
          console.log("packagessss ", each, index, promoIndex);
          //
          if (!each?.restaurants) return <PromoteBusiness />;
          return (
            <>
              <Category items={each.restaurants} title={each.name}>
                {(item, key) => (
                  <FoodProduct
                    location={isGeolocationAvailable && coords}
                    item={item}
                    itemKey={key}
                  />
                )}
              </Category>
              {/*<hr />*/}
            </>
          );
        })
      )}
      <AllRestaurant location={location} />
      <RestaurantByLocation />
      <hr />
    </>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 10000,
})(HomePage);
