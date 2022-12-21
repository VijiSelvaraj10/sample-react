import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CreateCardPayment } from "./CheckOutForm";

const PUBLIC_KEY = "pk_test_51JmBTQSGfklm9qs4HZV3ccVo8KYKTH9DiIOztSyLd13URRDOumvBxB3BlAR0dUtYd5FZHl0fcyx3xJibANZYxsZF00MHUt0jTB";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CreateCardPayment />
    </Elements>
  );
};

export default Stripe;