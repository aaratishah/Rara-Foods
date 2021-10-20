import Icon, { ShoppingCartOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { ShopContext } from 'context';
import { useContext } from 'react';
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
        <ShoppingCartOutlined style={{
          fontSize: 32
        }} /> Cart
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
        cursor: 'pointer',
      }}
    >
      <Icon
        component={() => (
          <svg
            width="24px"
            height="24px"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M17.8333 7.83325V2.83325H6.16665V7.83325H2.83331V16.1666C2.83331 18.9166 5.08331 21.1666 7.83331 21.1666H16.1666C18.9166 21.1666 21.1666 18.9166 21.1666 16.1666V7.83325H17.8333ZM8.66665 5.33325H15.3333V7.83325H8.66665V5.33325Z"
              fill="#05A357"
            />
          </svg>
        )}
      />
      <span
        style={{
          color: '#05A357',
          marginLeft: 4,
        }}
      >
        {carts && carts.length}
      </span>
    </div>
  );
}
