import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Result,
  Row,
  Tag,
  Typography,
} from 'antd';
import GalleryUpload from 'app/dashboard/components/GalleryUpload';
import api from 'app/web/api';
import {
  notificationError,
  notificationSuccess,
} from 'app/web/components/notification';
import routeURL from 'config/routeURL';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { handleError } from '../../../../services/util';

const getFirstname = (name) => name && name.split(' ')[0];

const ModelOrDesigner = ({ setStatus }) => {
  return (
    <>
      <Typography.Title level={5}>Are you a Model/Designer?</Typography.Title>
      <Row
        gutter={16}
        style={{
          width: '100%',
        }}
      >
        <Col
          onClick={() =>
            setTimeout(() => {
              setStatus('promote_yes');
            }, 300)
          }
        >
          <Card
            style={{ width: '100%', cursor: 'pointer', borderRadius: 8 }}
            hoverable
          >
            <Card.Meta title={'Yes'} />
          </Card>
        </Col>

        <Col
          onClick={() =>
            setTimeout(() => {
              setStatus('promote_no');
            }, 300)
          }
        >
          <Card
            style={{ width: '100%', cursor: 'pointer', borderRadius: 8 }}
            hoverable
          >
            <Card.Meta title={'No'} />
          </Card>
        </Col>
      </Row>
    </>
  );
};
const WhatAreYou = ({ setStatus, setProfession }) => {
  return (
    <>
      <Typography.Title level={5}>What are you?</Typography.Title>
      <Row
        gutter={16}
        style={{
          width: '100%',
        }}
      >
        <Col
          onClick={() =>
            setTimeout(() => {
              setProfession('model');
              setStatus('prof_done');
            }, 300)
          }
        >
          <Card
            style={{ width: '100%', cursor: 'pointer', borderRadius: 8 }}
            hoverable
          >
            <Card.Meta title={'Model'} />
          </Card>
        </Col>

        <Col
          onClick={() =>
            setTimeout(() => {
              setProfession('designer');
              setStatus('prof_done');
            }, 300)
          }
        >
          <Card
            style={{ width: '100%', cursor: 'pointer', borderRadius: 8 }}
            hoverable
          >
            <Card.Meta title={'Designer'} />
          </Card>
        </Col>
      </Row>
    </>
  );
};
const imageTitle = 'user_promote';
const RequestForm = ({ onFinish, form, promoting, photos, setPhotos }) => {
  return (
    <>
      <Typography.Title level={5}>Your appeal!</Typography.Title>
      <Row
        gutter={16}
        style={{
          width: '100%',
        }}
      >
        <Col xs={24} lg={16}>
          <Card>
            <Row style={{ width: '100%', marginTop: 20 }} justify="center">
              <Col xs={24}>
                <GalleryUpload
                  maxFile={10}
                  fileNames={photos}
                  imageTitle={`${imageTitle}`}
                  setFileNames={setPhotos}
                />
              </Col>
            </Row>
            <Form
              style={{
                width: '100%',
              }}
              // wrapperCol={{
              // 	offset: 1,
              // }}
              // {...layout}
              form={form}
              // form={form}
              layout="vertical"
              name="control-ref"
              onFinish={onFinish}
              requiredMark={true}
              scrollToFirstError
            >
              <Form.Item
                style={{
                  width: '100%',
                }}
                name="requestText"
                label="Anything to say?"
              >
                <Input.TextArea
                  showCount
                  maxLength={1000}
                  autoSize={{ minRows: 3, maxRows: 8 }}
                />
              </Form.Item>

              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                help="You may get a call."
                rules={[
                  {
                    required: false,
                  },
                  {
                    validator: (rule, telNo) => {
                      if (!telNo) return Promise.resolve();
                      else if (telNo.length < 5 || telNo.length > 15)
                        return Promise.reject('Invalid Phone number');
                      const re = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;
                      if (re.test(telNo)) {
                        return Promise.resolve();
                      }
                      return Promise.reject('Invalid Phone number');
                    },
                  },
                ]}
              >
                <Input type="tel" size="large" />
              </Form.Item>

              <Form.Item
                style={{
                  width: '100%',
                }}
              >
                <div className="single-form">
                  <Button
                    // onClick={() => form.submit()}
                    loading={promoting}
                    htmlType="submit"
                    className="main-btn btn-block"
                  >
                    Save Change
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default function PromoteAccount({ profile }) {
  const [profession, setProfession] = useState(''); // ['model', 'designer']
  const [status, setStatus] = useState('');
  const { accountType } = profile || {};
  const [photos, setPhotos] = useState([]);
  const [promoting, setPromoting] = useState(false);
  const [promotion, setPromotion] = useState({});
  const [spinning, setSpinning] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    if (accountType === 'user') {
      //   fetch if request is pending, if pending change the status to "pending_status"
      setSpinning(true);
      api.client
        .myPromotion()
        .then(({ data, success }) => {
          if (success) {
            setPromotion(data);
            setStatus('request_found');
            return;
          }
          setStatus('pending');
        })
        .catch((error) => {
          if (error && error.response && error.response.data) {
            if (typeof error.response.data.message === 'string')
              return notificationError(error.response.data.message);
            let errors = error.response.data;
            if (errors && errors.errors) errors = errors.errors;
            Object.keys(errors).map((key) => notificationError(errors[key]));
          }
        })
        .finally(() => setSpinning(false));
    } else if (accountType === 'model' || accountType === 'designer') {
      setStatus('');
    }
  }, [accountType]);

  const requestAgain = () => {
    // client side validation here
    if (true) {
      setPromoting(true);
      api.client
        .promoteAccount(promotion)
        .then(({ message }) => {
          notificationSuccess(message);
          setStatus('status_pending');
        })
        .catch(handleError)
        .finally(() => setPromoting(false));
    }
  };
  const buildUI = () => {
    switch (status) {
      case 'request_found':
        return (
          <Row>
            <h6>Request Status:</h6>{' '}
            <Tag
              style={{
                marginLeft: 8,
              }}
              color={
                promotion.status === 'rejected'
                  ? 'error'
                  : promotion.status === 'accepted'
                  ? 'green'
                  : 'blue'
              }
            >
              {promotion.status || 'pending'}
            </Tag>
            {moment(
              promotion.lastRequestDate || promotion.createdDateTime
            ).diff(moment(), 'days') > 3 && (
              <Row
                style={{
                  width: '100%',
                }}
              >
                <Button onClick={requestAgain} className="main-btn btn-block">
                  Request Again
                </Button>
              </Row>
            )}
            <Row
              style={{
                width: '100%',
                marginTop: 20,
              }}
            >
              <h6>Last requested:</h6>{' '}
              <span
                style={{
                  marginLeft: 4,
                }}
              >
                {moment(
                  promotion.lastRequestDate || promotion.createdDateTime
                ).fromNow()}
              </span>{' '}
            </Row>
          </Row>
        );
      case 'pending':
        return <ModelOrDesigner setStatus={setStatus} />;
      case 'promote_no':
        return false;
      case 'promote_yes':
        return (
          <WhatAreYou setStatus={setStatus} setProfession={setProfession} />
        );
      case 'status_pending':
        return (
          <Result
            status="success"
            title="Successfully Requested to Promote your account!"
            subTitle="It will take some time to get approve your request."
            extra={[
              <Link to={routeURL.web.home()}>
                <Button>Home Page</Button>
              </Link>,
            ]}
          />
        );
      case 'prof_done':
        return (
          <RequestForm
            form={form}
            onFinish={onFinish}
            promoting={promoting}
            setPhotos={setPhotos}
            photos={photos}
            setStatus={setStatus}
          />
        );

      default:
        return null;
    }
  };
  const onFinish = (values) => {
    const jsonData = {
      ...values,
      requestTo: profession,
      photos: photos || [],
    };
    // client side validation here
    if (true) {
      setPromoting(true);
      api.client
        .promoteAccount(jsonData)
        .then(({ message }) => {
          notificationSuccess(message);
          setStatus('status_pending');
        })
        .catch(handleError)
        .finally(() => setPromoting(false));
    }
  };
  return (
    <div className="my-account-dashboard">
      <h4 className="account-title">Dashboard</h4>
      <Row
        style={{
          marginTop: 32,
          width: '100%',
          lineHeight: 0,
        }}
      >
        <span
          style={{
            fontWeight: 500,
            color: '#000',
            fontSize: 16,
            verticalAlign: 'middle',
          }}
        >
          Current Account Type:{' '}
        </span>
        <span
          style={{
            marginLeft: 4,
            fontWeight: 500,
            color: '#000',
            fontSize: 16,
            verticalAlign: 'middle',
          }}
        >
          {accountType}
        </span>
      </Row>
      <Row
        style={{
          marginTop: 30,
        }}
      >
        {buildUI()}
      </Row>
    </div>
  );
}
