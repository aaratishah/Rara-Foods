import React, {useEffect, useState} from "react";
import api from "../../../../api";
import {handleError} from "../../../../../../services/util";
import moment from "moment";
import Spinner from "../../../Spinner";

const WithdrawTab = ({rider}) => {
    const [spinning, setSpinning] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {
        if (rider) {
            setSpinning(true);
            api.rider
                .withdraw(rider)
                .then(({ data }) => setData(data))
                .catch(handleError)
                .finally(() => setSpinning(false));
        }
    }, [rider]);

    return spinning ? <Spinner /> : (
        <div className="tab-pane fade show active" id="pills-withdraw">
            <div className="my-account-details account-wrapper">
                <h4 className="account-title">Withdraw Details</h4>
                <div className="view-table text-center mt-30 table-responsive">
                    <table className="table table-hover table-bordered">
                        <thead className="thead-dark">
                        <tr>
                            <th className="name">S.N</th>
                            <th className="date">Date</th>
                            <th className="date">Amount</th>
                            <th className="status">Payment Method</th>
                            <th className="action">Payment Details</th>
                            <th className="action">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(Array.isArray(data) && data.length > 0) ? data?.map((item, idx) => {
                            return (
                              <tr>
                                <td>{idx + 1}</td>
                                <td>
                                  <p>
                                    {item.createdDateTime
                                      ? moment(data?.createdDateTime).format(
                                          "DD/MM/YYYY"
                                        )
                                      : "N/A"}
                                  </p>
                                </td>
                                <td>{item?.amount || "N/A"}</td>
                                <td>{item?.paymentDetail?.isBank ? "Bank" : "e-Wallet"}</td>
                                {item?.paymentDetail?.isBank ? (
                                  <td>
                                      Account Number : {item?.paymentDetail?.bank?.accountNumber || 'N/A'}
                                    <br />
                                    Account Name : {item?.paymentDetail?.bank?.accountName || 'N/A'}
                                    <br />
                                    Bank Name : {item?.paymentDetail?.bank?.name || 'N/A'} <br />
                                    Branch : {item?.paymentDetail?.bank?.branch || 'N/A'} <br />
                                  </td>
                                ) : (
                                  <td>
                                    Phone : {item?.paymentDetail?.phone || 'N/A'}
                                    <br />
                                  </td>
                                )}
                                <td>
                                  {item.transactionStatus === "DONE" ? (
                                    <span className="badge badge-success">
                                      Done
                                    </span>
                                  ) : item.transactionStatus === "CANCELLED" ? (
                                    <span className="badge badge-danger">
                                      Cancelled
                                    </span>
                                  ) : (
                                    <span className="badge badge-secondary">
                                      Pending
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                        }) : <span className='text-muted'>No Withdraw found!</span>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WithdrawTab;
