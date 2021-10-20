import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import ReviewPost from './ReviewPost';
import SingleReview from './SingleReview';

export default function ReviewList({ reviewDetail, ...props }) {
  return (
    <Row className="" justify="center">
      <Col xs={24} lg={16}>
        <ReviewPost {...props} />
        <div className="product-review pt-20" style={{
          marginTop: 24
        }}>
          <div className="review-comment">
            <ul className="comment">
              {reviewDetail.reviews.map(
                (each) => !!each.review && <SingleReview review={each} />
              )}
            </ul>
          </div>
        </div>
      </Col>
    </Row>
  );
}
