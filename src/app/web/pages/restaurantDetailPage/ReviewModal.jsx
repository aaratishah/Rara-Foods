import React from "react";
import { Modal, Button, Row, Col } from "antd";
import ReviewList from "./ReviewList";
import ReviewPost from "./ReviewPost";
import SingleReview from "./SingleReview";
import config from 'config';
import defaultProfile from 'image/user.png';

function ReviewModal({ isModalVisible, handleOk, handleCancel, reviewDetail, ...props }) {
  return (
    <Modal
      // title={reviewDetail && reviewDetail.reviews
      //   ? reviewDetail.reviews.filter((each) => !!each.review)
      //       .length
      //   : 0}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Row className="" justify="center">
        <Col xs={24} lg={24}>
          <ReviewPost {...props} />
          <div
            className="product-review pt-20"
            style={{
              marginTop: 24,
            }}
          >
            <div className="review-comment">
              <ul className="comment">
                {reviewDetail && reviewDetail.reviews.map(
                  (review) => !!review.review && <Row
                  className="single-review-comment"
                  style={{
                    marginBottom: 32,
                  }}
                >
                  <div className="review-author">
                    <img
                      src={
                        review?.user?.photo
                          ? config.getImageHost(review?.user?.photo)
                          : defaultProfile
                      }
                      alt="user"
                    />
                  </div>
                  <div className="review-content">
                    <p
                      style={{
                        marginBottom: 2,
                      }}
                    >
                      “{review && review?.review}”
                    </p>
                    <Row
                      justify="space-between"
                      className="review-name-rating"
                      style={{
                        paddingTop: 4,
                      }}
                    >
                      <Col>
                          <h6 className="review-name">{review && review?.user?.name}</h6>
                      </Col>
                      <Col>
                        {[...Array(5).keys()].map((each) => (
                          <i
                            className="fas fa-star"
                            style={{
                              color: each + 1 <= (review ? review?.rating : 1) && '#f5b223',
                            }}
                          />
                        ))}
                      </Col>
                    </Row>
                  </div>
                </Row>
                )}
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  );
}

export default ReviewModal;
