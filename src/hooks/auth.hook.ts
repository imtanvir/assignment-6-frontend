import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { editUser, loginUser, registerUser } from "../services/AuthService";

export const useUserRegister = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTER"],
    mutationFn: async (userData) => await registerUser(userData),
    onMutate: () => {
      toast.loading("Registering user...");
    },
    onSuccess: () => {
      toast.success("User Registration Successful!", {
        style: {
          background: "#10b981",
          border: "1px solid #10b981",
        },
        classNames: {
          toast: "text-white",
        },
      });
    },
    onError: (error) => {
      toast.error(error?.message, {
        style: {
          background: "#fecaca",
          border: "1px solid #fecaca",
        },
        classNames: {
          toast: "text-red-500",
        },
      });
    },
    onSettled: () => {
      toast.dismiss();
    },
  });
};

export const useUserEdit = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_EDIT"],
    mutationFn: async (formData) => await editUser(formData),
    onMutate: () => {
      toast.loading("Updating...");
    },
    onSuccess: () => {
      toast.success("User edit Successful!");
    },
    onError: (error) => {
      toast.error(error?.message, {
        style: {
          background: "#fecaca",
          border: "1px solid #fecaca",
        },
        classNames: {
          toast: "text-red-500",
        },
      });
    },
    onSettled: () => {
      toast.dismiss();
    },
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onMutate: () => {
      toast.loading("Logging in...");
    },
    onSuccess: () => {
      toast.success("User Login Successful!", {
        style: {
          background: "#10b981",
          border: "1px solid #10b981",
        },
        classNames: {
          toast: "text-white",
        },
      });
    },
    onError: (error) => {
      if (
        error?.message === "AxiosError: Request failed with status code 401"
      ) {
        toast.error("Email or password is incorrect!", {
          style: {
            background: "#fecaca",
            border: "1px solid #fecaca",
          },
          classNames: {
            toast: "text-red-500",
          },
        });
      }
    },
    onSettled: () => {
      toast.dismiss();
    },
  });
};
