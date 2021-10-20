import { Button, Radio, Spin } from 'antd';
import routeURL from 'config/routeURL';
import { Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

export default function TotalCheckout({
  submitting,
  subtotal,
  // currency,
  onCheckout,
  shippingCharge,
  onDeliveryTypeChange,
}) {
  return (
    <div className="cart-totals mt-45">
      <div className="cart-title">
        <h4 className="title">Cart totals</h4>
      </div>
      <div className="cart-total-table mt-25">
        <table className="table">
          <tbody>
            <tr>
              <td>
                <p className="value">Subtotal</p>
              </td>
              <td>
                <p className="price">
                  {process.env.REACT_APP_CURRENCY_SYMBOL}
                  {subtotal}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="value">Shipping</p>
              </td>
              <td>
                <ul className="shipping-list">
                  <Radio.Group
                    style={{
                      width: '100%',
                    }}
                    onChange={(e) => onDeliveryTypeChange(e.target.value)}
                  >
                    {[
                      {
                        value: 'homedelivery',
                        label: 'Home Delivery',
                      },
                      {
                        value: 'pickup',
                        label: 'Local Pickup',
                      },
                    ].map((delivery) => (
                      <Radio
                        style={{
                          display: 'block',
                        }}
                        value={delivery.value}
                      >
                        {delivery.label}
                      </Radio>
                    ))}
                  </Radio.Group>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <p className="value">Total</p>
              </td>
              <td>
                <p className="price">
                  {process.env.REACT_APP_CURRENCY_SYMBOL}
                  {parseFloat(subtotal + shippingCharge).toFixed(2)}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="cart-total-btn mt-20">
        <span
          style={{
            cursor: submitting ? "not-allowed" : "pointer",
          }}
          disabled={submitting}
          onClick={submitting ? ()=>{} : onCheckout}
          className="main-btn btn-block"
        >
          {submitting && <LoadingOutlined spin={submitting} style={{
            marginRight: 8
          }}/>}
          Proceed To Checkout
        </span>
      </div>
    </div>
  );
}
