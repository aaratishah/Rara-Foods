// import React from "react";
// import {Redirect} from 'react-router-dom';
import routeURL from "config/routeURL";
import RestaurantDetailPage from "./index";
export default {
	routes: [
		{
			auth: false,
			path: routeURL.web.restaurant_detail(),
			component: RestaurantDetailPage,
		},
	],
};
