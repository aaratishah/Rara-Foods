// import React from "react";
// import {Redirect} from 'react-router-dom';
import routeURL from "config/routeURL";
import Item from "./index";
import ItemAdd from "./ItemAdd";
export default {
	routes: [
		{
			auth: true,
			path: routeURL.cms.food(),
			component: Item,
		},
		{
			auth: true,
			path: routeURL.cms.food_add(),
			component: ItemAdd,
		},
		{
			auth: true,
			path: routeURL.cms.food_edit(),
			component: ItemAdd,
		},
	],
};
