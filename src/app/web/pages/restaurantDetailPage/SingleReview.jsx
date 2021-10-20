import { Col, Row } from 'antd';
import config from 'config';
import defaultProfile from 'image/user.png';

export default function SingleReview({ review }) {
  return (
    <Row
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
  );
}
