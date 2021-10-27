import routeURL from "config/routeURL";
import HomePage from "./index";
import AddItem from "./ItemAdd";

export default {
  routes: [
    {
      auth: true,
      path: routeURL.cms.promotion(),
      component: HomePage,
    },
    {
      auth: true,
      path: routeURL.cms.promotion_add(),
      component: AddItem,
    },
  ],
};