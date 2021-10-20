import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CheckoutForm } from "./CheckoutForm";

const PUBLIC_KEY = "pk_test_INm3Ozb6TaZYnYqtDRxg9SDH004ztz7Y0D";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = ({onHandleSubmit}) => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm onHandleSubmit={onHandleSubmit}/>
    </Elements>
  );
};

export default StripeContainer;