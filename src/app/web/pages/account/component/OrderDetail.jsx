import { Card, Col, Row, Typography } from 'antd';

export default function OrderDetail({ detail }) {
  return (
    <Row style={{ width: '100%' }} gutter={[16, 16]}>
      <Row style={{ width: '100%' }}>
        <Typography.Title level={5}>Order Detail</Typography.Title>
      </Row>
      {[
        {
          title: 'Order ID',
          value: detail.orderId,
        },
        {
          title: 'Total Payment',
          value: detail.totalPrice,
        },
        {
          title: 'Payment Mode',
          value: detail.paymentMode,
        },
        {
          title: 'Payment Status',
          value: detail.paymentStatus,
        },
        {
          title: 'Delivery Type',
          value: detail.deliveryType,
        },
        {
          title: 'Order Status',
          value: detail.status,
        },
      ].map((each) => (
        <Col xs={24} sm={12} md={8}>
          <Card style={{ width: '100%' }}>
            <Card.Meta title={each.value} description={each.title} />
          </Card>
        </Col>
      ))}
    </Row>
  );
}
