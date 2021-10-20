import React from 'react';
import { Col, Row } from 'antd';
import { FacebookLogin, GoogleLogin } from 'app/web/components/socialLogin';
import { JwtService } from 'services/jwtServiceClient';
import { notificationSuccess } from 'app/web/components/notification';
import { handleError } from 'services/util';
import PropTypes from 'prop-types';

const LinkSocialMedia = ({
  profile,
  refreshProfile
}) => {
  if (!profile) return null;
  const onFacebookLink = (accessToken, userID) => {
    JwtService.linkFacebook(accessToken, userID)
      .then((message) => {
        refreshProfile();
        notificationSuccess(message);
      })
      .catch(handleError);
  };

  const onGoogleLink = (accessToken) => {
    JwtService.linkGoogle(accessToken)
      .then((message) => {
        refreshProfile();
        notificationSuccess(message);
      })
      .catch(handleError);
  };

  return (
    <div>
      <div
        className="my-account-address account-wrapper"
        style={{
          width: '100%',
        }}
      >
        <h4 className="account-title">Link Social Media to your Account</h4>

        <Row gutter={32} align='middle'>
          <Col>
            {profile.isFacebookLinked ? <span style={{
              width: 'auto',
              height: 40,
              boxShadow: ''
            }}>
              Facebook Linked  <i className="far fa-check-circle" style={{
              color: '#76ff03'
            }}/>
            </span> : <FacebookLogin onSuccess={onFacebookLink} text='Link'/>}
          </Col>
          <Col>
            {profile.isGoogleLinked ? <span style={{
              width: 'auto',
              height: 40,
              boxShadow: ''
            }}>
              Google Linked <i className="far fa-check-circle" style={{
              color: '#76ff03'
            }}/>
            </span> : <GoogleLogin onSuccess={onGoogleLink} text='Link'/>}
          </Col>
        </Row>
      </div>
    </div>
  );
};

LinkSocialMedia.propTypes = {
  profile: PropTypes.object,
  refreshProfile: PropTypes.func,
};

export default LinkSocialMedia;
