import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  commentOnPost,
  createPost,
  deleteComment,
  editComment,
  voteOnPost,
} from "../services/Posts";

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

export const useVoteOnPost = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["VOTE_ON_POST"],
    mutationFn: async (voteData) => await voteOnPost(voteData),
  });
};

export const useCommentOnPost = () => {
  return useMutation<
    any,
    Error,
    { userId: string; comment: string; postId: string }
  >({
    mutationKey: ["COMMENT_ON_POST"],
    mutationFn: async ({
      userId,
      comment,
      postId,
    }: {
      userId: string;
      comment: string;
      postId: string;
    }) => await commentOnPost(userId, comment, postId),
  });
};

export const useEditComment = () => {
  return useMutation<
    any,
    Error,
    { commentId: string; comment: string; postId: string }
  >({
    mutationKey: ["EDIT_COMMENT"],
    mutationFn: async ({
      commentId,
      comment,
      postId,
    }: {
      commentId: string;
      comment: string;
      postId: string;
    }) => await editComment(commentId, comment, postId),
  });
};

export const useDeleteComment = () => {
  return useMutation<
    any,
    Error,
    { commentId: string; userId: string; postId: string }
  >({
    mutationKey: ["DELETE_COMMENT"],
    mutationFn: async ({
      commentId,
      userId,
      postId,
    }: {
      commentId: string;
      userId: string;
      postId: string;
    }) => await deleteComment(commentId, userId, postId),
  });
};