import React, { useContext, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";


import { toast } from "react-toastify";
import useAxiosSecure from "../../utilitis/Hooks/useAxiosSecure";
import { AuthContext } from "../../component/Context/AuthContext";

const CheckoutForm = () => {
  const [amount, setAmount] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      // Step 1: Create payment intent
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amount,
      });

      const card = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) return toast.error(error.message);

      // Step 2: Confirm payment
      const { paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (paymentIntent.status === "succeeded") {
        // Step 3: Store fund info
        await axiosSecure.post("/funds", {
          userName: user.displayName,
          email: user.email,
          amount,
          date: new Date(),
        });

        toast.success("Funding successful!");
        setAmount("");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="number"
        className="input input-bordered w-full"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <CardElement className="p-4 border rounded" />
      <button type="submit" className="btn btn-primary w-full mt-4" disabled={!stripe}>
        Pay ${amount || 0}
      </button>
    </form>
  );
};

export default CheckoutForm;
