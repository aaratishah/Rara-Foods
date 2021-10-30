import axios from 'axios';
import config from 'config';

let api = axios.create({
  baseURL: config.API_HOST,
});

const url = {
  client_logging: '/api/clientLogging',
  auth_admin: '/api/admin',
  auth_restaurant: '/api/restaurant-admin',
  region: '/api/restaurant-region',
  restaurant: '/api/restaurant',
  food: '/api/food',
  food_category: '/api/food-category',
  dietary_plan: '/api/dietary-plan',
  food_group_restaurant: '/api/food-group-restaurant',
  food_and_beverage: '/api/food-and-beverage',
  community: '/api/community-forum',
  image: '/api/imageUpload',
  log: '/api/log',
  contact_message: '/api/contact-message',
  dashbaord: '/api/dashboard',
  client: '/api/client',
  send_email: '/api/email',
  food_speciality: '/api/food-speciality',
  restaurant_package: '/api/restaurant-package',
  rider: '/api/rider/auth',
  order: '/api/order',
  orderGuest: '/api/order-guest',
  shipping_charge: '/api/shipping-charge',
  tax: '/api/tax',
  terms_and_condition: '/api/terms-and-condition',
  privacy_policy: '/api/privacy-policy',
  coupon: '/api/coupon',
  commission: '/api/settings/commission',
  fare: '/api/settings/fare',
  vehicle_type: '/api/settings/vehicle-type',
  settings: '/api/settings/configuration',
  sms: '/api/settings/sms',
  email: '/api/settings/emailCamp',
  customer_notification: '/api/customer/notification',
  rider_notification: '/api/rider/notification',
  customer_review: '/api/customer/review',
  rider_review: '/api/rider/review',
  customer_query: '/api/customer/query',
  rider_query: '/api/rider/query',
  withdraw: '/api/rider/withdraw',
  payment: '/api/ride/payment',
  restaurant_withdraw: '/api/restaurant/withdraw',
  rider_payment_method: '/api/rider/payment-method',
  ride: '/api/ride',
  promotion: '/api/featured',

};

const parse_res = (api) =>
  new Promise((resolve, reject) => {
    api.then((res) => resolve(res.data)).catch((err) => reject(err));
  });

const generateParams = (params) => {
  let query = '';
  if (params) {
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
  terms: {
    read: () => parse_res(api.get(`${url.terms_and_condition}/`)),
    save_terms_condition: (body) => parse_res(api.post(`${url.terms_and_condition}/`,body)),
  },
  privacy_policy: {
    read: () => parse_res(api.get(`${url.privacy_policy}/`)),
    save_privacy_policy: (body) => parse_res(api.post(`${url.privacy_policy}/`,body)),
  },
  systemData: {
    commission: getAPIList(url.commission),
    fare: getAPIList(url.fare),
    vehicle_type: getAPIList(url.vehicle_type),
  },
  shipping_charge: {
    save: (data) => parse_res(api.post(`${url.shipping_charge}/`, data)),
    read: (itemId) => parse_res(api.get(`${url.shipping_charge}/id/${itemId}`)),
    readAll: () => parse_res(api.get(`${url.shipping_charge}/`)),
    delete: (itemId) =>
      parse_res(api.delete(`${url.shipping_charge}/${itemId}`)),
    deleteMany: (ids) =>
      parse_res(api.post(`${url.shipping_charge}/many`, { ids })),
    toggle: (itemId, toggleStatus) =>
      parse_res(
        api.put(`${url.shipping_charge}/toggle/${itemId}/${toggleStatus}`)
      ),
  },
  tax: {
    save: (data) => parse_res(api.post(`${url.tax}/`, data)),
    read: (itemId) => parse_res(api.get(`${url.tax}/id/${itemId}`)),
    readAll: () => parse_res(api.get(`${url.tax}/`)),
    delete: (itemId) => parse_res(api.delete(`${url.tax}/${itemId}`)),
    deleteMany: (ids) => parse_res(api.post(`${url.tax}/many`, { ids })),
    toggle: (itemId, toggleStatus) =>
      parse_res(api.put(`${url.tax}/toggle/${itemId}/${toggleStatus}`)),
  },
  order: {
    addFood: (data) => parse_res(api.put(`${url.order}/add`, data)),
    removeFood: (orderId, foodCartId) => parse_res(api.put(`${url.order}/remove`, {
      orderId,
      cartFoodId: foodCartId,
    })),
    read: (itemId) => parse_res(api.get(`${url.order}/id/${itemId}`)),
    addRemark: (itemId, remarks) =>
      parse_res(
        api.put(`${url.order}/remarks/${itemId}`, {
          remarks,
        })
      ),
    orderStatus: (itemId, status) =>
      parse_res(
        api.put(`${url.order}/status/${itemId}`, {
          status,
        })
      ),
    paymentStatus: (itemId, status) =>
      parse_res(
        api.put(`${url.order}/payment-status/${itemId}`, {
          status,
        })
      ),
    allPendingOrder: () => parse_res(api.get(`${url.order}/pending-order`)),
    allCompletedOrder: () => parse_res(api.get(`${url.order}/completed-order`)),
    upcomingOrder: () => parse_res(api.get(`${url.order}/upcoming-order`)),
    delete: (itemId) => parse_res(api.delete(`${url.order}/${itemId}`)),
    deleteMany: (ids) => parse_res(api.post(`${url.order}/many`, { ids })),
    toggle: (itemId, toggleStatus) =>
      parse_res(api.put(`${url.order}/toggle/${itemId}/${toggleStatus}`)),
  },
  orderGuest: {
    read: (itemId) => parse_res(api.get(`${url.orderGuest}/id/${itemId}`)),
    addRemark: (itemId, remarks) =>
      parse_res(
        api.put(`${url.orderGuest}/remarks/${itemId}`, {
          remarks,
        })
      ),
    orderStatus: (itemId, status) =>
      parse_res(
        api.put(`${url.orderGuest}/status/${itemId}`, {
          status,
        })
      ),
    paymentStatus: (itemId, status) =>
      parse_res(
        api.put(`${url.orderGuest}/payment-status/${itemId}`, {
          status,
        })
      ),
    delete: (itemId) => parse_res(api.delete(`${url.order}/${itemId}`)),
    deleteMany: (ids) => parse_res(api.post(`${url.order}/many`, { ids })),
    toggle: (itemId, toggleStatus) =>
      parse_res(api.put(`${url.order}/toggle/${itemId}/${toggleStatus}`)),
  },
  clientLoggingURL: {
    send: (errorMessage) =>
      parse_res(
        api.post(`${url.client_logging}/log-client-errors`, {
          errorMessage,
        })
      ),
  },
  dashbaord: {
      countService: () => parse_res(api.get(`${url.dashbaord}/count`)),
      ecommerce: () => parse_res(api.get(`${url.dashbaord}/ecommerce`)),
      orderDetail: () => parse_res(api.get(`${url.dashbaord}/order-detail`)),
    },
  email: {
    send: (emailData) =>
      parse_res(api.post(`${url.send_email}/send`, emailData)),
  },
  refer: {
    rider_refer: () => parse_res(api.get(`/api/rider/refer/`)),
    customer_refer: () => parse_res(api.get(`/api/customer/refer/`)),
  },
  image: {
    upload: (image) => parse_res(api.post(`${url.image}/upload`, image)),
    delete: (fileName) => parse_res(api.delete(`${url.image}/${fileName}`)),
  },
  auth: {
    admin: {
      authenticate: (emailOrUsername, password) =>
        api.post(`${url.auth_admin}/login`, { emailOrUsername, password }),
      register: (user) =>
        parse_res(api.post(`${url.auth_admin}/register`, user)),
      editUser: (user) =>
        parse_res(api.post(`${url.auth_admin}/editUser`, user)),
      changePassword: (user) =>
        parse_res(api.post(`${url.auth_admin}/changePassword`, user)),
      read: (userId) => parse_res(api.get(`${url.auth_admin}/id/${userId}`)),
      currentUser: () => parse_res(api.get(`${url.auth_admin}/current`)),
      readAll: () => parse_res(api.get(`${url.auth_admin}/list`)),
      delete: (adminId) =>
        parse_res(api.delete(`${url.auth_admin}/${adminId}`)),
      deleteMany: (ids) =>
        parse_res(api.post(`${url.auth_admin}/delete/many`, { ids })),
    },
    restaurant: {
      authenticate: (emailOrUsername, password) =>
        api.post(`${url.auth_restaurant}/login`, { emailOrUsername, password }),
      editUser: (user) =>
        parse_res(api.post(`${url.auth_restaurant}/editUser`, user)),
      changePassword: (user) =>
        parse_res(api.post(`${url.auth_restaurant}/changePassword`, user)),
      read: (userId) =>
        parse_res(api.get(`${url.auth_restaurant}/id/${userId}`)),
      currentUser: () => parse_res(api.get(`${url.auth_restaurant}/current`)),
      readAll: () => parse_res(api.get(`${url.auth_restaurant}/list`)),
      delete: (adminId) =>
        parse_res(api.delete(`${url.auth_restaurant}/${adminId}`)),
      deleteMany: (ids) =>
        parse_res(api.post(`${url.auth_restaurant}/delete/many`, { ids })),
    },
  },
  region: {
    save: (data) => parse_res(api.post(`${url.region}/`, data)),
    read: (itemId) => parse_res(api.get(`${url.region}/id/${itemId}`)),
    readAll: () => parse_res(api.get(`${url.region}/`)),
    delete: (itemId) => parse_res(api.delete(`${url.region}/id/${itemId}`)),
    deleteMany: (ids) =>
      parse_res(api.post(`${url.region}/delete/many`, { ids })),
    toggle: (itemId, toggleStatus) =>
      parse_res(api.put(`${url.region}/toggle/${itemId}/${toggleStatus}`)),
    isUnique: (uniqueKey, value, itemId) =>
      parse_res(
        api.get(`${url.region}/is-unique/${uniqueKey}/${value}/${itemId}`)
      ),
  },
  dietary_plan: {
    save: (data) => parse_res(api.post(`${url.dietary_plan}/`, data)),
    read: (itemId) => parse_res(api.get(`${url.dietary_plan}/id/${itemId}`)),
    readAll: () => parse_res(api.get(`${url.dietary_plan}/`)),
    delete: (itemId) =>
      parse_res(api.delete(`${url.dietary_plan}/id/${itemId}`)),
    deleteMany: (ids) =>
      parse_res(api.post(`${url.dietary_plan}/delete/many`, { ids })),
    toggle: (itemId, toggleStatus) =>
      parse_res(
        api.put(`${url.dietary_plan}/toggle/${itemId}/${toggleStatus}`)
      ),
    isUnique: (uniqueKey, value, itemId) =>
      parse_res(
        api.get(`${url.dietary_plan}/is-unique/${uniqueKey}/${value}/${itemId}`)
      ),
  },
  food_speciality: {
    save: (data) => parse_res(api.post(`${url.food_speciality}/`, data)),
    read: (itemId) => parse_res(api.get(`${url.food_speciality}/id/${itemId}`)),
    readAll: () => parse_res(api.get(`${url.food_speciality}/`)),
    delete: (itemId) =>
      parse_res(api.delete(`${url.food_speciality}/id/${itemId}`)),
    deleteMany: (ids) =>
      parse_res(api.post(`${url.food_speciality}/delete/many`, { ids })),
    toggle: (itemId, toggleStatus) =>
      parse_res(
        api.put(`${url.food_speciality}/toggle/${itemId}/${toggleStatus}`)
      ),
    isUnique: (uniqueKey, value, itemId) =>
      parse_res(
        api.get(
          `${url.food_speciality}/is-unique/${uniqueKey}/${value}/${itemId}`
        )
      ),
  },
  restaurant: {
    save: (data) => parse_res(api.post(`${url.restaurant}/`, data)),
    read: (itemId) => parse_res(api.get(`${url.restaurant}/id/${itemId}`)),
    readAll: () => parse_res(api.get(`${url.restaurant}/`)),
    delete: (itemId) => parse_res(api.delete(`${url.restaurant}/id/${itemId}`)),
    deleteMany: (ids) =>
      parse_res(api.post(`${url.restaurant}/delete/many`, { ids })),
    toggle: (itemId, toggleStatus) =>
      parse_res(api.put(`${url.restaurant}/toggle/${itemId}/${toggleStatus}`)),
    isUnique: (uniqueKey, value, itemId) =>
      parse_res(
        api.get(`${url.restaurant}/is-unique/${uniqueKey}/${value}/${itemId}`)
      ),
    resetPassword: (restaurant) =>
      parse_res(api.put(`${url.restaurant}/reset-password`, {
        restaurant
      })),
    foodWithGroup: (restaurantId) =>
      parse_res(api.get(`${url.restaurant}/food-with-group/${restaurantId}`)),

    read_pending: () => parse_res(api.get(`${url.restaurant}/status/pending`)),
    read_rejected: () => parse_res(api.get(`${url.restaurant}/status/rejected`)),
    read_suspend: () => parse_res(api.get(`${url.restaurant}/status/suspend`)),
    accept_restaurant_request: (itemId) => parse_res(api.put(`${url.restaurant}/status/accept/${itemId}`)),
    suspend_restaurant_request: (itemId, data) => parse_res(api.put(`${url.restaurant}/suspend/${itemId}`,data)),
    reject_restaurant_request: (itemId) => parse_res(api.put(`${url.restaurant}/status/reject/${itemId}`)),
    pending_restaurant_request: (itemId) => parse_res(api.put(`${url.restaurant}/status/pending/${itemId}`)),
    document_incomplete_restaurant_request: (itemId, body) => parse_res(api.put(`${url.restaurant}/status/insufficient-information/${itemId}`, body)),
    wallet: () =>parse_res(api.get(`${url.restaurant}/wallet/user`)),
  },
  rider: {
    ...getAPIList(url.rider),
      add: (data) => parse_res(api.post(`${url.rider}/add`, data)),
      edit: (riderId, data) => parse_res(api.post(`${url.rider}/edit/?rider=${riderId}`, data)),
      read: (itemId) => parse_res(api.get(`${url.rider}/info/${itemId}`)),
      readAll: () => parse_res(api.get(`${url.rider}/`)),
      read_pending: () => parse_res(api.get(`${url.rider}/status/pending`)),
      read_rejected: () => parse_res(api.get(`${url.rider}/status/rejected`)),
      read_suspend: () => parse_res(api.get(`${url.rider}/status/suspend`)),
      accept_rider_request: (riderId) => parse_res(api.put(`${url.rider}/status/accept/${riderId}`)),
      suspend_rider_request: (riderId, data) => parse_res(api.put(`${url.rider}/suspend/${riderId}`,data)),
      reject_rider_request: (riderId) => parse_res(api.put(`${url.rider}/status/reject/${riderId}`)),
      pending_rider_request: (riderId) => parse_res(api.put(`${url.rider}/status/pending/${riderId}`)),
      document_incomplete_rider_request: (riderId, body) => parse_res(api.put(`${url.rider}/status/insufficient-information/${riderId}`, body)),
      validate_rider: (riderId) => parse_res(api.get(`${url.rider}/validate/${riderId}`)),
      search_rider: (searchBody) => parse_res(api.put(`${url.rider}/search`, searchBody)),
      paymentMethod: (riderId) => parse_res(api.get(`${url.rider_payment_method}/user/?rider=${riderId}`)),
      withdraw: (riderId) => parse_res(api.get(`/api/rider/withdraw/user/?rider=${riderId}`)),
      review: (riderId) => parse_res(api.get(`${url.rider_review}/all/${riderId}`)),
      wallet: (riderId) => parse_res(api.get(`/api/rider/wallet/user/?rider=${riderId}`)),
      walletLoad: (riderId) => parse_res(api.get(`/api/rider/wallet/user/all-load/?rider=${riderId}`)),
      query: (riderId) => parse_res(api.get(`/api/rider/query/user/?rider=${riderId}`)),
      expiring_document: () => parse_res(api.get('/api/rider/auth/expiring-document'))
  },
  ride: {
    history: {
      readAll: () => parse_res(api.get(`${url.ride}/history`))
    },
    pending: {
      readAll: () => parse_res(api.get(`${url.ride}/pending`))
    },
    active: {
      readAll: () => parse_res(api.get(`${url.ride}/active`))
    },
    cancelled: {
      readAll: () => parse_res(api.get(`${url.ride}/cancelled`))
    },
  },
  payment: {
    earning_list: (from, to) => parse_res(api.get(`${url.payment}/earning/list/?from=${from}&to=${to}`)),
    sweat_coin: (from, to) => parse_res(api.get(`${url.payment}/rider-wallet/list/?from=${from}&to=${to}`))
  },
  withdraw: {
    request:  {
      ...getAPIList(url.withdraw),
      readAll: () => parse_res(api.get(`${url.withdraw}/request`)),
      accept: (itemId) =>
        parse_res(api.put(`${url.withdraw}/success/${itemId}`)),
      cancel: (itemId) =>
        parse_res(api.put(`${url.withdraw}/cancel/${itemId}`)),
    },
    successful: () => parse_res(api.get(`${url.withdraw}/success`)),
    cancelled: () => parse_res(api.get(`${url.withdraw}/cancelled`)),
  },
  restaurant_withdraw: {
    request:  {
      ...getAPIList(url.restaurant_withdraw),
      readAll: () => parse_res(api.get(`${url.restaurant_withdraw}/request`)),
      accept: (itemId) =>
        parse_res(api.put(`${url.restaurant_withdraw}/success/${itemId}`)),
      cancel: (itemId) =>
        parse_res(api.put(`${url.restaurant_withdraw}/cancel/${itemId}`)),
    },
    requestWithdraw: () => parse_res(api.post(`${url.restaurant_withdraw}/`)),
    successful: () => parse_res(api.get(`${url.restaurant_withdraw}/success`)),
    cancelled: () => parse_res(api.get(`${url.restaurant_withdraw}/cancelled`)),
    user: () => parse_res(api.get(`${url.restaurant_withdraw}/user`)),
  },
  query: {
    customer: getAPIList(url.customer_query),
    rider: getAPIList(url.rider_query),
    customer_respond: (customerId, body) =>
      parse_res(api.put(`${url.customer_query}/respond/${customerId}`, body)),
    rider_respond: (riderId, body) =>
      parse_res(api.put(`${url.rider_query}/respond/${riderId}`, body)),
  },
  review: {
    customer: getAPIList(url.customer_review),
    rider: getAPIList(url.rider_review),
  },
  notification: {
    customer: getAPIList(url.customer_notification),
    rider: getAPIList(url.rider_notification),
  },
  coupon: {
    coupon_code: {
      ...getAPIList(url.coupon),
      isUnique: (code, itemId=undefined) => parse_res(api.get(`${url.coupon}/is-unique/${code}/${itemId}`)),

    },
    coupon_usage: null,
  },
  food_category: {
    save: (data) => parse_res(api.post(`${url.food_category}/`, data)),
    read: (itemId) => parse_res(api.get(`${url.food_category}/id/${itemId}`)),
    readAll: () => parse_res(api.get(`${url.food_category}/`)),
    delete: (itemId) =>
      parse_res(api.delete(`${url.food_category}/id/${itemId}`)),
    deleteMany: (ids) =>
      parse_res(api.post(`${url.food_category}/delete/many`, { ids })),
    toggle: (itemId, toggleStatus) =>
      parse_res(
        api.put(`${url.food_category}/toggle/${itemId}/${toggleStatus}`)
      ),
    isUnique: (uniqueKey, value, itemId) =>
      parse_res(
        api.get(
          `${url.food_category}/is-unique/${uniqueKey}/${value}/${itemId}`
        )
      ),
  },
  food_group_restaurant: {
    save: (data) => parse_res(api.post(`${url.food_group_restaurant}/`, data)),
    read: (itemId) =>
      parse_res(api.get(`${url.food_group_restaurant}/id/${itemId}`)),
    readAll: () => parse_res(api.get(`${url.food_group_restaurant}/`)),
    delete: (itemId) =>
      parse_res(api.delete(`${url.food_group_restaurant}/id/${itemId}`)),
    deleteMany: (ids) =>
      parse_res(api.post(`${url.food_group_restaurant}/delete/many`, { ids })),
    toggle: (itemId, toggleStatus) =>
      parse_res(
        api.put(`${url.food_group_restaurant}/toggle/${itemId}/${toggleStatus}`)
      ),
    isUnique: (uniqueKey, value, itemId) =>
      parse_res(
        api.get(
          `${url.food_group_restaurant}/is-unique/${uniqueKey}/${value}/${itemId}`
        )
      ),
  },
  food: {
    save: (data) => parse_res(api.post(`${url.food}/`, data)),
    read: (itemId) => parse_res(api.get(`${url.food}/id/${itemId}`)),
    readAll: () => parse_res(api.get(`${url.food}/`)),
    delete: (itemId) => parse_res(api.delete(`${url.food}/id/${itemId}`)),
    deleteMany: (ids) =>
      parse_res(api.post(`${url.food}/delete/many`, { ids })),
    toggle: (itemId, toggleStatus) =>
      parse_res(api.put(`${url.food}/toggle/${itemId}/${toggleStatus}`)),
    isUnique: (uniqueKey, value, itemId) =>
      parse_res(
        api.get(`${url.food}/is-unique/${uniqueKey}/${value}/${itemId}`)
      ),
  },
  restaurant_package: {
    save: (data) => parse_res(api.post(`${url.restaurant_package}/`, data)),
    read: (itemId) =>
      parse_res(api.get(`${url.restaurant_package}/id/${itemId}`)),
    readAll: () => parse_res(api.get(`${url.restaurant_package}/list`)),
    delete: (itemId) =>
      parse_res(api.delete(`${url.restaurant_package}/id/${itemId}`)),
    deleteMany: (ids) =>
      parse_res(api.post(`${url.restaurant_package}/delete/many`, { ids })),
    toggle: (itemId, toggleStatus) =>
      parse_res(
        api.put(`${url.restaurant_package}/toggle/${itemId}/${toggleStatus}`)
      ),
    isUnique: (uniqueKey, value, itemId) =>
      parse_res(
        api.get(
          `${url.restaurant_package}/is-unique/${uniqueKey}/${value}/${itemId}`
        )
      ),
  },
  log: {
    readAll: () => parse_res(api.get(`${url.log}/all`)),
  },
  contact_message: {
    read: (itemId) => parse_res(api.get(`${url.contact_message}/id/${itemId}`)),
    readAll: () => parse_res(api.get(`${url.contact_message}/`)),
    delete: (itemId) =>
      parse_res(api.delete(`${url.contact_message}/${itemId}`)),
    deleteMany: (ids) =>
      parse_res(api.post(`${url.contact_message}/delete/many`, { ids })),
    toggle: (itemId, toggleStatus) =>
      parse_res(
        api.put(`${url.contact_message}/toggle/${itemId}/${toggleStatus}`)
      ),
  },
  client: {
    read: (itemId) => parse_res(api.get(`${url.client}/id/${itemId}`)),
    readAll: () => parse_res(api.get(`${url.client}/list`)),
    delete: (itemId) => parse_res(api.delete(`${url.client}/id/${itemId}`)),
    deleteMany: (ids) =>
      parse_res(api.post(`${url.client}/delete/many`, { ids })),
    toggle: (itemId, toggleStatus) =>
      parse_res(api.put(`${url.client}/toggle/${itemId}/${toggleStatus}`)),
  },
  promotion: {
    readPromotion: () => parse_res(api.get(`${url.promotion}/`)),
    sendPromotion: (data) => parse_res(api.post(`${url.promotion}/`, data)),
    deletePromotion: (itemId) =>
      parse_res(api.delete(`${url.promotion}/id/${itemId}`)),
    deleteManyPromotion: (data) =>
      parse_res(api.delete(`${url.promotion}/delete/many`, { ids: data })),
    toggle: (itemId, toggleStatus) =>
      parse_res(api.put(`${url.promotion}/toggle/${itemId}/${toggleStatus}`)),
  },
  settings: {
    update: (data) => parse_res(api.post(`${url.settings}/`, data)),
    read: () => parse_res(api.get(`${url.settings}/`)),
    readSMS: () => parse_res(api.get(`${url.sms}/`)),
    sendSMS: (data) => parse_res(api.post(`${url.sms}/`, data)),
    readEmail: () => parse_res(api.get(`${url.email}/`)),
    sendEmail: (data) => parse_res(api.post(`${url.email}/`, data)),
  },
  constant: (constant) => parse_res(api.get(`/api/constant/${constant}`)),
};
