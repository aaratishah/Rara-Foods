import homeAppConfig from './home/route';
import userManagementConfig from './user_management/route';
import CommunityForum from './communityForum/route';
import MyAccountPage from './myAccount/route';
import Log from './log/route';
import ContactMessagePage from './contactMessage/route';
import ClientListPage from './clientList/route';
import RegionConfig from './region/route';
import RestaurantConfig from './restaurant/route';
import FoodCategoryConfig from './foodCategory/route';
import FoodGroupRestaurantConfig from './foodGroupRestaurant/route';
import DietaryPlanConfig from './dietaryPlan/route';
import FoodSpecialityConfig from './foodSpeciality/route';
import FoodConfig from './food/route';
import RestaurantPackageConfig from './restaurantPackage/route';
import RiderConfig from './rider/route';
import RideConfig from './ride_new/route';
import PendingOrderConfig from './order/pendingOrder/route';
import upcomingOrderConfig from './order/upcomingOrder/route';
import CompletedOrderConfig from './order/completedOrder/route';
import DeliveryChargeConfig from "./deiveryCharge/route";
import TaxConfig from './tax/route';
import SettingConfig from "./settings/route";
import SystemDataPageConfig from "./system_data/route";
import CouponConfig from "./coupon/route";
import notificationConfig from "./notification/route";
import paymentConfig from "./payment/route";
import referConfig from "./refer/route";
import reviewConfig from "./review/route";
import riderWithdrawConfig from "./rider_withdraw/route";
import restaurantWithdrawConfig from "./restaurant_withdraw/route";
import queryConfig from "./query/route";
// import rideConfig from "./ride/route";

export default [
  homeAppConfig,
  DeliveryChargeConfig,
  TaxConfig,
  userManagementConfig,
  ...RiderConfig,
  ...RideConfig,
  ...SystemDataPageConfig,
  RegionConfig,
  DietaryPlanConfig,
  FoodSpecialityConfig,
  FoodCategoryConfig,
  FoodGroupRestaurantConfig,
  RestaurantPackageConfig,
  FoodConfig,
  CommunityForum,
  MyAccountPage,
  Log,
  ContactMessagePage,
  ClientListPage,
  PendingOrderConfig,
  CompletedOrderConfig,
  upcomingOrderConfig,
  ...RestaurantConfig,
  ...SettingConfig,
  ...CouponConfig,
  ...notificationConfig,
  ...paymentConfig,
  ...referConfig,
  ...reviewConfig,
  ...riderWithdrawConfig,
  ...restaurantWithdrawConfig,
  ...queryConfig,
  // ...rideConfig
];
