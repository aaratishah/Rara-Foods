import TermsPage from "./Terms";
import PrivacyPage from "./Policy";
import routeURL from "config/routeURL";

export default {
	routes: [
		{
			auth: false,
			path: routeURL.web.terms_and_condition(),
			component: TermsPage,
		},
		{
			auth: false,
			path: routeURL.web.privacy_policy(),
			component: PrivacyPage,
		},
	],
};
