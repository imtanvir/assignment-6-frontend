import { useMutation } from "@tanstack/react-query";

import { addPaymentHistory } from "../services/Payment";
import { TPayment } from "../types";

export const useAddPaymentHistory = () => {
  return useMutation<any, Error, TPayment>({
    mutationKey: ["ADD_PAYMENT_HISTORY"],
    mutationFn: async (paymentDetails) =>
      await addPaymentHistory(paymentDetails),
  });
};
