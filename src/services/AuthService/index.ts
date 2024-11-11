"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

import axiosInstance from "@/src/lib/AxiosInstance";
import { IUser } from "@/src/types";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", {
      data: JSON.stringify(userData),
    });

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/signin", userData);

    if (data?.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = (await jwtDecode(accessToken)) as IUser;

    return {
      _id: decodedToken?._id,
      name: decodedToken.name,
      email: decodedToken.email,
      phone: decodedToken.phone,
      address: decodedToken.address,
      role: decodedToken.role,
      followers: decodedToken.followers,
      following: decodedToken.following,
      image: decodedToken.image,
    };
  }

  return decodedToken;
};

export const getUserPosts = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  if (accessToken) {
    const decodedToken = (await jwtDecode(accessToken as string)) as IUser;
    const { data } = await axiosInstance.get(
      `/post/user-posts/${decodedToken?._id}`
    );

    return data;
  }
};
