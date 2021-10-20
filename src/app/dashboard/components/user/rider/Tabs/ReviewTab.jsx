import React, {useEffect, useState} from "react";
import profileImage from "image/user.png";
import {Row} from "antd";
import CustomerName from '../../customer/CustomerName';
import moment from 'moment';

const Item = ({review}) => <div className="col-md-12 media">
  <span href="#" className="pull-left">
    <img src={review?.customer?.photo || profileImage} alt="" />
  </span>
  <div className="media-body">
    <strong className="text-success">
      <CustomerName customer={review?.customer} />
    </strong>
    <span className="text-muted pull-right">
              <small className="text-muted ml-2">
                {[...Array(5).keys()].map((each) => (
                    <i
                        className="fas fa-star"
                        style={{
                            color: each + 1 <= (review ? review.rating : 1) && '#f5b223',
                        }}
                    />
                ))}
              </small>
            </span>
      {/*<br />*/}
      <span className='text-muted ml-2'>{moment(review?.createdDateTime).fromNow()}</span>
    <p>
        {review?.review}
    </p>
  </div>
</div>

const ReviewTab = ({reviews}) => {
    // const [data, setData] = useState([]);
    // const [spinning, setSpinning] = useState(true);
    // useEffect(() => {
    //     if(userId && typeof getURL === 'function'){
    //             setSpinning(true);
    //         getURL(userId)
    //                 .then(({ data }) => setProfile(data))
    //                 .catch(handleError)
    //                 .finally(() => setSpinning(false));
    //     }
    // }, [userId]);

  return (
    <div className="tab-pane fade show active" id="pills-review">
      <h6 className="view-title">Review</h6>
      <hr />
      <Row gutter={[16,16]}>
        {(Array.isArray(reviews) && reviews.length > 0) ? reviews?.map(review => <Item review={review} />) : <span className='text-muted'>No Reviews Found</span>}
      </Row>
    </div>
  );
};

export default ReviewTab;
