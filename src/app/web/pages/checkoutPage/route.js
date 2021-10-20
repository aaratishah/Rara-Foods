import CheckoutPage from './index';
import routeURL from 'config/routeURL';

const routes = {
  routes: [
    {
      auth: false,
      path: routeURL.web.checkout(),
      component: CheckoutPage,
    },
  ],
};

export default routes;
