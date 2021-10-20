/* eslint-disable import/no-anonymous-default-export */

import routeURL from "config/routeURL";
import HomePage from "./index";
import ItemAdd from "./ItemAdd";
import ItemPreview from "./ItemPreview";
export default {
  routes: [
    {
      auth: true,
      path: routeURL.cms.active_ride(),
      component: HomePage,
    },
  ],
};
