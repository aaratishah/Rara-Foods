import RetaurantList from "./index";
import routeURL from "config/routeURL";

export default {
	routes: [
		{
			auth: false,
			path: routeURL.web.restaurant_list(),
			component: RetaurantList,
		},
	],
};
