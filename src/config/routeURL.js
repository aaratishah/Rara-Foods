export const routeURL = {
  cms: {
    home: () => "/admin",
    login: () => "/admin/login",
    promote: () => "/admin/promote",
    terms_and_condition: () => "/admin/terms-and-condition",
    privacy_policy: () => "/admin/privacy-policy",
    pending_order: () => "/admin/pending-order",
    completed_order: () => "/admin/completed-order",
    upcoming_order: () => "/admin/upcoming-order",
    contact_message: () => "/admin/contact-message",
    restaurant_earning: () => "/admin/restaurant-earning",
    company_earning: () => "/admin/company-earning",
    account: () => "/admin/my-account",
    error404: () => "/admin/errors/error-404",
    shipping_charge: () => "/admin/shipping-charge",
    shipping_charge_add: () => `/admin/shipping-charge/add`,
    shipping_charge_edit: (itemId) =>
      `/admin/shipping-charge/edit/${itemId ? itemId : ":itemId"}`,
    tax: () => "/admin/tax",
    tax_add: () => `/admin/tax/add`,
    tax_edit: (itemId) => `/admin/tax/edit/${itemId ? itemId : ":itemId"}`,
    region: () => "/admin/region",
    region_add: () => `/admin/region/add`,
    region_edit: (itemId) =>
      `/admin/region/edit/${itemId ? itemId : ":itemId"}`,
    food_category: () => "/admin/category-food",
    food_category_add: () => `/admin/category-food/add`,
    food_category_edit: (itemId) =>
      `/admin/category-food/edit/${itemId ? itemId : ":itemId"}`,

    search_rider: () => "/admin/search-rider",
    rider_request: () => "/admin/rider-request",
    rider_request_add: () => `/admin/rider-request/add`,
    rider_request_edit: (itemId) =>
      `/admin/rider-request/edit/${itemId ? itemId : ":itemId"}`,
    rider_view: (itemId) =>
      `/admin/rider-request/view/${itemId ? itemId : ":itemId"}`,

    expiring_document: () => "/admin/expiring_document",
    rider_rejected: () => "/admin/rider-rejected",
    rider_rejected_add: () => `/admin/rider-rejected/add`,
    rider_rejected_edit: (itemId) =>
      `/admin/rider-rejected/edit/${itemId ? itemId : ":itemId"}`,

    rider_active: () => "/admin/rider-active",
    rider_suspend: () => "/admin/rider-suspend",

    rider: () => "/admin/rider",
    rider_add: () => `/admin/rider/add`,
    rider_edit: (itemId) => `/admin/rider/edit/${itemId ? itemId : ":itemId"}`,
    rider_request_verify: (itemId) =>
      `/admin/rider/verify/${itemId ? itemId : ":itemId"}`,
    dietary_plan: () => "/admin/dietary-plan",
    dietary_plan_add: () => `/admin/dietary-plan/add`,
    dietary_plan_edit: (itemId) =>
      `/admin/dietary-plan/edit/${itemId ? itemId : ":itemId"}`,
    food_speciality: () => "/admin/speciality-food",
    food_speciality_add: () => `/admin/speciality-food/add`,
    food_speciality_edit: (itemId) =>
      `/admin/speciality-food/edit/${itemId ? itemId : ":itemId"}`,
    restaurant_request: () => "/admin/restaurant-request",
    restaurant_rejected: () => "/admin/restaurant-rejected",
    restaurant: () => "/admin/active-restaurant",
    restaurant_add: () => `/admin/active-restaurant/add`,
    restaurant_edit: (itemId) =>
      `/admin/active-restaurant/edit/${itemId ? itemId : ":itemId"}`,
    food_group_restaurant: () => "/admin/restaurant-food-group",
    food_group_restaurant_add: () => `/admin/restaurant-food-group/add`,
    food_group_restaurant_edit: (itemId) =>
      `/admin/restaurant-food-group/edit/${itemId ? itemId : ":itemId"}`,
    food: () => "/admin/food",
    food_add: () => `/admin/food/add`,
    food_edit: (itemId) => `/admin/food/edit/${itemId ? itemId : ":itemId"}`,
    restaurant_package: () => "/admin/restaurant-package",
    restaurant_package_add: () => `/admin/restaurant-package/add`,
    restaurant_package_edit: (itemId) =>
      `/admin/restaurant-package/edit/${itemId ? itemId : ":itemId"}`,
    food_and_beverage: () => "/admin/food-and-beverage",
    food_and_beverage_add: () => `/admin/food-and-beverage/add`,
    food_and_beverage_edit: (itemId) =>
      `/admin/food-and-beverage/edit/${itemId ? itemId : ":itemId"}`,
    community: () => "/admin/community",
    community_add: () => `/admin/community/add`,
    community_edit: (itemId) =>
      `/admin/community/edit/${itemId ? itemId : ":itemId"}`,
    community_edit_answer: (questionId, threadid) =>
      `/admin/community-answer/${questionId ? questionId : ":questionId"}/${
        threadid ? threadid : ":itemId"
      }`,
    user_management: () => "/admin/user-management",
    user_management_add: () => `/admin/user-management/add`,
    user_management_edit: (userId) =>
      `/admin/user-management/edit/${userId ? userId : ":userId"}`,
    client_list: () => "/admin/client-list",
    log: () => "/admin/log-list",

    commission: () => "/admin/commission",
    commission_add: () => `/admin/commission/add`,
    commission_edit: (itemId) =>
      `/admin/commission/edit/${itemId ? itemId : ":itemId"}`,
    commission_view: (itemId) =>
      `/admin/commission/view/${itemId ? itemId : ":itemId"}`,

    fare: () => "/admin/fare",
    fare_add: () => `/admin/fare/add`,
    fare_edit: (itemId) => `/admin/fare/edit/${itemId ? itemId : ":itemId"}`,
    fare_view: (itemId) => `/admin/fare/view/${itemId ? itemId : ":itemId"}`,

    sms_campaign: () => "/admin/sms-campaign",
    sms_campaign_add: () => "/admin/sms-campaign/add",

    email_campaign: () => "/admin/email-campaign",
    email_campaign_add: () => "/admin/email-campaign/add",

    vehicle_type: () => "/admin/vehicle-type",
    vehicle_type_add: () => `/admin/vehicle-type/add`,
    vehicle_type_edit: (itemId) =>
      `/admin/vehicle-type/edit/${itemId ? itemId : ":itemId"}`,
    vehicle_type_view: (itemId) =>
      `/admin/vehicle-type/view/${itemId ? itemId : ":itemId"}`,

    settings: () => "/admin/settings",
    settings_edit: () => "/admin/settings/edit",

    coupon_code: () => "/admin/coupon-code",
    coupon_usage: () => "/admin/coupon-usage",
    coupon_code_add: () => `/admin/coupon-code/add`,
    coupon_code_edit: (itemId) =>
      `/admin/coupon-code/edit/${itemId ? itemId : ":itemId"}`,
    coupon_code_view: (itemId) =>
      `/admin/coupon-code/view/${itemId ? itemId : ":itemId"}`,

    customer_review: () => "/admin/customer-review",
    customer_review_add: () => `/admin/customer-review/add`,
    customer_review_edit: (itemId) =>
      `/admin/customer-review/edit/${itemId ? itemId : ":itemId"}`,
    customer_review_view: (itemId) =>
      `/admin/customer-review/view/${itemId ? itemId : ":itemId"}`,

    rider_review: () => "/admin/rider-review",
    rider_review_add: () => `/admin/rider-review/add`,
    rider_review_edit: (itemId) =>
      `/admin/rider-review/edit/${itemId ? itemId : ":itemId"}`,
    rider_review_view: (itemId) =>
      `/admin/rider-review/view/${itemId ? itemId : ":itemId"}`,
    customer_refer: () => "/admin/customer-refer",
    rider_refer: () => `/admin/rider-refer`,

    customer_query: () => "/admin/customer-query",
    customer_query_view: (itemId) =>
      `/admin/customer-query/view/${itemId ? itemId : ":itemId"}`,
    rider_query: () => `/admin/rider-query`,
    rider_query_view: (itemId) =>
      `/admin/rider-query/view/${itemId ? itemId : ":itemId"}`,

    customer_notification: () => "/admin/customer-notification",
    customer_notification_add: () => `/admin/customer-notification/add`,
    customer_notification_edit: (itemId) =>
      `/admin/customer-notification/edit/${itemId ? itemId : ":itemId"}`,
    customer_notification_view: (itemId) =>
      `/admin/customer-notification/view/${itemId ? itemId : ":itemId"}`,

    rider_notification: () => "/admin/rider-notification",
    rider_notification_add: () => `/admin/rider-notification/add`,
    rider_notification_edit: (itemId) =>
      `/admin/rider-notification/edit/${itemId ? itemId : ":itemId"}`,
    rider_notification_view: (itemId) =>
      `/admin/rider-notification/view/${itemId ? itemId : ":itemId"}`,

    earning_payment: () => "/admin/earning-payment",
    hyre_cash_payment: () => "/admin/hyre-cash-payment",
    sweat_coin_payment: () => "/admin/sweat-coin-payment",

    restaurant_withdraw_request: () => "/admin/restaurant-withdraw-request",
    restaurant_withdraw_request_add: () =>
      `/admin/restaurant-withdraw-request/add`,
    restaurant_withdraw_request_view: (itemId) =>
      `/admin/restaurant-withdraw-request/view/${itemId ? itemId : ":itemId"}`,
    restaurant_successful_withdraw: () =>
      "/admin/restaurant-successful-withdraw",
    restaurant_cancelled_withdraw: () => "/admin/restaurant-cancelled-withdraw",

    withdraw_request: () => "/admin/withdraw-request",
    withdraw_request_add: () => `/admin/withdraw-request/add`,
    withdraw_request_view: (itemId) =>
      `/admin/withdraw-request/view/${itemId ? itemId : ":itemId"}`,

    successful_withdraw: () => "/admin/successful-withdraw",
    successful_withdraw_add: () => `/admin/successful-withdraw/add`,
    successful_withdraw_view: (itemId) =>
      `/admin/successful-withdraw/view/${itemId ? itemId : ":itemId"}`,

    cancelled_withdraw: () => "/admin/cancelled-withdraw",
    cancelled_withdraw_add: () => `/admin/cancelled-withdraw/add`,
    cancelled_withdraw_view: (itemId) =>
      `/admin/cancelled-withdraw/view/${itemId ? itemId : ":itemId"}`,

    //ride History
    ride_history: () => "/admin/ride-history",
    ride_history_add: () => `/admin/ride-history/add`,
    ride_history_edit: (itemId) =>
      `/admin/ride-history/edit/${itemId ? itemId : ":itemId"}`,
    ride_history_view: (itemId) =>
      `/admin/ride-history/view/${itemId ? itemId : ":itemId"}`,

    // ride list
    cancelled_ride: () => "/admin/cancelled-ride",
    pending_ride: () => "/admin/pending-history",
    active_ride: () => "/admin/active-history",
  },
  web: {
    search: () => `/search`,
    home: () => "/",
    new_user: () => "/login/new-user",
    terms_and_condition: () => "/terms-and-condition",
    privacy_policy: () => "/privacy-policy",
    forget_password: () => "/forget-password",
    my_account: (tabValue) => `/account/dashboard/${tabValue || ":tabValue"}`,
    cart: () => "/shop/cart",
    checkout: () => "/shop/checkout",
    rider_request: () => "/rider-request",
    restaurant_request: () => "/restaurant-request",
    forget_username: () => "/forget-username",
    confirm_email: () => "/confirm-email",
    aboutUs: () => "/about-us",
    contactUs: () => "/contact-us",
    error404: () => "/errors/error-404",
    client_login: () => "/login",
    client_register: () => "/register",
    food_and_beverage: () => "/food-and-beverage",
    cart_edit_item: (itemId) => `/cart-edit/${itemId || ":itemId"}`,
    food_and_beverage_detail: (itemId) =>
      `/food-and-beverage/${itemId || ":itemId"}`,
    restaurant_detail: (itemId) => `/restaurant/${itemId || ":itemId"}`,
    community: () => "/community",
    community_detail: (itemId) => `/community/${itemId || ":itemId"}`,
    restaurant_list: (queryString) =>
      `/restaurants/${queryString ? "?" + queryString : ""}`,
  },
  params: (link, query) => `${link}/?${query}`,
};

export default routeURL;
