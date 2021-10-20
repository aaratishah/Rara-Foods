/* eslint-disable import/no-anonymous-default-export */
import activeRestaurantConfig from './activeRestaurant/route';
import requestRestaurantConfig from './restaurantRequest/route';
import rejectedRestaurantConfig from "./rejectedRider/route";
import restaurantWalletConfig from "./wallet/route";

export default [
    activeRestaurantConfig,
    requestRestaurantConfig,
    rejectedRestaurantConfig,
    restaurantWalletConfig,
];
