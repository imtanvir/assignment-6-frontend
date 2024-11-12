"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Checkout from "./Checkout";

import envConfig from "@/src/config/envConfig";

const stripePromise = loadStripe(envConfig.stripePK as string);

const Payment = () => {
  return (
    <>
      <Elements stripe={stripePromise}>
        <Checkout
          payAmount={520}
          // id={postData?._id as string}
          // postDetails={postData as IPost}
          // userId={user?._id as string}
        />
      </Elements>
    </>
  );
};

export default Payment;
