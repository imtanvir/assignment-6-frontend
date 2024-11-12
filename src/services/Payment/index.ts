"use server";

import { cookies } from "next/headers";

import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";

export const addPaymentHistory = async (amount: number) => {
  try {
    const { data } = await axiosInstance.post("/create-payment-intent/", {
      amount: amount,
    });

    return data;
  } catch (error) {
    throw new Error("Payment failed!");
  }
};

export const createPaymentClientSecret = async (amount: number) => {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  const fetchOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store" as RequestCache,
    body: JSON.stringify({ amount }),
  };

  const response = await fetch(
    `${envConfig.baseApi}/payment/create-client-secret`,
    fetchOptions
  );

  if (!response.ok) {
    throw new Error("Failed to add payment history!");
  }

  return response.json();
};
