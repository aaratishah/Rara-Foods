import axios from 'axios';
import config from 'config';
import { JwtService } from 'services/jwtServiceClient';

// let api = axios;
let api = axios.create({
  baseURL: config.API_HOST,
});

const guestHeader = {
  headers: {
    Authorization: JwtService.assignUUID(),
  },
};

const url = {
  auth_client: '/api/client',
  food_and_beverage: '/api/food-and-beverage',
  restaurant: '/api/restaurant',
  food: '/api/food',
  community: '/api/community-forum',
  image: '/api/imageUpload',
  contact_message: '/api/contact-message',
  dashbaord: '/api/dashboard',
  restaurantPackage: '/api/restaurant-package',
  foodCategory: '/api/food-category',
  region: '/api/restaurant-region',
  cart: '/api/cart',
  cartGuest: '/api/cart-guest',
  order: '/api/order',
  orderGuest: '/api/order-guest',
  address: '/api/deliveryAddress',
  rider: '/api/rider/auth',
  terms_and_condition: '/api/terms-and-condition',
  review: '/api/review',
  vehicle_type: '/api/settings/vehicle-type',
  featured_restaurant: '/api/featured'
};

const parse_res = (api) =>
  new Promise((resolve, reject) => {
    api.then((res) => resolve(res.data)).catch((err) => reject(err));
  });

const generateParams = (query, params) => {
  // let query = '';
  if (params) {
    const appendString = Object.keys(params)
      .map((currKey) => `${currKey}=${params[currKey]}`)
      .join('&');
    if (appendString) query += `/?${appendString}`;
  }
  return query;
};

const getAPIList = (url) => ({
  save: (data) => parse_res(api.post(`${url}/`, data)),
  read: (itemId) => parse_res(api.get(`${url}/id/${itemId}`)),
  readAll: () => parse_res(api.get(`${url}/`)),
  delete: (itemId) => parse_res(api.delete(`${url}/${itemId}`)),
  deleteMany: (ids) => parse_res(api.post(`${url}/many`, { ids })),
  toggle: (itemId, toggleStatus) =>
    parse_res(api.put(`${url}/toggle/${itemId}/${toggleStatus}`)),
});

export default {
  baseAxios: api,
  dashbaord: {
    countService: () => parse_res(api.get(`${url.dashbaord}/count`)),
  },
  image: {
    upload: (image) => parse_res(api.post(`${url.image}/upload`, image)),
    delete: (fileName) => parse_res(api.delete(`${url.image}/${fileName}`)),
  },
  review: {
    read: (restaurantId) =>
      parse_res(api.get(`${url.review}/restaurant/${restaurantId}`)),
    canIRate: (restaurantId) =>
      parse_res(api.get(`${url.review}/can-i-rate/${restaurantId}`)),
    add: (data) => parse_res(api.post(`${url.review}`, data)),
  },
  config: {
    read_terms_and_condition: () =>
      parse_res(api.get(`${url.terms_and_condition}/`)),
    read_policy: () => parse_res(api.get(`/api/privacy-policy/`)),
    saveNewsletter: (data) => parse_res(api.post(`/api/newsletter/`, data)),
    promote: () => parse_res(api.get(`/api/ecommerce/promote/`)),
    wishlist: () => parse_res(api.get(`/api/wishlist/`)),
    saveWishlist: (restaurantId) =>
      parse_res(api.put(`/api/wishlist/${restaurantId}`)),
    wishlistStatus: (restaurantId) =>
      parse_res(api.get(`/api/wishlist/${restaurantId}`)),
  },

  client: {
    me: () => parse_res(api.get(`${url.auth_client}/current`)),
    order: () => parse_res(api.get(`${url.order}/user`)),
    editProfile: (data) => parse_res(api.post(`${url.auth_client}/edit`, data)),
    isUsernameUnique: (username) =>
      parse_res(api.get(`${url.auth_client}/is-unique-username/${username}`)),
  },
  auth: {
    resendOTP: (body) => api.put(`${url.auth_client}/resend-pin`, body),
    resendOtpUpdatePhone: (body) => api.put(`${url.auth_client}/resend-pin-update-phone`, body),
    verifyOTP: (body) => api.put(`${url.auth_client}/validate-pin`, body),
    verifyOtpAndUpdatePhone: (body) => api.put(`${url.auth_client}/update-phone`, body),
    linkGoogle: (tokenId) =>
      api.post(`${url.auth_client}/link-google`, {
        tokenId,
      }),
    googleLogin: (tokenId) =>
      api.post(`${url.auth_client}/google-login`, {
        tokenId,
      }),
    facebookLogin: (accessToken, userId) =>
      api.post(`${url.auth_client}/facebook-login`, {
        accessToken,
        userId,
      }),
    linkFacebook: (accessToken, userId) =>
      api.post(`${url.auth_client}/link-facebook`, {
        accessToken,
        userId,
      }),
    unlink: (data) => {
      api.put(`${url.auth_client}/unlink-social`, data)
    },
    signinPhone: (user) => api.post(`${url.auth_client}/signin`, user),
    register: (user) => api.post(`${url.auth_client}/register`, user),
    current: () => parse_res(api.get(`${url.auth_client}/current`)),
    forgetPassword: (emailOrUsername) =>
      parse_res(
        api.get(`${url.auth_client}/forget-password/${emailOrUsername}`)
      ),
    forgetUsername: (email) =>
      parse_res(api.get(`${url.auth_client}/forget-username/${email}`)),
    validatePIN: (emailOrUsername, PIN) =>
      parse_res(
        api.get(`${url.auth_client}/validate-pin/${emailOrUsername}/${PIN}`)
      ),
    resetPassword: (password, token) => {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      return parse_res(
        api.post(
          `${url.auth_client}/reset-password/`,
          {
            password,
          },
          {
            headers,
          }
        )
      );
    },
    resendEmailConfirmationLink: () =>
      parse_res(api.get(`${url.auth_client}/resend-email-confirmation-link`)),
    validateEmailConfirmationLink: (token) =>
      parse_res(api.get(`${url.auth_client}/verify-email-from-token/${token}`)),
  },
  food_and_beverage: {
    read: (itemId) =>
      parse_res(api.get(`${url.food_and_beverage}/id/${itemId}`)),
    readAll: () => parse_res(api.get(`${url.food_and_beverage}/`)),
  },
  restaurant: {
    request: (data) => parse_res(api.post(`${url.restaurant}/request`, data)),
    read: (itemId) => parse_res(api.get(`${url.restaurant}/id/${itemId}`)),
    foodWithGroup: (restaurantId) =>
      parse_res(api.get(`${url.restaurant}/food-with-group/${restaurantId}`)),
    readAll: () => parse_res(api.get(`${url.restaurant}/`)),
    readRestaurantByCategory: (itemId) =>
      parse_res(api.get(`${url.restaurant}/category/${itemId}`)),
    readRestaurantByRegion: (itemId) =>
      parse_res(api.get(`${url.restaurant}/region/${itemId}`)),
    readRestaurantNearMe: (lat, lng) =>
      parse_res(api.get(`${url.restaurant}/near-me/${lat}/${lng}`)),
    dietary_plan: () => parse_res(api.get(`/api/dietary-plan/`)),
    featured_restaurant: () =>
      parse_res(api.get(`${url.featured_restaurant}/`)),
  },
  food: {
    read: (itemId) => parse_res(api.get(`${url.food}/id/${itemId}`)),
  },
  region: {
    readAll: () => parse_res(api.get(`${url.region}/`)),
  },
  restaurant_package: {
    read: (itemId) =>
      parse_res(api.get(`${url.restaurantPackage}/id/${itemId}`)),
    foodWithGroup: (restaurantId) =>
      parse_res(
        api.get(`${url.restaurantPackage}/food-with-group/${restaurantId}`)
      ),
    readAll: (params) => parse_res(api.get(generateParams(`${url.restaurantPackage}`,{...params, region: JwtService.getRegion()}))),
  },
  food_category: {
    read: (itemId) => parse_res(api.get(`${url.foodCategory}/id/${itemId}`)),
    readAll: () => parse_res(api.get(`${url.foodCategory}/`)),
  },
  community: {
    readAll: () =>
      parse_res(api.get(`${url.community}/question-list-with-count-answer`)),
    postQuestion: (data) => parse_res(api.post(`${url.community}/`, data)),
    postAnswer: (data) =>
      parse_res(api.post(`${url.community}/threadAnswer`, data)),
    readThread: (threadId) =>
      parse_res(api.get(`${url.community}/thread-question/${threadId}`)),
    readReplies: (threadId) =>
      parse_res(api.get(`${url.community}/thread-replies/${threadId}`)),
  },
  rider: {
    request: (data) => parse_res(api.post(`${url.rider}/`, data)),
    add: (data) => parse_res(api.post(`${url.rider}/add`, data)),
  },
  jobs: {
    read: (itemId) => parse_res(api.get(`${url.jobs}/id/${itemId}`)),
    readAll: () => parse_res(api.get(`${url.jobs}/`)),
  },
  jobs_application: {
    apply: (data) => parse_res(api.post(`${url.jobs_application}/`, data)),
  },
  cart: {
    add: (cartBody) => parse_res(api.post(`${url.cart}/`, cartBody)),
    fetch: () => parse_res(api.get(`${url.cart}/user`)),
    delete: (cartId) => parse_res(api.delete(`${url.cart}/user/${cartId}`)),
    changeQuantity: (cartId, quantity) =>
      parse_res(api.put(`${url.cart}/change-quantity/${cartId}/${quantity}`)),
    checkout: (data) => parse_res(api.post(`${url.cart}/checkout`, data)),
    reOrder: (data) => parse_res(api.post(`${url.cart}/re-order-add-to-cart`, data)),
  },
  cartGuest: {
    add: (cartBody) =>
      parse_res(api.post(`${url.cartGuest}/`, cartBody, guestHeader)),
    fetch: () => parse_res(api.get(`${url.cartGuest}/user`, guestHeader)),
    delete: (cartId) =>
      parse_res(api.delete(`${url.cartGuest}/user/${cartId}`, guestHeader)),
    changeQuantity: (cartId, quantity) =>
      parse_res(
        api.put(
          `${url.cartGuest}/change-quantity/${cartId}/${quantity}`,
          {},
          guestHeader
        )
      ),
    order: () => parse_res(api.get(`${url.order}/user`, guestHeader)),
    checkout: (data) =>
      parse_res(api.post(`${url.cartGuest}/checkout`, data, guestHeader)),
  },
  checkout: {
    myOrder: () => parse_res(api.get(`${url.order}/user`)),
    orderDetail: (itemId) => parse_res(api.get(`${url.order}/id/${itemId}`)),
    get: () => parse_res(api.get(`${url.order}/get-checkout-item`)),
    stipePayment: () => parse_res(api.post(`${url.order}/payment-stripe`)),
    placeOrder: (data) => parse_res(api.put(`${url.order}/place-order`, data)),
    delete: (orderId) => parse_res(api.delete(`${url.order}/user/${orderId}`)),
  },
  checkoutGuest: {
    // myOrder: () => parse_res(api.get(`${url.orderGuest}/user`)),
    // orderDetail: (itemId) => parse_res(api.get(`${url.orderGuest}/id/${itemId}`)),
    get: () =>
      parse_res(api.get(`${url.orderGuest}/get-checkout-item`, guestHeader)),
    stipePayment: () =>
      parse_res(api.post(`${url.orderGuest}/payment-stripe`, {}, guestHeader)),
    placeOrder: (data) =>
      parse_res(api.put(`${url.orderGuest}/place-order`, data, guestHeader)),
    delete: (orderId) =>
      parse_res(api.delete(`${url.orderGuest}/user/${orderId}`, guestHeader)),
  },
  deliveryAddress: {
    save: (data) => parse_res(api.post(`${url.address}/`, data)),
    get: () => parse_res(api.get(`${url.address}/user`)),
    delete: (itemId) => parse_res(api.delete(`${url.address}/user/${itemId}`)),
  },
  systemData: {
    commission: getAPIList(url.commission),
    fare: getAPIList(url.fare),
    vehicle_type: getAPIList(url.vehicle_type),
    vehicle_type_auth_no_required: getAPIList(url.vehicle_type+'/user'),
  },
  saveContactMessage: (message) =>
    parse_res(api.post(`${url.contact_message}/`, message)),
};
