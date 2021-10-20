// import React from "react";
// import {Redirect} from 'react-router-dom';
import { PRIVILEGE_ADMIN } from "config";
import routeURL from "config/routeURL";
import ListTable from "./index";
import ItemAdd from "./ItemAdd";
export default {
	routes: [
		{
			auth: [PRIVILEGE_ADMIN],
			path: routeURL.cms.food_speciality(),
			component: ListTable,
		},
		{
			auth: [PRIVILEGE_ADMIN],
			path: routeURL.cms.food_speciality_add(),
			component: ItemAdd,
		},
		{
			auth: [PRIVILEGE_ADMIN],
			path: routeURL.cms.food_speciality_edit(),
			component: ItemAdd,
		},
	],
};
