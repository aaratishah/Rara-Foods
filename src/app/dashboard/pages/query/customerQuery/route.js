/* eslint-disable import/no-anonymous-default-export */

import routeURL from "config/routeURL";
import HomePage from "./index";
// import ItemAdd from "./ItemAdd";
import ItemPreview from "./ItemPreview";

export default {
  routes: [
    {
      auth: true,
      path: routeURL.cms.customer_query(),
      component: HomePage,
    },
    {
      auth: true,
      path: routeURL.cms.customer_query_view(),
      component: ItemPreview,
    },
    // {
    //   auth: true,
    //   path: routeURL.cms.customer_review_add(),
    //   component: ItemAdd,
    // },
    // {
    //   auth: true,
    //   path: routeURL.cms.customer_review_edit(),
    //   component: ItemAdd,
    // },
  ],
};
