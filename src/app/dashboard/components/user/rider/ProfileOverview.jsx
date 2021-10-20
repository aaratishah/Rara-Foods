import React from "react";
import profileImage from "image/user.png";
import {ImagePreview} from "../../previewImage/ImagePreview";
import RiderName, { getRiderName } from 'app/dashboard/components/user/rider/RiderName';

const ProfileOverview = ({profile, customerReview, onRateClick, customerProfile = false,}) => {
    return (
        <div className="head-widget img-profile flex flex-row">
            <ImagePreview src={profile?.photo} fallback={profileImage} width={75}/>
            <span>
        <p>
          <label className="text-mute">Name : </label> {customerProfile ? <RiderName rider={profile}/> :  getRiderName(profile?.name)}
        </p>
        <p>
          <label className="text-mute">Email : </label> {profile?.email}
        </p>
        <p>
          <label className="text-mute">Phone : </label> {profile?.phone}
        </p>
        <p>
          <label className="text-mute">Gender : </label> {profile?.gender}
        </p>
      </span>
            <p
                className="review pointer-event"
                style={{
                    cursor: "pointer",
                }}
                onClick={onRateClick}
            >
                {[...Array(5).keys()].map((each) => (
                    <i
                        className="fas fa-star"
                        style={{
                            color: each + 1 <= customerReview?.rating && "#f5b223",
                        }}
                    />
                ))}
                <a className="ml-2">
                    {customerReview?.reviews?.length || 0} customer{" "}
                    {(customerReview?.reviews?.length || 0) <= 1 ? "rating" : "ratings"}
                </a>
            </p>
        </div>
    );
};

export default ProfileOverview;
