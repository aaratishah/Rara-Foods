import { Card, Col, Row, Tag, Typography } from 'antd';
import config from 'config';

export default function RestaurantDetail({ detail: { image, name, famousFor, region } }) {
  return (
    <Row style={{ width: '100%' }} gutter={[16, 16]}>
      <Row style={{ width: '100%' }}>
        <Typography.Title level={5}>Restaurant's Detail</Typography.Title>
      </Row>
      <Card bordered={false} hoverable={false} style={{ width: '100%' }}>
        <Row
          style={{
            width: '100%',
          }}
          align="middle"
          gutter={[16,16]}
        >
          {image?.length > 0 && (
            <Col>
              <img
                className="model-image-card"
                style={{
                  width: 100,
                }}
                alt={name}
                src={config.getImageHost(image[0])}
              />
            </Col>
          )}
          <Col>
            <span
              style={{
                fontWeight: 600,
                fontSize: 16,
                marginBottom: 8,
              }}
            >
              Name: {name}
            </span>
            <br/>
            {famousFor && (
              famousFor.map(each=> <Tag>{each}</Tag>)
            )}
            {region && (
              <span
                style={{
                  display: 'block',
                  fontWeight: 400,
                  color: '#aaa',
                  fontSize: 16,
                  marginTop: 8
                }}
              >
                Located: {region}
              </span>
            )}
          </Col>
        </Row>
      </Card>
    </Row>
  );
}
