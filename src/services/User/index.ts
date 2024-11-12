"use server";

import { getCurrentUser } from "../AuthService";

import axiosInstance from "@/src/lib/AxiosInstance";

export const getUserProfile = async () => {
  const currentUser = await getCurrentUser();

  try {
    if (currentUser?.role && currentUser?.email) {
      const res = await axiosInstance.get(`/user/`);

      return res.data;
    } else {
      return {};
    }
  } catch (error) {
    throw new Error("Something went wrong!");
  }
};
