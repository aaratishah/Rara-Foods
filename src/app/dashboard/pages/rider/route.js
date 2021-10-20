/* eslint-disable import/no-anonymous-default-export */
import riderRequestConfig from './riderRequest/route';
import riderRejectedConfig from './rejectedRider/route';
import activeRiderConfig from './activeRider/route';
import searchRiderConfig from './searchRider/route';
import suspendedRider from './suspendedRider/route';
import expiringDocConfig from './expiringDoc/route';

export default [
    activeRiderConfig,
    riderRejectedConfig,
    riderRequestConfig,
    searchRiderConfig,
    suspendedRider,
    expiringDocConfig,
];
