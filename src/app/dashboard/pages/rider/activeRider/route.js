/* eslint-disable import/no-anonymous-default-export */

import routeURL from "config/routeURL";
import HomePage from "./index";
export default {
  routes: [
    {
      auth: true,
      path: routeURL.cms.rider_active(),
      component: HomePage,
    },
  ],
};
