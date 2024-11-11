"use server";

import { IVote } from "@/src/components/UI/postCard";
import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";

export const getPosts = async (query?: string) => {
  const option = {
    next: {
      tags: ["posts"],
    },
  };
  const res = await fetch(`${envConfig.baseApi}/post/all-post?${query}`, {
    cache: "no-store",
  });

  const posts = await res.json();

  return posts;
};

export const voteOnPost = async (voteData: IVote) => {
  try {
    const { data } = await axiosInstance.put(
      "/post/update-post/vote",
      voteData
    );

    return data;
  } catch (error) {
    throw new Error("Vote submission failed!");
  }
};
export const createPost = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/post/create-post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // revalidateTag("posts");

    return data;
  } catch (error) {
    throw new Error("Post creation failed! Error occurred.");
  }
};

export const commentOnPost = async (
  userId: string,
  comment: string,
  postId: string
) => {
  try {
    const { data } = await axiosInstance.post(
      `/post/comment-on-post/${postId}`,
      {
        userId: userId,
        comment: comment,
      }
    );

    return data;
  } catch (error) {
    throw new Error("Comment submission failed!");
  }
};

export const editComment = async (
  commentId: string,
  comment: string,
  postId: string
) => {
  try {
    const { data } = await axiosInstance.put(
      `/post/update-comment-on-post/${postId}`,
      {
        comment: comment,
        commentId: commentId,
      }
    );

    return data;
  } catch (error) {
    throw new Error("Comment submission failed!");
  }
};

export const deleteComment = async (
  commentId: string,
  userId: string,
  postId: string
) => {
  try {
    const { data } = await axiosInstance.delete(
      `/post/delete-comment-on-post/${postId}`,
      {
        data: {
          commentId: commentId,
          userId: userId,
        },
      }
    );

    return data;
  } catch (error) {
    throw new Error("Comment deletion failed!");
  }
};
