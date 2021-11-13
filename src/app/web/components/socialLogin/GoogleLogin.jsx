import GoogleLoginButton from "react-google-login";
import { useContext } from "react";
import { GoogleIcon } from "image/icon-svg";
import { JwtService } from "services/jwtServiceClient";
import { LOGIN_USER_CLIENT, UserContext, UserLoginContext } from "context";
import { notificationSuccess } from "app/web/components/notification";
import "./index.css";
import PropTypes from "prop-types";
import { handleError } from "services/util";

export const GoogleLogin = function ({ onSuccess, text = "" }) {
  // const [isVisible, setVisible] = useContext(UserLoginContext);
  const { clientDispatch } = useContext(UserContext);

  const responseGoogle = (response) => {
    if (onSuccess && typeof onSuccess === "function")
      return onSuccess(response.tokenId);

    if (response.tokenId) {
      JwtService.signInWithGoogle(response.tokenId)
        .then((message) => {
          console.log("message", message);
          notificationSuccess(message);
          clientDispatch({ type: LOGIN_USER_CLIENT });
          // setVisible(false);
        })
        .catch(handleError);
      // .finally(() => setSpinning(false));
    }
  };
  return (
    <GoogleLoginButton
      render={(renderProps) => {
        // console.log("Googlee renderProps", renderProps);
        return (
          <span
            className="auth-login google-login"
            // disabled={renderProps.disabled}
            onClick={renderProps.onClick}
          >
            <GoogleIcon
              component={GoogleIcon}
              style={{
                verticalAlign: 3,
              }}
            />
            <span
              style={{
                marginLeft: 8,
              }}
            >
              Google
            </span>
          </span>
        );
      }}
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Login With Google"
      onSuccess={responseGoogle}
      onFailure={(...rest) => {
        console.log("Googlee onfailure", ...rest);
      }}
      cookiePolicy={"single_host_origin"}
    />
  );
};
GoogleLogin.prototype = {
  onSuccess: PropTypes.func,
  text: PropTypes.string,
};
