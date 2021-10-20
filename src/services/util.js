import { notificationError } from 'app/web/components/notification';
import moment from 'moment';

export const getFullWebsite = (url) => {
  if (!url) return '/';
  else if (url.startsWith('http')) return url;
  else return `http://${url}`;
};

export const isVendorIdValid = (vendorId) => {
  return !!vendorId;
};

export const isProductIdValid = (productId) => {
  return !!productId;
};
export const getActualPriceNumber = (product) => {
  return product.price || 0;
};

export const handleError = (error) => {
  console.log('handleError', error);
  if (error && error.response && error.response.data) {
    if (typeof error.response.data === 'string')
      return notificationError(error.response.data);
    if (typeof error.response.data.message === 'string')
      return notificationError(error.response.data.message);
    let errors = error.response.data;
    if (errors && errors.errors) errors = errors.errors;
    Object.keys(errors).map((key) => notificationError(errors[key]));
  }
};

export const getOrderStatus = () => [
  // 'pending',
  // 'checkedOut',
  'acknowledged',
  'preparing',
  'pickup',
  'delivered',
  'outOfStock',
  'rejectedByAdmin',
  'cancelByUser',
];

export const getPaymentStatus = () => ['pending', 'paid', 'error'];
export const getPromotionRequestStatus = () => [
  'pending',
  'accepted',
  'rejected',
];

export const orderStatus = {
  pending: 'Pending',
  checkedOut: 'Checked out',
  acknowledged: 'Acknowledged',
  preparing: 'Preparing',
  pickup: 'Picked up',
  delivered: 'Delivered',
  outOfStock: 'Out Of Stock',
  rejectedByAdmin: 'Admin Rejected',
  cancelByUser: 'You cancelled',
};

export const paymentStatus = {
  STRIPE: 'Stripe',
  CASH_ON_DELIVERY: 'Cash On Delivery',
  DIRECT_BANK_TRANSFER: 'Direct Bank Transfer',
  CHECK_PAYMENT: 'CheckPayment',
};
var format = 'HH:mm:ss';
const days = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

export const isRestaurantOpenNow = (openTime) => {
  const isBetweenTimeNow = (startTime, endTime) => {
    if (startTime && endTime) {
      startTime = new Date(startTime);
      endTime = new Date(endTime);
      let time = new Date();
      const beforeTime = startTime.getHours() * 60 + startTime.getMinutes();
      const afterTime = endTime.getHours() * 60 + endTime.getMinutes();
      const currentTime = time.getHours() * 60 + time.getMinutes();
      return currentTime < afterTime && currentTime > beforeTime;
    } else return false;
  };

  if (!openTime) return false;
  if (typeof openTime !== 'object') return false;
  const { isSameTimeEveryDay, everyday } = openTime;
  if (isSameTimeEveryDay) {
    if (!everyday) return false;
    return isBetweenTimeNow(everyday.startTime, everyday.endTime);
  } else {
    const todaysDay = days[moment().day()];
    if (!todaysDay) return false;
    const day = openTime[todaysDay];
    if (day.isClosed) return false;
    return isBetweenTimeNow(day.startTime, day.endTime);
  }
};

export const riderRequestStatus = [
  {
    label: 'Pending',
    value: 'PENDING',
    default: true,
  },
  {
    label: 'Accepted',
    value: 'ACCEPTED',
  },
  {
    label: 'Rejected',
    value: 'REJECTED',
  },
  {
    label: 'Incomplete Information',
    value: 'INCOMPLETE_INFORMATION',
  },
];
