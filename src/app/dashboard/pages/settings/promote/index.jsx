import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Card, Col, Modal, Row, Typography } from 'antd';
import api from 'app/dashboard/api';
import config from 'config';
import routeURL from 'config/routeURL';
import noimagefound from 'image/noimagefound.jpg';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { handleError } from 'services/util';
import HeroCategoryEdit from './HeroCategoryEdit';
import './index.css';

const rowStyle = {
  width: '100%',
};

const imageStyle = {
  cursor: 'pointer',
  //   border: '1px solid',
};

const breadCrumbStyle = {
  color: '#9e9e9e',
  fontSize: 12,
};
const title = 'Promotion';
const backUrl = routeURL.cms.home();
const breadCrumb = [
  {
    title: 'Home',
    url: routeURL.cms.home(),
  },
  {
    title: title,
    url: false,
  },
];
export default function Promotion() {
  const [spinning, setSpinning] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [heroCategoryVisible, setHeroCategoryVisible] = useState(false);

  const [promoteData, setPromoteData] = useState({
    heroCategory: null,
  });

  const fetchData = () => {
    setSpinning(true);
    api.promote
      .readAll()
      .then(({ data }) => setPromoteData(data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  };

  useEffect(() => {
    setSpinning(true);
    api.promote
      .readAll()
      .then(({ data }) => setPromoteData(data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, []);

  return (
    <Row style={{ ...rowStyle, padding: '24px 40px' }}>
      <HeroCategoryEdit
        fetchData={fetchData}
        open={heroCategoryVisible}
        setOpen={setHeroCategoryVisible}
        categoryId={
          promoteData.heroCategory && promoteData.heroCategory.categoryId._id
        }
      />
      <Modal
        visible={previewVisible}
        // title={previewTitle}
        footer={null}
        onCancel={() => {
          setPreviewVisible(false);
          setPreviewImage('');
        }}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
      <Row style={rowStyle}>
        <Row style={rowStyle} align="middle">
          {backUrl && (
            <Link to={backUrl}>
              <ArrowLeftOutlined
                style={{
                  marginRight: 16,
                  fontSize: 22,
                  cursor: 'pointer',
                  color: 'unset',
                }}
              />
            </Link>
          )}
          <Typography.Title
            level={3}
            style={{
              marginBottom: 0,
              letterSpacing: 1,
            }}
          >
            {title}
          </Typography.Title>
        </Row>

        {breadCrumb && (
          <Row style={rowStyle}>
            <Breadcrumb separator=">">
              {breadCrumb.map((each) => {
                return (
                  <Breadcrumb.Item key={each.title}>
                    {each.url ? (
                      <Link to={each.url} style={breadCrumbStyle}>
                        {each.title}
                      </Link>
                    ) : (
                      <span style={breadCrumbStyle}>{each.title}</span>
                    )}
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
          </Row>
        )}
      </Row>
      <Row
        style={{
          marginTop: 50,
          width: '100%',
        }}
        gutter={32}
      >
        <Col xs={24} md={12} lg={8}>
          <Card
            loading={spinning}
            style={{ width: 300 }}
            cover={
              <img
                width={300}
                height={182}
                style={{
                  backgroundSize: 'cover',
                }}
                alt="example"
                src={
                  promoteData.heroCategory
                    ? config.getImageHost(promoteData.heroCategory.banner)
                    : noimagefound
                }
              />
            }
            actions={[
              <EditOutlined
                onClick={() => setHeroCategoryVisible(true)}
                key="edit"
              />,
            ]}
          >
            <Card.Meta
              avatar={
                <Avatar
                  src={
                    promoteData.heroCategory &&
                    promoteData.heroCategory.categoryId.image
                      ? config.getImageHost(
                          promoteData.heroCategory.categoryId.image
                        )
                      : noimagefound
                  }
                />
              }
              title="Promote Restaurant"
              description={
                promoteData.heroCategory &&
                promoteData.heroCategory.categoryId.name
              }
            />
          </Card>
        </Col>
      </Row>
    </Row>
  );
}
