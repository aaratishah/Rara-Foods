import CartEditItem from "./CartEditItem";
import routeURL from "config/routeURL";

export default {
	routes: [
		{
			auth: false,
			path: routeURL.web.cart_edit_item(),
			component: CartEditItem,
		},
	],
};
