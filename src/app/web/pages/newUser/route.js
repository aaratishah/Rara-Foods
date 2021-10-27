// import React from "react";
// import {Redirect} from 'react-router-dom';
import routeURL from "config/routeURL";
import NewUser from "./index";
export default {
  routes: [
    {
      exact: true,
      auth: true,
      path: routeURL.web.new_user(),
      component: NewUser,
    },
  ],
};
// we don't  include this login to the routeConfig of web because it doesnot include sidebar,header,footer ( config will always pass through layout )
