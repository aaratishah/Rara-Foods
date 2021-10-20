import { Col, Result, Row, Spin } from 'antd';
import api from 'app/web/api';
import Container from 'app/web/components/Container';
import { EMAIL } from 'config';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { handleError } from 'services/util';
import './index.css';

const createMarkup = (html) => {
  return {
    __html: DOMPurify.sanitize(html),
  };
};

export default function Policy() {
  const [spinning, setSpinning] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  // check wishlist
  useEffect(() => {
    setSpinning(true);
    api.config
      .read_policy()
      .then(({ data }) => setData(data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, []);

  return (
    <Container
      outerStyle={{
        paddingBottom: 100,
        paddingTop: 100,
      }}
    >
      <div data-custom-class="body">
        {spinning ? (
          <Row justify="center" align="middle">
            <Col>
              <Spin spinning={true}></Spin>
            </Col>
          </Row>
        ) : (data && data.body) ? (
          <div
            dangerouslySetInnerHTML={createMarkup(data.body)}
            style={{ lineHeight: '1.5', padding: 100 }}
          ></div>
        ) : (
          <Result status="404" title="Page Not Found"></Result>
        )}
      </div>
    </Container>
  );
}
