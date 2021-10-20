import { Button, Form, Input, Result } from 'antd';
import { CaretRightOutlined, LoadingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { JwtService } from 'services/jwtServiceClient';
import { handleError } from 'services/util';
import { notificationSuccess } from 'app/web/components/notification';
import { Link } from 'react-router-dom';
import routeURL from 'config/routeURL';

function UpdatePhoneNumber() {
  const [form] = Form.useForm();
  const [apiResponse, setApiResponse] = useState({
    OTPLength: 4,
  });
  const [otpStep, setOtpStep] = useState('PHONE');
  const [spinning, setSpinning] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const onFinish = (values) => {
    if (otpStep === 'PHONE') {
      //  resend-otp
      resendOTP(values);
    } else if (otpStep === 'OTP') {
      //  verify-otp and save change number
      verifyOtpAndUpdatePhone(values);

    }
  };

  const resendOTP = (values) => {
    JwtService.resendOtpUpdatePhone({
      phone: values.phone,
    })
      .then((data) => {
        setApiResponse({
          ...apiResponse,
          hash: data.hash,
          phone: data.phone,
          OTPLength: data.length,
        });
        setOtpStep('OTP');
      })
      .catch(handleError)
      .finally(() => setSpinning(false));
  };

  const verifyOtpAndUpdatePhone = (values) => {
    JwtService.verifyOtpAndUpdatePhone({
      phone: apiResponse.phone,
      otp: values.otp,
      hash: apiResponse.hash,
    })
      .then((_) => {
        setSubmitted(true);
        notificationSuccess('Phone number updated successfully!');
      })
      .catch(handleError)
      .finally(() => setSpinning(false));
  };

  return <Form
    form={form}
    layout="vertical"
    name="control-ref"
    onFinish={onFinish}
    requiredMark={true}
    scrollToFirstError
  >
    <h4 className="account-title">Update Phone Number</h4>
    {submitted && <Result
      status="success"
      title="Successfully Updated Phone Number!"
      extra={[
        <Link to={routeURL.web.home()}><Button key="buy">Home</Button></Link>,
      ]}
    />}

    {submitted || otpStep === 'PHONE' && <Form.Item
      style={{
        width: '100%',
      }}
      name="phone"
      rules={[
        {
          required: true,
          message: 'Please input New Phone number',
        },
      ]}
    >
      <div className="single-form">
        <label>New Phone Number *</label>
        <Input addonAfter={
          spinning ? <LoadingOutlined spin/> : <CaretRightOutlined onClick={form.submit}/>
        }/>
      </div>
    </Form.Item>}
    {submitted || otpStep === 'OTP' && <>
      <label>
        We have sent {apiResponse.OTPLength} digit OTP code to your phone
        number: {apiResponse.phone}.
      </label>
      <Form.Item
        name="otp"
        rules={[
          {
            required: true,
            message: `OTP cannot be empty. `
          },
          {
            min: apiResponse.OTPLength,
            message: `Please input ${apiResponse.OTPLength} digit valid code. `

          }
        ]}
      >

        <Input
          style={{
            borderRadius: 5,
          }}
          size="large"
          className="site-form-item-icon"
          placeholder={`${apiResponse.OTPLength} digit OTP`}
        />
      </Form.Item>
      <Form.Item
        style={{
          width: '100%',
        }}
      >
        <div className="single-form">
          <Button
            loading={spinning}
            htmlType="submit"
            className="main-btn btn-block"
          >
            Verify OTP and Update Phone
          </Button>
        </div>
      </Form.Item>
    </>
    }


  </Form>;
}

UpdatePhoneNumber.propTypes = {};

export default UpdatePhoneNumber;
