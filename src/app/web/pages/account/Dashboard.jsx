import { Skeleton } from 'antd';
import api from 'app/web/api';
import { notificationError } from 'app/web/components/notification';
import { LOGOUT_USER_CLIENT, UserContext } from 'context';
import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { JwtService } from 'services/jwtServiceClient';

const getFirstname = (name) => name && name.split(' ')[0];
export default function Dashboard({profile}) {
  
  const { clientStore, clientDispatch } = useContext(UserContext);

  const onLogout = () => {
    JwtService.logout();
    clientDispatch({ type: LOGOUT_USER_CLIENT });
  };

  return (
    <div className="my-account-dashboard">
      <h4 className="account-title">Dashboard</h4>
      <div className="welcome-dashboard">
        <p>
          Hello,{' '}
          <strong>
            {profile ? (
              profile.name
            ) : (
              <Skeleton.Input active size="small" style={{ width: 50 }} />
            )}
          </strong>{' '}
          (If Not{' '}
          <strong>
            {profile ? (
              getFirstname(profile.name)
            ) : (
              <Skeleton.Input active size="small" style={{ width: 50 }} />
            )}
            !
          </strong>{' '}
          <span
            onClick={onLogout}
            style={{
              cursor: 'pointer',
            }}
          >
            Logout
          </span>{' '}
          )
        </p>
      </div>
      <p className="mt-25">
        From your account dashboard. you can easily check &amp; view your recent
        orders, manage your shipping and billing addresses and edit your
        password and account details.
      </p>
    </div>
  );
}
