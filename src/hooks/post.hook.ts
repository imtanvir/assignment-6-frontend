import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createPost } from "../services/Posts";

export const useCreatePost = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success("Post created and published!");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
