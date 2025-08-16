import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const GiveFundPage = () => {
  return (
    <div className="max-w-md mx-auto my-10 px-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Support with a Fund</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default GiveFundPage;
