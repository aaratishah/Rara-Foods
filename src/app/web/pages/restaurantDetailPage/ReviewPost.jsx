/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Row, Typography } from "antd";
import api from "app/web/api";
import PrimaryButton from "app/web/components/Button/PrimaryButton";
import { notificationError } from "app/web/components/notification";
import clsx from "clsx";
import { UserContext, UserLoginContext } from "context";
import { useContext, useEffect, useState } from "react";
import { handleError } from "services/util";
import "./review.css";

export default function ReviewPost({
  restaurantId,
  rating,
  review,
  refreshReview,
  reviewSpinning,
}) {
  const { clientStore } = useContext(UserContext);
  const isAuth = clientStore.isAuthenticated;
  const [isVisible, setVisible, tab, setTab] = useContext(UserLoginContext);
  const [ratingValue, setRating] = useState(-1);
  const [reviewValue, setReview] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [canIRate, setCanIRate] = useState(false);

  useEffect(() => {
    if (rating > 0 && rating <= 5) setRating(rating);
  }, [rating]);

  useEffect(() => {
    if (review > 0 && review <= 5) setReview(review);
  }, [review]);

  useEffect(() => {
    if (isAuth && restaurantId) {
      api.review
        .canIRate(restaurantId)
        .then(({ data }) => setCanIRate(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  }, [isAuth]);

  const showLoginModal = () => {
    setTab("1");
    setVisible(true);
  };

  const onRate = () => {
    if (!ratingValue || ratingValue > 5 || ratingValue < 0) {
      return notificationError("Rating is Required");
    }
    if (!isAuth) {
      return showLoginModal();
    }
    if (!canIRate) {
      return notificationError("Order Food before revewing the restaurant.");
    }
    const jsonData = {
      rating: ratingValue,
      review: reviewValue,
      restaurant: restaurantId,
    };
    setSpinning(true);
    api.review
      .add(jsonData)
      .then(({ data }) => refreshReview())
      .catch(handleError)
      .finally(() => setSpinning(false));
  };

  return (
    <Row>
      <Typography.Title
        style={{
          width: "100%",
          fontWeight: 400,
          color: "#232324",
          fontSize: 20,
          fontFamily: "Poppins,sans-serif",
        }}
      >
        Add a review
      </Typography.Title>
      <div
        className="product-review"
        style={{
          width: "100%",
        }}
      >
        <div className="review-form">
          <div className="rating-star">
            {[...Array(5).keys()].map((each) => (
              <a
                onClick={() => setRating(each + 1)}
                key={each}
                href="javascript:void(0)"
                className={clsx(
                  ` star-${each + 1}`,
                  each + 1 === ratingValue && "active"
                )}
                style={{
                  textDecoration: "none",
                }}
              />
            ))}
          </div>
          <div className="review-textarea">
            <label>Your Review</label>
            <textarea
              value={reviewValue}
              onChange={({ target: { value } }) => setReview(value)}
            />
          </div>
          <div className="review-btn">
            <PrimaryButton
              title="submit"
              classname="main-btn"
              handleClick={onRate}
              disabled={reviewSpinning || spinning}
            />

            {/* <button
              className="main-btn"
              onClick={onRate}
              disabled={reviewSpinning || spinning}
            >
              Submit
            </button> */}
          </div>
          {/* <div className="review-checkbok">
              <input type="checkbox" id="checkbox" />
              <label htmlFor="checkbox">
                <span /> NOTIFY ME OF NEW POSTS BY EMAIL.
              </label>
            </div> */}
        </div>
      </div>

      <Row
        style={{
          width: "100%",
        }}
      ></Row>
    </Row>
  );
  return (
    <div className="review-form mt-45">
      <h2 className="form-title">Add a review </h2>
      <form action="#">
        <div className="rating-star">
          <a href="javascript:void(0)" className="star-1" />
          <a href="javascript:void(0)" className="star-2" />
          <a href="javascript:void(0)" className="star-3" />
          <a href="javascript:void(0)" className="star-4" />
          <a href="javascript:void(0)" className="star-5" />
        </div>
        <div className="review-textarea">
          <label>Your Review *</label>
          <textarea defaultValue={""} />
        </div>
        <div className="review-btn">
          <a href="#" className="main-btn">
            Submit
          </a>
        </div>
        <div className="review-checkbok">
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox">
            <span /> NOTIFY ME OF NEW POSTS BY EMAIL.
          </label>
        </div>
      </form>
    </div>
  );
}
