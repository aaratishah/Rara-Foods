import React from 'react';
import profileImage from "image/user.png";
import {ImagePreview} from "../../previewImage/ImagePreview";

const ProfileOverview = ({profile, customerReview, onRateClick}) => {
    return (
        <div className="head-widget img-profile">
            <ImagePreview src={profile?.photo} fallback={profileImage} />
            <figure>
                <p><label className="text-mute">Name : </label> {profile?.name || 'N/A'}</p>
                <p><label className="text-mute">Email : </label> {profile?.email || 'N/A'}</p>
                <p><label className="text-mute">Phone : </label> {profile?.phone || 'N/A'}</p>
                <p><label className="text-mute">Gender : </label> {profile?.gender || 'N/A'}</p>

            </figure>
            <p className="review pointer-event" style={{
                cursor: 'pointer'
            }} onClick={onRateClick}>
                {[...Array(5).keys()].map((each) => (
                    <i
                        className="fas fa-star"
                        style={{
                            color: each + 1 <= customerReview?.rating && '#f5b223',
                        }}
                    />
                ))}
                <a className='ml-2' >
                    {customerReview?.reviews?.length || 0} customer {(customerReview?.reviews?.length || 0) <= 1 ? 'rating' : 'ratings'}
                </a>
            </p>
        </div>
    );
};

export default ProfileOverview;
