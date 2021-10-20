import { useEffect, useState } from 'react';
import * as QueryString from 'query-string';
import NoSearchQuery from './NoSearchQuery';
import { Link } from 'react-router-dom';
import routeURL from 'config/routeURL';
import bannerImage from 'image/background.png';
import { Col, Layout, Row, Spin, Typography } from 'antd';
import SearchResult from './SearchResult';
import SearchOption from './SearchOption';
import { default as useBreakpoint } from 'services/Breakpoint';
import Container from 'app/web/components/Container';
import { handleError } from 'services/util';
import EmptyResult from './EmptyResult';
import api from 'app/web/api';
import { useHistory } from 'react-router-dom';

const { Header, Footer, Sider, Content } = Layout;

const BannerSection = () => {
  return (
    <section
      className="page-banner bg_cover"
      style={{
        backgroundImage: `url(${bannerImage})`,
      }}
    >
      <div className="container">
        <div className="page-banner-content text-center">
          <h2 className="title">Search</h2>
          <ol className="breadcrumb justify-content-center">
            <li className="breadcrumb-item">
              <Link to={routeURL.web.home()}>Home</Link>
            </li>
            <li className="breadcrumb-item active">Search</li>
          </ol>
        </div>
      </div>
    </section>
  );
};
const perPageLimit = 15;
export default function Search(props) {
  let history = useHistory();

  const point = useBreakpoint();
  const isMobile = ['xs', 'sm'].includes(point);

  const params = QueryString.parse(props.location.search);

  const [searchResult, setSearchResult] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [pagination, setPagination] = useState({
    hasMore: true,
    page: 1,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    setSpinning(true);
    setSearchResult([]);
    const paramQuery = {};
    if (params.q) paramQuery.keyword = params.q;
    if (params.popularity) paramQuery.popularity = params.popularity;
    if (params.price) paramQuery.price = params.price;
    if (params.dietary) paramQuery.dietary = params.dietary;
    paramQuery.page = 1;
    paramQuery.size = perPageLimit;
    paramQuery.result_type = 'restaurant';
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
  }, [params.q, params.popularity, params.dietary, params.price]);

  const fetchMoreData = () => {
    const params = {};
    if (params.keyword) params.keyword = params.keyword;
    params.page = pagination.page;
    params.size = perPageLimit;
    params.result_type = 'restaurant';
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
    if (allkeys.length === 0) return '';
    const qString = allkeys
      .map((each) => each !== 'none' && `${each}=${paramsQuery[each]}`)
      .filter((each) => !!each)
      .join('&');
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
      {true ? (
        <Container>
          <section className="cart-page">
            <Row
              style={{
                width: '100%',
              }}
            >
              <Col
                xs={24}
                style={{
                  paddingTop: 90,
                }}
              >
                <SearchOption onSearch={onSearch} query={params} />
              </Col>
              <Col xs={24}>
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
            </Row>
          </section>
        </Container>
      ) : (
        <NoSearchQuery />
      )}
    </>
  );
}
