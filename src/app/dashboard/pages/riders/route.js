import { PRIVILEGE_ADMIN } from "config";
import routeURL from "config/routeURL";
import RiderPage from "./index";
import RiderInformationAdd from "./RiderInformationAdd";
import RiderRequestVerify from "./RiderRequestVerify";
export default {
	routes: [
		{
			auth: [PRIVILEGE_ADMIN],
			path: routeURL.cms.rider(),
			component: RiderPage,
		},
		{
			auth: true,
			path: routeURL.cms.rider_add(),
			component: RiderInformationAdd,
		},
		{
			auth: true,
			path: routeURL.cms.rider_edit(),
			component: RiderInformationAdd,
		},
		{
			auth: true,
			path: routeURL.cms.rider_request_verify(),
			component: RiderRequestVerify,
		},
	],
};
