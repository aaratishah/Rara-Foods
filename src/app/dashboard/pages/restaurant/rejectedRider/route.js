import routeURL from "config/routeURL";
import HomePage from "./index";
export default {
  routes: [
    {
      auth: true,
      path: routeURL.cms.restaurant_rejected(),
      component: HomePage,
    },
  ],
};
