/* eslint-disable import/no-anonymous-default-export */

import routeURL from "config/routeURL";
import HomePage from "./index";
import ItemAdd from "./ItemAdd";
export default {
  routes: [
    {
      auth: true,
      path: routeURL.cms.tax(),
      component: HomePage,
    },
    {
      auth: true,
      path: routeURL.cms.tax_add(),
      component: ItemAdd,
    },
    {
      auth: true,
      path: routeURL.cms.tax_edit(),
      component: ItemAdd,
    },
  ],
};
