// import React from "react";
// import {Redirect} from 'react-router-dom';
import { PRIVILEGE_ADMIN } from "config";
import routeURL from "config/routeURL";
import UserList from "./index";
import UserAdd from "./UserAdd";
export default {
	routes: [
		{
			auth: [PRIVILEGE_ADMIN],
			path: routeURL.cms.user_management(),
			component: UserList,
		},
		{
			auth: [PRIVILEGE_ADMIN],
			path: routeURL.cms.user_management_add(),
			component: UserAdd,
		},
		{
			auth: [PRIVILEGE_ADMIN],
			path: routeURL.cms.user_management_edit(),
			component: UserAdd,
		},
	],
};
