// import React from "react";
// import {Redirect} from 'react-router-dom';
import routeURL from "config/routeURL";
import ListTable from "./index";
import ItemAdd from "./ItemAdd";
export default {
	routes: [
		{
			auth: true,
			path: routeURL.cms.food_group_restaurant(),
			component: ListTable,
		},
		{
			auth: true,
			path: routeURL.cms.food_group_restaurant_add(),
			component: ItemAdd,
		},
		{
			auth: true,
			path: routeURL.cms.food_group_restaurant_edit(),
			component: ItemAdd,
		},
	],
};
