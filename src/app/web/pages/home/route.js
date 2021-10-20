// import React from "react";
// import {Redirect} from 'react-router-dom';
import routeURL from "config/routeURL";
import Home from "./index";
export default {
  routes: [
    {
      auth: false,
      path: routeURL.web.home(),
      component: Home,
    },
  ],
};
