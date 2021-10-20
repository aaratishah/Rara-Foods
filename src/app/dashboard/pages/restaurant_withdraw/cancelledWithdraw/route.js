/* eslint-disable import/no-anonymous-default-export */

import routeURL from "config/routeURL";
import HomePage from "./index";

export default {
  routes: [
    {
      auth: true,
      path: routeURL.cms.restaurant_cancelled_withdraw(),
      component: HomePage,
    },
  ],
};
