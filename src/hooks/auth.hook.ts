import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { editUser, loginUser, registerUser } from "../services/AuthService";

export const useUserRegister = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTER"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User Registration Successful!");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};

export const useUserEdit = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_EDIT"],
    mutationFn: async (formData) => await editUser(formData),
    onSuccess: () => {
      toast.success("User edit Successful!");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("User Login Successful!");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
