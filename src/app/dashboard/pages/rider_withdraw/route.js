/* eslint-disable import/no-anonymous-default-export */
import withdrawRequest from './withdrawRequest/route';
import successfulWithdraw from './successfulWithdraw/route';
import cancelledWithdraw from './cancelledWithdraw/route';

export default [
    withdrawRequest,
    successfulWithdraw,
    cancelledWithdraw,
];
