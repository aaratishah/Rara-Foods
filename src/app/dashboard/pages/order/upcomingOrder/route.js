import routeURL from 'config/routeURL';
import HomePage from './index';

export default {
  routes: [
    {
      auth: true,
      path: routeURL.cms.upcoming_order(),
      component: HomePage,
    },
  ],
};
