"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Checkout from "./Checkout";

import envConfig from "@/src/config/envConfig";

const stripePromise = loadStripe(envConfig.stripePK as string);

const Payment = ({ params }: { params: { postId: string } }) => {
  return (
    <section className="h-[calc(100vh-64px)] mt-32">
      <h1 className="text-center py-10 md:text-2xl text-xl font-mono font-semibold pt-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 ">
        Make your payment to access this post
      </h1>
      <Elements stripe={stripePromise}>
        <Checkout
          payAmount={10}
          // id={postData?._id as string}
          // postDetails={postData as IPost}
          // userId={user?._id as string}
        />
      </Elements>
    </section>
  );
};

export default Payment;
