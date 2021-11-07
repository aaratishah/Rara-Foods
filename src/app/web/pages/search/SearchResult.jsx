import { Button, Col, Row, Tooltip, Typography } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import Restaurant from "../home/FoodProduct";
import "./index.css";

export default function SearchResult({
  spinning,
  fetchData,
  result,
  pagination,
}) {
  return (
    <Row>
      <InfiniteScroll
        style={{ paddingTop: 0 }}
        className="ant-row "
        dataLength={result.length}
        next={fetchData}
        endMessage={
          <Row
            justify="center"
            style={{
              margin: "20px 0px",
              width: "100%",
            }}
          >
            <Col>
              <Tooltip title="You've reached the end of the result">
                <Typography.Title level={5}>⚫⚫⚫</Typography.Title>
              </Tooltip>
            </Col>
          </Row>
        }
        hasMore={pagination.hasMore}
      >
        {result.map((item, key) => (
          <Col
            key={`restaurant-${key}`}
            style={{
              padding: 4,
            }}
            xs={24}
            sm={12}
            md={9}
            lg={6}
          >
            <Restaurant item={item} style = {{marginTop: 10}} />
          </Col>
        ))}
      </InfiniteScroll>
      <Row
        justify="center"
        style={{
          width: "100%",
          paddingTop: 32,
        }}
      >
        <Col>
          {" "}
          <Button
            type="primary"
            onClick={fetchData}
            loading={spinning}
            disabled={!pagination.hasMore}
          >
            Load More
          </Button>
        </Col>
      </Row>
    </Row>
  );
}
