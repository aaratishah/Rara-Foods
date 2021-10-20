/* eslint-disable jsx-a11y/anchor-is-valid */
import config from 'config';
import routeURL from 'config/routeURL';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import defaultProfile from 'image/user.png';
import { LOGOUT_USER_CLIENT, UserContext } from 'context';
import { JwtService } from 'services/jwtServiceClient';

export default function ProfileOption({ profile }) {
  const { clientDispatch } = useContext(UserContext);

  const onLogout = () => {
    JwtService.logout();
    clientDispatch({ type: LOGOUT_USER_CLIENT });
  };

  return (
    <li>
      <div className="dropdown profile-header">
        <a
        style={{
          backgroundColor: 'unset',
          cursor: 'pointer',
        }}
          className="dropdown-toggle"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <div className="c-avatar">
            <img
              style={{
                width: 35,
                height: 35,
                marginRight: 0,
              }}
              src={
                (profile &&
                  profile.photo &&
                  config.getImageHost(profile.photo)) ||
                defaultProfile
              }
              alt=""
            />
          </div>
        </a>
        <div
          className="dropdown-menu shadow arrow-dropdown"
          aria-labelledby="dropdownMenuLink"
        >
          <div className="arrow" />
          <Link
            style={{
              backgroundColor: 'unset',
            }}
            className="dropdown-item"
            to={routeURL.web.my_account('AccountDetail')}
          >
            {' '}
            <i className="far fa-cog  pr-2" />
            Account
          </Link>
          <Link
            style={{
              backgroundColor: 'unset',
            }}
            className="dropdown-item"
            to={routeURL.web.my_account('Wishlist')}
          >
            {' '}
            <i className="far fa-bookmark  pr-2" />
            Saved
          </Link>
          <div className="dropdown-divider" />
          <a
            style={{
              backgroundColor: 'unset',
            }}
            className="dropdown-item"
            onClick={onLogout}
          >
            Logout
          </a>
        </div>
      </div>
    </li>
  );
}
