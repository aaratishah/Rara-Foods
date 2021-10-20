import { Button, Col, Modal, Result, Row, Typography } from 'antd';
import { LunchingSoonIcon } from 'image/icon-svg';
import { useState } from 'react';
import { useEffect } from 'react';
import './launching.css';

export default function LaunchingSoonModal() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (process.env.REACT_APP_TESTING_ENVIRONMENT) setIsVisible(true);
  }, []);

  return (
    <Modal
      className="ant-modal-launching-soon"
      title={null}
      keyboard={false}
      width={400}
      style={{ top: 20 }}
      visible={isVisible}
      onCancel={() => setIsVisible(false)}
      footer={null}
    >
      <Row justify="center">
        <Typography.Title>We are Coming soon</Typography.Title>
      </Row>
      <Result
        style={{
          padding: 0,
        }}
        icon={
          'We are currently testing our application. Please visit later or explore beta version of our product.'
        }
        title={
          <Row>
            <Col xs={24}>
              <LunchingSoonIcon />
            </Col>
          </Row>
        }
        extra={
          <Button type="primary" onClick={() => setIsVisible(false)}>
            {' '}
            Okay
          </Button>
        }
      />
    </Modal>
  );
}
