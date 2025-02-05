import { Button, Form, Input, message, Result, Tooltip } from 'antd';
import api from 'app/web/api';
import DarkBlueRedButton from 'app/web/components/Button/DarkBlueRedButton';
import { UserContext } from 'context';
import { useContext, useEffect, useRef, useState } from 'react';
import {
  ADDRESS,
  CONTACT,
  CONTACT_MESSAGE_SUCCESS_SUBTITLE,
  CONTACT_MESSAGE_SUCCESS_TITLE,
  COUNTRY_CODE,
  EMAIL,
  FACEBOOK_LINK,
  INSTA_LINK,
} from 'config/index';
import routeURL from 'config/routeURL';
import { Link } from 'react-router-dom';
import Icon from '@ant-design/icons';
import {
  AddressMarkerAltIcon,
  EmailOpenIcon,
  FacebookIcon,
  InstaIcon,
  PhoneVolumeIcon,
} from 'image/icon-svg';

const rowStyle = { width: '100%' };

export default function ContactUs() {
  const {
    clientStore,
    clientDispatch
  } = useContext(UserContext);
  const isAuth = clientStore.isAuthenticated;
  const [spinning, setSpinning] = useState(false);
  const [submit, setSubmit] = useState(false);
  var formRef = useRef();

  const fillForm = (
    contact = undefined,
    name = undefined,
    subject = undefined,
    message = undefined
  ) => {
    formRef.current.setFieldsValue({
      contact,
      name,
      subject,
      message,
    });
  };

  const resetForm = (subject = undefined, message = undefined) => {
    formRef.current.setFieldsValue({
      subject,
      message,
    });
  };
  const onSaveForm = (value) => {
    // client side validation here
    if (true) {
      setSpinning(true);
      api
        .saveContactMessage(value)
        .then((data) => {
          setSubmit(true);
          resetForm(); //not passing any parameter resets the form
          message.info(data.message);
        })
        .catch((error) => {
          if (
            error &&
            error.response &&
            error.response.data &&
            typeof error.response.data.message === 'string'
          ) {
            message.error(error.response.data.message);
          }
        })
        .finally(() => setSpinning(false));
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (isAuth === true) {
      api.auth
        .current()
        .then(({ data }) => fillForm(data.email, data.name))
        .catch((err) => {
          if (err.response.data) message.error(err.response.data.message);
        })
        .finally(() => setSpinning(false));
    }
  }, [isAuth]);
  return (
    <div
      id="wrapper-content"
      className="wrapper-content pt-0 pb-0"
      style={{
        fontFamily: 'work sans, sans-serif',
        lineHeight: 1.7,
      }}
    >
      <section className="contact-icon bg-off-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="row bg-white shadow">
                <div className="col-md-4 text-center   border-right">
                  <div className="icon">
                    <Icon
                      component={AddressMarkerAltIcon}
                      style={{
                        fontSize: 55,
                        color: '#165477',
                        padding: 20,
                        fontWeight: 900,
                      }}
                    />
                  </div>
                  <h6>Address</h6>
                  <p>{ADDRESS}</p>
                </div>
                <div className="col-md-4 text-center  border-right ">
                  <div className="icon">
                    <Icon
                      component={PhoneVolumeIcon}
                      style={{
                        fontSize: 55,
                        color: '#165477',
                        padding: 20,
                        fontWeight: 900,
                      }}
                    />
                  </div>
                  <h6>Contact</h6>
                  <p>
                    {' '}
                    <a href={`tel://${COUNTRY_CODE}${CONTACT}`}>{COUNTRY_CODE} {CONTACT} </a>
                  </p>
                </div>
                <div className="col-md-4 text-center   ">
                  <div className="icon">
                    <Icon
                      component={EmailOpenIcon}
                      style={{
                        fontSize: 55,
                        color: '#165477',
                        padding: 20,
                        fontWeight: 900,
                      }}
                    />
                  </div>
                  <h6>Email</h6>
                  <p>
										<span>
											<a href={`mailto:${EMAIL}`}>{EMAIL}</a>
										</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ContactForm bg-white ">
        <div className="container">
          <div className="row  ">
            <div className="col-md-6">
              <h2
                className="text-left  m-t-40 m-b-40"
                style={{
                  fontWeight: 600,
                }}
              >
                Have be any Question?
              </h2>
              <h6>Contact us and we'll get back to you within 24 hours.</h6>
              <p/>
              <div className="social">
                <Tooltip title="Facebook">
                  <a href={FACEBOOK_LINK} target="_blank">
                    <Icon
                      component={FacebookIcon}
                      style={{
                        color: 'gray',
                        fontSize: 16,
                      }}
                    />
                  </a>
                </Tooltip>
                <Tooltip title="Instagram">
                  <a href={INSTA_LINK} target="_blank">
                    <Icon
                      component={InstaIcon}
                      style={{
                        color: 'gray',
                        fontSize: 16,
                        marginLeft: 16,
                      }}
                    />
                  </a>
                </Tooltip>
              </div>
            </div>
            <div className="col-md-6 ">
              <div action="#" className="bg-white shadow p-5">
                <h4 className="mini-head text-center">Contact us</h4>
                {submit ? (
                  <Result
                    status="success"
                    title={CONTACT_MESSAGE_SUCCESS_TITLE}
                    subTitle={CONTACT_MESSAGE_SUCCESS_SUBTITLE}
                    extra={[
                      <Link key="home" to={routeURL.web.home()}>
                        <Button type="primary">Back Home</Button>
                      </Link>,
                      <Button onClick={() => setSubmit(false)}>
                        Fill Again
                      </Button>,
                    ]}
                  />
                ) : (
                  <Form
                    // wrapperCol={{
                    // 	offset: 1,
                    // }}
                    // {...layout}
                    ref={formRef}
                    // form={form}
                    layout="vertical"
                    name="control-ref"
                    onFinish={onSaveForm}
                    requiredMark={true}
                    scrollToFirstError
                  >
                    <Form.Item
                      label="Full Name"
                      style={{
                        width: '100%',
                      }}
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your name',
                        },
                      ]}
                    >
                      <Input size="large" placeholde="Your Name" required/>
                    </Form.Item>

                    <Form.Item
                      label="Your Email/Phone"
                      style={{
                        width: '100%',
                      }}
                      name="contact"
                      rules={[
                        {
                          required: true,
                          message: 'Please input Your Email/Phone',
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholde="Your Email/Phone"
                        required
                      />
                    </Form.Item>

                    <Form.Item
                      label="Subject"
                      style={{
                        width: '100%',
                      }}
                      name="subject"
                    >
                      <Input size="large" placeholder="Subject"/>
                    </Form.Item>

                    <Form.Item
                      label="Your Message"
                      style={{
                        width: '100%',
                      }}
                      name="message"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Message',
                        },
                        {
                          min: 50,
                          message: 'Too short message!',
                        },
                      ]}
                    >
                      <Input.TextArea
                        size="large"
                        autoSize={{ minRows: 4 }}
                        placeholde="Message"
                      />
                    </Form.Item>

                    <DarkBlueRedButton htmlType="submit" loading={spinning}>
                      Send Message
                    </DarkBlueRedButton>
                  </Form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.177885916154!2d151.1543005148449!3d-33.91082102867168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12b06412f459f5%3A0xd4090d722af4db6!2s288%20Marrickville%20Rd%2C%20Marrickville%20NSW%202204%2C%20Australia!5e0!3m2!1sen!2snp!4v1619943098391!5m2!1sen!2snp"
        width="100%"
        height={450}
        frameBorder={0}
        style={{ border: 0 }}
        allowFullScreen
        aria-hidden="false"
        tabIndex={0}
        loading="lazy"
W      />
    </div>
  );
}
