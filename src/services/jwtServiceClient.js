import jwtDecode from 'jwt-decode';
import api from 'app/web/api';
import { v4 as uuidv4 } from 'uuid';
import { message } from 'antd';
import { notificationSuccess } from 'app/web/components/notification';
export const JwtService = {
  signInWithPhone(user) {
    return new Promise((resolve, reject) =>
      api.auth
        .signinPhone(user)
        .then((response) => {
          resolve(response.data);
        })
        .catch(reject)
    );
  },
  signInWithGoogle(tokenId) {
    return new Promise((resolve, reject) =>
      api.auth
        .googleLogin(tokenId)
        .then((response) => {
          let {
            token,
            message
          } = response.data;
          if (token) {
            this.setSession(token);
            resolve(message);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          reject(error.response);
        })
    );
  },
  signInWithFacebook(accessToken, userId) {
    return new Promise((resolve, reject) =>
      api.auth
        .facebookLogin(accessToken, userId)
        .then((response) => {
          let {
            token,
            message
          } = response.data;
          if (token) {
            this.setSession(token);
            resolve(message);
          } else {
            reject(response.data.error);
          }
        })
        .catch((error) => {
          reject(error.response);
        })
    );
  },

  setSession(access_token) {
    if (access_token) {
      localStorage.setItem('jwt_access_token_client', access_token);
      api.baseAxios.defaults.headers.common['Authorization'] = access_token;
      window.location.reload(true);
    } else {
      localStorage.removeItem('jwt_access_token_client');
      delete api.baseAxios.defaults.headers.common['Authorization'];
    }
  },

  logout() {
    this.setSession(null);
  },

  isAuthTokenValid(access_token) {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      return false;
    } else {
      return true;
    }
  },
  isUserEmailVerified() {
    const access_token = this.getAccessToken();
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    return decoded.isVerified;
  },

  getAccessToken() {
    return window.localStorage.getItem('jwt_access_token_client');
  },
  // getUUID() {
  //   return window.localStorage.getItem('jwt_UUID_client');
  // },
  assignUUID() {
    let currentUUID = window.localStorage.getItem('jwt_UUID_client');
    if (!currentUUID) {
      currentUUID = uuidv4();
      if (api) {
        api.baseAxios.defaults.headers.common['Authorization'] = currentUUID;
        localStorage.setItem('jwt_UUID_client', currentUUID);
      }
    }
    return currentUUID;
  },
  getRegion() {
    return window.localStorage.getItem('user_selected_region');
  },
  assignRegion(regionId) {
    if (regionId) {
      localStorage.setItem('user_selected_region', regionId);
    }
  },
  resendOTP(body) {
    return new Promise((resolve, reject) =>
      api.auth
        .resendOTP(body)
        .then((response) => {
          resolve(response.data);
        })
        .catch(reject)
    );
  },
  resendOtpUpdatePhone(body) {
    return new Promise((resolve, reject) =>
      api.auth
        .resendOtpUpdatePhone(body)
        .then((response) => {
          resolve(response.data);
        })
        .catch(reject)
    );
  },
  verifyOTP(body) {
    return new Promise((resolve, reject) =>
      api.auth
        .verifyOTP(body)
        .then((response) => {
          this.setSession(response.data.token);
          resolve(response.data);
        })
        .catch(reject)
    );
  },
  verifyOtpAndUpdatePhone(body) {
    return new Promise((resolve, reject) =>
      api.auth
        .verifyOtpAndUpdatePhone(body)
        .then((response) => {
          this.setSession(response.data.token);
          resolve(response.data);
        })
        .catch(reject)
    );
  },
  linkGoogle(tokenId) {
    return new Promise((resolve, reject) =>
      api.auth
        .linkGoogle(tokenId)
        .then(({message}) => resolve(message))
        .catch(reject)
    );
  },
  linkFacebook(accessToken, userID) {
    return new Promise((resolve, reject) =>
      api.auth
        .linkFacebook(accessToken, userID)
        .then(({message}) => resolve(message))
        .catch(reject)
    );
  }
};
