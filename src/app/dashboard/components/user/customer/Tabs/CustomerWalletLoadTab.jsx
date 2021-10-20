import React, {useEffect, useState} from "react";
import api from "../../../../api";
import {handleError} from "../../../../../../services/util";
import moment from "moment";
import Spinner from "../../../Spinner";

const CustomerWalletLoadTab = ({customer}) => {
    const [spinning, setSpinning] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {
        if (customer) {
            setSpinning(true);
            api.client
                .walletLoad(customer)
                .then(({ data }) => setData(data))
                .catch(handleError)
                .finally(() => setSpinning(false));
        }
    }, [customer]);

    return  spinning ? <Spinner /> :  (
        <div className="tab-pane fade show active" id="pills-earning">
            <h6 className="view-title">Deposits</h6>
            <hr/>
            <div className="view-table text-center mt-30 table-responsive">
                <table className="table table-hover table-bordered">
                    <thead className="thead-dark">
                    <tr>
                        <th className="name">S.N</th>
                        <th className="date">Date</th>
                        <th className="date">Source</th>
                        <th className="status">Earning</th>
                        <th className="action">Description</th>
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
                            <td>
                              <p>{item?.source || "N/A"}</p>
                            </td>
                            <td>{item?.amount || "N/A"}</td>
                            <td>{item?.description}</td>
                            <td>
                              {item.transactionStatus === 'DONE' ?
                                <span className="badge badge-success">
                                  Done
                                </span> : item.transactionStatus === 'CANCELLED' ?
                                      <span className="badge badge-danger">
                                  Cancelled
                                </span> : <span className="badge badge-secondary">
                                  Pending
                                </span>
                              }
                            </td>
                          </tr>
                        );
                    }) : <span className='text-muted'>No Deposits found!</span>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerWalletLoadTab;
