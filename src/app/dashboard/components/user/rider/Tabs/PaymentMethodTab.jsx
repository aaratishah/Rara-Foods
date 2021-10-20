import React, {useEffect, useState} from "react";
import {Card, Row} from "antd";
import api from "app/dashboard/api";
import {handleError} from "services/util";
import Spinner from "../../../Spinner";

const Item = ({item}) => (
    <Card
        style={{
            width: '100%',
            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        }}
    >
        <div className="col-md-12 media">
            <div className="media-body">
                <Row>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Payment Method Name :</label>
                            <p>{item?.name}</p>
                        </div>
                    </div>
                    {
                        item?.isBank ? <>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Bank Name :</label>
                                    <p>Citizens Bank</p>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Branch Name :</label>
                                    <p>{item?.bank?.branch || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Account Name :</label>
                                     <p>{item?.bank?.accountName || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Account Number :</label>
                                     <p>{item?.bank?.accountNumber || 'N/A'}</p>
                                </div>
                            </div>
                        </> : <div className="col-sm-6">
                            <div className="form-group">
                                <label>Phone Number :</label>
                                 <p>{item?.phone || 'N/A'}</p>
                            </div>
                        </div>
                    }

                </Row>
                <span className="text-muted pull-right"></span>
            </div>
        </div>
    </Card>
);
const PaymentMethodTab = ({rider}) => {
    const [spinning, setSpinning] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {
        if (rider) {
            setSpinning(true);
            api.rider
                .paymentMethod(rider)
                .then(({ data }) => setData(data))
                .catch(handleError)
                .finally(() => setSpinning(false));
        }
    }, []);

    return  spinning ? <Spinner /> : (
        <div className="tab-pane fade show active" id="pills-review">
            <h6 className="view-title">Saved Payment Method</h6>
            <Row gutter={[16,16]}>
                {(Array.isArray(data) && data.length > 0) ? data?.map(item => <Item item={item} />) : <span className='text-muted'>No saved payment method found!</span>}
            </Row>
        </div>
    );
};

export default PaymentMethodTab;
