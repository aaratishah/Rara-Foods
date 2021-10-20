import dev from "./dev";

const config = dev;
export const PRIVILEGE_RESTAURANT = "restaurant";
export const PRIVILEGE_ADMIN = "admin";
export default config;
export const CMS_TITLE = "RARA Foods";
export const CONTACT = "488825974";
export const EMAIL = "info@rarafoods.com.au";
export const ADDRESS = "288 Marrickville Road  Marrickville, New South Wales 2204";
export const COUNTRY_CODE = "+61";

// PAGE TITLES HERE
export const FOOD_AND_BEVERAGE_PAGE_TITLE =
"RARA Foods | Get Your Food Delivered on time";
export const COMMUNITY_PAGE_TITLE = "";

export const FOOD_BEVERAGE_MENU_IMAGE_SIZE = "720×480";
export const GALLERY_IMAGE_SIZE = "720×320";
export const FOOD_CATEGORY_IMAGE_SIZE = "200×200";
export const MAX_GALLERY_IMAGE_SIZE = 2; //in MB
export const IMAGE_FORMAT_GALLERY = ["image/jpeg", "image/png"]; //in MB
export const LOGO_IMAGE_SIZE = "128×128";
export const RIDER_PHOTO_IMAGE_SIZE = "512*512";

export const CONTACT_MESSAGE_SUCCESS_TITLE =
	"Successfully Recorded your message";
export const CONTACT_MESSAGE_SUCCESS_SUBTITLE =
	"Thank you for reaching us. Our support team will contact you soon";

export const FACEBOOK_LINK = "https://www.facebook.com/rara-foods";
export const INSTA_LINK = "";

export const COMMUNITY_POST_SUCCESS_TITLE =
	"Successfully Recorded your Question";
export const COMMUNITY_POST_SUCCESS_SUBTITLE =
	"Thank you for reaching us. Our support team will contact you soon";
export const mapCenterDefault = { latitude: -35.041241, longitude: 139.2153163515625 };
export const ACCOUNT_TYPE_DEFAULT = 'email-password';
export const ACCOUNT_TYPE_GOOGLE = 'google';
export const ACCOUNT_TYPE_FACEBOOK = 'facebook';

// local storage keys
export const CART_LOCAL_STORAGE = "carts"
export const CART_RESTAURANT_LOCAL_STORAGE = "carts_restaurant";
export const NOT_INSTALL_APP='NOT_INSTALL_APP';

export const socketEvents = {
	RIDE_STATUS: 'RIDE_STATUS',
	RIDE_REQUEST: 'RIDE_REQUEST',
	RIDE_ACCEPT: 'RIDE_ACCEPT',
	RIDE_MEET: 'RIDE_MEET',
	RIDE_CANCEL: 'RIDE_CANCEL',
	RIDE_DROP: 'RIDE_DROP',
	GET_RIDE_ADMIN: 'GET_RIDE_ADMIN',
	RIDE_STATUS_ADMIN: 'ride-status-admin',
	SINGLE_RIDER_LOCATION: 'SINGLE_RIDER_LOCATION',
	online_riders: 'online-riders',
};

export const rideStatus = {
	UNAUTHORIZED: 'UNAUTHORIZED',
	ERROR: 'ERROR',
	REQUEST_PENDING: 'REQUEST_PENDING',
	REQUEST_ACCEPTED: 'REQUEST_ACCEPTED',
	REQUEST_MEET: 'REQUEST_MEET',
	REQUEST_DROPPED: 'REQUEST_DROPPED',
	REQUEST_COMPLETED: 'REQUEST_COMPLETED',
	REQUEST_REJECTED_BY_RIDER: 'REQUEST_REJECTED_BY_RIDER',
	REQUEST_REJECTED_BY_CUSTOMER: 'REQUEST_REJECTED_BY_CUSTOMER',
	REQUEST_REJECTED_BY_ADMIN: 'REQUEST_REJECTED_BY_ADMIN',
	NO_RIDER_FOUND: 'NO_RIDER_FOUND',
};

export const activeRideStatus = {
	PENDING: 'PENDING',
	ACCEPTED: 'ACCEPTED',
	MEET: 'MEET',
	DROPPED: 'DROPPED',
	COMPLETED: 'COMPLETED',
	REJECTED_BY_RIDER: 'REJECTED_BY_RIDER',
	REJECTED_BY_CUSTOMER: 'REJECTED_BY_CUSTOMER',
	REJECTED_BY_ADMIN: 'REJECTED_BY_ADMIN',
};
