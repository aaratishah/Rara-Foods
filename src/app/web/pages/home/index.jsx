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

function randomRange(myMin, myMax) {
  return Math.floor(
    Math.random() * (Math.ceil(myMax) - Math.floor(myMin) + 1) + myMin
  );
}
const heroImageIndex = randomRange(0, svgImage.length - 1);

const HeroSection = ({ fetchPackage }) => {
  const point = useBreakpoint();
  const isMobileDevice = () => ["xs", "sm"].includes(point);
  const [regions, setRegions] = useState([]);
  const [regionSpinning, setRegionSpinning] = useState(false);

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
      <Carousel autoplay dotPosition="bottom">
        <div>
          <div
            style={{
              height: "90vh",
              backgroundImage: `url(${HomeImg})`,
              backgroundSize: "cover",
              marginTop: 80,
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
            }}
          ></div>
        </div>
      </Carousel>
      {!!JwtService.getRegion() || <SelectRegion fetchPackage={fetchPackage} />}
      <h1
        style={{
          color: "#424242",
          fontSize: "min(6vw, 48px)",
          margin: 0,
          position: "absolute",
          bottom: "350px",
          marginLeft: isMobileDevice() ? "100px" : "280px",
          marginRight: isMobileDevice() ? "100px" : "280px",
        }}
      >
        Your favorite food, delivered with RARA
      </h1>
      <Typography
        style={{
          marginTop: 16,
          marginBottom: 8,
          color: "#272C34",
          position: "absolute",
          bottom: "300px",
          marginLeft: isMobileDevice() ? "100px" : "280px",
          marginRight: isMobileDevice() ? "100px" : "280px",
        }}
      >
        Select your nearest region
      </Typography>

      <Row
        style={{
          position: "absolute",
          bottom: "250px",
          width: "55%",
          marginLeft: isMobileDevice() ? "100px" : "280px",
          marginRight: isMobileDevice() ? "100px" : "280px",
        }}
      >
        <Col flex="1 1 100px">
          <Select
            style={{
              width: "100%",
            }}
            size="large"
            value={
              regions && regions.length > 0 ? JwtService.getRegion() : undefined
            }
            onChange={(value) => {
              JwtService.assignRegion(value);
              fetchPackage();
            }}
            showSearch
            placeholder="Select region"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {regions &&
              regions.length > 0 &&
              regions.map((each) => (
                <Select.Option value={each._id}>{each.name}</Select.Option>
              ))}
          </Select>
        </Col>
        <Col flex="0 1 75px">
          <Button size="large">Find Food</Button>
        </Col>
      </Row>
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

  useEffect(() => {
    setSpinning(true);
    api.restaurant_package
      .readAll()
      .then(({ data }) => {
        console.log("data", data);
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
        <Card style = {{borderRadius: '10px'}}>
          <Row align="middle">
            <Col xs={6}>
              <img
                style={{
                  marginRight: 8,
                  marginLeft: 8,
                  width: "50px",
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
                  paddingRight: 8,
                }}
              >
                There's more to love in the app.
              </span>
            </Col>
          </Row>
          <Row align = 'middle'
            gutter={8}
            style={{
              marginTop: 16,
            }}
          >
            <Col>
              <AppleLink />
            </Col>
            <Col>
              <AndroidLink />
            </Col>
          </Row>
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

      <FoodCategoryCarousel items={foodCategory} title="Popular on Rara">
        {(item, key) => <FoodCategoryItem item={item} key={key} />}
      </FoodCategoryCarousel>
    </>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 10000,
})(HomePage);
