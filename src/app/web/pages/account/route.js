/* eslint-disable import/no-anonymous-default-export */
import AccountPage from './index';
import routeURL from 'config/routeURL';

export default {
  routes: [
    {
      auth: false,
      path: routeURL.web.my_account(),
      component: AccountPage,
    },
  ],
};
