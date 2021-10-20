import React, {useEffect, useState} from "react";
import api from "app/dashboard/api";
import {handleError} from "services/util";
import moment from "moment";
import Spinner from "../../../Spinner";

const WalletTab = ({customer}) => {
  const [spinning, setSpinning] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (customer) {
      setSpinning(true);
      api.rider
          .wallet(customer)
          .then(({ data }) => setData(data))
          .catch(handleError)
          .finally(() => setSpinning(false));
    }
  }, [customer]);

  return  spinning ? <Spinner /> : (
    <div className="tab-pane fade show active" id="pills-wallet">
      <div className="my-account-details account-wrapper">
        <h6 className="view-title">Wallet Detail</h6>
        <hr />
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <label>Remaining Balance (Sweat Coins):</label>
              <p>{data?.availableBalance || "N/A"}</p>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label>Last Earning Date : </label>
              <p>
                {data?.lastDepositDate
                  ? moment(data?.lastDepositDate).format("DD/MM/YYYY")
                  : "N/A"}
                {data?.lastDepositDate && (
                    <span className='ml-2'>
                  ({moment(data?.lastDepositDate).fromNow()})
                </span>)}
              </p>


            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label>Last Earning Amount  (Sweat Coins) : </label>
              <p>{data?.lastAddedAmount || "N/A"}</p>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label>Last Withdrawal Date : </label>
              <p>
                {data?.lastWithdrawDate
                  ? moment(data?.lastWithdrawDate).format("DD/MM/YYYY")
                  : "N/A"}
                {data?.lastWithdrawDate && (
                    <span className='ml-2'>
                  ({moment(data?.lastWithdrawDate).fromNow()})
                </span>)}
              </p>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label>Last Withdrawal Amount  (Sweat Coins) : </label>
              <p>{data?.lastWithdrawAmount || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletTab;
