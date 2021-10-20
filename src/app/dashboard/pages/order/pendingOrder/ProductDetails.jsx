/* eslint-disable jsx-a11y/anchor-is-valid */
import { Avatar } from 'antd';
import config from 'config';
import routeURL from 'config/routeURL';
import { Link } from 'react-router-dom';
import { getActualPriceNumber } from 'services/util';
const getSubtotal = (actualProductPrice, quantity) => {
  return actualProductPrice * quantity;
};
export default function Cart({
  cart: { actualPrice, quantity, productName, variants },
  product,
}) {
  return (
    <tr>
      <td className="product">
        <div className="cart-product">
          <div className="product-image">
            <img
              src={config.getImageHost(product.primaryImage)}
              alt={`${productName} cart`}
            />
          </div>
          <div className="product-content">
            <h5
              className="title"
              style={{
                marginBottom: 0,
              }}
            >
              <a
                target="_blank"
                href={routeURL.web.product_detail(product._id)}
              >
                {productName}
                {variants && (
                  <span
                    style={{
                      marginLeft: 4,
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    {variants.size},
                    <Avatar
                      style={{
                        width: 16,
                        height: 16,
                        backgroundColor: variants.color,
                        border: '1px solid #eeeeee',
                      }}
                      size="small"
                    />
                  </span>
                )}
              </a>
            </h5>
          </div>
        </div>
      </td>
      <td className="price">
        <p
          className="cart-price"
          style={{
            marginBottom: 0,
          }}
        >
          {getActualPriceNumber(product)}
        </p>
      </td>
      <td className="quantity">{quantity}</td>
      <td className="Total">
        <p
          className="cart-price"
          style={{
            marginBottom: 0,
          }}
        >
          {getSubtotal(actualPrice, quantity)}
        </p>
      </td>
    </tr>
  );
}
