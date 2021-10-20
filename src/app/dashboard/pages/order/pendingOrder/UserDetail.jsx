import { Card, Col, Row, Typography } from 'antd';
import defaultProfile from 'image/user.png';
import config from 'config';

export default function UserDetail({ user }) {
  return (
    <Row style={{ width: '100%' }} gutter={[16, 16]}>
      <Row style={{ width: '100%' }}>
        <Typography.Title level={5}>User's Detail</Typography.Title>
      </Row>
      <Card bordered={false} hoverable={false} style={{ width: '100%' }}>
        <Row
          style={{
            width: '100%',
          }}
          align="middle"
        >
          <Col xs={24} md={5}>
            <img
              style={{
                width: 100,
                height: 100,
              }}
              alt="user"
              src={
                user?.photo ? config.getImageHost(user?.photo) : defaultProfile
              }
            />
          </Col>
          <Col xs={24} md={16}>
            <span
              style={{
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Name: {user.name}
            </span>
            {user.phone && (
              <span
                style={{
                  width: '100%',
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                Phone: {user.phone}
              </span>
            )}
            {user.username && (
              <span
                style={{
                  display: 'block',
                  fontWeight: 400,
                  color: '#aaa',
                  fontSize: 16,
                }}
              >
                Username: {user.username}
              </span>
            )}
            {user.email && (
              <span
                style={{
                  display: 'block',
                  fontWeight: 400,
                  color: '#aaa',
                  fontSize: 16,
                }}
              >
                Email: {user.email}
              </span>
            )}
          </Col>
        </Row>
      </Card>
    </Row>
  );
}
