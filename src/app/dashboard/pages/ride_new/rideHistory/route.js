/* eslint-disable import/no-anonymous-default-export */

import routeURL from "config/routeURL";
import HomePage from "./index";
import ItemAdd from "./ItemAdd";
import ItemPreview from "./ItemPreview";
export default {
  routes: [
    {
      auth: true,
      path: routeURL.cms.ride_history(),
      component: HomePage,
    },
    {
      auth: true,
      path: routeURL.cms.ride_history_view(),
      component: ItemPreview,
    },
    // {
    //   auth: true,
    //   path: routeURL.cms.rider_request_add(),
    //   component: ItemAdd,
    // },
    // {
    //   auth: true,
    //   path: routeURL.cms.rider_request_edit(),
    //   component: ItemAdd,
    // },
  ],
};
