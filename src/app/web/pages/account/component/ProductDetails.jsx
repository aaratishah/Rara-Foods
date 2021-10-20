/* eslint-disable jsx-a11y/anchor-is-valid */
import { Avatar, Tag } from 'antd';
import config from 'config';
import routeURL from 'config/routeURL';
import { Link } from 'react-router-dom';
import { getActualPriceNumber } from 'services/util';
const getSubtotal = (actualProductPrice, quantity) => {
  return actualProductPrice * quantity;
};
export default function Cart({
  cart: { activeImage, unitPriceWithAddon, subTotal, quantity, name, addon },
  product,
}) {
  return (
    <tr>
      <td className="product">
        <div className="cart-product">
          <div className="">
          <img className='model-image-card' style={{
            width: 100
          }} src={config.getImageHost(activeImage)} alt={`${name} cart`} />
          </div>
          <div className="product-content">
            <h5
              className="title"
              style={{
                marginBottom: 0,
              }}
            >
              <span>
                {name}
                <br />
                {addon &&
                  addon.map((each) => (
                    <Tag>
                      {each.name}: {each.value}
                    </Tag>
                  ))}
              </span>
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
          {unitPriceWithAddon}
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
          {process.env.REACT_APP_CURRENCY_SYMBOL}{subTotal}
        </p>
      </td>
    </tr>
  );
}
