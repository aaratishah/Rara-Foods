/* eslint-disable import/no-anonymous-default-export */

import routeURL from "config/routeURL";
import HomePage from "./index";
import ItemAdd from "./ItemAdd";
import ItemPreview from "./ItemPreview";

export default {
  routes: [
    {
      auth: true,
      path: routeURL.cms.vehicle_type(),
      component: HomePage,
    },
    {
      auth: true,
      path: routeURL.cms.vehicle_type_view(),
      component: ItemPreview,
    },
    {
      auth: true,
      path: routeURL.cms.vehicle_type_add(),
      component: ItemAdd,
    },
    {
      auth: true,
      path: routeURL.cms.vehicle_type_edit(),
      component: ItemAdd,
    },
  ],
};
