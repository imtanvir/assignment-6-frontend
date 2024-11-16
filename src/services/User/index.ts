"use server";

import { cookies } from "next/headers";

import envConfig from "@/src/config/envConfig";

export const getUserProfile = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const fetchOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store" as RequestCache,
  };
  const response = await fetch(`${envConfig.baseApi}/user/`, fetchOptions);

  if (!response.ok) {
    throw new Error("Failed to get user profile!");
  }

  return response.json();
};
