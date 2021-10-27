import { Component, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminLayout from "app/dashboard/layout";
import ClientLayout from "app/web/layout/index";
import routeURL from "config/routeURL";
import LoginPage from "app/dashboard/pages/login";
import "antd/dist/antd.css";
import api from "./dashboard/api";
import { JwtService } from "services/jwtServiceClient";
import Geocode from "react-geocode";
import ScrollToTop from "app/web/components/scrollToTop";
import ClientLoginPage from "app/web/pages/login/index";
import NewUserPage from "./web/pages/newUser";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_KEY);

class App extends Component {
  constructor(props) {
    super(props);
  }

  // logging the client side error, catch all the console error and send it to the API
  componentDidMount() {
    //report all user console errors
    window.onerror = function (message, url, lineNumber) {
      var errorMessage =
        "Console error- " + url + " : " + lineNumber + ": " + message;
      api.clientLoggingURL.send(errorMessage).then();
      return true;
    };
    var loading = document.getElementById("preloader-loading");
    loading.style.display = "none";
    JwtService.assignUUID();
  }

  render() {
    return (
      <Router>
        <ScrollToTop>
          <Switch>
            <Route
              exact
              path={routeURL.cms.error404()}
              component={() => <h1>404 Page Not Found For Admin</h1>}
            />

            <Route exact path={routeURL.cms.login()} component={LoginPage} />
            <Route
              exact
              path={routeURL.web.client_login()}
              component={ClientLoginPage}
            />
            <Route path={routeURL.web.new_user()} component={NewUserPage} />
            <Route path={routeURL.cms.home()} component={AdminLayout} />
            <Route path={routeURL.web.home()} component={ClientLayout} />
          </Switch>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
