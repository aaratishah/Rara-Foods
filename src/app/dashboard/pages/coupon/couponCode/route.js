/* eslint-disable import/no-anonymous-default-export */

import routeURL from "config/routeURL";
import HomePage from "./index";
import ItemAdd from "./ItemAdd";
import ItemPreview from "./ItemPreview";

export default {
  routes: [
    {
      auth: true,
      path: routeURL.cms.coupon_code(),
      component: HomePage,
    },
    {
      auth: true,
      path: routeURL.cms.coupon_code_view(),
      component: ItemPreview,
    },
    {
      auth: true,
      path: routeURL.cms.coupon_code_add(),
      component: ItemAdd,
    },
    {
      auth: true,
      path: routeURL.cms.coupon_code_edit(),
      component: ItemAdd,
    },
  ],
};
