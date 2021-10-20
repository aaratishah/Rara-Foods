import React from "react";
import config from "../../../../../../config";
import {ImagePreview} from "../../../previewImage/ImagePreview";
import {Avatar} from "antd";
import moment from "moment";

const VehicleTab = ({vehicle}) => {
    return (
        <div className="tab-pane fade show active" id="pills-order">
            <div className="my-account-order account-wrapper">
                <div className="account-wrapper">
                    <h6 className="view-title">Rider's Vehicle Details</h6>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="form-group">
                                <label>Vehicle Image :</label>
                                <br/>
                                <div className="head-widget vehicle-img">
                                    <ImagePreview src={vehicle?.image} width={150} />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Vehicle Type :</label>
                              <p>{vehicle?.vehicleType?.name || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Vehicle Number : </label>
                              <p>{vehicle?.vehicleNumber || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Vehicle Brand/Model : </label>
                              <p>{vehicle?.model || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Vehicle Color : </label>
                              <p>{vehicle?.color ? <Avatar style={{
                                  backgroundColor: vehicle?.color
                              }} /> :  'N/A'}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Vehicle Issue Date : </label>
                                <p>{vehicle?.issuedDate ? moment(vehicle?.issuedDate).format('DD/MM/YYYY') : 'N/A'}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label> Vehicle Issue From : </label>
                              <p>{vehicle?.issuedPlace || 'N/A'}</p>
                            </div>
                        </div>
                        {/* TODO Commission rate populate from api and show it here*/}
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Commission Type : </label>
                              <p>{vehicle?.email || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Commission rate : </label>
                              <p>{vehicle?.email || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleTab;
