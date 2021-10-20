import SearchPage from './index';
import routeURL from 'config/routeURL';

const routes = {
  routes: [
    {
      auth: false,
      path: routeURL.web.search(),
      component: SearchPage,
    },
  ],
};

export default routes;
