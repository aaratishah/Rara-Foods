import { CloseOutlined } from "@ant-design/icons";
import { Col, Divider, Row, Typography } from "antd";
import routeURL from "config/routeURL";
import { ShopContext, UserContext } from "context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./cartItem.css";
import CartItem from "./Item";

export default function Cart({ ...props }) {
  const {
    cart: { cartRestaurant, cartDetail, items, cartVisible, setCartVisible },
  } = useContext(ShopContext);

  const { clientStore } = useContext(UserContext);
  const isAuth = clientStore.isAuthenticated;

  return (
    cartVisible && (
      <Row
        style={{
          width: 300,
          backgroundColor: "#ffffff",
          position: "absolute",
          top: 80,
          right: 10,
          maxHeight: "calc(100vw - 80px)",
          // transform: "translateX(-100%)",
          zIndex: 1,
          padding: 10,
          position: "fixed",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            backgroundColor: "#fff",
          }}
        >
          <Row justify="space-between">
            <Typography.Title level={4}>Your Order</Typography.Title>
            <CloseOutlined
              style={{
                color: "#000000",
                fontSize: 16,
              }}
              onClick={() => setCartVisible(!cartVisible)}
            />
          </Row>

          {cartRestaurant && cartRestaurant.name && (
            <div
              style={{
                color: "rgb(84, 84, 84)",
                fontSize: 14,
                backgroundColor: "#fff",
              }}
            >
              From {""}
              <span
                style={{
                  color: "#05A357",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {cartRestaurant && cartRestaurant.name}
              </span>
            </div>
          )}
          <Row
            style={{
              width: "100%",
              marginTop: 15,
              marginBottom: 15,
              overflowY: "scroll",
              maxHeight: 250,
              backgroundColor: "#fff",
            }}
          >
            {items &&
              items.map((cart, idx) => (
                <CartItem
                  isAuth={isAuth}
                  cart={cart}
                  setCartVisible={setCartVisible}
                />
              ))}
          </Row>
          {items && items.length === 0 ? (
            <Row
              justify="center"
              style={{
                marginTop: 8,
                backgroundColor: "#fff",
                padding: 8,
              }}
            >
              Your Cart is Empty
            </Row>
          ) : (
            <div
              style={{
                backgroundColor: "#fff",
              }}
            >
              <Divider />
              <Row
                style={{
                  width: "100%",
                  marginTop: 8,
                }}
                justify="space-between"
              >
                <Col>
                  <p className="value">Subtotal</p>
                </Col>
                <Col>
                  <p className="price">
                    {process.env.REACT_APP_CURRENCY_SYMBOL}
                    {(parseFloat(cartDetail.totalPrice) || 0).toFixed(2)}
                  </p>
                </Col>
              </Row>
            </div>
          )}
          <div
            className="cart-product-btn"
            style={{
              backgroundColor: "#fff",
              // borderRadius: '500px'
            }}
          >
            <Link
              onClick={() => setCartVisible(false)}
              to={routeURL.web.cart()}
              className="main-btn btn-block"
              style={{ borderRadius: "500px", backgroundColor: "#000" }}
            >
              View cart
            </Link>
            <Link
              onClick={() => setCartVisible(false)}
              to={routeURL.web.checkout()}
              className="main-btn btn-block"
              style={{ borderRadius: "500px", backgroundColor: "#000" }}
            >
              Checkout
            </Link>
          </div>
        </div>
      </Row>
    )
  );
}
