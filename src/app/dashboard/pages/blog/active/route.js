/* eslint-disable import/no-anonymous-default-export */
import { PRIVILEGE_ADMIN } from "config";
import routeURL from "config/routeURL";
import Blog from "./index";
import ItemAdd from "../addNew/index";
export default {
  routes: [
    {
      auth: [PRIVILEGE_ADMIN],
      path: routeURL.cms.blog_active(),
      component: Blog,
    },
    {
      auth: [PRIVILEGE_ADMIN],
      path: routeURL.cms.blog_edit(),
      component: ItemAdd,
    },
  ],
};
