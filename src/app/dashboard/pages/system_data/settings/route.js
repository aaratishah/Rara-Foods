/* eslint-disable import/no-anonymous-default-export */

import routeURL from "config/routeURL";
import HomePage from "./index";
import EditPage from "./EditSettings";

export default {
    routes: [
        {
            auth: true,
            path: routeURL.cms.settings(),
            component: HomePage,
        },
        {
            auth: true,
            path: routeURL.cms.settings_edit(),
            component: EditPage,
        },
    ],
};
