import { useContext, useEffect, useState } from "react";
import ProductImage from "image/demo/p-001.jpg";
import { Link } from "react-router-dom";
import routeURL from "config/routeURL";
import config from "config";
import { Tag, Tooltip } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { getDistanceKM, getDurationFromKM } from "services/location";
import api from "app/web/api";
import { UserContext, UserLoginContext } from "context";
import { notificationError } from "app/web/components/notification";
import { handleError, isRestaurantOpenNow } from "services/util";

const styles = {
  productCat: {
    padding: "5px 0px",
  },
  shipping: {
    fontSize: 14,
  },
  productMeta: {
    transform: "unset",
  },
};
export default function Restaurant({ item, itemKey, location }) {
  const [wishlistStatus, setWishlistStatus] = useState(null);
  const { clientStore } = useContext(UserContext);
  const [isVisible, setVisible, tab, setTab] = useContext(UserLoginContext);
  const isAuth = clientStore.isAuthenticated;

  useEffect(() => {
    if (isAuth) {
      api.config
        .wishlistStatus(item?._id)
        .then(({ data }) => setWishlistStatus(data))
        .catch(handleError);
    } else {
      setWishlistStatus(false);
    }
  }, [item?._id, isAuth]);

  const showLoginModal = () => {
    setTab("1");
    setVisible(true);
  };

  const addToWishlist = () => {
    if (!isAuth) {
      showLoginModal();
    } else {
      // add to wishlist
      if (item?._id) {
        api.config
          .saveWishlist(item?._id)
          .then(({ data }) => setWishlistStatus(data))
          .catch(handleError);
      } else {
        notificationError("Invalid Product");
      }
    }
  };
  // return <spna>Restaurant detail</spna>;
  const distanceKM = getDistanceKM(
    location?.latitude,
    location?.longitude,
    item?.geo?.latitude,
    item?.geo?.longitude
  );
  const durationDelivery = getDurationFromKM(location, item?.geo);
  return (
    <div
      key={itemKey}
      style={{
        padding: 10,
        width: "100%",
        // boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
        // boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",

      }}
    >
      <div
        className="product"
        style={{
          borderRadius: "unset",
          // boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
        }}
      >
        <div
          style={{
            position: "relative",
          }}
        >
          <Link
            to={routeURL.web.restaurant_detail(item?._id)}
            className="product-image"
            style={{
              borderRadius: "unset",
            }}
          >
            <img
              style={
                {
                  // filter: 'grayscale(70%)',
                }
              }
              src={
                Array.isArray(item?.image) && item?.image.length > 0
                  ? config.getImageHost(item?.image[0])
                  : ProductImage
              }
              alt
            />
          </Link>
          {isRestaurantOpenNow(item?.openTime) || (
            <span
              style={{
                position: "absolute",
                top: 10,
                left: 10,
              }}
            >
              <Tag
                style={{
                  color: "#fff",
                  // transform: 'rotate(20deg)',
                }}
                color="#cd201f"
              >
                Closed
              </Tag>
            </span>
          )}
          <Tooltip
            title={
              wishlistStatus ? "Remove from Favorites" : "Make it Favorite"
            }
          >
            <span
              onClick={addToWishlist}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
              }}
            >
              {wishlistStatus ? (
                <HeartFilled
                  style={{
                    fontSize: 18,
                    color: "#ffffff",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <HeartOutlined
                  style={{
                    color: "#ffffff",
                    fontSize: 18,
                    cursor: "pointer",
                  }}
                />
              )}
            </span>
          </Tooltip>
        </div>
        <div className="product-container">
          <h2 className="product-title">
            <Link to={routeURL.web.restaurant_detail(item?._id)}>
              {item?.name}® {item?.address && `(${item?.address.street})`}
            </Link>
          </h2>
          <div className="product-meta" style={styles.productMeta}>
            <span className="shipping" style={styles.shipping}>
              {item?.category && (
                <span
                  style={{
                    marginRight: 8,
                  }}
                  className="currency"
                >
                  {item?.category}
                </span>
              )}
              <span className="duration">
                {distanceKM >= 0 && distanceKM}
                {location && item?.geo && (
                  <span
                    style={{
                      marginLeft: 8,
                    }}
                  >
                    {durationDelivery >= 0 && durationDelivery}
                  </span>
                )}
              </span>
            </span>
          </div>
          <div className="product-cat" style={styles.productCat}>
            {item?.famousFor?.map((each) => (
              <span
                style={{
                  marginRight: 8,
                }}
              >
                • {each}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
