// import React from "react";
// import {Redirect} from 'react-router-dom';
import routeURL from "config/routeURL";
import ListTable from "./index";
import ItemAdd from "./ItemAdd";
export default {
	routes: [
		{
			auth: true,
			path: routeURL.cms.food_category(),
			component: ListTable,
		},
		{
			auth: true,
			path: routeURL.cms.food_category_add(),
			component: ItemAdd,
		},
		{
			auth: true,
			path: routeURL.cms.food_category_edit(),
			component: ItemAdd,
		},
	],
};
