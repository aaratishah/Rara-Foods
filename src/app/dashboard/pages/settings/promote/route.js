/* eslint-disable import/no-anonymous-default-export */

import routeURL from "config/routeURL";
import HomePage from "./index";
import ItemAdd from "./ItemAdd";
export default {
  routes: [
    {
      auth: true,
      path: routeURL.cms.promote(),
      component: HomePage,
    },
    {
      auth: true,
      path: routeURL.cms.promote_add(),
      component: ItemAdd,
    },
    {
      auth: true,
      path: routeURL.cms.promote_edit(),
      component: ItemAdd,
    },
  ],
};
