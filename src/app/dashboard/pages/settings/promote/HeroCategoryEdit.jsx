import { QuestionCircleFilled } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Divider,
  Modal,
  Row,
  Tooltip,
  Typography,
} from 'antd';
import api from 'app/dashboard/api';
import GalleryUpload from 'app/dashboard/components/GalleryUpload';
import {
  notificationError,
  notificationSuccess,
} from 'app/dashboard/components/notification';
import config from 'config';
import { useEffect, useState } from 'react';
import { handleError } from 'services/util';

const imageTitle = 'hero-promote';

export default function HeroCategoryEdit({
  categoryId,
  open,
  setOpen,
  fetchData,
}) {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryId);
  const [searchCategory, setSearchCategory] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [image, setImage] = useState([]);

  useEffect(() => {
    setSpinning(true);
    api.category
      .readAll()
      .then(({ data }) => setCategoryList(data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, []);

  const onSaveForm = () => {
    // validate here
    if (!selectedCategory)
      return notificationError(
        'Please select a category to promote it to hero section.'
      );
    if (image.length === 0)
      return notificationError('Please Upload Banner Image.');
    if (true) {
      var jsonData = {
        heroCategory: {
          categoryId: selectedCategory,
          banner: image.length > 0 ? image[0] : '',
        },
      };
      setSpinning(true);
      api.promote
        .save(jsonData)
        .then((data) => {
          fetchData();
          notificationSuccess(data.message);
          setOpen(false);
        })
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  };

  return (
    <Modal
      title="Edit Hero Category"
      visible={open}
      style={{ top: 1 }}
      width="90%"
      onOk={onSaveForm}
      okText="Save"
      onCancel={() => setOpen(false)}
    >
      <Row
        gutter={16}
        style={{
          height: 400,
          overflowY: 'auto',
        }}
      >
        <Divider orientation="left">
          <span
            style={{
              display: 'flex',
              fexDirection: 'row',
              alignItems: 'center',
            }}
          >
            Banner Image (High Resolution)
            <Tooltip title={`Required Image size: 1080x720`}>
              <QuestionCircleFilled
                style={{
                  marginLeft: 8,
                }}
              />
            </Tooltip>{' '}
          </span>
        </Divider>
        <Row style={{ width: '100%', marginTop: 20 }}>
          <GalleryUpload
            maxFile={1}
            fileNames={image}
            imageTitle={`${imageTitle}_banner`}
            setFileNames={setImage}
          />
        </Row>
        <Typography.Text>
          Select a Category to preview it into Hero Section
        </Typography.Text>
        <Divider />
        {categoryList.map((category) => {
          const isSelected = category._id.toString() === selectedCategory;
          return (
            <Col xs={24} md={12}>
              <Card>
                <div
                  className="single-category-mini"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    // justifyContent: 'space-between',
                  }}
                >
                  <div className="product-mini-image">
                    <a href="product-details.html">
                      <img
                        style={{
                          width: 200,
                          height: 150,
                        }}
                        src={config.getImageHost(category.image)}
                        alt={`${category.name}`}
                      />
                    </a>
                  </div>
                  <div
                    className="product-mini-content"
                    style={{
                      marginLeft: 5,
                    }}
                  >
                    <h5 className="mini-title">
                      <a href="product-details.html">{category.name}</a>
                    </h5>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Button
                        size="small"
                        type={isSelected && 'primary'}
                        onClick={() => {
                          setSelectedCategory(category._id.toString());
                        }}
                      >
                        {isSelected ? 'Selected' : 'Select'}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Modal>
  );
}
