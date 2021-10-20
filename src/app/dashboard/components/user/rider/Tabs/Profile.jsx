import React from "react";
import moment from "moment";
import Spinner from "../../../Spinner";
import { getRiderName } from 'app/dashboard/components/user/rider/RiderName';

const ProfileTab = ({profile}) => {
    if(!profile) return <Spinner />
    return (
        <div className="tab-pane fade show active" id="pills-dashboard">
            <div className="account-wrapper">
                <h6 className="view-title">Rider's personal Details</h6>
                <hr/>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Phone number</label>
                            <p>{profile?.phone || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Email : </label>
                            <p>{profile?.email || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Full Name : </label>
                            <p>{getRiderName(profile?.name) || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Secondary Phone number : </label>
                            <p>{profile?.secondaryPhone || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Grand Father Name : </label>
                            <p>{profile?.grandFatherName || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label> Father Name : </label>
                            <p>{profile?.fatherName || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Mother Name : </label>
                            <p>{profile?.motherName || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Date Of Birth : </label>
                            <p>{profile.dob ? moment(profile?.dob).format('DD/MM/YYYY') : 'N/A'}</p>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Blood Group : </label>
                            <p>{profile?.bloodGroup || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Gender : </label>
                            <p>{profile?.gender || 'N/A'}</p>
                        </div>
                    </div>
                </div>
                <h6 className="view-title">Rider's Current Address</h6>
                <hr/>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Street Address : </label>
                            <p>{profile?.currentAddress?.street || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>City : </label>
                            <p>{profile?.currentAddress?.city || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>State : </label>
                            <p>{profile?.currentAddress?.state || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileTab;
