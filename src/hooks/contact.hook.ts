import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { createContactUs } from "../services/AuthService";

export const useContactUs = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CONTACT_US"],
    mutationFn: async (contactData) => await createContactUs(contactData),
    onMutate: () => {
      toast.loading("Sending feedback...");
    },
    onSuccess: () => {
      toast.success("Feedback sent successfully!");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
    onSettled: () => {
      toast.dismiss();
    },
  });
};
