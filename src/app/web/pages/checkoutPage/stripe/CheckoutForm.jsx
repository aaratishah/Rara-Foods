import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './index.css';

export const CheckoutForm = ({ onHandleSubmit }) => {
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    setPaymentLoading(true);
    event.preventDefault();
    const paymentMethod = {
      type: 'card',
      card: elements.getElement(CardElement),
    }
    // const { error, paymentMethod } = await stripe.createPaymentMethod(paymentMethod);
    const { error, token } = await stripe.createToken(paymentMethod.card);

    if (!error) {
      console.log('Stripee 23 | token generated!', token);
      //send token to backend here
      if (typeof onHandleSubmit === 'function')
        onHandleSubmit(true, token);
    } else {
      console.log("Stripee error",error.message);
      if (typeof onHandleSubmit === 'function')
        onHandleSubmit(false, error.message);
    }
    setPaymentLoading(false);
  };

  return (
    <div
      style={{
        // padding: '3rem',
      }}
    >
      <div
        style={{
          maxWidth: '500px',
          margin: '0 auto',
        }}
      >
        <form
          style={{
            display: 'block',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CardElement
              className="card"
              options={{
                style: {
                  base: {
                    backgroundColor: 'white',
                  },
                },
              }}
            />
            <button
              onClick={handleSubmit}
              className="pay-button"
              disabled={isPaymentLoading}
            >
              {isPaymentLoading ? 'Loading...' : 'Pay'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
