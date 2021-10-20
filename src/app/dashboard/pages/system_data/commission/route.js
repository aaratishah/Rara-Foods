/* eslint-disable import/no-anonymous-default-export */

import routeURL from "config/routeURL";
import HomePage from "./index";
import ItemAdd from "./ItemAdd";
import ItemPreview from "./ItemPreview";
export default {
  routes: [
    {
      auth: true,
      path: routeURL.cms.commission(),
      component: HomePage,
    },
    {
      auth: true,
      path: routeURL.cms.commission_view(),
      component: ItemPreview,
    },
    {
      auth: true,
      path: routeURL.cms.commission_add(),
      component: ItemAdd,
    },
    {
      auth: true,
      path: routeURL.cms.commission_edit(),
      component: ItemAdd,
    },
  ],
};
