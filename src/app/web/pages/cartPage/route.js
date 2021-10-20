import CartPage from './index';
import routeURL from 'config/routeURL';

const routes = {
  routes: [
    {
      auth: false,
      path: routeURL.web.cart(),
      component: CartPage,
    },
  ],
};

export default routes;
