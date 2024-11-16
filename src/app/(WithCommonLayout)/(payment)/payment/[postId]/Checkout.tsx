"use client";

import { Button } from "@nextui-org/button";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { createPaymentClientSecret } from "@/src/services/Payment";
import { IPost } from "@/src/types";

const Checkout = ({
  payAmount,
  userId,
  postDetails,
}: {
  payAmount?: number;
  userId?: string;
  postDetails?: IPost;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [err, setErr] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);
  const paymentRef = useRef(0);
  const router = useRouter();
  const { user: currentUser } = useUser();

  useEffect(() => {}, []);

  useEffect(() => {
    const createClientSecret = async () => {
      const { data: response } = await createPaymentClientSecret(
        payAmount as number
      );

      setClientSecret(response?.clientSecret);
    };

    if (paymentRef.current === 0 && payAmount !== 0) {
      paymentRef.current = 1;
      createClientSecret();
    }
  }, [payAmount]);

  const handleErr = () => {
    if (err) {
      setErr("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Payment processing...");

    setProcessing(true);
    if (!stripe || !elements) {
      return <Loading />;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setProcessing(false);
      setErr(error.message ?? "An unexpected error occurred.");
      toast.error("Something went wrong!", {
        id: toastId,
        duration: 2000,
        style: {
          background: "#fecaca",
          border: "1px solid #fecaca",
        },
        classNames: {
          toast: "text-red-500",
        },
      });
    } else {
      setProcessing(true);
      setErr("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            // email: currentUser?.email || "anonymous",
            email: "a@aada.com",
            name: currentUser?.name || "anonymous",
          },
        },
      });

    if (confirmError) {
      toast.error(confirmError.message, {
        id: toastId,
        duration: 2000,
        style: {
          background: "#fecaca",
          border: "1px solid #fecaca",
        },
        classNames: {
          toast: "text-red-500",
        },
      });
    } else {
      if (paymentIntent.status === "succeeded") {
        // if (postDetails) {
        //   const response = await addPaymentHistory(postDetails._id);

        //   if (response?.success) {
        setTransactionId(paymentIntent.id);
        setProcessing(false);
        toast.success("Your payment was successful!", {
          id: toastId,
          duration: 2000,
          style: {
            background: "#10b981",
            border: "1px solid #10b981",
          },
          classNames: {
            toast: "text-white",
          },
        });

        // setTimeout(() => {
        //   //   setIsDialogOpen(false);
        // //   router.push("/");
        // }, 2000);
        //   }
        // }
      }
    }
  };

  const options = {
    style: {
      base: {
        fontSize: "16px",
        fontFamily: "'Poppins', sans-serif",
        color: "#000000",
        "::placeholder": {
          color: "#a0aec0",
          fontStyle: "italic",
        },
        iconColor: "#4a5568",
        letterSpacing: "0.025em",
        padding: "12px 10px",
      },
      invalid: {
        color: "#e53e3e",
        iconColor: "#e53e3e",
      },
      complete: {
        color: "#38a169",
        iconColor: "#38a169",
      },
    },
  };

  return (
    <>
      <form
        className=" px-5 md:py-10 flex flex-col gap-2 md:w-1/2 w-full mx-auto bg-white/50 dark:bg-gray-800/20 backdrop-blur-md border border-white/100 dark:border-gray-700/30 shadow-lg rounded-lg p-6"
        onSubmit={handleSubmit}
      >
        <CardElement
          className="  dark:bg-gray-800/20 text-slate-900 backdrop-blur-md border border-white/30 dark:border-gray-700/30 shadow-lg rounded-lg p-6"
          options={options}
          onChange={handleErr}
        />
        <p className="text-red-500">{err}</p>
        <p className="font-semibold bebas-neue-regular dark:text-slate-300 md:text-lg text-base">
          Your card will be charged{" "}
          <span className="text-indigo-500">${payAmount}</span>
        </p>
        <Button
          className={`button ${
            !stripe || !clientSecret || err
              ? "bg-slate-500 cursor-not-allowed hover:bg-slate-600 dark:bg-slate-700 dark:hover:bg-slate-700"
              : transactionId
                ? "bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 focus:ring-green-300"
                : "bg-indigo-700 hover:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 focus:ring-indigo-300"
          }  text-white  focus:ring-4 mt-2 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2 text-center `}
          // disabled={
          //   err.trim().length !== 0 ||
          //   payAmount === 0 ||
          //   !stripe ||
          //   !clientSecret ||
          //   processing ||
          //   transactionId.length > 1
          // }
          // console.log({err, payAmount, stripe, clientSecret, })
          type="submit"
        >
          {processing && !err && (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  fill="currentColor"
                />
              </svg>
              Processing...
            </span>
          )}
          {!transactionId && !processing && <>Pay</>}
          {!processing && transactionId && <>Payment Successful</>}
        </Button>
        <p className="text-green-500">
          {transactionId && (
            <span>Your transaction id is: {transactionId}</span>
          )}
        </p>

        <p className="text-center">
          Power by <span className="text-indigo-500 font-thin">Stripe</span>
        </p>
      </form>
    </>
  );
};

export default Checkout;
