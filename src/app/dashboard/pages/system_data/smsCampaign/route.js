import routeURL from "config/routeURL";
import HomePage from "./index";
import AddItem from "./ItemAdd";

export default {
  routes: [
    {
      auth: true,
      path: routeURL.cms.sms_campaign(),
      component: HomePage,
    },
    {
      auth: true,
      path: routeURL.cms.sms_campaign_add(),
      component: AddItem,
    },
  ],
};
