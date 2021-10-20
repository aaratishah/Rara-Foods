import { Layout } from 'antd';
import routeURL from 'config/routeURL';
import {
  LOGIN_USER_CLIENT,
  LOGOUT_USER_CLIENT,
  ShopContextProvider,
  UserContext,
  UserLoginContextProvider,
  UserProvider,
} from 'context/';
import { useContext, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { JwtService } from 'services/jwtServiceClient';
import AccountModal from '../components/Account/';
import NavigationFooter from '../components/Footer/';
import NavigationHeader from '../components/Header/';
import routeConfig from './routeConfig';
import api from 'app/web/api';
import Page404 from 'app/web/components/Error/Page404';
import CartItems from 'app/web/components/Header/CartItems';
import SearchOverlay from '../components/search_overlay';

// import all css for now
import '../style/swiper.css';
import './new-style.css';
import './style.min.css';
import LaunchingSoonModal from './LaunchingSoonModal';

// import "./style.css";
const switchRoutes = (routes) => (
  <>
    <Switch>
      <Route exact path={routeURL.web.error404()} component={Page404} />
      {routes.map(({ auth, path, component }) => (
        <Route exact key={path} path={path} component={component} />
      ))}
      {/* <Route
					path="/"
					exact={true}
					component={() => <Redirect to="/home" />}
				/> */}
      <Route component={() => <Redirect to={routeURL.web.error404()} />} />
    </Switch>
  </>
);

function ClientLayout(props) {
  const { clientStore, clientDispatch } = useContext(UserContext);
  const isAuth = clientStore.isAuthenticated;
  useEffect(() => {
    if (isAuth === undefined) {
      const token = JwtService.getAccessToken();
      if (JwtService.isAuthTokenValid(token)) {
        clientDispatch({ type: LOGIN_USER_CLIENT });
      } else {
        JwtService.logout();
        clientDispatch({ type: LOGOUT_USER_CLIENT });
      }
    }
    if (isAuth !== undefined && isAuth === false) {
    }
  }, [isAuth]);

  api.baseAxios.interceptors.request.use(
    (request) => {
      const token = JwtService.getAccessToken();
      if (token) {
        request.headers.Authorization = token;
      } else {
        // console.log(token, "Token error!");
      }
      return request;
    },

    (err) => {
      return Promise.reject(err);
    }
  );

  api.baseAxios.interceptors.response.use(
    (response) => {
      return response;
    },

    (err) => {
      if (err.response && err.response.status) {
        if (err.response.status === 401) {
          console.log('Response error!');
        }
      }

      return Promise.reject(err);
    }
  );
  return (
    <UserLoginContextProvider>
      <div id="site-wrapper">
        <ShopContextProvider>
          <Layout id="main-</UserCartProvider>wrapper" class="site-wrapper">
            <SearchOverlay />
            <NavigationHeader {...props} />
            {!clientStore.isAuthenticated && (
              <AccountModal history={props.history} />
            )}
            <CartItems />
            <div
              style={
                {
                  // paddingTop: 80
                }
              }
            >
              {switchRoutes(routeConfig)}
            </div>
            <div
              style={{
                padding: 0,
              }}
            >
              <NavigationFooter />
            </div>
          </Layout>
        </ShopContextProvider>
      </div>
    </UserLoginContextProvider>
  );
}

export default (props) => (
  <UserProvider>
    <ClientLayout {...props}></ClientLayout>
  </UserProvider>
);
