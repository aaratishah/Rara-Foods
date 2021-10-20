/* eslint-disable import/no-anonymous-default-export */

import routeURL from "config/routeURL";
import HomePage from "./index";
import ItemAdd from "./ItemAdd";
export default {
  routes: [
    {
      auth: true,
      path: routeURL.cms.shipping_charge(),
      component: HomePage,
    },
    {
      auth: true,
      path: routeURL.cms.shipping_charge_add(),
      component: ItemAdd,
    },
    {
      auth: true,
      path: routeURL.cms.shipping_charge_edit(),
      component: ItemAdd,
    },
  ],
};
