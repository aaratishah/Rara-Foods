import RiderRequestForm from "./index";
import routeURL from "config/routeURL";

export default {
	routes: [
		{
			auth: false,
			path: routeURL.web.rider_request(),
			component: RiderRequestForm,
		},
	],
};
