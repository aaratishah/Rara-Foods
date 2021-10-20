// import React from "react";
// import {Redirect} from 'react-router-dom';
import { PRIVILEGE_ADMIN } from "config";
import routeURL from "config/routeURL";
import Restaurant from "app/dashboard/pages/restaurant/activeRestaurant/index";
import ItemAdd from "app/dashboard/pages/restaurant/activeRestaurant/ItemAdd";
export default {
	routes: [
		{
			auth: [PRIVILEGE_ADMIN],
			path: routeURL.cms.restaurant(),
			component: Restaurant,
		},
		{
			auth: [PRIVILEGE_ADMIN],
			path: routeURL.cms.restaurant_add(),
			component: ItemAdd,
		},
		{
			auth: [PRIVILEGE_ADMIN],
			path: routeURL.cms.restaurant_edit(),
			component: ItemAdd,
		},
	],
};
