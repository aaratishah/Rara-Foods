import { useEffect, useState } from "react";
import * as QueryString from "query-string";
import NoSearchQuery from "./NoSearchQuery";
import { Link } from "react-router-dom";
import routeURL from "config/routeURL";
import bannerImage from "image/background.png";
import { Col, Layout, Row, Spin, Typography, Card, Button } from "antd";
import SearchResult from "./SearchResult";
import SearchOption from "./SearchOption";
import { default as useBreakpoint } from "services/Breakpoint";
import Container from "app/web/components/Container";
import { handleError } from "services/util";
import EmptyResult from "./EmptyResult";
import BannerContainer from "app/web/components/Banner/Banner.jsx";
import api from "app/web/api";
import config from "config";
import { useHistory } from "react-router-dom";
import { CaretLeftFilled } from "@ant-design/icons";
import FoodCategoryCarousel from "../home/FoodCategoryCarousel";
import FoodCategoryItem from "../home/FoodCategoryItem";
import Carousel from "react-elastic-carousel";

const { Sider, Content } = Layout;
const { Title, Paragraph } = Typography;

const BannerSection = () => {
  return (
    <BannerContainer>
      <ol
        className="breadcrumb justify-content-center"
        style={{ marginTop: "150px" }}
      >
        <li className="breadcrumb-item">
          <Link to={routeURL.web.home()}>Home</Link>
        </li>
        <li className="breadcrumb-item active">Search</li>
      </ol>
    </BannerContainer>
  );
};
const perPageLimit = 15;
export default function Search(props) {
  let history = useHistory();

  const point = useBreakpoint();
  const isMobile = ["xs", "sm"].includes(point);

  const params = QueryString.parse(props.location.search);

  const [searchResult, setSearchResult] = useState([]);
  const [featuredRestaurant, setFeaturedRestaurant] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [restaurantPackage, setRestaurantPackage] = useState([]);
  const [pagination, setPagination] = useState({
    hasMore: true,
    page: 1,
  });
  const [allpackage, setAllPackage] = useState([]);
  const [allPackagePAgination, setAllPackagePagination] = useState({
    hasMore: true,
    page: 1,
  });
  useEffect(() => {
    api.restaurant.featured_restaurant().then(({ data }) => {
      setFeaturedRestaurant([...data]);
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSpinning(true);
    setSearchResult([]);
    console.log("params", params);
    const paramQuery = {};
    if (params.q) paramQuery.keyword = params.q;
    if (params.popularity) paramQuery.popularity = params.popularity;
    if (params.price) paramQuery.price = params.price;
    if (params.dietary) paramQuery.dietary = params.dietary;
    paramQuery.page = 1;
    paramQuery.size = perPageLimit;
    paramQuery.result_type = "restaurant";
    api.restaurant_package
      .readAll(paramQuery)
      .then(({ data, hasMore }) => {
        setSearchResult(data);
        setPagination({
          hasMore,
          page: 2,
        });
        // console.log("restaurant By region", data);
      })
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, [params.q, params.popularity, params.dietary, params.price]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSpinning(true);
    setSearchResult([]);
    console.log("params", params);
    const paramQuery = {};
    // if (params.q) paramQuery.keyword = params.q;
    // if (params.popularity) paramQuery.popularity = params.popularity;
    // if (params.price) paramQuery.price = params.price;
    // if (params.dietary) paramQuery.dietary = params.dietary;
    paramQuery.page = 1;
    paramQuery.size = perPageLimit;
    paramQuery.result_type = "restaurant";
    api.restaurant_package
      .readAll(paramQuery)
      .then(({ data, hasMore }) => {
        setAllPackage(data);
        setAllPackagePagination({
          hasMore,
          page: 2,
        });
        console.log("All package", data);
      })
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, [params.q, params.popularity, params.dietary, params.price]);

  const fetchMoreData = () => {
    const params = {};
    if (params.keyword) params.keyword = params.keyword;
    params.page = pagination.page;
    params.size = perPageLimit;
    params.result_type = "restaurant";
    api.restaurant_package
      .readAll(params)
      .then(({ data, hasMore }) => {
        setSearchResult((result) => [...result, ...data]);
        setPagination({
          hasMore,
          page: pagination.page + 1,
        });
        // console.log("restaurant By region", data);
      })
      .catch(handleError)
      .finally(() => setSpinning(false));
  };

  const mergeQuery = (query, extra) => {
    const paramsQuery = {
      ...query,
      ...extra,
    };
    const allkeys = Object.keys(paramsQuery);
    if (allkeys.length === 0) return "";
    const qString = allkeys
      .map((each) => each !== "none" && `${each}=${paramsQuery[each]}`)
      .filter((each) => !!each)
      .join("&");
    return qString;
  };
  const onSearch = (key, value) => {
    history.push(
      routeURL.params(
        routeURL.web.search(),
        mergeQuery(params, { [key]: value })
      )
    );
  };

  return (
    <>
      <BannerSection />
      <Container>
        <FoodCategoryCarousel items={allpackage}>
          {(item, key) => <FoodCategoryItem item={item} key={key} />}
        </FoodCategoryCarousel>
        <Row style={{ marginTop: "4rem" }}>
          <Col xs={12}>
            <Title>Get your Deal?</Title>
            <Paragraph>Search for your cuisine or dishes!</Paragraph>
          </Col>
          <Col xs={12}>
            <Card
              style={{ width: "100%" }}
              cover={
                <img
                  alt="Featured Restaurant"
                  src={
                    featuredRestaurant.length !== 0
                      ? `${config.API_HOST}/api/imageUpload/image/${featuredRestaurant[0].restaurant.image[0]}`
                      : `https://api.rarafoods.com.au/api/imageUpload/image/restaurant_1635277493.jpg`
                  }
                  height="200px"
                  style={{ objectFit: "cover" }}
                />
              }
            >
              <Button
                type="primary"
                size="middle"
                shape="round"
                icon={<CaretLeftFilled />}
                href={`${routeURL.web.home()}`}
              >
                Get this Deal
              </Button>
            </Card>
          </Col>
        </Row>
        <Layout style={{ backgroundColor: "#fff", padding: "50px 0" }}>
          <Sider
            style={{
              backgroundColor: "#fff",
              borderRight: "2px solid #f5f5f5",
            }}
          >
            <Col xs={24} style={{ padding: "20px" }}>
              <SearchOption onSearch={onSearch} query={params} />
            </Col>
          </Sider>
          <Content>
            <Col xs={24} style={{ padding: "20px" }}>
              {spinning ? (
                <Row
                  align="middle"
                  justify="center"
                  style={{
                    minHeight: 300,
                  }}
                >
                  <Spin />
                </Row>
              ) : searchResult.length === 0 ? (
                <EmptyResult />
              ) : (
                <SearchResult
                  spinning={spinning}
                  query={params.q}
                  fetchData={fetchMoreData}
                  pagination={pagination}
                  result={searchResult}
                />
              )}
            </Col>
          </Content>
        </Layout>
      </Container>
    </>
  );
}
