import CitiesList from "./index";
import routeURL from "config/routeURL";

export default {
	routes: [
		{
			auth: false,
			path: routeURL.web.cities_list(),
			component: CitiesList,
		},
		
	],
};
