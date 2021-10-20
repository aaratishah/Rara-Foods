/* eslint-disable import/no-anonymous-default-export */

import routeURL from "config/routeURL";
import HomePage from "./index";
import ItemPreview from "./ItemPreview";
export default {
  routes: [
    {
      auth: true,
      path: routeURL.cms.withdraw_request(),
      component: HomePage,
    },
    {
      auth: true,
      path: routeURL.cms.withdraw_request_view(),
      component: ItemPreview,
    },
  ],
};
