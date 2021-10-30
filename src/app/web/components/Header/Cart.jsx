import Icon, { ShoppingCartOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import { ShopContext } from "context";
import { useContext } from "react";
export default function Cart({ isMobile, ...props }) {
  const {
    cart: { items: carts, cartVisible, setCartVisible },
  } = useContext(ShopContext);

  if (isMobile)
    return (
      <span
        onClick={() => {
          setCartVisible(!cartVisible);
        }}
      >
        <ShoppingCartOutlined
          style={{
            fontSize: 32,
          }}
        />{" "}
        Cart
        <Tag
          color="green"
          style={{
            marginLeft: 4,
          }}
        >
          {carts ? carts.length : 0}
        </Tag>
      </span>
    );

  return (
    <div
      {...props}
      onClick={() => {
        setCartVisible(!cartVisible);
      }}
      style={{
        cursor: "pointer",
        backgroundColor: "#000",
        border: "none",
        color: "#fff",
        padding: "6px 13px",
        fontWeight: "500",
        borderRadius: "500px",
        fontFamily: "sans-serif",
        // alignSelf: 'flex-end'
      }}
    >
      {/* <Icon
        component={() => (
          <svg
            width="24px"
            height="24px"
            // fill="none"
            viewBox="0 0 16 16"
            // xmlns="http://www.w3.org/2000/svg"
            className = 'c9 ca bz cb'  
            aria-hidden="true"
            focusable="false"
          >
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M3.666 11.333h10.333l1.334-8h-11l-.267-2h-3.4v2h1.667l1.333 8zm1.333 3.334A1.333 1.333 0 105 12a1.333 1.333 0 000 2.667zm9.334-1.334a1.333 1.333 0 11-2.667 0 1.333 1.333 0 012.667 0z"
            />
          </svg>
        )}
      /> */}
      <ShoppingCartOutlined
        style={{
          fontSize: 18,
          color: "#fff",
        }}
      />
      <span
        style={{
          color: "#fff",
          marginLeft: '3px',
          fontSize: 16,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
       cart • {carts && carts.length}
      </span>
      {/* {carts && carts.length} */}
    </div>
  );
}
