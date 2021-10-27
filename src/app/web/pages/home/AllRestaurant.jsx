import { useEffect, useState } from "react";
import * as QueryString from "query-string";
import { Link } from "react-router-dom";
import routeURL from "config/routeURL";
import bannerImage from "image/background.png";
import { Col, Layout, Row, Spin, Typography } from "antd";
import { default as useBreakpoint } from "services/Breakpoint";
import Container from "app/web/components/Container";
import { handleError } from "services/util";
import api from "app/web/api";
import { useHistory } from "react-router-dom";
import SearchOption from "../search/SearchOption";
import EmptyResult from "../search/EmptyResult";
import SearchResult from "../search/SearchResult";
import { JwtService } from "services/jwtServiceClient";

const perPageLimit = 15;
const { Content, Sider } = Layout;
export default function AllRestaurant(props) {
  let history = useHistory();

  const point = useBreakpoint();

  const params = QueryString.parse(props.location.search);

  const [searchResult, setSearchResult] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [pagination, setPagination] = useState({
    hasMore: true,
    page: 1,
  });
  useEffect(() => {
    setSpinning(true);
    setSearchResult([]);
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
      })
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, [
    params.q,
    params.popularity,
    params.dietary,
    params.price,
    JwtService.getRegion(),
  ]);

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
    <Container>
      <Layout style={{ backgroundColor: "#fff", padding: "20px" }}>
        <Sider
          style={{ backgroundColor: "#fff", borderRight: "2px solid #f5f5f5" }}
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
  );
}
