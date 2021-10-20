// import React from "react";
// import {Redirect} from 'react-router-dom';
import routeURL from "config/routeURL";
import Home from "./index";
export default {
	routes: [
		{
			auth: true,
			path: routeURL.cms.home(),
			component: Home,
		},
	],
};
